function getStudentData() {
  function getTextByLabel(label) {
    const dtElements = document.querySelectorAll("dt");
    for (let dt of dtElements) {
      if (dt.textContent.trim() === label) {
        const dd = dt.nextElementSibling;
        if (dd && dd.tagName === "DD") {
          const p = dd.querySelector("p");
          if (p) {
            return p.textContent.trim();
          }
        }
      }
    }
    return null;
  }

  const vorname = getTextByLabel("Vorname");
  const nachname = getTextByLabel("Nachname");
  const matrikelnummer = getTextByLabel("Matrikelnummer");
  const email = getTextByLabel("E-Mail Adresse");

  return {
    vorname,
    nachname,
    matrikelnummer,
    email,
  };
}

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.getStudentData) {
    sendResponse(getStudentData());
  }
});
