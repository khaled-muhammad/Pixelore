// Toggle Mobile Menu
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

const themeToggle = document.getElementById("theme-toggle");

// On page load, check if a theme is stored in localStorage
const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  // Apply the saved theme; if it's 'dark', check the toggle too
  document.body.classList.toggle("dark-mode", savedTheme === "dark");
  themeToggle.checked = savedTheme === "dark";
}

// Listen for changes on the toggle switch
themeToggle.addEventListener("change", () => {
  if (themeToggle.checked) {
    document.body.classList.add("dark-mode");
    localStorage.setItem("theme", "dark");
  } else {
    document.body.classList.remove("dark-mode");
    localStorage.setItem("theme", "light");
  }
});
