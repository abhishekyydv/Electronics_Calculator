const colorCodes = [
  { color: "black", value: 0, multiplier: 1, tolerance: null },
  { color: "brown", value: 1, multiplier: 10, tolerance: 1 },
  { color: "red", value: 2, multiplier: 100, tolerance: 2 },
  { color: "orange", value: 3, multiplier: 1000, tolerance: null },
  { color: "yellow", value: 4, multiplier: 10000, tolerance: null },
  { color: "green", value: 5, multiplier: 100000, tolerance: 0.5 },
  { color: "blue", value: 6, multiplier: 1000000, tolerance: 0.25 },
  { color: "violet", value: 7, multiplier: 10000000, tolerance: 0.1 },
  { color: "gray", value: 8, multiplier: 100000000, tolerance: 0.05 },
  { color: "white", value: 9, multiplier: 1000000000, tolerance: null },
  { color: "gold", value: null, multiplier: 0.1, tolerance: 5 },
  { color: "silver", value: null, multiplier: 0.01, tolerance: 10 }
];

let selectedBandCount = 0;

function setBandCount() {
  selectedBandCount = parseInt(document.getElementById("band-count").value);
  const selectorDiv = document.getElementById("band-selectors");
  selectorDiv.innerHTML = "";

  for (let i = 1; i <= selectedBandCount; i++) {
    const select = document.createElement("select");
    select.id = `band${i}-select`;
    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.text = `Band ${i}`;
    select.appendChild(defaultOption);

    colorCodes.forEach(code => {
      const opt = document.createElement("option");
      opt.value = code.color;
      opt.text = code.color.charAt(0).toUpperCase() + code.color.slice(1);
      select.appendChild(opt);
    });

    select.addEventListener("change", () => {
      document.getElementById(`band${i}`).style.backgroundColor = select.value || "transparent";
      updateFormula();
      clearResult();
    });

    selectorDiv.appendChild(select);
  }

  for (let i = 1; i <= 6; i++) {
    const band = document.getElementById(`band${i}`);
    band.style.display = i <= selectedBandCount ? "block" : "none";
    band.style.backgroundColor = "transparent";
  }

  document.getElementById("result").innerText = "";
  document.getElementById("formula").innerText = "";
  document.getElementById("reverse-result").innerText = "";
}
function goBack() {
  if (window.history.length > 1) {
    window.history.back();
  } else {
    window.location.href = "main.html"; // or your default page
  }
}
function calculateResistance() {
  const values = [];
  for (let i = 1; i <= selectedBandCount; i++) {
    const color = document.getElementById(`band${i}-select`).value;
    if (!color) {
      return showError();
    }
    values.push(colorCodes.find(c => c.color === color));
  }

  if (selectedBandCount === 4) {
    if (values[0]?.value === undefined || values[1]?.value === undefined || values[2]?.multiplier === undefined) {
      return showError();
    }
    const resistance = ((values[0].value * 10 + values[1].value) * values[2].multiplier);
    const tolerance = values[3]?.tolerance ?? '';
    showResult(resistance, tolerance);
  }

  if (selectedBandCount === 5) {
    if (values[0]?.value === undefined || values[1]?.value === undefined || values[2]?.value === undefined || values[3]?.multiplier === undefined) {
      return showError();
    }
    const resistance = ((values[0].value * 100 + values[1].value * 10 + values[2].value) * values[3].multiplier);
    const tolerance = values[4]?.tolerance ?? '';
    showResult(resistance, tolerance);
  }

  if (selectedBandCount === 6) {
    if (values[0]?.value === undefined || values[1]?.value === undefined || values[2]?.value === undefined || values[3]?.multiplier === undefined) {
      return showError();
    }
    const resistance = ((values[0].value * 100 + values[1].value * 10 + values[2].value) * values[3].multiplier);
    const tolerance = values[4]?.tolerance ?? '';
    showResult(resistance, tolerance);
  }
}

function showResult(value, tolerance) {
  const display = value >= 1e6
    ? (value / 1e6).toFixed(2) + " MΩ"
    : value >= 1e3
    ? (value / 1e3).toFixed(2) + " kΩ"
    : value + " Ω";

  document.getElementById("result").innerText = `Resistance: ${display}${tolerance ? ` ±${tolerance}%` : ""}`;
}

function showError() {
  document.getElementById("result").innerText = "⚠️ Please select all required bands correctly.";
}

function resetAll() {
  document.getElementById("band-count").value = "";
  document.getElementById("band-selectors").innerHTML = "";
  document.getElementById("result").innerText = "";
  document.getElementById("formula").innerText = "";
  document.getElementById("reverse-result").innerText = "";
  for (let i = 1; i <= 6; i++) {
    const band = document.getElementById(`band${i}`);
    band.style.backgroundColor = "transparent";
    band.style.display = "none";
  }
}

