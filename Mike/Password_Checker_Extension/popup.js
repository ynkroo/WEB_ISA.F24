function checkPassword() {
  var password = document.getElementById("passwordInput").value;
  var result = document.getElementById("result");
  var lengthCheckbox = document.getElementById("lengthCheckbox");
  var uppercaseCheckbox = document.getElementById("uppercaseCheckbox");
  var lowercaseCheckbox = document.getElementById("lowercaseCheckbox");
  var numberCheckbox = document.getElementById("numberCheckbox");

  lengthCheckbox.checked = password.length >= 8;

  uppercaseCheckbox.checked = /[A-Z]/.test(password);

  lowercaseCheckbox.checked = /[a-z]/.test(password);

  numberCheckbox.checked = /\d/.test(password);

  if (
    lengthCheckbox.checked &&
    uppercaseCheckbox.checked &&
    lowercaseCheckbox.checked &&
    numberCheckbox.checked
  ) {
    result.innerText = "Password is strong!";
  } else {
    result.innerText = "Password is not strong enough.";
  }
}
