function getECTS() {
  let ects = [0, 0, 0]; // Array to hold ECTS for Successfully Participated, Confirmed, and Other

  function isNumber(value) {
    return typeof value === "number" && !isNaN(value);
  }

  function searchForEcts(element) {
    let ects = 0;
    if (element) {
      if (
        element.nodeType === Node.TEXT_NODE &&
        element.textContent.includes("ECTS")
      ) {
        let ectsValue = element.textContent.match(/\d+/); // Extract numbers from the text containing 'ECTS'
        if (ectsValue && ectsValue.length > 0) {
          ects = parseInt(ectsValue[0], 10);
          if (isNumber(ects)) {
            return ects;
          }
        }
      } else if (element.childNodes.length > 0) {
        element.childNodes.forEach((child) => {
          ects += searchForEcts(child);
        });
      }
    }
    return ects;
  }

  document.querySelectorAll(".list-item").forEach(function (liElement) {
    let ectsTemp = searchForEcts(liElement);
    let ectsCategory = liElement.querySelector(".information")
      ? liElement.querySelector(".information").textContent.trim()
      : "";

    if (ectsCategory === "Erfolgreich teilgenommen") {
      ects[0] += ectsTemp;
    } else if (ectsCategory === "Bestätigt") {
      ects[1] += ectsTemp;
    }
  });

  // Calculate the total ECTS for 'Successfully Participated' and 'Confirmed'
  let totalECTS = ects[0] + ects[1];

  // Update the .ectsNum elements with the total ECTS
  document.querySelectorAll(".ectsNum").forEach((element) => {
    element.textContent = `Total ECTS: ${totalECTS}`;
  });
}

// Example of how to invoke this function on document load or based on some event
document.addEventListener("DOMContentLoaded", function () {
  getECTS();
});