// Live formula breakdown update on color change
function updateFormula() {
  const values = [];
  for (let i = 1; i <= selectedBandCount; i++) {
    const select = document.getElementById(`band${i}-select`);
    if (!select) continue;
    const color = select.value;
    if (!color) {
      document.getElementById("formula").innerText = "";
      return;
    }
    values.push(colorCodes.find(c => c.color === color));
  }
  if (values.length !== selectedBandCount) {
    document.getElementById("formula").innerText = "";
    return;
  }

  let formulaText = "";
  if (selectedBandCount === 4) {
    if (values[0]?.value === undefined || values[1]?.value === undefined || values[2]?.multiplier === undefined) {
      document.getElementById("formula").innerText = "";
      return;
    }
    const digits = `${values[0].value}${values[1].value}`;
    const multiplier = values[2].multiplier;
    formulaText += `Resistance = (${digits}) × ${multiplier}\n`;
    formulaText += `= ${digits * multiplier} Ω`;
  }
  else if (selectedBandCount === 5 || selectedBandCount === 6) {
    if (values[0]?.value === undefined || values[1]?.value === undefined || values[2]?.value === undefined || values[3]?.multiplier === undefined) {
      document.getElementById("formula").innerText = "";
      return;
    }
    const digits = `${values[0].value}${values[1].value}${values[2].value}`;
    const multiplier = values[3].multiplier;
    formulaText += `Resistance = (${digits}) × ${multiplier}\n`;
    formulaText += `= ${digits * multiplier} Ω`;
  } else {
    document.getElementById("formula").innerText = "";
    return;
  }
  document.getElementById("formula").innerText = formulaText;
}

function clearResult() {
  document.getElementById("result").innerText = "";
  document.getElementById("formula").innerText = "";
}

// Reverse calculator function
function reverseCalculate() {
  const input = document.getElementById("reverse-input").value.trim().toLowerCase();
  if (!input) {
    document.getElementById("reverse-result").innerText = "⚠️ Please enter a resistance value.";
    return;
  }

  // Parse input like 4.7k, 4700, 10M, etc.
  let value = parseFloat(input);
  if (isNaN(value)) {
    document.getElementById("reverse-result").innerText = "⚠️ Invalid resistance format.";
    return;
  }

  if (input.endsWith("k")) value *= 1e3;
  else if (input.endsWith("m")) value *= 1e6;
  else if (input.endsWith("g")) value *= 1e9;

  // We'll find the best matching color bands for 4, 5, and 6 band resistors (just digits+multiplier)
  // For simplicity, let's do 4-band pattern here: 2 digits + multiplier

  // Find multiplier index closest to value's magnitude
  const multipliers = colorCodes.filter(c => c.multiplier !== null);
  let bestCombo = null;
  let smallestDiff = Infinity;

  multipliers.forEach(mult => {
    const base = value / mult.multiplier;
    if (base < 10 || base >= 100) return; // two digit number only for 4 band
    const digitsRounded = Math.round(base);
    if (digitsRounded < 10 || digitsRounded >= 100) return;

    // Extract digits
    const digit1 = Math.floor(digitsRounded / 10);
    const digit2 = digitsRounded % 10;

    // Check if digit1 and digit2 correspond to colors
    const d1Color = colorCodes.find(c => c.value === digit1);
    const d2Color = colorCodes.find(c => c.value === digit2);
    if (!d1Color || !d2Color) return;

    // Calculate actual resistance to compare
    const actual = digitsRounded * mult.multiplier;
    const diff = Math.abs(actual - value);

    if (diff < smallestDiff) {
      smallestDiff = diff;
      bestCombo = {
        digits: [d1Color.color, d2Color.color],
        multiplier: mult.color,
        resistance: actual
      };
    }
  });

  if (!bestCombo) {
    document.getElementById("reverse-result").innerText = "No suitable color code found.";
    return;
  }

  let displayRes = bestCombo.resistance >= 1e6
    ? (bestCombo.resistance / 1e6).toFixed(2) + " MΩ"
    : bestCombo.resistance >= 1e3
    ? (bestCombo.resistance / 1e3).toFixed(2) + " kΩ"
    : bestCombo.resistance + " Ω";

  document.getElementById("reverse-result").innerHTML =
    `<p>Closest match: <strong>${displayRes}</strong></p>` +
    `<p>Bands:</p>` +
    `<ul>` +
    `<li>Band 1 (digit): <span style="color:${bestCombo.digits[0]}; font-weight:bold">${bestCombo.digits[0]}</span></li>` +
    `<li>Band 2 (digit): <span style="color:${bestCombo.digits[1]}; font-weight:bold">${bestCombo.digits[1]}</span></li>` +
    `<li>Band 3 (multiplier): <span style="color:${bestCombo.multiplier}; font-weight:bold">${bestCombo.multiplier}</span></li>` +
    `<li>Band 4 (tolerance): Gold or Silver recommended (±5% or ±10%)</li>` +
    `</ul>`;
}
