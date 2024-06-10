function getECTS() {
  let ects = [0, 0, 0];

  function isNumber(value) {
    return typeof value === "number" && !isNaN(value);
  }

  function searchForEcts(element) {
    let ects = 0;
    if (element) {
      if (element.nodeType === Node.TEXT_NODE) {
        if (element.textContent.includes("ECTS")) {
          ects = Number(element.parentElement.nextElementSibling.innerHTML);
          if (isNumber(ects)) {
            return ects;
          }
        }
      } else {
        if (element.childNodes.length > 0) {
          element.childNodes.forEach(function (child) {
            ects += searchForEcts(child);
          });
        }
      }
    }
    return ects;
  }

  document
    .getElementById("fl")
    .querySelectorAll("li.list-item")
    .forEach(function (liElement) {
      let ectsTemp = searchForEcts(liElement);
      let ects_kategorie = liElement
        .getElementsByClassName("information")[1]
        .firstElementChild.textContent.trim();
      if (ects_kategorie == "Erfolgreich teilgenommen") {
        ects[0] += ectsTemp;
      } else if (ects_kategorie == "Bestätigt") {
        ects[1] += ectsTemp;
      } else {
        ects[2] += ectsTemp;
      }
    });

  chrome.runtime.sendMessage({ sendECTS: ects });
}

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.getECTS) {
    chrome.scripting.executeScript({
      target: { tabId: sender.tab.id },
      function: getECTS,
    });
  }
});

// Name
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.getStudentData) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const tab = tabs[0];
      if (
        tab.url.includes(
          "https://mycampus.hslu.ch/de-ch/stud-dfk/mein-studium/meine-daten/"
        )
      ) {
        chrome.tabs.sendMessage(
          tab.id,
          { getStudentData: true },
          function (response) {
            sendResponse(response);
          }
        );
      } else {
        sendResponse(null);
      }
    });
    return true; // Keep the message channel open for sendResponse
  }
});

//Refresh
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.getStudentData) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const tab = tabs[0];
      if (
        tab.url.includes(
          "https://mycampus.hslu.ch/de-ch/stud-dfk/mein-studium/meine-daten/"
        )
      ) {
        chrome.tabs.sendMessage(
          tab.id,
          { getStudentData: true },
          function (response) {
            sendResponse(response);
          }
        );
      } else {
        sendResponse(null);
      }
    });
    return true; // Keep the message channel open for sendResponse
  }
});
