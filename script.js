const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");

if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

const form = document.querySelector(".contact__form");
if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    alert("Thanks! We'll be in touch soon.");
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
