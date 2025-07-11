const PASSWORD = "Kr!stJ&nK2025!";
const overlay = document.getElementById("password-overlay");
const input = document.getElementById("password-input");
const submit = document.getElementById("password-submit");
const error = document.getElementById("password-error");
const toggle = document.getElementById("toggle-password");
const PASSWORD_KEY = "kvaala_password_unlocked";

function unlockPage() {
  overlay.style.opacity = "0";
  setTimeout(() => {
    overlay.style.display = "none";
  }, 300);
}

function checkPassword() {
  if (input.value === PASSWORD) {
    error.style.display = "none";
    localStorage.setItem(PASSWORD_KEY, "true");
    unlockPage();
  } else {
    error.style.display = "block";
    input.value = "";
    input.focus();
  }
}

submit.addEventListener("click", checkPassword);
input.addEventListener("keydown", e => {
  if (e.key === "Enter") checkPassword();
});
toggle.addEventListener("click", () => {
  input.type = input.type === "password" ? "text" : "password";
  toggle.textContent = input.type === "password" ? "Show" : "Hide";
  input.focus();
});
window.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem(PASSWORD_KEY) === "true") {
    unlockPage();
  } else {
    input.focus();
  }
});
window.clearPasswordLock = function () {
  localStorage.removeItem(PASSWORD_KEY);
  location.reload();
};
