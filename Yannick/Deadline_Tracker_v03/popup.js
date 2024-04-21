document.addEventListener("DOMContentLoaded", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(
      tabs[0].id,
      { action: "getData" },
      function (response) {
        const dataList = document.getElementById("dataList");
        if (
          response &&
          response.data.length > 0 &&
          response.data[0].term !== "No data found"
        ) {
          response.data.forEach((item) => {
            const li = document.createElement("li");
            li.textContent = `Term: ${item.term}, Due Date: ${item.dueDate}, Deadline Period: ${item.deadlinePeriod}`;
            dataList.appendChild(li);
          });
        } else {
          dataList.innerHTML = "<li>No data found</li>";
        }
      }
    );
  });
});
