chrome.runtime.onInstalled.addListener(function () {
  chrome.action.onClicked.addListener(function (tab) {
    chrome.scripting.executeScript(
      {
        target: { tabId: tab.id },
        files: ["contentScript.js"],
      },
      () => {
        chrome.tabs.sendMessage(tab.id, { getAbgabetermin: true });
      }
    );
  });
});
