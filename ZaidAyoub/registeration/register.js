const container = document.getElementById("container");
const registerBtn = document.getElementById("register");
const loginBtn = document.getElementById("login");

registerBtn.addEventListener("click", () => {
  container.classList.add("active");
});

loginBtn.addEventListener("click", () => {
  container.classList.remove("active");
});

document.getElementById("signup-btn").addEventListener("click", function () {
  const name = document.getElementById("signup-name").value;
  const email = document.getElementById("signup-email").value;
  const password = document.getElementById("signup-password").value;

  // Clear previous messages
  clearMessages([
    "signup-name-message",
    "signup-email-message",
    "signup-password-message",
    "signup-success-message",
  ]);

  if (!validateEmail(email)) {
    displayMessage(
      "signup-email-message",
      "Please enter a valid email address.",
      "error"
    );
    return;
  }

  if (!validatePassword(password)) {
    displayMessage(
      "signup-password-message",
      "Password must be exactly 8 characters long and contain at least 2 numbers.",
      "error"
    );
    return;
  }

  if (name && email && password) {
    localStorage.setItem("userName", name);
    localStorage.setItem("userEmail", email);
    localStorage.setItem("userPassword", password);
    displayMessage(
      "signup-success-message",
      "Account created successfully!",
      "success"
    );
    document.getElementById("signup-name").value = "";
    document.getElementById("signup-email").value = "";
    document.getElementById("signup-password").value = "";
  } else {
    displayMessage(
      "signup-name-message",
      "Please fill in all fields.",
      "error"
    );
  }
});

document.getElementById("signin-btn").addEventListener("click", function () {
  const email = document.getElementById("signin-email").value;
  const password = document.getElementById("signin-password").value;

  // Clear previous messages
  clearMessages([
    "signin-email-message",
    "signin-password-message",
    "signin-success-message",
  ]);

  const storedEmail = localStorage.getItem("userEmail");
  const storedPassword = localStorage.getItem("userPassword");

  if (email === storedEmail && password === storedPassword) {
    displayMessage("signin-success-message", "Login successful!", "success");

    document.getElementById("signin-email").value = "";
    document.getElementById("signin-password").value = "";

    setTimeout(function () {
      window.location.href = "/index.html"; // Redirect to index.html
    }, 2000);
  } else {
    displayMessage(
      "signin-email-message",
      "Invalid email or password.",
      "error"
    );
  }
});

// Utility function to display messages
function displayMessage(elementId, message, type) {
  const element = document.getElementById(elementId);
  element.textContent = message;
  element.style.color = type === "error" ? "red" : "green";
}

// Utility function to clear previous messages
function clearMessages(ids) {
  ids.forEach((id) => {
    const element = document.getElementById(id);
    element.textContent = "";
  });
}

function validateEmail(email) {
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailPattern.test(email);
}

function validatePassword(password) {
  // Regular expression: 8 characters, at least 2 digits, no specific requirement for uppercase or special characters
  const passwordPattern = /^(?=.*\d{2,})[A-Za-z\d]{8,}$/;
  return passwordPattern.test(password);
}
