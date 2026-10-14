const form = document.getElementById("signupForm");

const fields = [
  { input: "firstName", error: "firstNameError", message: "First Name is required" },
  { input: "middleInitial", error: "middleInitialError", message: "Middle Initial is required" },
  { input: "lastName", error: "lastNameError", message: "Last Name is required" }
];

const emailInput = document.getElementById("email");
const emailError = document.getElementById("emailError");
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function setInvalid(input, errorEl, message) {
  input.classList.remove("valid");
  input.classList.add("invalid");
  errorEl.textContent = message;
}

function setValid(input, errorEl) {
  input.classList.remove("invalid");
  input.classList.add("valid");
  errorEl.textContent = "";
}

function validateRequired(field) {
  const input = document.getElementById(field.input);
  const errorEl = document.getElementById(field.error);

  if (input.value.trim() === "") {
    setInvalid(input, errorEl, field.message);
    return false;
  }
  setValid(input, errorEl);
  return true;
}

function validateEmail() {
  const value = emailInput.value.trim();

  if (value === "") {
    setInvalid(emailInput, emailError, "Email is required");
    return false;
  }
  if (!emailPattern.test(value)) {
    setInvalid(emailInput, emailError, "Invalid email format");
    return false;
  }
  setValid(emailInput, emailError);
  return true;
}

form.addEventListener("submit", function (event) {
  event.preventDefault();

  let allValid = true;

  fields.forEach(function (field) {
    if (!validateRequired(field)) {
      allValid = false;
    }
  });

  if (!validateEmail()) {
    allValid = false;
  }

  if (allValid) {
    alert("Success!");
  } else {
    alert("Please fix the invalid inputs.");
  }
});

form.addEventListener("reset", function () {
  document.querySelectorAll("input").forEach(function (input) {
    input.classList.remove("valid", "invalid");
  });
  document.querySelectorAll(".error-msg").forEach(function (msg) {
    msg.textContent = "";
  });
});
