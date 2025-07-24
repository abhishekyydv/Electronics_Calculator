// Rntc calculate karne ka formula jo Excel wale formula se match karta hai
function calculateResistance(bValue, reqTemp, nominalRes) {
  const kelvin = reqTemp + 273.15; // temp ko Kelvin me convert kar rahe hain
  // Formula: EXP(B / (T+273.15) + LN(nominal resistance) - 0.003354*B)
  return Math.exp((bValue / kelvin) + Math.log(nominalRes) - (0.003354 * bValue));
}

// Divider voltage calculate karne ke liye function
// isNTCOnBottom: agar NTC neeche (GND side) hai toh true, warna false
function calculateDividerVoltage(Rntc, Rfixed, vref, isNTCOnBottom) {
  if (isNTCOnBottom) {
    // Circuit 2: NTC neeche hai -> Rfixed upar (VCC)
    return (Rntc / (Rntc + Rfixed)) * vref;
  } else {
    // Circuit 1: NTC upar hai -> Rfixed neeche (GND)
    return (Rfixed / (Rntc + Rfixed)) * vref;
  }
}
function goBack() {
  if (window.history.length > 1) {
    window.history.back();
  } else {
    window.location.href = "main.html"; // or your default page
  }
}
// ADC value nikalne ke liye: voltage ko integer me convert karta hai
function calculateIntegerValue(voltage, adcBits, vref) {
  const adcMax = Math.pow(2, adcBits); // 2^bits tak ADC ka max range hota hai
  return Math.round((voltage * adcMax) / vref); // voltage ko scale kar rahe hain
}

// Circuit 1: NTC upar hota hai, resistor neeche (GND)
function calculateCircuit1() {
  // Input values HTML se utha rahe hain
  const nomTemp = parseFloat(document.getElementById("c1_nomTemp").value);     // Not used but le rahe hain
  const nomRes = parseFloat(document.getElementById("c1_nomRes").value);       // Nominal resistance
  const bValue = parseFloat(document.getElementById("c1_bValue").value);       // B-value
  const reqTemp = parseFloat(document.getElementById("c1_reqTemp").value);     // Required temp
  const rGND = parseFloat(document.getElementById("c1_resGND").value);         // Resistor with GND
  const vref = parseFloat(document.getElementById("c1_vref").value);           // ADC reference voltage
  const adcBits = parseInt(document.getElementById("c1_adcBits").value);       // ADC bits

  // Rntc calculate kar rahe hain
  const Rntc = calculateResistance(bValue, reqTemp, nomRes);

  // Divider voltage calculate - yahan NTC upar hai (GND neeche)
  const Vout = calculateDividerVoltage(Rntc, rGND, vref, false);

  // Integer ADC value
  const intVal = calculateIntegerValue(Vout, adcBits, vref);

  // Result ko show kar rahe hain HTML me
  document.getElementById("result1").innerHTML = `
    <p>📟 <strong>Resultant Resistance (Rntc):</strong> ${Rntc.toFixed(2)} Ω</p><br>
    <p>🔋 <strong>Divider Voltage:</strong> ${Vout.toFixed(3)} V</p><br>
    <p>🔢 <strong>Integer Value:</strong> ${intVal}</p><br>
  `;
}

// Circuit 2: NTC neeche hota hai, resistor upar (VCC)
function calculateCircuit2() {
  // Inputs le rahe hain HTML form se
  const nomTemp = parseFloat(document.getElementById("c2_nomTemp").value);     // Not used but le rahe hain
  const nomRes = parseFloat(document.getElementById("c2_nomRes").value);       // Nominal resistance
  const bValue = parseFloat(document.getElementById("c2_bValue").value);       // B-value
  const reqTemp = parseFloat(document.getElementById("c2_reqTemp").value);     // Required temp
  const rVCC = parseFloat(document.getElementById("c2_resVCC").value);         // Resistor with VCC
  const vref = parseFloat(document.getElementById("c2_vref").value);           // ADC reference voltage
  const adcBits = parseInt(document.getElementById("c2_adcBits").value);       // ADC bits

  // Rntc calculate
  const Rntc = calculateResistance(bValue, reqTemp, nomRes);

  // Divider voltage calculate - yahan NTC neeche hai (VCC upar)
  const Vout = calculateDividerVoltage(Rntc, rVCC, vref, true);

  // Integer ADC value
  const intVal = calculateIntegerValue(Vout, adcBits, vref);

  // Result show kar rahe hain HTML me
  document.getElementById("result2").innerHTML = `
    <p>📟 <strong>Resultant Resistance (Rntc):</strong> ${Rntc.toFixed(2)} Ω</p><br>
    <p>🔋 <strong>Divider Voltage:</strong> ${Vout.toFixed(3)} V</p><br>
    <p>🔢 <strong>Integer Value:</strong> ${intVal}</p><br>
  `;
}
