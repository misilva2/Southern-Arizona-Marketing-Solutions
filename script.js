const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");
const navLinks = navMenu ? navMenu.querySelectorAll("a") : [];

if (navToggle && navMenu) {
  const navBreakpoint = window.matchMedia("(max-width: 900px)");
  const syncNavState = () => {
    if (navBreakpoint.matches) {
      navMenu.setAttribute("aria-hidden", String(!navMenu.classList.contains("is-open")));
    } else {
      navMenu.setAttribute("aria-hidden", "false");
      navMenu.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  };

  navToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
    navMenu.setAttribute("aria-hidden", String(!isOpen));
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
      navMenu.setAttribute("aria-hidden", "true");
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      navMenu.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
      navMenu.setAttribute("aria-hidden", "true");
    }
  });

  syncNavState();
  navBreakpoint.addEventListener("change", syncNavState);
}

const form = document.querySelector(".contact__form");
if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const status = form.querySelector(".form-status");
    if (status) {
      status.textContent = "Thanks! We'll be in touch soon.";
    }
    form.reset();
  });
}

const themeToggle = document.querySelector(".theme-toggle");
const savedTheme = localStorage.getItem("theme");

const applyTheme = (theme) => {
  if (theme === "dark") {
    document.body.setAttribute("data-theme", "dark");
    themeToggle?.setAttribute("aria-pressed", "true");
    if (themeToggle) themeToggle.textContent = "☀️ Light mode";
  } else {
    document.body.removeAttribute("data-theme");
    themeToggle?.setAttribute("aria-pressed", "false");
    if (themeToggle) themeToggle.textContent = "🌙 Dark mode";
  }
};

if (savedTheme) {
  applyTheme(savedTheme);
}

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const isDark = document.body.getAttribute("data-theme") === "dark";
    const nextTheme = isDark ? "light" : "dark";
    localStorage.setItem("theme", nextTheme);
    applyTheme(nextTheme);
  });
}

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const revealItems = document.querySelectorAll(
  ".hero, .hero__card, .section, .cta-banner, .timeline__item, .faq details, .site-footer"
);

revealItems.forEach((item) => item.classList.add("reveal"));

if (!prefersReducedMotion && "IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

const hero = document.querySelector(".hero");
if (hero && !prefersReducedMotion) {
  const updateHeroGlow = (event) => {
    const rect = hero.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    hero.style.setProperty("--cursor-x", `${x}%`);
    hero.style.setProperty("--cursor-y", `${y}%`);
  };

  hero.addEventListener("mousemove", updateHeroGlow);
  hero.addEventListener("mouseleave", () => {
    hero.style.setProperty("--cursor-x", "40%");
    hero.style.setProperty("--cursor-y", "20%");
  });
}

