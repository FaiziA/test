const scene = document.getElementById("invitationScene");
const envelopeBtn = document.getElementById("envelopeBtn");
const particlesLayer = document.getElementById("goldParticles");
const themeToggle = document.getElementById("themeToggle");
const THEME_KEY = "weddingTheme";

function createGoldParticles() {
  if (!particlesLayer) return;

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReducedMotion) return;

  const particleCount = 14;

  for (let i = 0; i < particleCount; i += 1) {
    const particle = document.createElement("span");
    const size = Math.random() * 4 + 3;
    const left = Math.random() * 100;
    const delay = Math.random() * -8;
    const duration = Math.random() * 4 + 8;

    particle.className = "particle";
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${left}%`;
    particle.style.bottom = `${Math.random() * 24}px`;
    particle.style.animationDelay = `${delay}s`;
    particle.style.animationDuration = `${duration}s`;

    particlesLayer.appendChild(particle);
  }
}

function applyTheme(theme) {
  const isNight = theme === "night";
  document.body.setAttribute("data-theme", isNight ? "night" : "day");

  if (themeToggle) {
    themeToggle.setAttribute("aria-pressed", String(isNight));
    themeToggle.textContent = isNight ? "Day Luxe" : "Night Luxe";
  }
}

function setupThemeToggle() {
  if (!themeToggle) return;

  const savedTheme = localStorage.getItem(THEME_KEY);
  const initialTheme = savedTheme === "night" ? "night" : "day";
  applyTheme(initialTheme);

  themeToggle.addEventListener("click", () => {
    const currentTheme = document.body.getAttribute("data-theme");
    const nextTheme = currentTheme === "night" ? "day" : "night";
    applyTheme(nextTheme);
    localStorage.setItem(THEME_KEY, nextTheme);
  });
}

setupThemeToggle();

if (scene && envelopeBtn) {
  createGoldParticles();

  envelopeBtn.addEventListener("click", () => {
    const isOpen = scene.classList.contains("scene-open");

    if (!isOpen) {
      scene.classList.add("scene-open");
      envelopeBtn.setAttribute("aria-expanded", "true");
      envelopeBtn.setAttribute("aria-label", "Invitation opened");
    }
  });
}
