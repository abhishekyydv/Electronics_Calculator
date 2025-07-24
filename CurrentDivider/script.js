function goBack() {
  if (history.length > 1) {
    history.back();
  } else {
    window.location.href = "main.html"; // fallback page
  }
}

function addResistor() {
  const container = document.getElementById("resistor-container");
  if (container.children.length >= 10) {
    alert("You can add up to 10 resistors only.");
    return;
  }

  const div = document.createElement("div");
  div.className = "form-group resistor-row";
  div.innerHTML = `<input type="number" placeholder="Resistor ${container.children.length + 1} (Ω)" class="resistor-input" />`;
  container.appendChild(div);
}

function removeResistor() {
  const container = document.getElementById("resistor-container");
  if (container.children.length > 2) {
    container.removeChild(container.lastElementChild);
  } else {
    alert("At least two resistors are required.");
  }
}

function calculateCurrents() {
  const totalCurrent = parseFloat(document.getElementById("total-current").value);
  const unitMultiplier = parseFloat(document.getElementById("current-unit").value);
  const inputs = document.querySelectorAll(".resistor-input");

  const resistors = Array.from(inputs).map(input => parseFloat(input.value)).filter(val => !isNaN(val) && val > 0);
  if (resistors.length !== inputs.length || isNaN(totalCurrent) || totalCurrent <= 0) {
    alert("Please enter valid current and resistor values.");
    return;
  }

  const totalConductance = resistors.reduce((acc, r) => acc + 1 / r, 0);
  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = `<strong>Total Current:</strong> ${(totalCurrent * unitMultiplier).toFixed(4)} A<br/><hr>`;

  resistors.forEach((res, i) => {
    const current = (totalCurrent * unitMultiplier) * ((1 / res) / totalConductance);
    resultDiv.innerHTML += `Current through Resistor ${i + 1} (${res} Ω): <strong>${formatCurrent(current)}</strong><br>`;
  });

  resultDiv.style.display = "block";
}

function formatCurrent(current) {
  if (current >= 1) return current.toFixed(3) + " A";
  if (current >= 0.001) return (current * 1000).toFixed(3) + " mA";
  return (current * 1e6).toFixed(3) + " µA";
}

function resetForm() {
  document.getElementById("total-current").value = "";
  document.getElementById("current-unit").selectedIndex = 0;
  document.getElementById("result").style.display = "none";

  const container = document.getElementById("resistor-container");
  container.innerHTML = `
    <div class="form-group resistor-row">
      <input type="number" placeholder="Resistor 1 (Ω)" class="resistor-input" />
    </div>
    <div class="form-group resistor-row">
      <input type="number" placeholder="Resistor 2 (Ω)" class="resistor-input" />
    </div>
  `;
}
