// USER LOGIN / SIGNUP

// HTML VARIABLES
let signInBtn = document.getElementById('sign-in-btn');
let signUpBtn = document.getElementById('sign-up-btn');

// Globlal Variable Users
let users = loadUsers();

// SIGN UP BTN CLICKED
signUpBtn.addEventListener('click', signUpHandler);

function signUpHandler() {
  let username = document.getElementById("sign-up-username").value;
  let password = document.getElementById("sign-up-password").value;
  let confirmPassword = document.getElementById("confirm-password").value;
  let modal = document.getElementById("signedup-modal");
  let continueBtn = document.getElementById("continue");
  if (username === "" || password === "" || confirmPassword === "") {
    document.getElementById("error-message-signup").innerHTML = "Please fill all empty blanks.";
  } else if (inUse(username) === true) {
    document.getElementById("error-message-signup").innerHTML = "This username already exists.";
  } else if (password.length < 8) {
    document.getElementById("error-message-signup").innerHTML = "Password length must be at least 8 characters.";
  } else if (password != confirmPassword) {
    document.getElementById("error-message-signup").innerHTML = "Passwords do not match. Please try again."
  } else {
    users.push(newUser(username, password));
    saveUsers();
    document.getElementById("error-message-signup").innerHTML = "";
    clearInputs();
    modal.style.display = "block";
  }
  // Hide Modal
  continueBtn.addEventListener('click', hideModal);
}


// SIGN IN BTN CLICKED
signInBtn.addEventListener('click', signInHandler);

function signInHandler() {
  let username = document.getElementById("sign-in-username").value;
  let password = document.getElementById("sign-in-password").value;
  if (username === "" || password === "") {
    document.getElementById("error-message-signin").innerHTML = "Please fill all empty blanks."
  } else if (inUse(username) === false) {
    document.getElementById("error-message-signin").innerHTML = "Username does not exist. Please try again."
  } else {
    if (checkPassword(password) === false) {
      document.getElementById("error-message-signin").innerHTML = "Password is incorrect. Please try again."
    } else {
      alert("Sign In Successful. Redirecting...");
      document.getElementById("error-message-signin").innerHTML = "";
      window.location.replace("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
    }
  }
}

// HELPER FUNCTIONS

// Create and return a new users array object
function newUser(username, password) {
  return {
    username: username,
    password: password
  };
}

// Save users to localStorage
function saveUsers() {
  localStorage.setItem("users", JSON.stringify(users));
}

// Load users from localStorage
function loadUsers() {
  let usersStr = localStorage.getItem("users");
  return JSON.parse(usersStr) ?? [];
}

// Check to see if username already exists
function inUse(username) {
  for (i = 0; i < users.length; i++) {
    if (username.toLowerCase() === users[i].username.toLowerCase()) {
      return true;
    }
  }
  return false;
}

// Check if password is correct
function checkPassword(password) {
  for (i = 0; i < users.length; i++) {
    if (password === users[i].password) {
      return true;
    } 
  }
  return false;
}

// Clear input boxes
function clearInputs() {
  document.getElementById("sign-up-username").value = "";
  document.getElementById("sign-up-password").value = "";
  document.getElementById("confirm-password").value = "";
  document.getElementById("sign-in-username").value = "";
  document.getElementById("sign-in-password").value = "";
  document.getElementById("error-message-signup").innerHTML = "";
  document.getElementById("error-message-signin").innerHTML = "";
}

// Hide Modal
function hideModal() {
  let modal = document.getElementById("signedup-modal");
  modal.style.display = "none";
}