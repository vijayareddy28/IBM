/**
 * AIAssistant — CarePath AI
 *
 * Patient-facing AI health assistant.
 * Provides a chat-style interface for health questions with disclaimers.
 * Responses are generated dynamically via the server AI endpoint (Gemini 1.5 Flash
 * when AI_API_KEY is set; enhanced smart engine otherwise — no static/mock replies).
 * Supports multilingual responses: EN / HI / TE via LanguageContext.
 *
 * Voice features:
 *   • Mic button → browser Speech Recognition (STT) → fills input + auto-sends
 *   • Language auto-detection from speech transcript (Devanagari → HI, Telugu → TE, else EN)
 *   • Speaker button on every AI message → Text-to-Speech (TTS) in the detected language
 *   • Both STT and TTS use the free built-in browser Web Speech API
 *
 * Route: /user/ai
 */

import { useState, useRef, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  Brain, Send, RefreshCw, AlertCircle, User, Bot,
  Loader2, Info, Stethoscope, Building2, Calendar,
  Mic, MicOff, Volume2, VolumeX,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import LanguageSwitcher from '../../components/common/LanguageSwitcher';
import useSpeech from '../../hooks/useSpeech';
import { sendChatMessage } from '../../services/aiService';

// ── Lang display names (for auto-detect toast) ────────────────────────────────
const LANG_NAMES = { en: 'English', hi: 'हिन्दी', te: 'తెలుగు' };

// ── Markdown-lite renderer ─────────────────────────────────────────────────────
const renderMarkdown = (text) => {
  const lines = text.split('\n');
  return lines.map((line, i) => {
    if (line.startsWith('**') && line.endsWith('**')) {
      return <p key={i} className="font-semibold text-gray-900 mt-2 mb-0.5">{line.slice(2, -2)}</p>;
    }
    if (line.startsWith('• ') || line.startsWith('* ')) {
      return (
        <li key={i} className="ml-4 flex items-start gap-1.5 text-xs leading-relaxed">
          <span className="text-gray-400 mt-0.5 shrink-0">•</span>
          <span dangerouslySetInnerHTML={{ __html: line.slice(2).replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
        </li>
      );
    }
    if (/^\d+\./.test(line)) {
      return (
        <li key={i} className="ml-4 flex items-start gap-1.5 text-xs leading-relaxed">
          <span className="text-gray-400 shrink-0">{line.match(/^\d+/)[0]}.</span>
          <span dangerouslySetInnerHTML={{ __html: line.replace(/^\d+\.\s*/, '').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
        </li>
      );
    }
    if (line.trim() === '') return <div key={i} className="h-1" />;
    return (
      <p key={i} className="text-xs leading-relaxed"
        dangerouslySetInnerHTML={{ __html: line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/🚨|⚠️/g, (m) => `<span class="text-red-500">${m}</span>`) }}
      />
    );
  });
};

// ── Chat message bubble ────────────────────────────────────────────────────────
// onSpeak and isSpeakingThis are only passed for assistant messages
const Message = ({ msg, onSpeak, onStopSpeak, isSpeakingThis, ttsSupported }) => {
  const isUser = msg.role === 'user';
  return (
    <div className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : ''}`}>
      <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
        isUser ? 'bg-blue-100' : 'bg-violet-100'
      }`}>
        {isUser ? <User className="w-3.5 h-3.5 text-blue-600" /> : <Bot className="w-3.5 h-3.5 text-violet-600" />}
      </div>
      <div className={`max-w-[80%] rounded-xl px-4 py-3 ${
        isUser
          ? 'bg-blue-600 text-white text-xs leading-relaxed'
          : 'bg-white border border-gray-200 text-gray-800'
      }`}>
        {isUser ? (
          <p className="text-xs">{msg.content}</p>
        ) : (
          <>
            <div className="space-y-0.5">{renderMarkdown(msg.content)}</div>
            {/* TTS speaker button — only on assistant messages when TTS supported */}
            {ttsSupported && (
              <div className="mt-2 pt-2 border-t border-gray-100 flex justify-end">
                <button
                  onClick={isSpeakingThis ? onStopSpeak : onSpeak}
                  title={isSpeakingThis ? 'Stop speaking' : 'Read aloud'}
                  className={`flex items-center gap-1 text-xs rounded-md px-2 py-1 transition-colors ${
                    isSpeakingThis
                      ? 'text-violet-700 bg-violet-100 hover:bg-violet-200'
                      : 'text-gray-400 hover:text-violet-600 hover:bg-violet-50'
                  }`}
                >
                  {isSpeakingThis
                    ? <><VolumeX className="w-3 h-3" /> Stop</>
                    : <><Volume2 className="w-3 h-3" /> Listen</>
                  }
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

// ── Main Component ─────────────────────────────────────────────────────────────
const AIAssistant = () => {
  const { user } = useAuth();
  const { t, lang, setLang } = useLanguage();

  const firstName = user?.name?.split(' ')[0] || '';

  const [messages, setMessages] = useState(() => [
    {
      role: 'assistant',
      content: t('ai.greeting')(firstName),
    },
  ]);
  const [input, setInput]           = useState('');
  const [thinking, setThinking]     = useState(false);
  const [speakingId, setSpeakingId] = useState(null);   // index of msg currently being spoken
  const [voiceToast, setVoiceToast] = useState('');     // auto-detect notification
  const bottomRef                   = useRef(null);
  const toastTimerRef               = useRef(null);

  // Voice hook
  const {
    isListening,
    sttSupported,
    ttsSupported,
    startListening,
    stopListening,
    speak,
    stopSpeaking,
  } = useSpeech();

  // When language changes: refresh the initial greeting message only
  useEffect(() => {
    setMessages((prev) => {
      if (prev.length === 1 && prev[0].role === 'assistant') {
        return [{ role: 'assistant', content: t('ai.greeting')(firstName) }];
      }
      return prev;
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Stop TTS when component unmounts or language changes
  useEffect(() => {
    return () => {
      stopSpeaking();
      setSpeakingId(null);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  // ── Show transient toast ──────────────────────────────────────────────────
  const showToast = useCallback((msg) => {
    setVoiceToast(msg);
    clearTimeout(toastTimerRef.current);
    toastTimerRef.current = setTimeout(() => setVoiceToast(''), 3000);
  }, []);

  // ── Send message — calls the server AI endpoint ───────────────────────────
  const sendMessage = async (text) => {
    const question = (text || input).trim();
    if (!question) return;

    // Capture current history snapshot before updating state
    // (use a ref-style approach: read messages synchronously before the new user msg)
    const historySnapshot = messages.map(({ role, content }) => ({ role, content }));

    setMessages((prev) => [...prev, { role: 'user', content: question }]);
    setInput('');
    setThinking(true);

    let answer = '';
    try {
      const res = await sendChatMessage(question, historySnapshot, lang);
      answer = res?.data?.answer || res?.answer || '';
    } catch (err) {
      // Graceful error message in the active language
      const errMsgs = {
        en: '⚠️ I had trouble connecting to the AI service. Please check your internet connection and try again.',
        hi: '⚠️ AI सेवा से कनेक्ट करने में समस्या हुई। कृपया अपना इंटरनेट कनेक्शन जांचें और पुनः प्रयास करें।',
        te: '⚠️ AI సేవకు కనెక్ట్ అవ్వడంలో సమస్య వచ్చింది. దయచేసి మీ ఇంటర్నెట్ కనెక్షన్ తనిఖీ చేసి మళ్ళీ ప్రయత్నించండి.',
      };
      answer = errMsgs[lang] || errMsgs.en;
    }

    setMessages((prev) => {
      const next = [...prev, { role: 'assistant', content: answer }];
      // Auto-speak the new AI response
      if (ttsSupported && answer) {
        const idx = next.length - 1;
        setSpeakingId(idx);
        speak(answer, lang);
      }
      return next;
    });
    setThinking(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearChat = () => {
    stopSpeaking();
    setSpeakingId(null);
    setMessages([
      {
        role: 'assistant',
        content: t('ai.chatCleared'),
      },
    ]);
  };

  // ── Mic button handler ────────────────────────────────────────────────────
  const handleMic = () => {
    if (isListening) {
      stopListening();
      return;
    }

    // Stop TTS before listening to avoid feedback
    stopSpeaking();
    setSpeakingId(null);

    startListening(
      lang,
      // onResult: transcript ready
      (transcript, detectedLang) => {
        setInput(transcript);
        // Auto-detect language switch
        if (detectedLang && detectedLang !== lang) {
          setLang(detectedLang);
          showToast(t('ai.voiceDetected')(LANG_NAMES[detectedLang] || detectedLang));
        }
        // Auto-send voice input
        sendMessage(transcript);
      },
      // onDetectedLang: (handled inside onResult above)
    );
  };

  // ── TTS: speak a specific message ─────────────────────────────────────────
  const handleSpeak = (idx, content) => {
    stopSpeaking();
    setSpeakingId(idx);
    speak(content, lang);
    // SpeechSynthesis doesn't give us a reliable onend via the hook state
    // so we track via speakingId; user can stop manually
  };

  const handleStopSpeak = () => {
    stopSpeaking();
    setSpeakingId(null);
  };

  const suggestions = t('ai.suggestions');

  // ── Mic button appearance ─────────────────────────────────────────────────
  const micLabel = isListening ? t('ai.voiceListening') : t('ai.voiceTap');
  const micClass = isListening
    ? 'bg-red-500 hover:bg-red-600 text-white animate-pulse'
    : 'bg-violet-100 hover:bg-violet-200 text-violet-700';

  return (
    <div className="flex flex-col h-[calc(100vh-6rem)] max-w-2xl space-y-0">
      {/* Header — UNCHANGED structure, same elements */}
      <div className="flex items-center justify-between gap-4 pb-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-violet-100 flex items-center justify-center">
            <Brain className="w-5 h-5 text-violet-600" />
          </div>
          <div>
            <h1 className="text-base font-bold text-gray-900">{t('ai.title')}</h1>
            <p className="text-xs text-emerald-600 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" /> {t('common.online')}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <LanguageSwitcher compact />
          <button onClick={clearChat}
            className="flex items-center gap-1.5 text-xs text-gray-500 border border-gray-200 rounded-lg px-3 py-1.5 hover:text-gray-700 transition-colors">
            <RefreshCw className="w-3.5 h-3.5" /> {t('common.clear')}
          </button>
        </div>
      </div>

      {/* Disclaimer — UNCHANGED */}
      <div className="py-3 px-4 bg-amber-50 border border-amber-100 rounded-xl my-3 text-xs text-amber-800 flex gap-2">
        <Info className="w-3.5 h-3.5 shrink-0 mt-0.5" />
        <span>{t('ai.disclaimer')}</span>
      </div>

      {/* Voice status toast — appears above message list when STT/TTS is active */}
      {(isListening || voiceToast) && (
        <div className={`mx-1 mb-2 flex items-center gap-2 text-xs px-3 py-2 rounded-lg border ${
          isListening
            ? 'bg-red-50 border-red-200 text-red-700'
            : 'bg-violet-50 border-violet-200 text-violet-700'
        }`}>
          {isListening
            ? <><Mic className="w-3.5 h-3.5 animate-pulse shrink-0" /> {t('ai.voiceListening')}</>
            : <><Volume2 className="w-3.5 h-3.5 shrink-0" /> {voiceToast}</>
          }
        </div>
      )}

      {/* Messages — same structure, Message component extended with TTS props */}
      <div className="flex-1 overflow-y-auto space-y-4 py-2 pr-1">
        {messages.map((msg, i) => (
          <Message
            key={i}
            msg={msg}
            ttsSupported={ttsSupported}
            isSpeakingThis={speakingId === i}
            onSpeak={() => handleSpeak(i, msg.content)}
            onStopSpeak={handleStopSpeak}
          />
        ))}
        {thinking && (
          <div className="flex items-start gap-3">
            <div className="w-7 h-7 rounded-full bg-violet-100 flex items-center justify-center shrink-0 mt-0.5">
              <Bot className="w-3.5 h-3.5 text-violet-600" />
            </div>
            <div className="bg-white border border-gray-200 rounded-xl px-4 py-3 flex items-center gap-2">
              <Loader2 className="w-3.5 h-3.5 text-violet-500 animate-spin" />
              <span className="text-xs text-gray-500">{t('common.thinking')}</span>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Suggestion chips — UNCHANGED */}
      {messages.length <= 2 && !thinking && Array.isArray(suggestions) && (
        <div className="py-3">
          <p className="text-xs text-gray-500 mb-2">{t('ai.suggestedQuestions')}</p>
          <div className="flex flex-wrap gap-2">
            {suggestions.map((s) => (
              <button key={s} onClick={() => sendMessage(s)}
                className="text-xs bg-violet-50 text-violet-700 border border-violet-100 px-3 py-1.5 rounded-full hover:bg-violet-100 transition-colors">
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input area — textarea + mic button + send button */}
      <div className="pt-3 border-t border-gray-200">
        <div className="flex gap-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={1}
            disabled={thinking}
            placeholder={t('ai.inputPlaceholder')}
            className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-violet-500 disabled:opacity-50"
            style={{ minHeight: '42px', maxHeight: '120px' }}
          />

          {/* ── Mic button (additive) ── */}
          {sttSupported ? (
            <button
              onClick={handleMic}
              disabled={thinking}
              title={micLabel}
              aria-label={micLabel}
              className={`w-10 h-10 flex items-center justify-center rounded-xl transition-colors shrink-0 self-end disabled:opacity-40 ${micClass}`}
            >
              {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </button>
          ) : null}

          {/* Send button — UNCHANGED */}
          <button
            onClick={() => sendMessage()}
            disabled={!input.trim() || thinking}
            className="w-10 h-10 flex items-center justify-center bg-violet-600 hover:bg-violet-700 disabled:opacity-40 text-white rounded-xl transition-colors shrink-0 self-end"
          >
            {thinking ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          </button>
        </div>

        {/* Voice hint — shown only when STT is supported */}
        {sttSupported && (
          <p className="text-xs text-gray-400 mt-1.5 ml-1">
            🎤 {isListening ? t('ai.voiceListening') : t('ai.voiceTap')}
            {' · '}
            <span className="text-gray-300">EN / हिन्दी / తెలుగు</span>
          </p>
        )}

        {/* Quick-access links — UNCHANGED */}
        <div className="flex gap-3 mt-3 text-xs text-gray-500">
          <Link to="/user/appointments" className="flex items-center gap-1 hover:text-blue-600 transition-colors">
            <Calendar className="w-3 h-3" /> {t('common.bookAppointment')}
          </Link>
          <Link to="/user/hospitals" className="flex items-center gap-1 hover:text-blue-600 transition-colors">
            <Building2 className="w-3 h-3" /> {t('common.findHospital')}
          </Link>
          <Link to="/user/experts" className="flex items-center gap-1 hover:text-blue-600 transition-colors">
            <Stethoscope className="w-3 h-3" /> {t('common.talkToExpert')}
          </Link>
          <Link to="/user/emergency" className="flex items-center gap-1 hover:text-red-600 transition-colors">
            <AlertCircle className="w-3 h-3" /> {t('common.emergency')}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;
