/**
 * translations.js — CarePath AI
 *
 * Centralised string pack for EN / HI / TE.
 * Keys used by t() via LanguageContext.
 *
 * Sections:
 *   nav           — Navbar labels
 *   auth          — Login / Register
 *   ai            — AI Assistant page (UI strings + health responses)
 *   dashboard     — User dashboard
 *   preventive    — Preventive Care page
 *   common        — Shared labels (online, clear, thinking…)
 */

// ─────────────────────────────────────────────────────────────────────────────
// ENGLISH
// ─────────────────────────────────────────────────────────────────────────────
const en = {
  nav: {
    home: 'Home',
    about: 'About',
    howItWorks: 'How It Works',
    contact: 'Contact',
    login: 'Log in',
    getStarted: 'Get Started',
    dashboard: 'Dashboard',
    signOut: 'Sign out',
  },
  common: {
    online: 'Online',
    clear: 'Clear',
    thinking: 'Thinking…',
    send: 'Send',
    language: 'Language',
    selectLanguage: 'Select Language',
    bookAppointment: 'Book appointment',
    findHospital: 'Find hospital',
    talkToExpert: 'Talk to expert',
    emergency: 'Emergency',
    carepathAI: 'CarePath AI',
  },
  ai: {
    title: 'AI Health Assistant',
    disclaimer: 'AI responses are for educational purposes only. Not a substitute for professional medical advice.',
    suggestedQuestions: 'Suggested questions:',
    inputPlaceholder: 'Ask a health question… (Enter to send)',
    chatCleared: 'Chat cleared! Ask me any health question to get started.',
    voiceTap: 'Tap to speak',
    voiceListening: 'Listening… speak now',
    voiceSpeaking: 'Speaking… tap to stop',
    voiceNotSupported: 'Voice not supported in this browser',
    voiceDetected: (lang) => `Language detected: ${lang}`,
    voiceReadAloud: 'Read aloud',
    voiceStop: 'Stop speaking',
    greeting: (name) => `Hello${name ? `, ${name}` : ''}! 👋 I'm CarePath AI, your personal health assistant.\n\nI can answer general health questions, explain symptoms, and guide you toward the right care. Remember, I'm here for **educational guidance only** — always consult a qualified healthcare professional for medical decisions.\n\nWhat health topic can I help you with today?`,
    fallback: (q) => `Thank you for your question. I understand you're asking about: **"${q}"**\n\nWhile I don't have a specific pre-loaded answer for this topic right now, here are some steps I recommend:\n\n1. **Check reliable sources** — NHS (nhs.uk), WHO (who.int), or Mayo Clinic (mayoclinic.org)\n2. **Consult a professional** — Book an appointment with a qualified healthcare provider via CarePath AI\n3. **Reach out to an expert** — Use our Expert Help section for specialist guidance\n\nIs there something more specific I can help you with from my knowledge base?`,
    suggestions: [
      'What are common symptoms of high blood pressure?',
      'How do I manage type 2 diabetes?',
      'What vaccinations should adults get?',
      'How can I improve my sleep quality?',
      'What are signs of a heart attack?',
      'How much water should I drink daily?',
    ],
    responses: [
      {
        keywords: ['blood pressure', 'hypertension', 'high blood pressure'],
        answer: `**High Blood Pressure (Hypertension)**\n\nCommon symptoms (often called the "silent killer" as many have none):\n• Headaches, especially in the morning\n• Dizziness or light-headedness\n• Blurred vision\n• Shortness of breath\n• Nosebleeds (in severe cases)\n\n**Normal range:** Below 120/80 mmHg\n**High:** 130/80 mmHg or above\n\n**What helps:**\n• Reduce salt intake\n• Regular exercise (150 min/week)\n• Limit alcohol\n• Quit smoking\n• Maintain healthy weight\n• Take prescribed medications consistently\n\n⚠️ Always consult your doctor for diagnosis and treatment.`,
      },
      {
        keywords: ['diabetes', 'blood sugar', 'glucose', 'type 2'],
        answer: `**Managing Type 2 Diabetes**\n\n**Lifestyle changes:**\n• Follow a low-glycaemic diet (whole grains, vegetables, lean protein)\n• Exercise regularly — even a 30-min walk lowers blood sugar\n• Monitor blood glucose as advised by your doctor\n• Maintain a healthy weight\n• Limit refined sugars and processed foods\n\n**Medication:** Take as prescribed — don't skip doses.\n\n**Regular checks:** HbA1c every 3 months, eye exams annually, foot checks.\n\n**Target HbA1c:** Usually below 7% (consult your doctor for your personal target).\n\n⚠️ Diabetes management is highly individual — always work with your healthcare team.`,
      },
      {
        keywords: ['vaccine', 'vaccination', 'immunisation', 'immunization', 'shot', 'flu'],
        answer: `**Adult Vaccination Schedule**\n\n**Annual:**\n• Influenza (flu) vaccine — every year\n\n**Every 10 years:**\n• Tdap (Tetanus, Diphtheria, Pertussis)\n\n**Recommended for adults:**\n• COVID-19 — primary series + boosters per current guidelines\n• Shingles (Zoster) — age 50+\n• Pneumococcal — age 65+ or high-risk\n• Hepatitis A & B — if not previously vaccinated\n• HPV — up to age 26 (26–45 with doctor advice)\n\n**Travel vaccines:** Depends on destination — consult a travel clinic.\n\n⚠️ Check with your doctor or pharmacist for the most current recommendations.`,
      },
      {
        keywords: ['sleep', 'insomnia', 'tired', 'fatigue', 'rest'],
        answer: `**Improving Sleep Quality**\n\n**Sleep hygiene tips:**\n• Keep a consistent sleep schedule (same time every day)\n• Make your bedroom dark, cool, and quiet\n• Avoid screens 1 hour before bed\n• Limit caffeine after 2 PM\n• Avoid large meals close to bedtime\n• Exercise regularly — but not too close to bedtime\n\n**Adults need:** 7–9 hours per night\n\n**Relaxation techniques:**\n• Deep breathing exercises\n• Progressive muscle relaxation\n• Meditation or mindfulness apps\n\n**When to see a doctor:** If you consistently can't sleep despite good habits, or if you snore loudly (possible sleep apnoea).\n\n⚠️ Chronic insomnia should be evaluated by a healthcare professional.`,
      },
      {
        keywords: ['heart attack', 'cardiac', 'chest pain', 'myocardial'],
        answer: `**⚠️ IMPORTANT: If you think someone is having a heart attack, call emergency services (999/911/112) immediately!**\n\n**Signs of a heart attack:**\n• Chest pain, pressure, squeezing, or tightness\n• Pain spreading to left arm, jaw, neck, or back\n• Shortness of breath\n• Nausea or vomiting\n• Cold sweats\n• Light-headedness or sudden dizziness\n• Unusual fatigue (especially in women)\n\n**Note:** Women may experience atypical symptoms — nausea, fatigue, jaw pain — without classic chest pain.\n\n**What to do:**\n1. Call emergency services immediately\n2. Chew 300mg aspirin if not allergic and available\n3. Sit or lie in a comfortable position\n4. Do NOT drive yourself to hospital\n5. Stay calm and wait for help\n\n🚨 This is a medical emergency. Do not delay.`,
      },
      {
        keywords: ['water', 'hydration', 'drink', 'hydrate', 'dehydration'],
        answer: `**Daily Water Intake**\n\n**General guidelines:**\n• Men: ~3.7 litres (15.5 cups) per day total\n• Women: ~2.7 litres (11.5 cups) per day total\n• About 80% from drinks, 20% from food\n\n**A simple rule:** 8 glasses (2 litres) per day is a good starting point.\n\n**You need more when:**\n• Exercising or in hot weather\n• Pregnant or breastfeeding\n• Ill with fever, vomiting, or diarrhoea\n• At high altitude\n\n**Signs of dehydration:**\n• Dark yellow urine\n• Dry mouth\n• Headache\n• Dizziness\n• Fatigue\n\n**Tip:** If your urine is pale yellow, you're well hydrated. Dark yellow means drink more.`,
      },
      {
        keywords: ['allergy', 'allergic', 'anaphylaxis', 'allergen'],
        answer: `**Managing Allergies**\n\n**Common triggers:**\n• Pollen, dust mites, pet dander, mould\n• Foods: nuts, shellfish, dairy, eggs, wheat\n• Medications: penicillin, aspirin, NSAIDs\n• Insect stings\n\n**Mild allergy management:**\n• Antihistamines (cetirizine, loratadine)\n• Avoid known triggers\n• Keep windows closed during high pollen season\n• Wash bedding in hot water weekly\n\n**Anaphylaxis (severe allergic reaction) — EMERGENCY:**\n• Difficulty breathing, swollen throat, rapid heart rate, faintness\n• 🚨 Use epinephrine auto-injector (EpiPen) if prescribed\n• 🚨 Call emergency services immediately\n\n⚠️ If you have known severe allergies, always carry your EpiPen and wear a medical alert bracelet.`,
      },
      {
        keywords: ['headache', 'migraine', 'head pain'],
        answer: `**Headaches & Migraines**\n\n**Common headache types:**\n• **Tension headache** — tight band around head, stress-related\n• **Migraine** — throbbing, often one-sided, with nausea/light sensitivity\n• **Cluster headache** — severe pain around one eye\n\n**Home remedies:**\n• Rest in a quiet, dark room\n• Apply cold or warm compress\n• Stay hydrated\n• Over-the-counter painkillers (ibuprofen, paracetamol)\n\n**Migraine triggers:** Stress, certain foods (cheese, chocolate, caffeine), hormonal changes, sleep disruption.\n\n**See a doctor if:**\n• Sudden severe "thunderclap" headache\n• Headache with fever, stiff neck, rash\n• Headache after head injury\n• Progressive worsening over days\n• Vision changes, weakness, or speech problems\n\n⚠️ Frequent headaches should be evaluated by a doctor.`,
      },
    ],
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// HINDI
// ─────────────────────────────────────────────────────────────────────────────
const hi = {
  nav: {
    home: 'होम',
    about: 'हमारे बारे में',
    howItWorks: 'यह कैसे काम करता है',
    contact: 'संपर्क करें',
    login: 'लॉग इन',
    getStarted: 'शुरू करें',
    dashboard: 'डैशबोर्ड',
    signOut: 'साइन आउट',
  },
  common: {
    online: 'ऑनलाइन',
    clear: 'साफ करें',
    thinking: 'सोच रहा है…',
    send: 'भेजें',
    language: 'भाषा',
    selectLanguage: 'भाषा चुनें',
    bookAppointment: 'अपॉइंटमेंट बुक करें',
    findHospital: 'अस्पताल खोजें',
    talkToExpert: 'विशेषज्ञ से बात करें',
    emergency: 'आपातकाल',
    carepathAI: 'CarePath AI',
  },
  ai: {
    title: 'AI स्वास्थ्य सहायक',
    disclaimer: 'AI के उत्तर केवल शैक्षिक उद्देश्यों के लिए हैं। यह पेशेवर चिकित्सा सलाह का विकल्प नहीं है।',
    suggestedQuestions: 'सुझाए गए प्रश्न:',
    inputPlaceholder: 'स्वास्थ्य संबंधी प्रश्न पूछें… (Enter दबाएं)',
    chatCleared: 'चैट साफ हो गई! कोई भी स्वास्थ्य प्रश्न पूछें।',
    voiceTap: 'बोलने के लिए टैप करें',
    voiceListening: 'सुन रहा है… अभी बोलें',
    voiceSpeaking: 'बोल रहा है… रोकने के लिए टैप करें',
    voiceNotSupported: 'इस ब्राउज़र में वॉइस समर्थित नहीं है',
    voiceDetected: (lang) => `भाषा पहचानी गई: ${lang}`,
    voiceReadAloud: 'ज़ोर से पढ़ें',
    voiceStop: 'बोलना बंद करें',
    greeting: (name) => `नमस्ते${name ? `, ${name}` : ''}! 👋 मैं CarePath AI हूँ, आपका व्यक्तिगत स्वास्थ्य सहायक।\n\nमैं सामान्य स्वास्थ्य प्रश्नों के उत्तर दे सकता हूँ, लक्षणों को समझा सकता हूँ और आपको सही देखभाल की ओर मार्गदर्शन कर सकता हूँ। याद रखें, मैं **केवल शैक्षिक मार्गदर्शन** के लिए हूँ — चिकित्सा निर्णयों के लिए हमेशा योग्य स्वास्थ्य पेशेवर से परामर्श करें।\n\nआज आप किस स्वास्थ्य विषय के बारे में जानना चाहते हैं?`,
    fallback: (q) => `आपके प्रश्न के लिए धन्यवाद। मैं समझता हूँ कि आप पूछ रहे हैं: **"${q}"**\n\nइस विषय पर मेरे पास अभी विशिष्ट उत्तर नहीं है, लेकिन मैं आपको कुछ कदम सुझाता हूँ:\n\n1. **विश्वसनीय स्रोत देखें** — WHO (who.int) या Mayo Clinic (mayoclinic.org)\n2. **पेशेवर से परामर्श करें** — CarePath AI के माध्यम से योग्य स्वास्थ्य प्रदाता से अपॉइंटमेंट बुक करें\n3. **विशेषज्ञ से संपर्क करें** — विशेषज्ञ सहायता अनुभाग का उपयोग करें\n\nक्या मैं आपकी किसी और विषय में मदद कर सकता हूँ?`,
    suggestions: [
      'उच्च रक्तचाप के सामान्य लक्षण क्या हैं?',
      'मधुमेह (Type 2) को कैसे नियंत्रित करें?',
      'वयस्कों को कौन से टीके लगवाने चाहिए?',
      'नींद की गुणवत्ता कैसे सुधारें?',
      'हार्ट अटैक के संकेत क्या हैं?',
      'रोजाना कितना पानी पीना चाहिए?',
    ],
    responses: [
      {
        keywords: ['रक्तचाप', 'ब्लड प्रेशर', 'हाइपरटेंशन', 'blood pressure', 'hypertension', 'high blood pressure'],
        answer: `**उच्च रक्तचाप (हाइपरटेंशन)**\n\nसामान्य लक्षण (इसे "साइलेंट किलर" भी कहा जाता है क्योंकि अक्सर कोई लक्षण नहीं होते):\n• सुबह सिरदर्द\n• चक्कर आना\n• धुंधली दृष्टि\n• सांस लेने में तकलीफ\n• नाक से खून आना (गंभीर मामलों में)\n\n**सामान्य रेंज:** 120/80 mmHg से नीचे\n**उच्च:** 130/80 mmHg या उससे अधिक\n\n**क्या मदद करता है:**\n• नमक कम खाएं\n• नियमित व्यायाम (प्रति सप्ताह 150 मिनट)\n• शराब सीमित करें\n• धूम्रपान छोड़ें\n• स्वस्थ वजन बनाए रखें\n• निर्धारित दवाइयाँ नियमित लें\n\n⚠️ निदान और उपचार के लिए हमेशा अपने डॉक्टर से परामर्श लें।`,
      },
      {
        keywords: ['मधुमेह', 'शुगर', 'ब्लड शुगर', 'diabetes', 'blood sugar', 'glucose', 'type 2'],
        answer: `**टाइप 2 मधुमेह का प्रबंधन**\n\n**जीवनशैली में बदलाव:**\n• कम ग्लाइसेमिक इंडेक्स वाला आहार लें (साबुत अनाज, सब्जियाँ, लीन प्रोटीन)\n• नियमित व्यायाम करें — 30 मिनट की सैर भी रक्त शर्करा कम करती है\n• डॉक्टर की सलाह अनुसार रक्त शर्करा मापें\n• स्वस्थ वजन बनाए रखें\n• परिष्कृत शक्कर और प्रसंस्कृत खाद्य पदार्थ सीमित करें\n\n**दवाइयाँ:** निर्धारित दवाइयाँ लें — खुराक न छोड़ें।\n\n**नियमित जाँच:** हर 3 महीने में HbA1c, सालाना आँखों की जाँच, पैरों की जाँच।\n\n⚠️ मधुमेह प्रबंधन व्यक्तिगत होता है — अपनी स्वास्थ्य टीम के साथ मिलकर काम करें।`,
      },
      {
        keywords: ['टीका', 'वैक्सीन', 'टीकाकरण', 'vaccine', 'vaccination', 'immunisation', 'immunization', 'flu'],
        answer: `**वयस्क टीकाकरण अनुसूची**\n\n**वार्षिक:**\n• इन्फ्लुएंजा (फ्लू) टीका — हर साल\n\n**हर 10 साल में:**\n• Tdap (टेटनस, डिप्थीरिया, पर्टुसिस)\n\n**वयस्कों के लिए अनुशंसित:**\n• COVID-19 — प्राथमिक श्रृंखला + बूस्टर\n• हेपेटाइटिस A और B\n• HPV — 26 वर्ष की आयु तक\n\n**यात्रा टीके:** गंतव्य पर निर्भर — यात्रा क्लिनिक से परामर्श लें।\n\n⚠️ नवीनतम सिफारिशों के लिए अपने डॉक्टर या फार्मासिस्ट से जाँचें।`,
      },
      {
        keywords: ['नींद', 'अनिद्रा', 'थकान', 'sleep', 'insomnia', 'tired', 'fatigue', 'rest'],
        answer: `**नींद की गुणवत्ता सुधारना**\n\n**नींद स्वच्छता सुझाव:**\n• एक नियमित नींद कार्यक्रम बनाए रखें (हर दिन एक ही समय)\n• शयनकक्ष को अंधेरा, ठंडा और शांत रखें\n• सोने से 1 घंटे पहले स्क्रीन से बचें\n• दोपहर 2 बजे के बाद कैफीन सीमित करें\n• सोने से पहले भारी भोजन से बचें\n\n**वयस्कों को चाहिए:** प्रति रात 7–9 घंटे\n\n**विश्राम तकनीक:**\n• गहरी साँस लेने के व्यायाम\n• ध्यान या माइंडफुलनेस\n\n⚠️ पुरानी अनिद्रा का मूल्यांकन स्वास्थ्य पेशेवर द्वारा किया जाना चाहिए।`,
      },
      {
        keywords: ['दिल का दौरा', 'हार्ट अटैक', 'सीने में दर्द', 'heart attack', 'cardiac', 'chest pain', 'myocardial'],
        answer: `**⚠️ महत्वपूर्ण: अगर आपको लगता है कि किसी को दिल का दौरा पड़ रहा है, तो तुरंत आपातकालीन सेवाओं को कॉल करें (112)!**\n\n**दिल के दौरे के संकेत:**\n• सीने में दर्द, दबाव, या जकड़न\n• दर्द बाएं हाथ, जबड़े, गर्दन या पीठ तक फैलना\n• सांस लेने में तकलीफ\n• मतली या उल्टी\n• ठंडा पसीना\n• अचानक चक्कर आना\n\n**क्या करें:**\n1. तुरंत आपातकालीन सेवाओं को कॉल करें\n2. यदि एलर्जी न हो तो 300mg एस्पिरिन चबाएं\n3. आरामदायक स्थिति में बैठें या लेटें\n4. खुद गाड़ी चलाकर अस्पताल न जाएं\n\n🚨 यह चिकित्सा आपातकाल है। देरी न करें।`,
      },
      {
        keywords: ['पानी', 'हाइड्रेशन', 'पीना', 'water', 'hydration', 'drink', 'hydrate', 'dehydration'],
        answer: `**दैनिक जल सेवन**\n\n**सामान्य दिशानिर्देश:**\n• पुरुष: प्रतिदिन ~3.7 लीटर\n• महिलाएं: प्रतिदिन ~2.7 लीटर\n\n**एक सरल नियम:** प्रतिदिन 8 गिलास (2 लीटर) एक अच्छा शुरुआती बिंदु है।\n\n**आपको अधिक चाहिए जब:**\n• व्यायाम करते समय या गर्म मौसम में\n• गर्भावस्था या स्तनपान के दौरान\n• बुखार, उल्टी या दस्त होने पर\n\n**निर्जलीकरण के संकेत:**\n• गहरे पीले रंग का मूत्र\n• शुष्क मुँह\n• सिरदर्द\n• चक्कर आना\n\n**सुझाव:** यदि मूत्र हल्का पीला है तो आप अच्छी तरह हाइड्रेटेड हैं।`,
      },
      {
        keywords: ['एलर्जी', 'allergy', 'allergic', 'anaphylaxis', 'allergen'],
        answer: `**एलर्जी प्रबंधन**\n\n**सामान्य ट्रिगर:**\n• पराग, धूल के कण, पालतू जानवरों की रूसी\n• खाद्य पदार्थ: मेवे, शेलफिश, डेयरी, अंडे, गेहूं\n• दवाइयाँ: पेनिसिलिन, एस्पिरिन\n• कीट के डंक\n\n**हल्की एलर्जी प्रबंधन:**\n• एंटीहिस्टामाइन (सेटिरिजिन, लोराटाडिन)\n• ज्ञात ट्रिगर से बचें\n\n**एनाफिलेक्सिस (गंभीर एलर्जी प्रतिक्रिया) — आपातकाल:**\n• सांस लेने में कठिनाई, गला सूजना\n• 🚨 यदि निर्धारित हो तो एपिनेफ्रिन ऑटो-इंजेक्टर का उपयोग करें\n• 🚨 तुरंत आपातकालीन सेवाओं को कॉल करें\n\n⚠️ यदि आपको गंभीर एलर्जी है तो हमेशा अपना EpiPen साथ रखें।`,
      },
      {
        keywords: ['सिरदर्द', 'माइग्रेन', 'headache', 'migraine', 'head pain'],
        answer: `**सिरदर्द और माइग्रेन**\n\n**सामान्य सिरदर्द के प्रकार:**\n• **तनाव सिरदर्द** — सिर के चारों ओर कसाव, तनाव से संबंधित\n• **माइग्रेन** — धड़कता दर्द, अक्सर एक तरफ, मतली/प्रकाश संवेदनशीलता के साथ\n• **क्लस्टर सिरदर्द** — एक आँख के आसपास तीव्र दर्द\n\n**घरेलू उपचार:**\n• शांत, अंधेरे कमरे में आराम करें\n• ठंडा या गर्म सेक लगाएं\n• हाइड्रेटेड रहें\n• ओवर-द-काउंटर दर्द निवारक (इबुप्रोफेन, पैरासिटामोल)\n\n**डॉक्टर से मिलें यदि:**\n• अचानक तीव्र "थंडरक्लैप" सिरदर्द\n• बुखार, गर्दन में अकड़न के साथ सिरदर्द\n• दृष्टि में बदलाव, कमजोरी\n\n⚠️ बार-बार होने वाले सिरदर्द का डॉक्टर द्वारा मूल्यांकन किया जाना चाहिए।`,
      },
    ],
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// TELUGU
// ─────────────────────────────────────────────────────────────────────────────
const te = {
  nav: {
    home: 'హోమ్',
    about: 'మా గురించి',
    howItWorks: 'ఇది ఎలా పనిచేస్తుంది',
    contact: 'సంప్రదించండి',
    login: 'లాగిన్',
    getStarted: 'ప్రారంభించండి',
    dashboard: 'డ్యాష్‌బోర్డ్',
    signOut: 'సైన్ అవుట్',
  },
  common: {
    online: 'ఆన్‌లైన్',
    clear: 'క్లియర్',
    thinking: 'ఆలోచిస్తోంది…',
    send: 'పంపు',
    language: 'భాష',
    selectLanguage: 'భాష ఎంచుకోండి',
    bookAppointment: 'అపాయింట్‌మెంట్ బుక్ చేయండి',
    findHospital: 'ఆసుపత్రి కనుగొనండి',
    talkToExpert: 'నిపుణుడితో మాట్లాడండి',
    emergency: 'అత్యవసరం',
    carepathAI: 'CarePath AI',
  },
  ai: {
    title: 'AI ఆరోగ్య సహాయకుడు',
    disclaimer: 'AI సమాధానాలు కేవలం విద్యా ప్రయోజనాల కోసం మాత్రమే. ఇవి వృత్తిపరమైన వైద్య సలహాకు ప్రత్యామ్నాయం కాదు.',
    suggestedQuestions: 'సూచించిన ప్రశ్నలు:',
    inputPlaceholder: 'ఆరోగ్య ప్రశ్న అడగండి… (Enter నొక్కండి)',
    chatCleared: 'చాట్ క్లియర్ అయింది! ఏదైనా ఆరోగ్య ప్రశ్న అడగండి.',
    voiceTap: 'మాట్లాడటానికి నొక్కండి',
    voiceListening: 'వింటున్నాను… ఇప్పుడు మాట్లాడండి',
    voiceSpeaking: 'మాట్లాడుతోంది… ఆపడానికి నొక్కండి',
    voiceNotSupported: 'ఈ బ్రౌజర్‌లో వాయిస్ మద్దతు లేదు',
    voiceDetected: (lang) => `భాష గుర్తించబడింది: ${lang}`,
    voiceReadAloud: 'బిగ్గరగా చదవండి',
    voiceStop: 'మాట్లాడడం ఆపండి',
    greeting: (name) => `నమస్కారం${name ? `, ${name}` : ''}! 👋 నేను CarePath AI, మీ వ్యక్తిగత ఆరోగ్య సహాయకుడిని.\n\nనేను సాధారణ ఆరోగ్య ప్రశ్నలకు సమాధానం ఇవ్వగలను, లక్షణాలను వివరించగలను మరియు మీకు సరైన సంరక్షణ వైపు మార్గనిర్దేశం చేయగలను. గుర్తుంచుకోండి, నేను **విద్యా మార్గదర్శకత్వం కోసం మాత్రమే** — వైద్య నిర్ణయాల కోసం ఎల్లప్పుడూ అర్హులైన ఆరోగ్య నిపుణుడిని సంప్రదించండి.\n\nఈరోజు మీకు ఏ ఆరోగ్య విషయంలో సహాయం కావాలి?`,
    fallback: (q) => `మీ ప్రశ్నకు ధన్యవాదాలు. మీరు అడుగుతున్నది నాకు అర్థమైంది: **"${q}"**\n\nఈ విషయంపై నా వద్ద నిర్దిష్ట సమాధానం లేదు, కానీ కొన్ని సూచనలు:\n\n1. **నమ్మకమైన వనరులను తనిఖీ చేయండి** — WHO (who.int) లేదా Mayo Clinic (mayoclinic.org)\n2. **నిపుణుడిని సంప్రదించండి** — CarePath AI ద్వారా అర్హులైన ఆరోగ్య సేవా ప్రదాతను అపాయింట్‌మెంట్ బుక్ చేయండి\n3. **నిపుణుడిని సంప్రదించండి** — నిపుణుల సహాయ విభాగాన్ని ఉపయోగించండి\n\nమీకు మరింత సహాయం చేయగలనా?`,
    suggestions: [
      'అధిక రక్తపోటు సాధారణ లక్షణాలు ఏమిటి?',
      'టైప్ 2 డయాబెటీస్‌ను ఎలా నిర్వహించాలి?',
      'పెద్దలకు ఏ టీకాలు వేయించుకోవాలి?',
      'నిద్ర నాణ్యతను ఎలా మెరుగుపరచాలి?',
      'గుండె పోటు సంకేతాలు ఏమిటి?',
      'రోజువారీ ఎంత నీళ్ళు తాగాలి?',
    ],
    responses: [
      {
        keywords: ['రక్తపోటు', 'బీపీ', 'హైపర్టెన్షన్', 'blood pressure', 'hypertension', 'high blood pressure'],
        answer: `**అధిక రక్తపోటు (హైపర్టెన్షన్)**\n\nసాధారణ లక్షణాలు (దీన్ని "సైలెంట్ కిల్లర్" అంటారు ఎందుకంటే చాలా మందికి లక్షణాలు ఉండవు):\n• ఉదయం తలనొప్పి\n• తలతిరగడం\n• మసకబారిన దృష్టి\n• శ్వాస తీసుకోవడంలో ఇబ్బంది\n• ముక్కు రక్తస్రావం (తీవ్రమైన సందర్భాలలో)\n\n**సాధారణ పరిధి:** 120/80 mmHg కంటే తక్కువ\n**అధికం:** 130/80 mmHg లేదా అంతకు మించి\n\n**ఏమి సహాయపడుతుంది:**\n• ఉప్పు తీసుకోవడం తగ్గించండి\n• క్రమం తప్పకుండా వ్యాయామం (వారానికి 150 నిమిషాలు)\n• మద్యపానం పరిమితం చేయండి\n• ధూమపానం మానుకోండి\n• ఆరోగ్యకరమైన బరువు నిర్వహించండి\n• సూచించిన మందులు క్రమం తప్పకుండా తీసుకోండి\n\n⚠️ రోగ నిర్ధారణ మరియు చికిత్స కోసం ఎల్లప్పుడూ మీ వైద్యుడిని సంప్రదించండి.`,
      },
      {
        keywords: ['డయాబెటీస్', 'మధుమేహం', 'చక్కెర', 'రక్తంలో చక్కెర', 'diabetes', 'blood sugar', 'glucose', 'type 2'],
        answer: `**టైప్ 2 డయాబెటీస్ నిర్వహణ**\n\n**జీవనశైలి మార్పులు:**\n• తక్కువ గ్లైసెమిక్ ఇండెక్స్ ఆహారం (తృణధాన్యాలు, కూరగాయలు, లీన్ ప్రోటీన్)\n• క్రమం తప్పకుండా వ్యాయామం — 30 నిమిషాల నడక కూడా రక్తంలో చక్కెరను తగ్గిస్తుంది\n• వైద్యుని సలహా మేరకు రక్తంలో గ్లూకోజ్ పర్యవేక్షించండి\n• ఆరోగ్యకరమైన బరువు నిర్వహించండి\n• శుద్ధి చేసిన చక్కెరలు మరియు ప్రాసెస్ చేసిన ఆహారాలు పరిమితం చేయండి\n\n**మందులు:** సూచించిన విధంగా తీసుకోండి — డోసులు దాటకండి.\n\n**క్రమం తప్పకుండా పరీక్షలు:** ప్రతి 3 నెలలకు HbA1c, వార్షికంగా కళ్ళ పరీక్ష, పాద పరీక్ష.\n\n⚠️ డయాబెటీస్ నిర్వహణ వ్యక్తిగతంగా ఉంటుంది — మీ ఆరోగ్య బృందంతో కలసి పని చేయండి.`,
      },
      {
        keywords: ['టీకా', 'వ్యాక్సిన్', 'vaccine', 'vaccination', 'immunisation', 'immunization', 'flu'],
        answer: `**పెద్దల టీకా షెడ్యూల్**\n\n**వార్షిక:**\n• ఇన్‌ఫ్లుఎంజా (ఫ్లూ) టీకా — ప్రతి సంవత్సరం\n\n**ప్రతి 10 సంవత్సరాలకు:**\n• Tdap (టెటనస్, డిఫ్తీరియా, పెర్టుసిస్)\n\n**పెద్దలకు సిఫార్సు చేయబడింది:**\n• COVID-19 — ప్రాథమిక శ్రేణి + బూస్టర్లు\n• హెపటైటిస్ A & B\n• HPV — 26 సంవత్సరాల వయసు వరకు\n\n⚠️ తాజా సిఫార్సుల కోసం మీ వైద్యుడిని లేదా ఫార్మసిస్ట్‌ను తనిఖీ చేయండి.`,
      },
      {
        keywords: ['నిద్ర', 'అనిద్ర', 'అలసట', 'sleep', 'insomnia', 'tired', 'fatigue', 'rest'],
        answer: `**నిద్ర నాణ్యత మెరుగుపరచడం**\n\n**నిద్ర పరిశుభ్రత చిట్కాలు:**\n• క్రమమైన నిద్ర షెడ్యూల్ పాటించండి (ప్రతి రోజూ ఒకే సమయం)\n• పడకగదిని చీకటిగా, చల్లగా మరియు నిశ్శబ్దంగా ఉంచండి\n• పడుకోవడానికి 1 గంట ముందు స్క్రీన్‌లు మానుకోండి\n• మధ్యాహ్నం 2 గంటల తర్వాత కెఫిన్ పరిమితం చేయండి\n• పడుకోవడానికి ముందు భారీ భోజనం తినకండి\n\n**పెద్దలకు అవసరం:** రాత్రికి 7–9 గంటలు\n\n**విశ్రాంతి పద్ధతులు:**\n• లోతైన శ్వాస వ్యాయామాలు\n• ధ్యానం లేదా మైండ్‌ఫుల్‌నెస్\n\n⚠️ దీర్ఘకాలిక అనిద్రను ఆరోగ్య నిపుణుడు మూల్యాంకనం చేయాలి.`,
      },
      {
        keywords: ['గుండె పోటు', 'గుండె నొప్పి', 'heart attack', 'cardiac', 'chest pain', 'myocardial'],
        answer: `**⚠️ ముఖ్యం: ఎవరికైనా గుండె పోటు వస్తున్నదని మీకు అనిపిస్తే, వెంటనే అత్యవసర సేవలకు కాల్ చేయండి (112)!**\n\n**గుండె పోటు సంకేతాలు:**\n• ఛాతీలో నొప్పి, ఒత్తిడి, లేదా బిగుతు\n• నొప్పి ఎడమ చేయి, దవడ, మెడ లేదా వీపుకు వ్యాపించడం\n• శ్వాస తీసుకోవడంలో ఇబ్బంది\n• వికారం లేదా వాంతులు\n• చల్లని చెమట\n• అకస్మాత్తుగా తలతిరగడం\n\n**ఏమి చేయాలి:**\n1. వెంటనే అత్యవసర సేవలకు కాల్ చేయండి\n2. అలర్జీ లేకుంటే 300mg ఆస్పిరిన్ నమలండి\n3. సౌకర్యవంతమైన స్థితిలో కూర్చోండి లేదా పడుకోండి\n4. స్వయంగా ఆసుపత్రికి డ్రైవ్ చేయకండి\n\n🚨 ఇది వైద్య అత్యవసర పరిస్థితి. ఆలస్యం చేయకండి.`,
      },
      {
        keywords: ['నీళ్ళు', 'నీరు', 'హైడ్రేషన్', 'water', 'hydration', 'drink', 'hydrate', 'dehydration'],
        answer: `**రోజువారీ నీటి తీసుకోవడం**\n\n**సాధారణ మార్గదర్శకాలు:**\n• పురుషులు: రోజుకు ~3.7 లీటర్లు\n• మహిళలు: రోజుకు ~2.7 లీటర్లు\n\n**సులభమైన నియమం:** రోజుకు 8 గ్లాసులు (2 లీటర్లు) ఒక మంచి ప్రారంభ స్థానం.\n\n**మీకు ఎక్కువ అవసరం అవుతుంది:**\n• వ్యాయామం చేస్తున్నప్పుడు లేదా వేడి వాతావరణంలో\n• గర్భం లేదా తల్లి పాల సమయంలో\n• జ్వరం, వాంతులు లేదా విరేచనాలతో\n\n**నిర్జలీకరణ సంకేతాలు:**\n• ముదురు పసుపు మూత్రం\n• నోరు ఆరిపోవడం\n• తలనొప్పి\n• తలతిరగడం\n\n**చిట్కా:** మూత్రం లేత పసుపు రంగులో ఉంటే మీరు బాగా హైడ్రేటెడ్‌గా ఉన్నారు.`,
      },
      {
        keywords: ['అలర్జీ', 'allergy', 'allergic', 'anaphylaxis', 'allergen'],
        answer: `**అలర్జీ నిర్వహణ**\n\n**సాధారణ ట్రిగ్గర్‌లు:**\n• పుప్పొడి, దుమ్ము పురుగులు, పెంపుడు జంతువుల చర్మపు పొలుసులు\n• ఆహారాలు: గింజలు, షెల్‌ఫిష్, పాలు, గుడ్లు, గోధుమలు\n• మందులు: పెన్సిలిన్, ఆస్పిరిన్\n• కీటకాల కుట్లు\n\n**తేలికపాటి అలర్జీ నిర్వహణ:**\n• యాంటీహిస్టమైన్‌లు (సెటిరిజిన్, లోరాటడిన్)\n• తెలిసిన ట్రిగ్గర్‌లను నివారించండి\n\n**అనాఫైలాక్సిస్ (తీవ్రమైన అలర్జీ ప్రతిచర్య) — అత్యవసరం:**\n• శ్వాస తీసుకోవడంలో ఇబ్బంది, గొంతు వాపు\n• 🚨 సూచించినట్లయితే ఎపినెఫ్రిన్ ఆటో-ఇంజెక్టర్ ఉపయోగించండి\n• 🚨 వెంటనే అత్యవసర సేవలకు కాల్ చేయండి\n\n⚠️ తీవ్రమైన అలర్జీలు ఉంటే ఎల్లప్పుడూ EpiPen తీసుకెళ్ళండి.`,
      },
      {
        keywords: ['తలనొప్పి', 'మైగ్రేన్', 'headache', 'migraine', 'head pain'],
        answer: `**తలనొప్పి మరియు మైగ్రేన్**\n\n**సాధారణ తలనొప్పి రకాలు:**\n• **టెన్షన్ తలనొప్పి** — తల చుట్టూ బిగుతు, ఒత్తిడి వల్ల\n• **మైగ్రేన్** — కొట్టుకునే నొప్పి, తరచుగా ఒక వైపు, వికారం/వెలుతురు సున్నితత్వంతో\n• **క్లస్టర్ తలనొప్పి** — ఒక కంటి చుట్టూ తీవ్రమైన నొప్పి\n\n**ఇంటి నివారణలు:**\n• నిశ్శబ్దంగా, చీకటి గదిలో విశ్రాంతి తీసుకోండి\n• చల్లని లేదా వేడి కాంప్రెస్ వేయండి\n• హైడ్రేటెడ్‌గా ఉండండి\n• OTC నొప్పి నివారకాలు (ఇబుప్రోఫెన్, పారాసిటమాల్)\n\n**వైద్యుడిని చూడండి:**\n• అకస్మాత్తుగా తీవ్రమైన తలనొప్పి\n• జ్వరం, మెడ దృఢత్వంతో తలనొప్పి\n• దృష్టి మార్పులు, బలహీనత\n\n⚠️ తరచుగా వచ్చే తలనొప్పులను వైద్యుడు మూల్యాంకనం చేయాలి.`,
      },
    ],
  },
};

export const TRANSLATIONS = { en, hi, te };
