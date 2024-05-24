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
});

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
