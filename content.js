/* ==================================================================
   ALL THE WORDING, DATES AND VENUES LIVE IN THIS ONE FILE
   Both pages (/main and /guest) read it. Edit here, nothing else.
   Languages: mr = Marathi, en = English, hi = Hindi
   ================================================================== */
window.INVITE = {

  /* Wedding start, used by the countdown (2026-12-06, 7:30 PM India time).
     If the wedding is in the morning, change 19:30 to 07:30. */
  weddingISO: "2026-12-06T19:30:00+05:30",

  /* Language rotation: Marathi, then English, then Hindi, every 10 seconds */
  order: ["mr", "en", "hi"],
  rotateMs: 10000,

  /* Which events each page shows */
  pages: {
    main:  ["haldi", "sangeet", "wedding", "reception"],   // close family and friends
    guest: ["wedding", "reception"]                        // all other guests
  },

  /* WhatsApp number for the RSVP button, with country code and no + or spaces
     (example: "919876543210"). Leave empty to hide the RSVP section. */
  rsvpPhone: "",

  /* ---------------------------- EVENTS ---------------------------- */
  events: {

    haldi: {
      title: { mr: "हळद", en: "Haldi", hi: "हल्दी" },
      date:  { mr: "शनिवार, ५ डिसेंबर २०२६", en: "Saturday, 5 December 2026", hi: "शनिवार, ५ दिसंबर २०२६" },
      time:  { mr: "दुपारी ते सायंकाळी ६ वाजेपर्यंत", en: "Afternoon till 6:00 PM", hi: "दोपहर से शाम ६ बजे तक" },
      venue: { mr: "आमचे निवासस्थान", en: "Our home", hi: "हमारा निवास स्थान" },
      map: ""
    },

    sangeet: {
      title: { mr: "संगीत संध्या", en: "Sangeet", hi: "संगीत संध्या" },
      date:  { mr: "शनिवार, ५ डिसेंबर २०२६", en: "Saturday, 5 December 2026", hi: "शनिवार, ५ दिसंबर २०२६" },
      time:  { mr: "सायंकाळी, हळदीनंतर", en: "Evening, after Haldi", hi: "शाम, हल्दी के बाद" },
      venue: { mr: "आमचे निवासस्थान", en: "Our home", hi: "हमारा निवास स्थान" },
      map: ""
    },

    wedding: {
      title: { mr: "शुभविवाह", en: "Wedding", hi: "शुभ विवाह" },
      date:  { mr: "रविवार, ६ डिसेंबर २०२६", en: "Sunday, 6 December 2026", hi: "रविवार, ६ दिसंबर २०२६" },
      time:  { mr: "सायंकाळी ७:३० वाजता", en: "7:30 PM", hi: "शाम ७:३० बजे" },
      venue: { mr: "श्री राम रिसॉर्ट, तुमसर", en: "Shree Ram Resort, Tumsar", hi: "श्री राम रिसॉर्ट, तुमसर" },
      map: "https://www.google.com/maps/place/Shree+Ram+Resort/@21.3552936,79.7092321,17z/data=!4m9!3m8!1s0x3a2b230001a563b7:0x4e19f1251ca8193e!5m2!4m1!1i2!8m2!3d21.3552936!4d79.711807!16s%2Fg%2F11y3mwjn7y?entry=ttu&g_ep=EgoyMDI2MDkzMC4wIKXMDSoASAFQAw%3D%3D"
    },

    reception: {
      title: { mr: "स्वागत समारंभ", en: "Reception", hi: "स्वागत समारोह" },
      date:  { mr: "सोमवार, ७ डिसेंबर २०२६", en: "Monday, 7 December 2026", hi: "सोमवार, ७ दिसंबर २०२६" },
      time:  { mr: "सायंकाळी ७:३० ते रात्री ११:३०", en: "7:30 PM to 11:30 PM", hi: "शाम ७:३० से रात ११:३० बजे तक" },
      venue: { mr: "शंतनू लॉन, चंद्रपूर", en: "Shantanu Lawn, Chandrapur", hi: "शांतनु लॉन, चंद्रपुर" },
      /* a Google Maps search link; paste the exact place link here when you have it */
      map: "https://www.google.com/maps/search/?api=1&query=Shantanu+Lawn+Chandrapur"
    }
  },

  /* ------------------------- PAGE TEXT ------------------------- */
  ui: {

    mr: {
      tap:        "टॅप करा · Tap to open",
      eyebrow:    "सस्नेह निमंत्रण",
      namesHTML:  "चेतन <span>&amp;</span> मोनिका",
      heroDate:   "६ डिसेंबर २०२६",
      scroll:     "खाली स्क्रोल करा ↓",
      countTitle: "लग्नाला उरलेला वेळ",
      days: "दिवस", hours: "तास", mins: "मिनिटे", secs: "सेकंद",
      inviteTitle: "शुभविवाह निमंत्रण",
      inviteBody:  "वडीलधाऱ्यांच्या आशीर्वादाने आणि कुटुंबीयांच्या प्रेमाने चि. चेतन आणि चि. सौ. कां. मोनिका यांचा शुभविवाह संपन्न होत आहे. या मंगल प्रसंगी आपण उपस्थित राहून वधू-वरांना आशीर्वाद द्यावेत, ही नम्र विनंती.",
      celebTitle:  "कार्यक्रम",
      celebSubMain:  "सर्व कार्यक्रमांसाठी आपणास सस्नेह आमंत्रण",
      celebSubGuest: "शुभविवाह व स्वागत समारंभासाठी आपणास सस्नेह आमंत्रण",
      mapLabel:    "गूगल मॅपवर पहा",
      rsvpTitle:   "आपले येणे कळवा",
      rsvpBtn:     "व्हॉट्सॲपवर कळवा",
      rsvpMsg:     "नमस्कार! आम्ही कार्यक्रमाला उपस्थित राहू.",
      closing:     "आपली उपस्थिती आणि आशीर्वाद हीच आमच्यासाठी सर्वात मोठी भेट."
    },

    en: {
      tap:        "टॅप करा · Tap to open",
      eyebrow:    "With the blessings of our families",
      namesHTML:  "Chetan <span>&amp;</span> Monika",
      heroDate:   "6 December 2026",
      scroll:     "Scroll down ↓",
      countTitle: "Counting down to our big day",
      days: "Days", hours: "Hours", mins: "Mins", secs: "Secs",
      inviteTitle: "You are invited",
      inviteBody:  "With the blessings of our elders and the love of our families, the wedding of Chetan and Monika will be solemnised. We warmly invite you to join us and bless the couple on this auspicious occasion.",
      celebTitle:  "Celebrations",
      celebSubMain:  "Join us for all the celebrations",
      celebSubGuest: "Join us for the wedding and the reception",
      mapLabel:    "View on Google Maps",
      rsvpTitle:   "Will you join us?",
      rsvpBtn:     "RSVP on WhatsApp",
      rsvpMsg:     "Hello! We will be attending the celebrations.",
      closing:     "Your presence and blessings are the greatest gift."
    },

    hi: {
      tap:        "टॅप करा · Tap to open",
      eyebrow:    "सादर आमंत्रण",
      namesHTML:  "चेतन <span>&amp;</span> मोनिका",
      heroDate:   "६ दिसंबर २०२६",
      scroll:     "नीचे स्क्रॉल करें ↓",
      countTitle: "विवाह में शेष समय",
      days: "दिन", hours: "घंटे", mins: "मिनट", secs: "सेकंड",
      inviteTitle: "विवाह निमंत्रण",
      inviteBody:  "बड़ों के आशीर्वाद और परिवारजनों के स्नेह से चि. चेतन एवं चि. मोनिका का शुभ विवाह संपन्न होने जा रहा है। इस मंगल अवसर पर आप सपरिवार पधारकर वर-वधू को आशीर्वाद प्रदान करें, यही विनम्र निवेदन है।",
      celebTitle:  "कार्यक्रम",
      celebSubMain:  "सभी कार्यक्रमों में आपका हार्दिक स्वागत है",
      celebSubGuest: "विवाह एवं स्वागत समारोह में आपका हार्दिक स्वागत है",
      mapLabel:    "गूगल मैप पर देखें",
      rsvpTitle:   "कृपया अपनी उपस्थिति बताएँ",
      rsvpBtn:     "व्हाट्सऐप पर बताएँ",
      rsvpMsg:     "नमस्कार! हम कार्यक्रम में उपस्थित रहेंगे।",
      closing:     "आपकी उपस्थिति और आशीर्वाद ही हमारे लिए सबसे बड़ा उपहार है।"
    }
  }
};
