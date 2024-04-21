function getECTS() {
  console.log("getECTS function executed"); // Diagnostic log
  let ects = [0, 0, 0];

  function isNumber(value) {
    return typeof value === "number" && isFinite(value);
  }

  function searchForEcts(element) {
    let ects = 0;
    if (element) {
      if (
        element.nodeType === Node.TEXT_NODE &&
        element.textContent.includes("ECTS")
      ) {
        let possibleEcts = parseFloat(
          element.parentElement.nextElementSibling.textContent
        );
        if (isNumber(possibleEcts)) {
          return possibleEcts;
        }
      } else if (element.childNodes.length > 0) {
        element.childNodes.forEach((child) => {
          ects += searchForEcts(child);
        });
      }
    }
    return ects;
  }

  document.querySelectorAll("#fl li.list-item").forEach((liElement) => {
    let ectsTemp = searchForEcts(liElement);
    console.log("ECTS found:", ectsTemp); // Diagnostic log
    let ectsCategoryElement = liElement.querySelector(".information span");
    if (ectsCategoryElement) {
      let ectsCategory = ectsCategoryElement.textContent.trim();
      console.log("Category:", ectsCategory); // Diagnostic log
      if (
        ectsCategory === "Erfolgreich teilgenommen" ||
        ectsCategory === "successfully participated"
      ) {
        ects[0] += ectsTemp;
      } else if (ectsCategory === "Bestätigt" || ectsCategory === "confirmed") {
        ects[1] += ectsTemp;
      } else {
        ects[2] += ectsTemp;
      }
    }
  });

  console.log("Total ECTS:", ects); // Diagnostic log
  chrome.runtime.sendMessage({ sendECTS: ects });
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.getECTS) {
    chrome.scripting.executeScript({
      target: { tabId: sender.tab.id },
      function: getECTS,
    });
  }
});
