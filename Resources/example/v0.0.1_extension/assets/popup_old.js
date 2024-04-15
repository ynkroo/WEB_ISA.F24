function getECTS() {
  const ECTS = document.querySelector('h1')?.innerText || 'No h1 found';
  chrome.runtime.sendMessage({ECTS: ECTS});
}

function onPage() {
  // Get Tab and ask to run function for this Tab
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.scripting.executeScript({
      target: {tabId: tabs[0].id},
      function: getECTS
    });
  });
}

function notOnPage() {}

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  if (message.ECTS) {
    //document.getElementById('h1Text').textContent = message.h1Text;
    alert(message.ECTS);
  }
});





chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
  let url = tabs[0].url;
  if (
    url ==
      "https://mycampus.hslu.ch/de-ch/stud-i/mein-studium/meine-anmeldungen/" ||
    url == "https://mycampus.hslu.ch/en/stud-i/mein-studium/meine-anmeldungen/"
  ) {
    onPage();
  } else {
    notOnPage();
  }
});