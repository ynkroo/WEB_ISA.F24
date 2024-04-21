function searchForOpenAssignments() {
  const results = [];
  const allTextNodes = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_TEXT,
    {
      acceptNode: function (node) {
        // You can modify the condition here based on how open assignments are marked in the text
        if (
          node.nodeValue.includes("Open") ||
          node.nodeValue.includes("Due Soon")
        ) {
          return NodeFilter.FILTER_ACCEPT;
        }
      },
    },
    false
  );

  let currentNode = allTextNodes.nextNode();
  while (currentNode) {
    // Here, you might want to fetch more than just the nodeValue if you need additional details like the assignment name or link
    const detailElement = currentNode.parentNode; // This depends on the actual structure
    const assignmentName = detailElement.previousElementSibling.textContent;
    results.push({ name: assignmentName, due: currentNode.nodeValue.trim() });
    currentNode = allTextNodes.nextNode();
  }

  chrome.runtime.sendMessage({ openAssignments: results });
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.getOpenAssignments) {
    searchForOpenAssignments();
  }
});
