document.addEventListener("DOMContentLoaded", function () {
  function updateProgressBar(
    normalProgressId,
    overflowProgressId,
    inputValue,
    maxValue,
    thresholdValue
  ) {
    // Berechnung der prozentualen Breite auf der Grundlage von maxValue
    let totalPercentage = (inputValue / maxValue) * 100;
    let normalPercentage = Math.min(
      (thresholdValue / maxValue) * 100,
      totalPercentage
    );
    let overflowPercentage =
      totalPercentage > normalPercentage
        ? totalPercentage - normalPercentage
        : 0;

    // Abrufen der Fortschrittselemente
    const normalProgressElement = document.getElementById(normalProgressId);
    const overflowProgressElement = document.getElementById(overflowProgressId);

    if (normalProgressElement && overflowProgressElement) {
      normalProgressElement.style.width = normalPercentage + "%";
      overflowProgressElement.style.width = overflowPercentage + "%";
      overflowProgressElement.style.left = normalPercentage + "%";
    } else {
      console.error("Progress elements not found"); // Debugging
    }
  }

  // Erste Nummer aktuelle ECTS Punkte, Max Value und Threshold Value
  updateProgressBar("normal-progress-1", "overflow-progress-1", 33, 40, 30);
  updateProgressBar("normal-progress-2", "overflow-progress-2", 25, 40, 30);
});
