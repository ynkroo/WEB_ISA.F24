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

// Always ask for URL and display content accordingly
document.addEventListener("DOMContentLoaded", function () {
  onPage();
});
