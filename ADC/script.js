function goBack() {
  window.history.length > 1 ? window.history.back() : window.location.href = "main.html";
}

function calculateADC() {
  const bits = parseInt(document.getElementById("bits").value);
  const analog = parseFloat(document.getElementById("analog").value);
  const vref = parseFloat(document.getElementById("vref").value);
  const analogFactor = parseFloat(document.getElementById("analog-unit").value);
  const vrefFactor = parseFloat(document.getElementById("vref-unit").value);

  if (!bits || !analog || !vref || bits < 1 || analog <= 0 || vref <= 0) {
    alert("Please enter valid positive numbers.");
    return;
  }

  const analogV = analog * analogFactor;
  const refV = vref * vrefFactor;

  const maxDigital = Math.pow(2, bits) - 1;
  let digitalOutput = (analogV / refV) * maxDigital;
  digitalOutput = Math.round(Math.min(digitalOutput, maxDigital));

  const binaryOutput = digitalOutput.toString(2).padStart(bits, "0");

  document.getElementById("numeric-output").textContent = digitalOutput;
  document.getElementById("binary-output").textContent = binaryOutput;
}

function resetADC() {
  document.querySelectorAll("input").forEach(input => input.value = "");
  document.getElementById("numeric-output").textContent = "—";
  document.getElementById("binary-output").textContent = "—";
  document.getElementById("analog-unit").selectedIndex = 0;
  document.getElementById("vref-unit").selectedIndex = 0;
}
