function checkPassword() {
  var password = document.getElementById("passwordInput").value;
  var result = document.getElementById("result");
  var lengthCheckbox = document.getElementById("lengthCheckbox");
  var uppercaseCheckbox = document.getElementById("uppercaseCheckbox");
  var lowercaseCheckbox = document.getElementById("lowercaseCheckbox");
  var numberCheckbox = document.getElementById("numberCheckbox");

  // Überprüfen der Länge des Passworts
  lengthCheckbox.checked = password.length >= 8;

  // Überprüfen auf Großbuchstaben
  uppercaseCheckbox.checked = /[A-Z]/.test(password);

  // Überprüfen auf Kleinbuchstaben
  lowercaseCheckbox.checked = /[a-z]/.test(password);

  // Überprüfen auf Zahlen
  numberCheckbox.checked = /\d/.test(password);

  // Ergebnis ausgeben
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
