document.addEventListener("DOMContentLoaded", function () {
  chrome.runtime.onMessage.addListener(function (
    message,
    sender,
    sendResponse
  ) {
    if (message.abgabetermin) {
      const container = document.getElementById("results");
      container.innerHTML = "";
      message.abgabetermin.forEach((term) => {
        const div = document.createElement("div");
        div.textContent = term;
        container.appendChild(div);
      });
    }
  });

  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { getAbgabetermin: true });
  });
});
