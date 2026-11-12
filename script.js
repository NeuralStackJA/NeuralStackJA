
/* ==========================================
   NEURALSTACKJA — ANIMATION + FR / EN
   ========================================== */

document.addEventListener("DOMContentLoaded", function () {

  /* ========================================
     1. TRADUCTIONS
     ======================================== */

  const translations = {

    fr: {
      studio: "STUDIO NUMÉRIQUE INDÉPENDANT",
      aboutNav: "À PROPOS",
      expertiseNav: "EXPERTISES",
      creativeNav: "CRÉATION",
      contactNav: "CONTACT",

      heroLabel: "01 / UN AUTRE REGARD",
      heroTitle: "Des idées<br><em>vivantes.</em>",
      heroText: "Développement logiciel, intelligence artificielle et création numérique. Un univers où la technologie rencontre l'imagination.",
      explore: "EXPLORER L'UNIVERS",
      artLabel: "IMAGINATION EN MOUVEMENT",

      aboutLabel: "02 / PHILOSOPHIE",
      aboutTitle: "La curiosité,<br><em>une force.</em>",
      aboutText: "Imaginer et concevoir des expériences numériques en associant rigueur technique, créativité et expérimentation.",
      chip1: "EXPLORER",
      chip2: "IMAGINER",
      chip3: "CONSTRUIRE",
      chip4: "ÉVOLUER",

      skillsLabel: "03 / DOMAINES",
      skillsTitle: "Un monde de<br><em>possibilités.</em>",
      skill1: "Développement logiciel",
      skill2: "Systèmes neuronaux et intelligents",
      skill2Text: "Intelligence artificielle, automatisation et systèmes numériques.",
      skill3: "Données et visualisation",
      skill3Text: "API, traitement des données, tableaux de bord et visualisations interactives.",
      skill4: "Expériences web créatives",
      skill4Text: "Animations JavaScript, SVG, Canvas, WebGL et interfaces immersives.",

      creativeLabel: "04 / CRÉATION NUMÉRIQUE",
      creativeTitle: "L'art du<br><em>mouvement.</em>",
      creativeText: "Maîtrise d'Adobe Creative Suite, anciennes certifications Adobe, montage vidéo, motion design, effets visuels et animations JavaScript.",
      connect: "ENTRER EN CONTACT ↗",
      creativeArt: "IMAGINER<br>CRÉER<br>ANIMER ✳",

      footerLabel: "05 / CONTACT",
      footerTitle: "Créons<br><em>l'extraordinaire.</em>",
      footerNote: "© 2026 NEURALSTACKJA · CRÉÉ AVEC CURIOSITÉ"
    },

    en: {
      studio: "INDEPENDENT DIGITAL STUDIO",
      aboutNav: "ABOUT",
      expertiseNav: "EXPERTISE",
      creativeNav: "CREATIVE",
      contactNav: "CONTACT",

      heroLabel: "01 / A DIFFERENT PERSPECTIVE",
      heroTitle: "Ideas made<br><em>electric.</em>",
      heroText: "Software engineering, artificial intelligence and digital creativity. A universe where technology meets imagination.",
      explore: "EXPLORE THE UNIVERSE",
      artLabel: "IMAGINATION IN MOTION",

      aboutLabel: "02 / PHILOSOPHY",
      aboutTitle: "Curiosity is a<br><em>superpower.</em>",
      aboutText: "Designing digital experiences by combining technical precision, creativity and experimentation.",
      chip1: "EXPLORE",
      chip2: "IMAGINE",
      chip3: "BUILD",
      chip4: "EVOLVE",

      skillsLabel: "03 / DISCIPLINES",
      skillsTitle: "A world of<br><em>possibilities.</em>",
      skill1: "Software engineering",
      skill2: "Neural and intelligent systems",
      skill2Text: "Artificial intelligence, automation and digital systems.",
      skill3: "Data and visualization",
      skill3Text: "APIs, data processing, dashboards and interactive visualizations.",
      skill4: "Creative web experiences",
      skill4Text: "JavaScript animations, SVG, Canvas, WebGL and immersive interfaces.",

      creativeLabel: "04 / DIGITAL CREATION",
      creativeTitle: "The art of<br><em>motion.</em>",
      creativeText: "Adobe Creative Suite proficiency, former Adobe certifications, video editing, motion design, visual effects and JavaScript animations.",
      connect: "LET'S CONNECT ↗",
      creativeArt: "IMAGINE<br>CREATE<br>ANIMATE ✳",

      footerLabel: "05 / CONTACT",
      footerTitle: "Let's create<br><em>something extraordinary.</em>",
      footerNote: "© 2026 NEURALSTACKJA · BUILT WITH CURIOSITY"
    }

  };

  /* ========================================
     2. CHANGEMENT DE LANGUE
     ======================================== */

  function changeLanguage(language) {

    const lang = language === "en" ? "en" : "fr";
    const dictionary = translations[lang];

    document.documentElement.lang = lang;

    document.querySelectorAll("[data-i18n]").forEach(function (element) {

      const key = element.getAttribute("data-i18n");

      if (!Object.prototype.hasOwnProperty.call(dictionary, key)) {
        return;
      }

      if (element.hasAttribute("data-html")) {
        element.innerHTML = dictionary[key];
      } else {
        element.textContent = dictionary[key];
      }

    });

    document.querySelectorAll(".lang-btn").forEach(function (button) {

      const selected = button.dataset.lang === lang;

      button.classList.toggle("active", selected);
      button.setAttribute("aria-pressed", String(selected));

    });

    document.title = lang === "fr"
      ? "NeuralStackJA — Ingénierie créative"
      : "NeuralStackJA — Creative Engineering";

    const description = document.querySelector('meta[name="description"]');

    if (description) {
      description.content = lang === "fr"
        ? "NeuralStackJA — Développement logiciel, intelligence artificielle et création numérique."
        : "NeuralStackJA — Software engineering, artificial intelligence and digital creativity.";
    }

    try {
      localStorage.setItem("neuralstackja-language", lang);
    } catch (error) {
      // Le changement de langue fonctionne sans stockage.
    }

  }

  document.querySelectorAll(".lang-btn").forEach(function (button) {

    button.addEventListener("click", function () {
      changeLanguage(button.dataset.lang);
    });

  });

  let initialLanguage = "fr";

  try {
    initialLanguage =
      localStorage.getItem("neuralstackja-language") || "fr";
  } catch (error) {
    initialLanguage = "fr";
  }

  changeLanguage(initialLanguage);

  /* ========================================
     3. ANIMATION GEOMETRIQUE
     ======================================== */

  const canvas = document.getElementById("art");

  if (!canvas) {
    return;
  }

  const ctx = canvas.getContext("2d");

  if (!ctx) {
    return;
  }

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  let width = 0;
  let height = 0;
  let animationId = null;

  const shapes = [
    {
      x: .46, y: .49, r: .25,
      color: "#8255f4",
      type: "square",
      speed: .25,
      phase: 0
    },
    {
      x: .65, y: .36, r: .19,
      color: "#ff6689",
      type: "circle",
      speed: -.34,
      phase: 2
    },
    {
      x: .37, y: .67, r: .15,
      color: "#ffc45c",
      type: "triangle",
      speed: .5,
      phase: 1
    },
    {
      x: .75, y: .68, r: .12,
      color: "#25cbbd",
      type: "ring",
      speed: -.4,
      phase: 3
    },
    {
      x: .25, y: .27, r: .08,
      color: "#fff8ee",
      type: "diamond",
      speed: .4,
      phase: 1.5
    }
  ];

  function resizeCanvas() {

    const rect = canvas.getBoundingClientRect();

    width = rect.width;
    height = rect.height;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  }

  function draw(timestamp) {

    const time = reducedMotion ? 0 : timestamp / 1000;
    const unit = Math.min(width, height);

    ctx.clearRect(0, 0, width, height);

    shapes.forEach(function (shape) {

      const x = shape.x * width +
        Math.sin(time * .55 + shape.phase) * unit * .025;

      const y = shape.y * height +
        Math.cos(time * .5 + shape.phase) * unit * .025;

      const r = shape.r * unit;

      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(time * shape.speed + shape.phase * .15);

      ctx.shadowColor = "rgba(62,32,90,.16)";
      ctx.shadowBlur = 32;
      ctx.shadowOffsetY = 16;

      ctx.fillStyle = shape.color;
      ctx.strokeStyle = shape.color;
      ctx.lineWidth = r * .22;

      switch (shape.type) {

        case "circle":
          ctx.beginPath();
          ctx.arc(0, 0, r, 0, Math.PI * 2);
          ctx.fill();
          break;

        case "square":
          ctx.beginPath();
          ctx.roundRect(-r, -r, r * 2, r * 2, r * .35);
          ctx.fill();
          break;

        case "triangle":
          ctx.beginPath();
          ctx.moveTo(0, -r);
          ctx.lineTo(r * .95, r * .85);
          ctx.lineTo(-r * .95, r * .85);
          ctx.closePath();
          ctx.fill();
          break;

        case "ring":
          ctx.beginPath();
          ctx.arc(0, 0, r, 0, Math.PI * 2);
          ctx.stroke();
          break;

        case "diamond":
          ctx.beginPath();
          ctx.moveTo(0, -r);
          ctx.lineTo(r, 0);
          ctx.lineTo(0, r);
          ctx.lineTo(-r, 0);
          ctx.closePath();
          ctx.fill();
          break;

      }

      ctx.restore();

    });

    if (!reducedMotion) {
      animationId = requestAnimationFrame(draw);
    }

  }

  resizeCanvas();
  draw(0);

  window.addEventListener("resize", function () {

    resizeCanvas();

    if (reducedMotion) {
      draw(0);
    }

  });

  document.addEventListener("visibilitychange", function () {

    if (animationId !== null) {
      cancelAnimationFrame(animationId);
    }

    if (!document.hidden && !reducedMotion) {
      animationId = requestAnimationFrame(draw);
    }

  });

});
