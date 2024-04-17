document.getElementById("pressButton").addEventListener("click", function () {
  var length = "16"; // Set the desired password length
  $.ajax({
    method: "GET",
    url: "https://api.api-ninjas.com/v1/passwordgenerator?length=" + length,
    headers: { "X-Api-Key": "ZKP99o/G0eFhdyeBXAQzYA==2r9G6HKH49yu9Edq" }, // Ensure this is the correct API key
    contentType: "application/json",
    success: function (result) {
      console.log("Received result:", result); // Debug the full result
      if (result.random_password) {
        document.getElementById("passwordBox").value = result.random_password;
      } else {
        console.error("Random password not available in the result:", result);
        document.getElementById("passwordBox").value = "No password received";
      }
    },
    error: function ajaxError(jqXHR) {
      console.error("Error: ", jqXHR.responseText);
      document.getElementById("passwordBox").value = "Error occurred";
    },
  });
});
