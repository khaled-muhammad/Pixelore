// Toggle Mobile Menu
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

const themeToggle = document.getElementById("theme-toggle");

// On page load, retrieve the saved theme or default to 'dark'
const savedTheme = localStorage.getItem("theme") || "dark";
document.body.classList.toggle("dark-mode", savedTheme === "dark");
themeToggle.checked = savedTheme === "dark";

// Save the default theme to localStorage if not already set
if (!localStorage.getItem("theme")) {
  localStorage.setItem("theme", savedTheme);
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