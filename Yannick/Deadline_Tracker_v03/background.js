chrome.runtime.onInstalled.addListener(() => {
  console.log("Extension successfully installed");
});

chrome.runtime.onStartup.addListener(() => {
  console.log("Extension starting up");
});
