function searchForAbgabetermin() {
  const results = [];
  const allTextNodes = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_TEXT
  );
  let currentNode = allTextNodes.nextNode();

  while (currentNode) {
    if (currentNode.nodeValue.includes("Abgabetermin")) {
      results.push(currentNode.nodeValue);
    }
    currentNode = allTextNodes.nextNode();
  }

  chrome.runtime.sendMessage({ abgabetermin: results });
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.getAbgabetermin) {
    searchForAbgabetermin();
  }
});
