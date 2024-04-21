document.addEventListener("DOMContentLoaded", function () {
  const url =
    "https://mycampus.hslu.ch/de-ch/stud-i/mein-studium/meine-anmeldungen/";

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      return response.text();
    })
    .then((data) => {
      console.log("Data fetched:", data); // Debug: log fetched data
      // Parsing and DOM manipulation logic here
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
});

fetch(url)
  .then((response) => {
    if (!response.ok) {
      throw new Error("Failed to fetch: " + response.statusText);
    }
    return response.text();
  })
  .then((data) => {
    // Process data
  })
  .catch((error) => {
    console.error("Error during fetch:", error);
  });
