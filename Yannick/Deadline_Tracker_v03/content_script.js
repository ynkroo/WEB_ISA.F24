// Function to find and highlight terms and capture associated data
function highlightAndExtractData() {
  const data = [];
  document.body.innerHTML = document.body.innerHTML.replace(
    /(Abgabetermin|Abgabefrist)/gi,
    (matched) => {
      return `<span class="highlighted" style="background-color: yellow;">${matched}</span>`;
    }
  );

  const highlightedTerms = document.querySelectorAll(".highlighted");

  highlightedTerms.forEach((term) => {
    // Assuming the date and period information is contained within specific elements near the highlighted term
    let dueDate = term.nextElementSibling
      ? term.nextElementSibling.textContent
      : "Not specified";
    let deadlinePeriod = term.parentElement.nextElementSibling
      ? term.parentElement.nextElementSibling.textContent
      : "Not specified";

    data.push({
      term: term.textContent,
      dueDate: dueDate,
      deadlinePeriod: deadlinePeriod,
    });
  });

  return data;
}

// Message listener to respond to popup requests
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getData") {
    const extractedData = highlightAndExtractData();
    sendResponse({
      data:
        extractedData.length > 0
          ? extractedData
          : [{ term: "No data found", dueDate: "", deadlinePeriod: "" }],
    });
  }
  return true; // keep the message channel open for the response
});
