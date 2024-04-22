chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ courses: [] });
  fetchData();
  setInterval(fetchData, 1000 * 60 * 60); // Update every hour
});

function fetchData() {
  fetch(
    "https://mycampus.hslu.ch/en/api/calabo/load/?q=9716551c195648d7b4fa3bbf256c639cc8d6d3b217601292f243d20552ea5b1a&t=c69efea6-c9cb-4a26-956a-ec1c8c3e2b09&k=1"
  )
    .then((response) => response.json())
    .then((data) => {
      const filteredCourses = data.filter(
        (course) => course.courseId === "I.BA_WEB_ISA.F2402"
      );
      chrome.storage.local.set({ courses: filteredCourses });
    });
}
