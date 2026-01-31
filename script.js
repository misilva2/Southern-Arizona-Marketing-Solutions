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
