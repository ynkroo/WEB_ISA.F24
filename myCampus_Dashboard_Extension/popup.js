function getECTS() {
  chrome.runtime.sendMessage({ getECTS: true });
}

function onPage() {
  // Get Tab and ask to run function for this Tab (idk why its on the Tab)
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

// Language functions
function updatePopupLanguage(language) {
  let notOnPage = document.getElementById("notOnPage");
  let onPage = document.getElementById("onPage");
  let onPageEctsDesc = onPage.getElementsByClassName("ectsDesc");
  let footerContent = document
    .getElementsByTagName("footer")[0]
    .getElementsByTagName("p");
  if (language == "en") {
    notOnPage.getElementsByTagName("p")[0].textContent =
      "To see your current ECTS points";
    notOnPage.getElementsByTagName("h1")[0].textContent = "Log in to MyCampus";
    notOnPage.getElementsByTagName("a")[0].textContent = "Open MyCampus";
    onPage.getElementsByTagName("p")[0].textContent = "You currently have";
    onPageEctsDesc[0].textContent = " ECTS points";
    onPageEctsDesc[1].textContent = "successfully participated";
    onPageEctsDesc[2].textContent = "confirmed";
    onPageEctsDesc[3].textContent = "uncategorised";
    footerContent[0].textContent = "Be aware of your filters on MyCampus.";
    footerContent[1].textContent =
      "Please note the number of ECTS points may be incorrect. You have no guarantee for these points. No data is saved or analysed by this extension.";
  } else {
    notOnPage.getElementsByTagName("p")[0].textContent =
      "Um deine aktuellen ECTS-Punkte zu sehen";
    notOnPage.getElementsByTagName("h1")[0].textContent = "Login bei MyCampus";
    notOnPage.getElementsByTagName("a")[0].textContent = "Zu MyCampus";
    onPage.getElementsByTagName("p")[0].textContent = "Du hast derzeit";
    onPageEctsDesc[0].textContent = " ECTS-Punkte";
    onPageEctsDesc[1].textContent = "Erfolgreich teilgenommen";
    onPageEctsDesc[2].textContent = "Bestätigt";
    onPageEctsDesc[3].textContent = "Unkategorisiert";
    footerContent[0].textContent = "Beachte deine Filter auf MyCampus.";
    footerContent[1].textContent =
      "Die angezeigten ECTS-Punkte können inkorrekt sein, es besteht keine Garantie. Diese Erweiterung speichert oder analysiert keine Daten.";
  }
}

// Function to handle language change
function handleLanguageChange() {
  let selectedLanguage = document.querySelector(
    'input[name="languageswitch"]:checked'
  ).value;
  // Update popup content with the selected language
  updatePopupLanguage(selectedLanguage);
  // Save the new language preference
  chrome.storage.sync.set({ language: selectedLanguage }, function () {
    console.log("Language preference saved:", selectedLanguage);
  });
}

// Listen for change event on radio buttons
let languageRadios = document.querySelectorAll('input[name="languageswitch"]');
languageRadios.forEach(function (radio) {
  radio.addEventListener("change", handleLanguageChange);
});

// Get saved Language
chrome.storage.sync.get("language", function (data) {
  let selectedLanguage = data.language || "en";
  console.log(selectedLanguage);
  // Set the radio button for the saved language preference
  let savedRadio = document.querySelector(
    `input[name="languageswitch"][value="${selectedLanguage}"]`
  );
  console.log(savedRadio);
  if (savedRadio) {
    savedRadio.checked = true;
  }
  updatePopupLanguage(selectedLanguage);
});

// Load content with ECTS
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.sendECTS) {
    let ects = message.sendECTS;
    let onPage = document.getElementById("onPage");
    let ectsDetails = document
      .getElementById("ectsDetails")
      .getElementsByClassName("ectsNum");

    onPage.getElementsByClassName("ectsNum")[0].textContent = ects.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );
    ectsDetails[0].textContent = ects[0];
    ectsDetails[1].textContent = ects[1];

    if (ects[2] > 0) {
      ectsDetails[2].textContent = ects[2];
    } else {
      document.getElementById("ectsUncategorised").style.display = "none";
    }

    document.getElementById("notOnPage").style.display = "none";
    document.getElementById("onPage").style.display = "block";
  }
});

// Ask for URL -> display diffrent content
document.addEventListener("DOMContentLoaded", function () {
  chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
    let url = tabs[0].url;
    if (
      url ==
        "https://mycampus.hslu.ch/de-ch/stud-i/mein-studium/meine-anmeldungen/" ||
      url ==
        "https://mycampus.hslu.ch/en/stud-i/mein-studium/meine-anmeldungen/"
    ) {
      onPage();
    } else {
      notOnPage();
    }
  });
});
