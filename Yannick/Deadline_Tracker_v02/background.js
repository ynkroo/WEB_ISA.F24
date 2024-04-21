function getOpenAssignments() {
  let assignments = {
    open: [],
    inProgress: [],
    completed: [],
  };

  function searchForAssignments(element) {
    let assignmentData = null;
    if (element) {
      if (
        element.nodeType === Node.TEXT_NODE &&
        element.textContent.includes("due")
      ) {
        const description = element.textContent.trim();
        const title = element.parentElement
          .querySelector(".assignment-title")
          .textContent.trim();
        assignmentData = { title, description };
      } else if (element.childNodes.length > 0) {
        element.childNodes.forEach((child) => {
          const childData = searchForAssignments(child);
          if (childData) {
            assignmentData = childData; // Assumes only one assignment data per element hierarchy
          }
        });
      }
    }
    return assignmentData;
  }

  document.querySelectorAll("li.assignment-item").forEach(function (liElement) {
    const assignmentData = searchForAssignments(liElement);
    if (assignmentData) {
      const statusText = liElement
        .getElementsByClassName("status")[0]
        .textContent.trim()
        .toLowerCase();
      if (statusText === "open") {
        assignments.open.push(assignmentData);
      } else if (statusText === "in progress") {
        assignments.inProgress.push(assignmentData);
      } else if (statusText === "completed") {
        assignments.completed.push(assignmentData);
      }
    }
  });

  chrome.runtime.sendMessage({ sendAssignments: assignments });
}

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.getAssignments) {
    chrome.scripting.executeScript({
      target: { tabId: sender.tab.id },
      function: getOpenAssignments,
    });
  }
});
