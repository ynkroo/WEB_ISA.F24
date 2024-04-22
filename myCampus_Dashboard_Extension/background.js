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
      if (
        ects_kategorie == "Erfolgreich teilgenommen" ||
        ects_kategorie == "successfully participated"
      ) {
        ects[0] += ectsTemp;
      } else if (
        ects_kategorie == "Bestätigt" ||
        ects_kategorie == "confirmed"
      ) {
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
