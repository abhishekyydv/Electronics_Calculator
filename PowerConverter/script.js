function calculate() {
  const vin = +document.getElementById('vin').value;
  const vout = +document.getElementById('vout').value;
  const iout = +document.getElementById('iout').value;
  const fsw = +document.getElementById('fsw').value;
  const vripple = +document.getElementById('vripple').value;
  const eff = +document.getElementById('eff').value;
  const esr = +document.getElementById('esr').value;
  const itransient = +document.getElementById('itransient').value;
  const inductor = +document.getElementById('inductor').value;

  const duty = vout/(vin*(eff/100));
  const pin = (vout * iout)+(vout*iout*(1-(eff/100)));
  const cin = ((iout*duty*(1-duty))/(fsw*vripple));
  const vrms = vripple*0.22867;
  const iripple = iout*0.3;
  const icap = (vrms/esr)*1000;
  const pdiss = icap ** 2 * esr/1000;
  const itrans = 0.75 * iout;
  const cinbulk = (1.21*itrans*itrans*inductor)/(vripple*vripple*1000);
  const zout = (vripple / itransient) * 1000; // to mΩ
  const coutbulk = (1.21*itransient*itransient*inductor)/(vripple*vripple*1000);

  document.getElementById('duty').textContent = duty.toFixed(3);
  document.getElementById('pin').textContent = pin.toFixed(3);
  document.getElementById('cin').textContent = (cin * 1e6).toFixed(3); // to µF
  document.getElementById('vrms').textContent = vrms.toFixed(3);
  document.getElementById('iripple').textContent = iripple.toFixed(3);
  document.getElementById('icap').textContent = icap.toFixed(3);
  document.getElementById('pdiss').textContent = pdiss.toFixed(3);
  document.getElementById('itrans').textContent = itrans.toFixed(3);
  document.getElementById('cinbulk').textContent = cinbulk.toFixed(3); // to µF
  document.getElementById('zout').textContent = zout.toFixed(3);
  document.getElementById('coutbulk').textContent = coutbulk.toFixed(3); // to µF
}
function goBack() {
  if (window.history.length > 1) {
    window.history.back();
  } else {
    window.location.href = "main.html"; // Previous Pager or your default page
  }
}
function resetFields() {
  document.querySelectorAll("input").forEach(input => input.value = "");
  document.querySelectorAll(".output-group span").forEach(span => span.textContent = "");
}