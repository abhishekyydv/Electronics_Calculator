// Calculate All Parameters (General + Transformer + Snubber + Winding)
function calculateAllParameters() {
  calculateGeneralParameters();
  calculateWindingParameters();
}

function goBack() {
  if (window.history.length > 1) {
    window.history.back();
  } else {
    window.location.href = "main.html"; // or your default page
  }
}

// General Parameters Calculation
function calculateGeneralParameters() {
  const vmin = parseFloat(document.getElementById("vmin").value) || 0;
  const vmax = parseFloat(document.getElementById("vmax").value) || 0;
  const vf = parseFloat(document.getElementById("vf").value) || 0;
  const vout = parseFloat(document.getElementById("vout").value) || 0;
  const iout = parseFloat(document.getElementById("iout").value) || 0;
  const aux1 = parseFloat(document.getElementById("aux1").value) || 0;
  const aux2 = parseFloat(document.getElementById("aux2").value) || 0;
  const aux3 = parseFloat(document.getElementById("aux3").value) || 0;
  const ripple = parseFloat(document.getElementById("ripple").value) || 0;
  const duty = parseFloat(document.getElementById("duty").value) || 0;
  const freq = parseFloat(document.getElementById("freq").value) || 1;
  const eff = parseFloat(document.getElementById("eff").value) || 0;
  const ae = parseFloat(document.getElementById("ae").value) || 0;
  const aw = parseFloat(document.getElementById("aw").value) || 0;
  const bmax = parseFloat(document.getElementById("bmax").value) || 0;
  const cpi = parseFloat(document.getElementById("cpi").value) || 0;

  const primaryInductance = ((eff / 100) * Math.pow(duty / 100, 2) * Math.pow(vmin, 2)) /
    (2 * freq * vout * iout);

  const chosenInductance = cpi > 0 ? cpi / 1000000 : primaryInductance;
  const turnRatio = (vmin * (duty / 100)) / ((1 - (duty / 100)) * (vout + vf));

  const mosfetIds = (((vout * iout) / (eff / 100)) / ((duty / 100) * vmin)) +
    (((duty / 100) * vmin) / (2 * freq * chosenInductance));

  const primaryTurns = (chosenInductance * mosfetIds * 1e6) / (0.2 * ae);
  const secondaryTurns = primaryTurns / turnRatio;

  const aux1Turns = aux1 ? primaryTurns / ((vmin * (duty / 100)) / ((1 - (duty / 100)) * (aux1 + vf))) : 0;
  const aux2Turns = aux2 ? primaryTurns / ((vmin * (duty / 100)) / ((1 - (duty / 100)) * (aux2 + vf))) : 0;
  const aux3Turns = aux3 ? primaryTurns / ((vmin * (duty / 100)) / ((1 - (duty / 100)) * (aux3 + vf))) : 0;

  const mosfetVds = vmax + ((duty / 100) * vmin) / (1 - (duty / 100)) +
    (0.2 * vmax + ((duty / 100) * vmin) / (1 - (duty / 100)));

  const diodeVoltage = (vout + (vmax / turnRatio)) + (0.4 * (vout + (vmax / turnRatio)));
  const outputCap = ((duty / 100) * iout) / (freq * ripple);

  const penetrationDepth = 66.1 / Math.sqrt(freq);
  const inputPower = vout * iout * ((100 - eff) / 100) + vout * iout;
  const maxInputCurrent = inputPower / vmin;
  const priTotalDia = 1.13 * Math.sqrt(maxInputCurrent / 3.5);
  const secTotalDia = 1.13 * Math.sqrt(iout / 3.5);
  const minWire1 = (priTotalDia > (2 * penetrationDepth)) ? 2 : 1;
  const minWire2 = (secTotalDia > (2 * penetrationDepth)) ? 2 : 1;
  const priWireDiameter = priTotalDia / minWire1;
  const secWireDiameter = secTotalDia / minWire2;

  const areaMinRequired = Math.pow(((chosenInductance *mosfetIds*((vout*iout)/vmin)) / (bmax*0.0085)), 4/3)*10000;
  const coreArea = ae * aw;
  const result = (coreArea > areaMinRequired) ? "Perfect !!!" : "Select Bigger Core";

  const snubberV = mosfetVds-vmax;
  const snubberPower = ((chosenInductance*0.05)*mosfetIds*mosfetIds*snubberV*freq)/(2*(snubberV-(turnRatio*vout)));
  const snubberResistor = Math.pow(snubberV,2)/snubberPower;
  const snubberCap = (snubberV / (snubberV*0.05*snubberResistor*freq))*1e6;

  const outputs1 = document.querySelectorAll(".output-block")[0].querySelectorAll("input");
  outputs1[0].value = primaryInductance.toFixed(8);
  outputs1[1].value = turnRatio.toFixed(2);
  outputs1[2].value = primaryTurns.toFixed(2);
  outputs1[3].value = secondaryTurns.toFixed(2);
  outputs1[4].value = aux1Turns.toFixed(2);
  outputs1[5].value = aux2Turns.toFixed(2);
  outputs1[6].value = aux3Turns.toFixed(2);
  outputs1[7].value = mosfetVds.toFixed(2);
  outputs1[8].value = mosfetIds.toFixed(2);
  outputs1[9].value = diodeVoltage.toFixed(2);
  outputs1[10].value = outputCap.toFixed(8);
  outputs1[11].value = chosenInductance.toFixed(8);
  outputs1[12].value = penetrationDepth.toFixed(4);
  outputs1[13].value = priWireDiameter.toFixed(2);
  outputs1[14].value = minWire1;
  outputs1[15].value = secWireDiameter.toFixed(2);
  outputs1[16].value = minWire2;
  outputs1[17].value = priTotalDia.toFixed(2);
  outputs1[18].value = secTotalDia.toFixed(2);
  outputs1[19].value = inputPower.toFixed(2);
  outputs1[20].value = maxInputCurrent.toFixed(2);

  const outputs2 = document.querySelectorAll(".output-block")[1].querySelectorAll("input");
  outputs2[0].value = areaMinRequired.toFixed(2);
  outputs2[1].value = coreArea.toFixed(2);
  outputs2[2].value = result;

  const outputs3 = document.querySelectorAll(".output-block")[2].querySelectorAll("input");
  outputs3[0].value = snubberV.toFixed(2);
  outputs3[1].value = snubberPower.toFixed(2);
  outputs3[2].value = snubberResistor.toFixed(2);
  outputs3[3].value = snubberCap.toFixed(4);
}

