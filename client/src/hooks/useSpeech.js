/**
 * useSpeech — CarePath AI
 *
 * Custom hook that wraps the browser's Web Speech API:
 *   • Speech Recognition  (STT) — mic → text
 *   • Speech Synthesis    (TTS) — text → voice
 *
 * Supports English (en), Hindi (hi), and Telugu (te).
 * Uses only free built-in browser APIs — no external service required.
 *
 * Returns:
 *   isListening       {boolean}   — mic is active and capturing
 *   isSpeaking        {boolean}   — TTS is currently playing
 *   sttSupported      {boolean}   — browser supports SpeechRecognition
 *   ttsSupported      {boolean}   — browser supports SpeechSynthesis
 *   startListening    {function}  — (onResult, onDetectedLang?) => void
 *   stopListening     {function}  — stop mic immediately
 *   speak             {function}  — (text, langCode) => void
 *   stopSpeaking      {function}  — cancel TTS immediately
 */

import { useState, useRef, useCallback, useEffect } from 'react';

// ── BCP-47 locale tags per language code ──────────────────────────────────────
const LANG_LOCALE = {
  en: 'en-IN',   // English (India) — better for Indian-accented English
  hi: 'hi-IN',   // Hindi
  te: 'te-IN',   // Telugu
};

// ── Detect language from transcript using Unicode script ranges ───────────────
// Returns 'hi', 'te', or 'en'
const detectLangFromText = (text) => {
  if (!text) return null;
  // Devanagari (Hindi): U+0900–U+097F
  const devanagari = (text.match(/[\u0900-\u097F]/g) || []).length;
  // Telugu: U+0C00–U+0C7F
  const telugu = (text.match(/[\u0C00-\u0C7F]/g) || []).length;

  const total = devanagari + telugu;
  if (total === 0) return 'en';
  if (telugu > devanagari) return 'te';
  return 'hi';
};

// ── Best TTS voice for a given locale ────────────────────────────────────────
const pickVoice = (locale) => {
  if (typeof speechSynthesis === 'undefined') return null;
  const voices = speechSynthesis.getVoices();
  if (!voices.length) return null;

  const lang = locale.split('-')[0]; // e.g. 'hi' from 'hi-IN'

  // Priority 1 — exact locale match (e.g. hi-IN)
  let voice = voices.find((v) => v.lang === locale);
  // Priority 2 — same language, any region
  if (!voice) voice = voices.find((v) => v.lang.startsWith(lang));
  // Priority 3 — fallback to any English voice
  if (!voice) voice = voices.find((v) => v.lang.startsWith('en'));
  return voice || null;
};

// ── Hook ──────────────────────────────────────────────────────────────────────
const useSpeech = () => {
  const [isListening, setIsListening]   = useState(false);
  const [isSpeaking, setIsSpeaking]     = useState(false);

  const recognitionRef = useRef(null);
  const synthRef       = useRef(typeof speechSynthesis !== 'undefined' ? speechSynthesis : null);

  // Feature detection (computed once)
  const SpeechRecognition =
    typeof window !== 'undefined'
      ? window.SpeechRecognition || window.webkitSpeechRecognition
      : null;

  const sttSupported = Boolean(SpeechRecognition);
  const ttsSupported = Boolean(synthRef.current);

  // Ensure voices are loaded (Chrome loads them async)
  useEffect(() => {
    if (!ttsSupported) return;
    const synth = synthRef.current;
    if (synth.onvoiceschanged !== undefined) {
      synth.onvoiceschanged = () => {}; // trigger load
    }
  }, [ttsSupported]);

  // ── startListening ──────────────────────────────────────────────────────────
  // langCode: 'en' | 'hi' | 'te' — sets initial recognition language
  // onResult(transcript, detectedLang): called with the final transcript
  // onDetectedLang(code): optional — called when a different lang is detected
  const startListening = useCallback((langCode, onResult, onDetectedLang) => {
    if (!sttSupported) return;
    // Stop any existing session
    if (recognitionRef.current) {
      recognitionRef.current.abort();
    }

    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;

    const locale = LANG_LOCALE[langCode] || LANG_LOCALE.en;
    recognition.lang                = locale;
    recognition.continuous          = false;
    recognition.interimResults      = false;
    recognition.maxAlternatives     = 1;

    recognition.onstart = () => setIsListening(true);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript.trim();
      const detected   = detectLangFromText(transcript);

      if (detected && detected !== langCode && typeof onDetectedLang === 'function') {
        onDetectedLang(detected);
      }

      if (typeof onResult === 'function') {
        onResult(transcript, detected || langCode);
      }
    };

    recognition.onerror = (event) => {
      // 'no-speech' and 'aborted' are non-fatal — just stop silently
      if (event.error !== 'no-speech' && event.error !== 'aborted') {
        console.warn('[useSpeech] STT error:', event.error);
      }
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
      recognitionRef.current = null;
    };

    recognition.start();
  }, [sttSupported, SpeechRecognition]);

  // ── stopListening ───────────────────────────────────────────────────────────
  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.abort();
      recognitionRef.current = null;
    }
    setIsListening(false);
  }, []);

  // ── speak ────────────────────────────────────────────────────────────────────
  // Strips markdown symbols before speaking so the voice output is clean.
  const speak = useCallback((text, langCode = 'en') => {
    if (!ttsSupported || !text) return;
    const synth = synthRef.current;

    // Cancel any ongoing speech first
    synth.cancel();

    // Clean markdown
    const clean = text
      .replace(/\*\*(.*?)\*\*/g, '$1')   // **bold**
      .replace(/\*(.*?)\*/g, '$1')        // *italic*
      .replace(/^#{1,6}\s+/gm, '')        // headings
      .replace(/^[•\-]\s+/gm, '')         // bullet points
      .replace(/^\d+\.\s+/gm, '')         // numbered lists
      .replace(/🚨|⚠️|👋/g, '')           // emoji
      .replace(/\n{2,}/g, '. ')           // paragraph breaks → pause
      .replace(/\n/g, ' ')
      .trim();

    if (!clean) return;

    const locale   = LANG_LOCALE[langCode] || LANG_LOCALE.en;
    const utterance = new SpeechSynthesisUtterance(clean);
    utterance.lang  = locale;

    // Try to find a matching voice — voices may not be ready yet so we retry
    const assignVoice = () => {
      const v = pickVoice(locale);
      if (v) utterance.voice = v;
    };
    assignVoice();

    // Speech rate & pitch for natural sound
    utterance.rate  = langCode === 'en' ? 0.9 : 0.85;   // slightly slower for regional
    utterance.pitch = 1.0;
    utterance.volume = 1.0;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend   = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    synth.speak(utterance);
  }, [ttsSupported]);

  // ── stopSpeaking ─────────────────────────────────────────────────────────────
  const stopSpeaking = useCallback(() => {
    if (ttsSupported) {
      synthRef.current.cancel();
      setIsSpeaking(false);
    }
  }, [ttsSupported]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (recognitionRef.current) recognitionRef.current.abort();
      if (ttsSupported) synthRef.current.cancel();
    };
  }, [ttsSupported]);

  return {
    isListening,
    isSpeaking,
    sttSupported,
    ttsSupported,
    startListening,
    stopListening,
    speak,
    stopSpeaking,
  };
};

export default useSpeech;
