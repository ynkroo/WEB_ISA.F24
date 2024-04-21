document.addEventListener("DOMContentLoaded", async function () {
  const assignmentsDiv = document.getElementById("assignments");
  try {
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });
    chrome.scripting.executeScript(
      {
        target: { tabId: tab.id },
        function: scrapeData,
      },
      (results) => {
        // results[0].result is the array returned from scrapeData function
        if (results && results.length > 0 && results[0].result.length > 0) {
          results[0].result.forEach((result) => {
            const content = document.createElement("div");
            content.innerHTML = `<strong>${result.title}</strong><p>${result.description}</p>`;
            assignmentsDiv.appendChild(content);
          });
        } else {
          assignmentsDiv.innerHTML = "<p>No open assignments found.</p>";
        }
      }
    );
  } catch (error) {
    console.error("Error:", error);
    assignmentsDiv.textContent = "Failed to fetch assignments.";
  }
});

function scrapeData() {
  var data = [];
  var courses = document.querySelectorAll(".il-item-group-items");
  courses.forEach((course) => {
    const title = course.querySelector(".il-item-title a").innerText;
    const description = course.querySelector(".il-item-description").innerText;
    data.push({ title, description });
  });
  return data;
}
