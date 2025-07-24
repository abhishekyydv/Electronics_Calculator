function goBack() {
  if (window.history.length > 1) {
    window.history.back();
  } else {
    window.location.href = "main.html"; // or your default page
  }
}
function calculate() {
  const mcd = parseFloat(document.getElementById('mcd').value);
  const angleDeg = parseFloat(document.getElementById('beamAngle').value);
  const dist = parseFloat(document.getElementById('distance').value);

  const cd = mcd / 1000; // Convert mcd to cd
  const angleRad = angleDeg * Math.PI / 180; // Convert degrees to radians

  // Correct solid angle calculation
  const omega = 2 * Math.PI * (1 - Math.cos(angleRad / 2));

  const lumens = cd * omega;
  const lux = dist > 0 ? (lumens / (4 * Math.PI * dist * dist)).toFixed(2) : '—';

  document.getElementById('cd').textContent = cd.toFixed(3);
  document.getElementById('lumens').textContent = lumens.toFixed(2);
  document.getElementById('lux').textContent = lux;
}

function resetFields() {
  ['mcd', 'beamAngle', 'distance'].forEach(id => document.getElementById(id).value = '');
  ['cd', 'lumens', 'lux'].forEach(id => document.getElementById(id).textContent = '');
}
