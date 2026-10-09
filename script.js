/* ==================================================================
   Wedding invitation script. Five small jobs:
   1. Cover doors   open on tap, or by themselves after 5 seconds
   2. Countdown     counts down to the wedding date
   3. Scroll reveal fades sections in as you scroll
   4. Music         optional background music and an on/off button
   5. Languages     reads data/content.json and rotates Marathi,
                    English, Hindi. If the file cannot be loaded, the
                    English text already written in index.html stays.
   ================================================================== */
(function () {
  "use strict";
  window.inviteReady = true;        // tells index.html the script is running (else it shows the plain English page)

  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };

  var lang = "en";                  // language on screen now
  var weddingDate = new Date($("#countdown").getAttribute("data-date")).getTime();
  var SWAP_MS = 900;                // fade-out time before the text changes (same as .fx in style.css)
  var DEVANAGARI = "०१२३४५६७८९";

  /* ---------- 1. cover doors ---------- */
  var gate = $("#gate");
  var gateReady = false, gateOpened = false, autoOpenTimer;
  var onOpen = function () {};      // set below: starts the language rotation

  function showGate() {
    if (gateReady) return;
    gateReady = true;
    gate.classList.add("ready");
    autoOpenTimer = setTimeout(openGate, 5000);       // auto-open after 5 seconds
  }

  function openGate() {
    if (gateOpened) return;
    gateOpened = true;
    showGate();
    clearTimeout(autoOpenTimer);
    gate.classList.add("open");
    document.body.classList.remove("locked");
    document.body.classList.add("opened");
    onOpen();
    playMusic();
    setTimeout(function () { gate.remove(); }, 3600);
  }

  gate.addEventListener("click", openGate);
  gate.addEventListener("keydown", function (e) {
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openGate(); }
  });

  // show the doors once their pictures are ready (or after 4 seconds at most)
  Promise.all($$("img", gate).map(function (img) {
    return img.decode ? img.decode().catch(function () {}) : Promise.resolve();
  })).then(showGate);
  setTimeout(showGate, 4000);

  /* ---------- 2. countdown ---------- */
  function number(n) {              // Marathi and Hindi use Devanagari digits
    n = String(n);
    return lang === "en" ? n : n.replace(/\d/g, function (d) { return DEVANAGARI.charAt(d); });
  }

  function tick() {
    var s = Math.max(0, Math.floor((weddingDate - Date.now()) / 1000));
    $("#d").textContent = number(Math.floor(s / 86400));
    $("#h").textContent = number(Math.floor((s % 86400) / 3600));
    $("#m").textContent = number(Math.floor((s % 3600) / 60));
    $("#s").textContent = number(s % 60);
  }
  tick();
  setInterval(tick, 1000);

  /* ---------- 3. scroll reveal ---------- */
  var reveal = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) { entry.target.classList.add("show"); reveal.unobserve(entry.target); }
    });
  }, { threshold: 0.15 });
  $$(".reveal").forEach(function (el) { reveal.observe(el); });

  /* ---------- 4. music (optional: needs music/invitation.mp3) ---------- */
  var music = $("#music");
  var musicBtn = $("#musicBtn");
  var musicWanted = true;           // becomes false once the visitor switches it off

  function playMusic() {
    if (!music || !musicWanted || !music.paused) return;
    var p = music.play();
    if (p && p.catch) p.catch(function () {         // browser wants a tap first
      var again = function () { playMusic(); };
      document.addEventListener("pointerdown", again, { once: true });
      document.addEventListener("keydown", again, { once: true });
    });
  }

  if (music && musicBtn) {
    music.addEventListener("loadedmetadata", function () { musicBtn.hidden = false; });  // file exists
    music.addEventListener("play", function () { musicBtn.classList.add("on"); musicBtn.setAttribute("aria-pressed", "true"); });
    music.addEventListener("pause", function () { musicBtn.classList.remove("on"); musicBtn.setAttribute("aria-pressed", "false"); });
    musicBtn.addEventListener("click", function () {
      musicWanted = music.paused;
      if (music.paused) music.play().catch(function () {}); else music.pause();
    });
  }

  /* ---------- 5. languages ---------- */
  fetch("data/content.json", { cache: "no-cache" })
    .then(function (response) {
      if (!response.ok) throw new Error("HTTP " + response.status);
      return response.json();
    })
    .then(startLanguages)
    .catch(function (err) {
      // Nothing to do: the English text in index.html simply stays.
      if (window.console) console.warn("data/content.json not loaded, showing English.", err);
    });

  function startLanguages(data) {
    var languages = data.languages;
    var position = 0;
    var timer = null;
    var rotating = false;
    var bar = $("#langbar");
    var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (data.weddingDate) weddingDate = new Date(data.weddingDate).getTime();

    // put one language's text on the page
    function show(l) {
      lang = l;
      document.documentElement.lang = l;
      $$("[data-i18n]").forEach(function (el) {
        var text = data.text[l][el.getAttribute("data-i18n")];
        if (text) el.textContent = text;           // missing key: keep what is there
      });
      $$("button", bar).forEach(function (b) {
        var on = b.getAttribute("data-l") === l;
        b.classList.toggle("on", on);
        b.classList.remove("run");
        b.setAttribute("aria-pressed", on ? "true" : "false");
      });
      void bar.offsetWidth;                        // restart the little progress line
      if (rotating) $("button.on", bar).classList.add("run");
      tick();
    }

    // same, with a quick fade
    function switchTo(l) {
      if (l === lang) return;
      if (reduceMotion) { show(l); return; }
      document.body.classList.add("swap");
      setTimeout(function () {
        show(l);
        requestAnimationFrame(function () { document.body.classList.remove("swap"); });
      }, SWAP_MS);
    }

    function startRotation() {
      var seconds = data.secondsPerLanguage || 10;
      bar.style.setProperty("--rot", (seconds - SWAP_MS / 1000) + "s");
      bar.classList.add("auto");
      rotating = true;
      $("button.on", bar).classList.add("run");
      timer = setInterval(function () {
        position = (position + 1) % languages.length;
        switchTo(languages[position]);
      }, seconds * 1000);
    }

    function stopRotation() {
      clearInterval(timer);
      rotating = false;
      bar.classList.remove("auto");
      $$("button", bar).forEach(function (b) { b.classList.remove("run"); });
    }

    // a visitor who taps a language keeps it
    $$("button", bar).forEach(function (b) {
      b.addEventListener("click", function () {
        stopRotation();
        position = languages.indexOf(b.getAttribute("data-l"));
        switchTo(b.getAttribute("data-l"));
      });
    });

    bar.hidden = false;
    show(languages[0]);                 // first language (Marathi) is ready behind the doors
    onOpen = startRotation;             // the rotation starts when the doors open
    if (gateOpened) startRotation();    // (the doors were already open: start right away)
  }
})();
