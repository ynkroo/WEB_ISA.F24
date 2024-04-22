document.addEventListener("DOMContentLoaded", function () {
  chrome.storage.local.get("courses", function (data) {
    const scheduleElement = document.getElementById("schedule");
    data.courses.forEach((course) => {
      const div = document.createElement("div");
      div.textContent = `Course: ${course.name} - Time: ${course.time}`;
      scheduleElement.appendChild(div);
    });
  });
});
