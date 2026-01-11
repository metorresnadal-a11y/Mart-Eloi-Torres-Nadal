document.addEventListener("DOMContentLoaded", () => {
  initThemeToggle();
  initRetroAnimations();
  initKonamiCode();
  initLazyLoadingEnhancer();
  initDropdowns();
  initRetroCharacters();
});

/* ============================
   MODE FOSC / CLAR
============================ */
function initThemeToggle() {
  const THEME_KEY = "retro-theme";
  const body = document.body;
  const saved = localStorage.getItem(THEME_KEY);

  if (saved === "light") body.classList.add("theme-light");
  else if (saved === "dark") body.classList.add("theme-dark");

  let btn = document.getElementById("theme-toggle");
  if (!btn) {
    btn = document.createElement("button");
    btn.id = "theme-toggle";
    btn.type = "button";
    btn.textContent = "Mode fosc / clar";
    btn.className = "theme-toggle-btn";
    document.body.appendChild(btn);
  }

  btn.addEventListener("click", () => {
    if (body.classList.contains("theme-light")) {
      body.classList.replace("theme-light", "theme-dark");
      localStorage.setItem(THEME_KEY, "dark");
    } else if (body.classList.contains("theme-dark")) {
      body.classList.replace("theme-dark", "theme-light");
      localStorage.setItem(THEME_KEY, "light");
    } else {
      body.classList.add("theme-light");
      localStorage.setItem(THEME_KEY, "light");
    }
  });
}

/* ============================
   ANIMACIONS RETRO
============================ */
function initRetroAnimations() {
  const glitchTargets = document.querySelectorAll(".site-title, .hero-title, .logo");
  glitchTargets.forEach(el =>
    el.addEventListener("mouseenter", () => addTempClass(el, "glitch", 400))
  );

  const pulseTargets = document.querySelectorAll(".hero-button, .link-badge");
  pulseTargets.forEach(el =>
    el.addEventListener("mouseenter", () => addTempClass(el, "pulse", 300))
  );
}

function addTempClass(el, className, duration) {
  el.classList.add(className);
  setTimeout(() => el.classList.remove(className), duration);
}

/* ============================
   KONAMI CODE
============================ */
function initKonamiCode() {
  const seq = [
    "arrowup","arrowup","arrowdown","arrowdown",
    "arrowleft","arrowright","arrowleft","arrowright",
    "b","a"
  ];

  let index = 0;

  window.addEventListener("keydown", e => {
    const key = e.key.toLowerCase();

    if (key === seq[index]) {
      index++;
      if (index === seq.length) {
        triggerKonami();
        index = 0;
      }
    } else {
      index = 0;
    }
  });
}

function triggerKonami() {
  document.body.classList.add("konami-active");
  alert("Konami Code activat! 1UP extra!");
  setTimeout(() => {
    document.body.classList.remove("konami-active");
  }, 4000);
}

/* ============================
   LAZY LOADING
============================ */
function initLazyLoadingEnhancer() {
  const lazyImages = document.querySelectorAll("img[loading='lazy']");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("img-visible");
        observer.unobserve(entry.target);
      });
    });

    lazyImages.forEach(img => observer.observe(img));
  } else {
    lazyImages.forEach(img => img.classList.add("img-visible"));
  }
}

/* ============================
   DESPLEGABLES
============================ */
function initDropdowns() {
  document.querySelectorAll(".toggle-info").forEach(btn => {
    btn.addEventListener("click", () => {
      const box = btn.nextElementSibling;
      if (box) box.style.display = box.style.display === "block" ? "none" : "block";
    });
  });
}

/* ============================
   PERSONATGES RETRO
============================ */
function initRetroCharacters() {
  const layer = document.getElementById("retro-characters-layer");
  if (!layer) return;

  const characters = [
    { src: "img/pac-man.gif", name: "Pac-Man" },
    { src: "img/mario.gif", name: "Mario" },
    { src: "img/luigi.gif", name: "Luigi" },
    { src: "img/megaman.gif", name: "Mega Man" },
    { src: "img/sonic.gif", name: "Sonic" },
    { src: "img/link.gif", name: "Link" },
    { src: "img/samus.gif", name: "Samus" },
    { src: "img/kirby.gif", name: "Kirby" },
    { src: "img/donkeykong.gif", name: "Donkey Kong" },
    { src: "img/blinky.gif", name: "Blinky" },
    { src: "img/ryu.gif", name: "Ryu" },
    { src: "img/pikachu.gif", name: "Pikachu" },
    { src: "img/yoshi.gif", name: "Yoshi" }
  ];

  function spawnCharacter() {
    const character = characters[Math.floor(Math.random() * characters.length)];
    const img = document.createElement("img");

    img.src = character.src;
    img.alt = character.name;
    img.className = "retro-character";
    img.style.top = Math.floor(Math.random() * 80) + "vh";

    layer.appendChild(img);

    setTimeout(() => img.remove(), 7000);
  }

  setInterval(spawnCharacter, 8000);
}
