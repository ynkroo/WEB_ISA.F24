document.getElementById("pressButton").addEventListener("click", function () {
  var length = "16"; // Set the desired password length
  $.ajax({
    method: "GET",
    url: "https://api.api-ninjas.com/v1/passwordgenerator?length=" + length,
    headers: { "X-Api-Key": "ZKP99o/G0eFhdyeBXAQzYA==2r9G6HKH49yu9Edq" }, // Replace 'YOUR_API_KEY' with your actual API key
    contentType: "application/json",
    success: function (result) {
      console.log(result);
      document.getElementById("passwordBox").value = result.password; // Assuming the API returns an object with a 'password' property
    },
    error: function ajaxError(jqXHR) {
      console.error("Error: ", jqXHR.responseText);
      document.getElementById("passwordBox").value =
        "Error generating password";
    },
  });
});
