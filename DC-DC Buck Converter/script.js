function isValidNumber(value) {
  return value !== "" && !isNaN(parseFloat(value));
}

function roundTo(value, decimals = 3) {
  return Number(parseFloat(value).toFixed(decimals));
}

function calculate() {
  const vin = parseFloat(document.getElementById("vin").value);
  const vout = parseFloat(document.getElementById("vout").value);
  const iout = parseFloat(document.getElementById("iout").value);
  const freq = parseFloat(document.getElementById("freq").value);
  const rippleI = parseFloat(document.getElementById("rippleI").value);
  const rippleV = parseFloat(document.getElementById("rippleV").value);
  const turns = parseFloat(document.getElementById("turns").value);
  const corePermeability = parseFloat(document.getElementById("corePermeability").value);
  const meanLength = parseFloat(document.getElementById("meanLength").value);
  const customNumWires = parseFloat(document.getElementById("numWires").value);

  const outputFields = [
    "dutyCycle",
    "powerInductor",
    "outputCapacitor",
    "peakCurrent",
    "inductorCoreArea",
    "fluxDensity",
    "totalWireArea",
    "singleWireArea",
    "penetrationDepth",
    "minWires",
    "wireDiameter",
  ];

  outputFields.forEach(id => {
    document.getElementById(id).value = "";
  });

  if (!isValidNumber(vin) || !isValidNumber(vout) || !isValidNumber(iout) || !isValidNumber(freq)) return;

  let dutyCycle = vout / vin;
  if (dutyCycle > 1) dutyCycle = 1;

  let peakCurrent = iout;
  if (isValidNumber(rippleI)) peakCurrent += rippleI / 2;

  let powerInductor = NaN;
  if (isValidNumber(rippleI)) {
    powerInductor = ((vin - vout) * dutyCycle) / (freq * rippleI);
    powerInductor *= 1e6; // µH
  }

  let outputCapacitor = NaN;
  if (isValidNumber(rippleV)) {
    outputCapacitor = rippleI / (8 * freq * rippleV);
    outputCapacitor *= 1e6; // µF
  }

  // ✅ Updated Inductor Core Area Formula:
  let inductorCoreArea = NaN;
  if (
    isValidNumber(powerInductor) &&
    isValidNumber(meanLength) &&
    isValidNumber(corePermeability) &&
    isValidNumber(turns)
  ) {
    const L = powerInductor * 1e-6; // µH to H
    const l = meanLength * 1e-3;    // mm to m
    const mu = corePermeability;   // already in µH
    const N = turns;

    const numerator = L * l;
    const denominator = 4 * Math.PI * 1e-7 * mu * N * N;

    inductorCoreArea = (numerator / denominator) * 1e6; // m² to mm²
  }

  let fluxDensity = NaN;
  if (
    isValidNumber(powerInductor) &&
    isValidNumber(peakCurrent) &&
    isValidNumber(inductorCoreArea) &&
    isValidNumber(turns) &&
    turns !== 0
  ) {
    fluxDensity = (powerInductor * 1e-6 * peakCurrent) / (inductorCoreArea * turns * 1e-6);
  }

  let totalWireArea = NaN;
  if (isValidNumber(peakCurrent)) {
    totalWireArea = peakCurrent / 3.27; // Assuming 3.27 A/mm²
  }

  // ✅ Penetration Depth = 66.1 / sqrt(freq)
  let penetrationDepth = NaN;
  if (isValidNumber(freq)) {
    penetrationDepth = 66.1 / Math.sqrt(freq);
  }

  // ✅ Min wires based on penetration depth
  let minWires = 1;
  if (isValidNumber(totalWireArea) && isValidNumber(penetrationDepth)) {
    minWires = totalWireArea > (2 * penetrationDepth) ? 2 : 1;
  }

  let singleWireArea = NaN;
  if (isValidNumber(totalWireArea) && minWires > 0) {
    singleWireArea = totalWireArea / minWires;
  }

  let wireDiameter = NaN;
  if (isValidNumber(singleWireArea)) {
    wireDiameter = 2 * Math.sqrt(singleWireArea / Math.PI);
  }

  // Output values
  document.getElementById("dutyCycle").value = roundTo(dutyCycle * 100, 3);
  if (!isNaN(powerInductor)) document.getElementById("powerInductor").value = roundTo(powerInductor, 3);
  if (!isNaN(outputCapacitor)) document.getElementById("outputCapacitor").value = roundTo(outputCapacitor, 3);
  if (!isNaN(peakCurrent)) document.getElementById("peakCurrent").value = roundTo(peakCurrent, 3);
  if (!isNaN(inductorCoreArea)) document.getElementById("inductorCoreArea").value = roundTo(inductorCoreArea, 3);
  if (!isNaN(fluxDensity)) document.getElementById("fluxDensity").value = roundTo(fluxDensity, 5);
  if (!isNaN(totalWireArea)) document.getElementById("totalWireArea").value = roundTo(totalWireArea, 3);
  if (!isNaN(singleWireArea)) document.getElementById("singleWireArea").value = roundTo(singleWireArea, 3);
  if (!isNaN(penetrationDepth)) document.getElementById("penetrationDepth").value = roundTo(penetrationDepth, 3);
  document.getElementById("minWires").value = minWires;
  if (!isNaN(wireDiameter)) document.getElementById("wireDiameter").value = roundTo(wireDiameter, 3);
}
function goBack() {
  if (window.history.length > 1) {
    window.history.back();
  } else {
    window.location.href = "main.html"; // or your default page
  }
}
function resetForm() {
  const inputs = document.querySelectorAll(".input-section input");
  inputs.forEach(input => (input.value = ""));
  const outputs = document.querySelectorAll(".output-section input");
  outputs.forEach(output => (output.value = ""));
}

document.getElementById("calculateBtn").addEventListener("click", calculate);
document.getElementById("resetBtn").addEventListener("click", resetForm);
