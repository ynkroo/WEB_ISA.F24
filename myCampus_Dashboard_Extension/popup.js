function getECTS() {
  chrome.runtime.sendMessage({ getECTS: true });
}

function onPage() {
  // Get Tab and ask to run function for this Tab
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      function: getECTS,
    });
  });
}

function notOnPage() {
  document.getElementById("onPage").style.display = "none";
  document.getElementById("notOnPage").style.display = "block";
}

// Load content with ECTS
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.sendECTS) {
    let ects = message.sendECTS;
    let onPage = document.getElementById("onPage");
    onPage.getElementsByClassName("ectsNum")[0].textContent = ects.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );

    document.getElementById("notOnPage").style.display = "none";
    document.getElementById("onPage").style.display = "block";
  }
});

// Always ask for URL and display content accordingly
document.addEventListener("DOMContentLoaded", function () {
  onPage();

  // Add event listener to the refresh button
  document
    .getElementById("refreshButton")
    .addEventListener("click", function () {
      onPage();
    });
});

// Funktion zum Öffnen der Quick-Links innerhalb des Fensters
document.addEventListener("DOMContentLoaded", function () {
  console.log("Popup script loaded"); // Debugging line

  const linkElements = document.querySelectorAll(".link-element");

  linkElements.forEach(function (element) {
    element.addEventListener("click", function (event) {
      event.preventDefault();
      const url = element.getAttribute("data-url");
      console.log("Navigating to URL:", url); // Debugging line
      chrome.tabs.update({ url: url });
    });
  });
});

//Name

// Refresh
document.addEventListener("DOMContentLoaded", function () {
  onPage();

  // Add event listener to the refresh button
  document
    .getElementById("refreshButton")
    .addEventListener("click", function () {
      onPage();
      fetchStudentData();
    });
});

// Function to fetch student data
function fetchStudentData() {
  chrome.runtime.sendMessage({ getStudentData: true }, function (response) {
    if (response) {
      document.getElementById("vorname").textContent =
        response.vorname || "N/A";
      document.getElementById("nachname").textContent =
        response.nachname || "N/A";
      document.getElementById("matrikelnummer").textContent =
        response.matrikelnummer || "N/A";
      document.getElementById("email").textContent = response.email || "N/A";
    } else {
      document.getElementById("vorname").textContent = "";
      document.getElementById("nachname").textContent = "";
      document.getElementById("matrikelnummer").textContent =
        "Nur sichtbar unter Account";
      document.getElementById("email").textContent = "";
    }
  });
}

document.addEventListener("DOMContentLoaded", function () {
  fetchStudentData();
});

document.addEventListener("DOMContentLoaded", function () {
  onPage();
  fetchStudentData();

  // Add event listener to the refresh ECTS button
  document
    .getElementById("refreshECTSButton")
    .addEventListener("click", function () {
      onPage();
    });

  // Add event listener to the refresh Student Data button
  document
    .getElementById("refreshStudentDataButton")
    .addEventListener("click", function () {
      fetchStudentData();
    });
});

function onPage() {
  // Get Tab and ask to run function for this Tab
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      function: getECTS,
    });
  });
}

function notOnPage() {
  document.getElementById("onPage").style.display = "none";
  document.getElementById("notOnPage").style.display = "block";
}

// Load content with ECTS
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.sendECTS) {
    let ects = message.sendECTS;
    let onPage = document.getElementById("onPage");
    onPage.getElementsByClassName("ectsNum")[0].textContent = ects.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );

    document.getElementById("notOnPage").style.display = "none";
    document.getElementById("onPage").style.display = "block";
  }
});

// Name
document.addEventListener("DOMContentLoaded", function () {
  fetchStudentData();
});
