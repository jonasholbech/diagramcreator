"use strict";
let currentTab = 0; // Declare the default with a varible, so that the first tab is shown. (Goes from 0-3)
window.addEventListener("resize", checkWindow);

checkWindow();
function checkWindow() {
  const windoWidth = window.innerWidth;
  const formContent = document.querySelector("#form_template");
  const clone = formContent.content.cloneNode(true);
  const headlineContent = document.querySelector("#headline_template");
  const headlineClone = headlineContent.content.cloneNode(true);
  document.querySelector(".title_desktop").innerHTML = "";
  document.querySelector(".form_desktop").innerHTML = "";
  document.querySelector(".form_mobil").innerHTML = "";
  document.querySelector(".title_mobil").innerHTML = "";
  if (windoWidth < 400) {
    document.querySelector(".form_mobil").appendChild(clone);
    document.querySelector(".title_mobil").appendChild(headlineClone);
    showTab(currentTab);
  } else if (windoWidth > 400) {
    document.querySelector(".form_desktop").appendChild(clone);
    document.querySelector(".title_desktop").appendChild(headlineClone);
    showTab(currentTab);
  }
}

//den følgende kode til formen er fra https://www.w3schools.com/howto/howto_js_form_steps.asp?fbclid=IwAR33EcBSoh9tETxGCUSB-6GB8qufM22nCY2NPUsn-CqOd2le3F8MuUvAy9M

function showTab(tabs) {
  // This function will display the specified tab of the form
  let x = document.querySelectorAll(".tab");
  x[tabs].style.display = "block";

  if (tabs == 0) {
    document.querySelector("#prevBtn").style.display = "none";
    document.querySelector("#sendBtn").style.display = "none";
  } else {
    document.querySelector("#prevBtn").style.display = "inline";
    document.querySelector("#logIn").style.display = "none";
    document.querySelector(".existinguser").style.display = "none";
    document.querySelector("#sendBtn").style.display = "none";
  }
  if (tabs == x.length - 2) {
    document.querySelector("#nextBtn").style.display = "none";
    document.querySelector("#sendBtn").style.display = "inline";
  } else {
    document.querySelector("#nextBtn").innerHTML = "Videre";
  }
  if (tabs == x.length - 1) {
    document.querySelector("#nextBtn").innerHTML = "Luk";
    document.querySelector("#prevBtn").style.display = "none";
  }
  // "Videre" button wouldn't show when going back unless i put this.
  if (tabs == 1) {
    document.querySelector("#nextBtn").style.display = "inline";
  }

  activeStep(tabs);
}

function nextPrev(tabs) {
  // Checks validation according to patterns on click "videre" and let's you go back in the form without checking for validation.
  const bn = document.querySelector("#brugernavn");
  const pw = document.querySelector("#password");
  const em = document.querySelector("#email");
  const by = document.querySelector("#by");
  let valid = true;
  if (currentTab === 0) {
    if (!bn.validity.valid || !pw.validity.valid) {
      valid = false; //Check for validation of the individual input fields of first tab by using "Validity"
    }
  }
  if (currentTab === 1) {
    if (!em.validity.valid || !by.validity.valid) {
      valid = false; //Check for validation of the individual input fields of second tab by using "Validity"
    }
  }

  if (tabs < 0 || valid) {
    // This function displays the correct "tab" depending on which button you click.
    let x = document.querySelectorAll(".tab");

    if (tabs == 1 && !validateForm()) return false;
    // Here we hide the current tab
    x[currentTab].style.display = "none";
    // And go back or forward to the next tab.
    currentTab = currentTab + tabs;

    if (currentTab >= x.length) {
      document.querySelector("#regForm").submit();
      return false;
    }

    showTab(currentTab);
  } else {
    // If form is not valid, we use reportValidity to activate the build in html validation error.
    document.querySelector("form").reportValidity();
  }
}
// VALIDATION - Checks the input fields, if they are empty it will return false.

function validateForm() {
  let tab,
    input,
    i,
    valid = true;
  tab = document.querySelectorAll(".tab");
  input = tab[currentTab].getElementsByTagName("input");

  for (i = 0; i < input.length; i++) {
    if (input[i].value == "") {
      input[i].className += " invalid";

      valid = false;
    }
  }

  if (valid) {
    document.querySelectorAll(".step")[currentTab].className += " finish";
  }

  return valid;
}

function activeStep(tabs) {
  // This function removes the "active" class of all steps
  let i,
    x = document.querySelectorAll(".step");
  for (i = 0; i < x.length; i++) {
    x[i].className = x[i].className.replace(" active", "");
  }
  // And adds the active class to the current step.
  x[tabs].className += " active";
}
