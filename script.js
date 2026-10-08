/* ------------------------------------------------------------------
   Wedding invitation: doors, language rotation, countdown, event cards
   All wording comes from data/content.json (loaded with fetch)
------------------------------------------------------------------ */
(function () {
  "use strict";

  var DATA_URL = "../data/content.json";

  function fail(err) {
    if (window.console) console.error("Could not load " + DATA_URL, err);
    var msg = document.createElement("div");
    msg.style.cssText = "position:fixed;inset:0;z-index:999;display:flex;align-items:center;justify-content:center;padding:2rem;text-align:center;background:#f8ecdb;color:#5e2230;font-family:sans-serif;line-height:1.5";
    msg.textContent = location.protocol === "file:"
      ? "This page needs to be opened through a web server (not by double-clicking the file), so it can read data/content.json."
      : "Sorry, the invitation could not be loaded. Please check data/content.json and refresh.";
    document.body.appendChild(msg);
    document.body.classList.remove("locked");
  }

  fetch(DATA_URL, { cache: "no-cache" })
    .then(function (r) { if (!r.ok) throw new Error("HTTP " + r.status); return r.json(); })
    .then(start)
    .catch(fail);

  function start(D) {
  var page = document.body.getAttribute("data-page") === "main" ? "main" : "guest";
  var order = D.order;
  var idx = 0;
  var lang = order[0];
  var rotating = false;
  var rotateTimer = null;
  var SWAP_MS = 380;                         // fade-out time before the text changes
  var DEVANAGARI_DIGITS = "०१२३४५६७८९";
  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function $(s, root) { return (root || document).querySelector(s); }
  function $$(s, root) { return Array.prototype.slice.call((root || document).querySelectorAll(s)); }
  function num(n) {
    n = String(n);
    return lang === "en" ? n : n.replace(/\d/g, function (d) { return DEVANAGARI_DIGITS.charAt(d); });
  }

  /* ---------- event cards (built once, text filled per language) ---------- */
  var eventsBox = $("#events");
  D.pages[page].forEach(function (id) {
    var e = D.events[id];
    var card = document.createElement("article");
    card.className = "card reveal";
    card.setAttribute("data-ev", id);
    card.innerHTML =
      '<span class="tag" data-f="date"></span>' +
      '<h3 data-f="title"></h3>' +
      '<p class="time" data-f="time"></p>' +
      '<p class="venue" data-f="venue"></p>';
    if (e.map) {
      var a = document.createElement("a");
      a.className = "btn small";
      a.target = "_blank";
      a.rel = "noopener";
      a.href = e.map;
      a.setAttribute("data-f", "map");
      card.appendChild(a);
    }
    eventsBox.appendChild(card);
  });

  /* ---------- RSVP is shown only when a WhatsApp number is set ---------- */
  var rsvp = $("#rsvp");
  if (rsvp && D.rsvpPhone) rsvp.hidden = false;

  /* ---------- put the chosen language on the page ---------- */
  function render(l) {
    lang = l;
    document.documentElement.lang = l;
    var ui = D.ui[l];

    $$("[data-t]").forEach(function (el) {
      var v = ui[el.getAttribute("data-t")];
      if (v != null) el.textContent = v;
    });
    $$("[data-h]").forEach(function (el) {
      var v = ui[el.getAttribute("data-h")];
      if (v != null) el.innerHTML = v;
    });
    $$("[data-ev]").forEach(function (card) {
      var e = D.events[card.getAttribute("data-ev")];
      $$("[data-f]", card).forEach(function (n) {
        var f = n.getAttribute("data-f");
        n.textContent = f === "map" ? ui.mapLabel : e[f][l];
      });
    });
    var btn = $("#rsvpBtn");
    if (btn && D.rsvpPhone) {
      btn.href = "https://wa.me/" + D.rsvpPhone + "?text=" + encodeURIComponent(ui.rsvpMsg);
    }

    var bar = $("#langbar");
    var active = null;
    $$("button", bar).forEach(function (b) {
      var on = b.getAttribute("data-l") === l;
      b.classList.toggle("on", on);
      b.classList.remove("run");
      b.setAttribute("aria-pressed", on ? "true" : "false");
      if (on) active = b;
    });
    void bar.offsetWidth;                    // restart the little progress line
    if (rotating && active) active.classList.add("run");
    tick();
  }

  function switchTo(l) {
    if (l === lang) return;
    if (reduceMotion) { render(l); return; }
    document.body.classList.add("swap");
    setTimeout(function () {
      render(l);
      requestAnimationFrame(function () { document.body.classList.remove("swap"); });
    }, SWAP_MS);
  }

  /* ---------- rotation: Marathi, English, Hindi, every 10 seconds ---------- */
  function startRotation() {
    var bar = $("#langbar");
    bar.style.setProperty("--rot", ((D.rotateMs - SWAP_MS) / 1000) + "s");
    bar.classList.add("auto");
    rotating = true;
    var active = $("button.on", bar);
    if (active) active.classList.add("run");
    rotateTimer = setInterval(function () {
      idx = (idx + 1) % order.length;
      switchTo(order[idx]);
    }, D.rotateMs);
  }

  function stopRotation() {
    rotating = false;
    clearInterval(rotateTimer);
    var bar = $("#langbar");
    bar.classList.remove("auto");
    $$("button", bar).forEach(function (b) { b.classList.remove("run"); });
  }

  $$("#langbar button").forEach(function (b) {
    b.addEventListener("click", function () {
      var l = b.getAttribute("data-l");
      stopRotation();                        // a guest who picks a language keeps it
      idx = order.indexOf(l);
      switchTo(l);
    });
  });

  /* ---------- countdown ---------- */
  var weddingDate = new Date(D.weddingISO).getTime();
  function tick() {
    var s = Math.max(0, Math.floor((weddingDate - Date.now()) / 1000));
    $("#d").textContent = num(Math.floor(s / 86400));
    $("#h").textContent = num(Math.floor((s % 86400) / 3600));
    $("#m").textContent = num(Math.floor((s % 3600) / 60));
    $("#s").textContent = num(s % 60);
  }
  setInterval(tick, 1000);

  /* ---------- scroll reveal ---------- */
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add("show"); io.unobserve(e.target); }
    });
  }, { threshold: 0.15 });
  $$(".reveal").forEach(function (el) { io.observe(el); });

  /* ---------- first paint: Marathi ---------- */
  render(order[0]);

  /* ---------- cover doors ----------
     - show the card once the artwork is decoded
     - open from the middle on tap / click / Enter / Space
     - or open by themselves 5 seconds after the card appears */
  var AUTO_OPEN_MS = 5000;
  var gate = document.getElementById("gate");
  var ready = false, opened = false, autoOpen;

  function showGate() {
    if (ready) return;
    ready = true;
    gate.classList.add("ready");
    autoOpen = setTimeout(openGate, AUTO_OPEN_MS);
  }

  function openGate() {
    if (opened) return;
    opened = true;
    if (!ready) showGate();
    clearTimeout(autoOpen);
    gate.classList.add("open");
    document.body.classList.remove("locked");
    document.body.classList.add("opened");
    startRotation();                         // the 10 second language cycle begins
    setTimeout(function () { gate.remove(); }, 3600);
  }

  var imgs = $$("img", gate);
  Promise.all(imgs.map(function (img) {
    return img.decode ? img.decode().catch(function () {}) :
      new Promise(function (res) { if (img.complete) res(); else img.onload = img.onerror = res; });
  })).then(showGate);
  setTimeout(showGate, 4000);

  gate.addEventListener("click", openGate);
  gate.addEventListener("keydown", function (e) {
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openGate(); }
  });

  /* load the Marathi and Hindi fonts early so the first switch is smooth */
  if (document.fonts && document.fonts.load) {
    ['16px "Tiro Devanagari Marathi"', '16px "Tiro Devanagari Hindi"', '400 16px Mukta', '600 16px Mukta']
      .forEach(function (f) { document.fonts.load(f, "आ").catch(function () {}); });
  }
  }
})();
