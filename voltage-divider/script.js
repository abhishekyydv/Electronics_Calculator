function calculateVoltageDivider() {
  const vinVal = parseFloat(document.getElementById('vin').value);
  const vinUnit = parseFloat(document.getElementById('vin-unit').value);
  const r1Val = parseFloat(document.getElementById('r1').value);
  const r1Unit = parseFloat(document.getElementById('r1-unit').value);
  const r2Val = parseFloat(document.getElementById('r2').value);
  const r2Unit = parseFloat(document.getElementById('r2-unit').value);

  if (!vinVal || !r1Val || !r2Val || vinVal <= 0 || r1Val <= 0 || r2Val <= 0) {
    alert("Please enter valid positive values for Vin, R1, and R2.");
    return;
  }

  const vin = vinVal * vinUnit;
  const r1 = r1Val * r1Unit;
  const r2 = r2Val * r2Unit;

  const totalResistance = r1 + r2;
  const current = vin / totalResistance;
  const vout = vin * r2 / totalResistance;
  const p1 = current ** 2 * r1;
  const p2 = current ** 2 * r2;

  // Format results nicely
  document.getElementById('vout').textContent = formatVoltage(vout);
  document.getElementById('current').textContent = formatCurrent(current);
  document.getElementById('p1').textContent = formatPower(p1);
  document.getElementById('p2').textContent = formatPower(p2);
}
function goBack() {
  if (window.history.length > 1) {
    window.history.back();
  } else {
    window.location.href = "main.html"; // or your default page
  }
}
function reverseCalculate() {
  const vinVal = parseFloat(document.getElementById('rev-vin').value);
  const vinUnit = parseFloat(document.getElementById('rev-vin-unit').value);
  const voutVal = parseFloat(document.getElementById('rev-vout').value);
  const voutUnit = parseFloat(document.getElementById('rev-vout-unit').value);
  const knownVal = parseFloat(document.getElementById('known-resistor').value);
  const knownUnit = parseFloat(document.getElementById('known-unit').value);
  const knownType = document.getElementById('known-type').value;

  if (!vinVal || !voutVal || !knownVal || vinVal <= 0 || voutVal <= 0 || knownVal <= 0) {
    alert("Please enter valid positive values for Vin, Vout, and known resistor.");
    return;
  }

  const vin = vinVal * vinUnit;
  const vout = voutVal * voutUnit;
  const known = knownVal * knownUnit;

  if (vout >= vin) {
    alert("Vout must be less than Vin.");
    return;
  }

  let missing;

  if (knownType === 'r1') {
    missing = (vout * known) / (vin - vout);
  } else {
    missing = known * (vin - vout) / vout;
  }

  document.getElementById('missing-result').textContent = formatResistance(missing);
}

// Helper formatting functions for nicer output
function formatVoltage(v) {
  if (v >= 1) return v.toFixed(3) + ' V';
  if (v >= 0.001) return (v * 1000).toFixed(2) + ' mV';
  return (v * 1_000_000).toFixed(1) + ' µV';
}

function formatCurrent(i) {
  if (i >= 1) return i.toExponential(3) + ' A';
  if (i >= 0.001) return (i * 1000).toFixed(3) + ' mA';
  return (i * 1_000_000).toFixed(2) + ' µA';
}

function formatPower(p) {
  if (p >= 1) return p.toFixed(4) + ' W';
  if (p >= 0.001) return (p * 1000).toFixed(4) + ' mW';
  return (p * 1_000_000).toFixed(2) + ' µW';
}

function formatResistance(r) {
  if (r >= 1_000_000) return (r / 1_000_000).toFixed(3) + ' MΩ';
  if (r >= 1000) return (r / 1000).toFixed(3) + ' kΩ';
  return r.toFixed(2) + ' Ω';
}
