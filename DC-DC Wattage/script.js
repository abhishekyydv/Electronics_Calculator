function showSection(id) {
  document.querySelectorAll('.calculator-section').forEach(section => {
    section.classList.remove('active');
  });
  document.getElementById(id).classList.add('active');
}

function calculateCurrentSense() {
  const R = +document.getElementById('cs_resistor').value;
  const I = +document.getElementById('cs_current').value;
  const G = +document.getElementById('cs_gain').value;
  const adcBits = +document.getElementById('cs_adc').value;
  const Vsys = +document.getElementById('cs_sysvolt').value;

  const voltage = I * R;
  const gainVoltage = voltage * G;
  const adcValue = Math.round((gainVoltage / Vsys) * Math.pow(2, adcBits));
  const eightBit = Math.round(adcValue/8);

  document.getElementById('cs_voltage').textContent = voltage.toFixed(4);
  document.getElementById('cs_gainvolt').textContent = gainVoltage.toFixed(4);
  document.getElementById('cs_integer').textContent = adcValue.toFixed(2);
  document.getElementById('cs_8bit').textContent = eightBit.toFixed(2);
}

function calculateVoltageDivider() {
  const R1 = +document.getElementById('vd_r1').value;
  const R2 = +document.getElementById('vd_r2').value;
  const Vin = +document.getElementById('vd_vin').value;
  const adcBits = +document.getElementById('vd_adc').value;
  const Vsys = +document.getElementById('vd_sysvolt').value;

  const Vout = (Vin*R2)/(R2+R1);
  const adcValue = (Vout * Math.pow(2, adcBits))/Vsys;
  const eightBit = Math.round(adcValue/8);

  document.getElementById('vd_vout').textContent = Vout.toFixed(4);
  document.getElementById('vd_adcvalue').textContent = adcValue.toFixed(2);
  document.getElementById('vd_8bit').textContent = eightBit.toFixed(2);
}

function calculateThermal() {
  const B = +document.getElementById('th_bvalue').value;
  const T0 = +document.getElementById('th_t0').value + 273.15;
  const R0 = +document.getElementById('th_r0').value;
  const T = +document.getElementById('th_temp').value + 273.15;
  const Rg = +document.getElementById('th_rg').value;
  const Vsys = +document.getElementById('th_sysvolt').value;
  const adcBits = +document.getElementById('th_adc').value;

  const Rt = Math.exp(B/ (T)+(Math.log(R0))-(0.003354*B));
  const Vout = (Rg / (Rg + Rt)) * Vsys;
  const adcValue = (Vout* Math.pow(2, adcBits))/Vsys;

  document.getElementById('th_resistance').textContent = Rt.toFixed(2);
  document.getElementById('th_vout').textContent = Vout.toFixed(4);
  document.getElementById('th_adcvalue').textContent = adcValue.toFixed(2);
}
function calculateClock() {
  const freq = +document.getElementById('clk_freq').value;
  const time = (1 / freq) * 1e6;
  document.getElementById('clk_time').textContent = time.toFixed(6);
}
function calculatePWM() {
  const X1 = +document.getElementById('pwm_x1').value;
  const Y1 = +document.getElementById('pwm_y1').value;
  const X2 = +document.getElementById('pwm_x2').value;
  const Y2 = +document.getElementById('pwm_y2').value;

  const divider = 21;
  const adcFactor = 819.2;

  const pd1 = X1 / divider;
  const adc1 = pd1 * adcFactor;
  const yadc1 = Y1;

  const pd2 = X2 / divider;
  const adc2 = pd2 * adcFactor;
  const yadc2 = Y2;

  const slope = (Y2 - Y1) / (X2 - X1);
  const constant = Y1 - slope * X1;

  // Output
  document.getElementById('pwm_pd1').value = pd1.toFixed(6);
  document.getElementById('pwm_adc1').value = Math.round(adc1);
  document.getElementById('pwm_yadc1').value = Math.round(yadc1);

  document.getElementById('pwm_pd2').value = pd2.toFixed(6);
  document.getElementById('pwm_adc2').value = Math.round(adc2);
  document.getElementById('pwm_yadc2').value = Math.round(yadc2);

  document.getElementById('pwm_slope').value = slope.toFixed(6);
  document.getElementById('pwm_const').value = constant.toFixed(2);
}





function resetSection(sectionId) {
  const section = document.getElementById(sectionId);
  section.querySelectorAll('input').forEach(input => input.value = '');
  section.querySelectorAll('span').forEach(span => span.textContent = '');
}
