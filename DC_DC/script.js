const tabButtons = document.querySelectorAll(".tab-btn");
const tabPanes = document.querySelectorAll(".tab-pane");

tabButtons.forEach(button => {
  button.addEventListener("click", () => {
    const target = button.getAttribute("data-tab");

    // Remove active from all buttons and panes
    tabButtons.forEach(btn => btn.classList.remove("active"));
    tabPanes.forEach(pane => pane.classList.remove("active"));

    // Activate clicked tab and its pane
    button.classList.add("active");
    document.getElementById(target).classList.add("active");
  });
});
function calculateCurrentSense() {
  const resistor = parseFloat(document.getElementById("cs_resistor").value);
  const current = parseFloat(document.getElementById("cs_current").value);
  const gain = parseFloat(document.getElementById("cs_gain").value);
  const adcBits = parseInt(document.getElementById("cs_adc").value);
  const systemVoltage = parseFloat(document.getElementById("cs_sysvoltage").value);

  if (isNaN(resistor) || isNaN(current) || isNaN(gain) || isNaN(adcBits) || isNaN(systemVoltage)) {
    alert("Please fill in all fields correctly.");
    return;
  }

  // Calculations
  const voltage = resistor * current;
  const gainVoltage = voltage * gain;
  const adcMax = Math.pow(2, adcBits); // e.g. 2^12 = 4096
  const intValue = Math.round((gainVoltage / systemVoltage) * adcMax);
  const div8 = Math.floor(intValue / 8);
  const cvProduct = Math.round(current * voltage * 1000); // Assuming in mW for better display

  // Output
  document.getElementById("cs_voltage").innerText = voltage.toFixed(3) + " V";
  document.getElementById("cs_gainVoltage").innerText = gainVoltage.toFixed(3) + " V";
  document.getElementById("cs_intVal").innerText = intValue;
  document.getElementById("cs_div8").innerText = div8;
  document.getElementById("cs_cvProduct").innerText = cvProduct;
}

function resetCurrentSense() {
  const ids = ["cs_resistor", "cs_current", "cs_gain", "cs_adc", "cs_sysvoltage"];
  const outputIds = ["cs_voltage", "cs_gainVoltage", "cs_intVal", "cs_div8", "cs_cvProduct"];
  
  ids.forEach(id => document.getElementById(id).value = "");
  outputIds.forEach(id => document.getElementById(id).innerText = "");
}