// Winding Parameters Calculation (Independent or from General)
function calculateWindingParameters() {
  const wireInputs = document.querySelectorAll('.input-block:nth-child(2) input');
  const primaryWire = parseFloat(wireInputs[0].value) || 0;
  const secondaryWire = parseFloat(wireInputs[1].value) || 0;

  const primaryRadius = primaryWire / 2;
  const secondaryRadius = secondaryWire / 2;

  const primaryArea = Math.PI * Math.pow(primaryRadius, 2);
  const secondaryArea = Math.PI * Math.pow(secondaryRadius, 2);

  const iout = parseFloat(document.getElementById("iout").value) || 0;
  const eff = parseFloat(document.getElementById("eff").value) || 0;
  const vout = parseFloat(document.getElementById("vout").value) || 0;
  const vmin = parseFloat(document.getElementById("vmin").value) || 0;
  const freq = parseFloat(document.getElementById("freq").value) || 1;
  const inputPower = vout * iout * ((100 - eff) / 100) + vout * iout;
  const maxInputCurrent = inputPower / vmin;

  const priTotalDia = 1.13 * Math.sqrt(maxInputCurrent / 3.5);
  const secTotalDia = 1.13 * Math.sqrt(iout / 3.5);

  const primaryStrands = Math.ceil(priTotalDia / primaryArea);
  const secondaryStrands = Math.ceil(secTotalDia / secondaryArea);

  const primaryResultant = primaryArea * primaryStrands;
  const secondaryResultant = secondaryArea * secondaryStrands;

  const windingOutputs = document.querySelectorAll(".output-block")[3].querySelectorAll("input");
  windingOutputs[0].value = primaryRadius.toFixed(2);
  windingOutputs[1].value = secondaryRadius.toFixed(2);
  windingOutputs[2].value = primaryArea.toFixed(2);
  windingOutputs[3].value = secondaryArea.toFixed(2);
  windingOutputs[4].value = primaryStrands;
  windingOutputs[5].value = secondaryStrands;
  windingOutputs[6].value = primaryResultant.toFixed(2);
  windingOutputs[7].value = secondaryResultant.toFixed(2);
}

// Reset
function resetGeneralParameters() {
  document.querySelectorAll(".input-section .input-block:nth-child(1) input").forEach(input => input.value = "");
  document.querySelectorAll(".output-block").forEach((block, index) => {
    if (index < 3) block.querySelectorAll("input").forEach(input => input.value = "");
  });
}

function resetWindingParameters() {
  document.querySelectorAll(".input-section .input-block:nth-child(2) input").forEach(input => input.value = "");
  const windingOutputs = document.querySelectorAll(".output-block")[3].querySelectorAll("input");
  windingOutputs.forEach(input => input.value = "");
}
