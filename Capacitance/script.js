function addCapacitor(type) {
  const container = document.getElementById(`${type}-list`);
  if (container.children.length >= 10) {
    alert("Maximum 10 capacitors allowed.");
    return;
  }
  const div = document.createElement("div");
  div.className = "cap-input";
  div.innerHTML = `<input type="number" placeholder="Capacitance" min="0" step="any" />`;
  container.appendChild(div);
}
function goBack() {
  if (window.history.length > 1) {
    window.history.back();
  } else {
    window.location.href = "main.html"; // fallback page
  }
}

function getCapacitanceValues(type) {
  const inputs = document.querySelectorAll(`#${type}-list input`);
  const values = Array.from(inputs)
    .map(i => parseFloat(i.value))
    .filter(v => !isNaN(v) && v > 0);
  if (values.length !== inputs.length) {
    alert("Please fill all capacitance fields with valid positive numbers.");
    return null;
  }
  const unitFactor = parseFloat(document.getElementById("unit").value);
  return values.map(v => v * unitFactor); // convert to Farads
}

function formatCapacitance(value) {
  const unitFactor = parseFloat(document.getElementById("unit").value);
  const selectedUnit = document.getElementById("unit").selectedOptions[0].textContent;
  const converted = value / unitFactor;
  return `${converted.toFixed(4)} ${selectedUnit}`;
}

function calculateSeries() {
  const caps = getCapacitanceValues("series");
  if (!caps) return;
  const total = 1 / caps.reduce((sum, c) => sum + 1 / c, 0);
  document.getElementById("series-result").textContent = formatCapacitance(total);
}

function calculateParallel() {
  const caps = getCapacitanceValues("parallel");
  if (!caps) return;
  const total = caps.reduce((sum, c) => sum + c, 0);
  document.getElementById("parallel-result").textContent = formatCapacitance(total);
}
