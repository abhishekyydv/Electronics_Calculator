function addResistor(type) {
  const container = document.getElementById(type + '-list');
  if (container.children.length >= 10) {
    alert('You can add up to 10 resistors only.');
    return;
  }
  const div = document.createElement('div');
  div.className = 'resistor-input';
  div.innerHTML = '<input type="number" placeholder="Ω" min="0" step="any" />';
  container.append(div);
}
function goBack() {
  if (window.history.length > 1) {
    window.history.back();
  } else {
    window.location.href = "main.html"; // or your default page
  }
}
function getValues(type) {
  const inputs = document.querySelectorAll('#' + type + '-list input');
  const nums = Array.from(inputs).map(i => parseFloat(i.value)).filter(v => !isNaN(v) && v > 0);
  if (nums.length !== inputs.length) {
    alert('Please fill in all resistor fields with positive values.');
    return null;
  }
  return nums;
}

function formatResistance(r) {
  if (r >= 1e6) return (r/1e6).toFixed(3) + ' MΩ';
  if (r >= 1e3) return (r/1e3).toFixed(3) + ' kΩ';
  return r.toFixed(2) + ' Ω';
}

function calculateSeries() {
  const vals = getValues('series');
  if (!vals) return;
  const total = vals.reduce((a, b) => a + b, 0);
  document.getElementById('series-result').textContent = formatResistance(total);
}

function calculateParallel() {
  const vals = getValues('parallel');
  if (!vals) return;
  const inv = vals.reduce((a, b) => a + (1/b), 0);
  const total = 1 / inv;
  document.getElementById('parallel-result').textContent = formatResistance(total);
}
