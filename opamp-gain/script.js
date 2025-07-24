const modeInputs = document.querySelectorAll('input[name="mode"]');
const rinInput = document.getElementById('rin');
const rfInput = document.getElementById('rf');
const vinInput = document.getElementById('vin');
const calcBtn = document.getElementById('calcBtn');
const resetBtn = document.getElementById('resetBtn');

const configLabel = document.getElementById('configLabel');
const gainResult = document.getElementById('gainResult');
const voutResult = document.getElementById('voutResult');
const formulaText = document.getElementById('formula');

let mode = 'non-inverting';

function calculate() {
  const rin = parseFloat(rinInput.value);
  const rf = parseFloat(rfInput.value);
  const vin = parseFloat(vinInput.value);

  if (isNaN(rin) || isNaN(rf) || rin === 0) {
    gainResult.textContent = '—';
    voutResult.textContent = '—';
    return;
  }

  let gain = mode === 'non-inverting' ? 1 + rf / rin : -rf / rin;
  gainResult.textContent = gain.toFixed(2);

  if (!isNaN(vin)) {
    const vout = gain * vin;
    voutResult.textContent = vout.toFixed(2) + ' V';
  } else {
    voutResult.textContent = '—';
  }
}
function goBack() {
  if (window.history.length > 1) {
    window.history.back();
  } else {
    window.location.href = "main.html"; // or your default page
  }
}
function resetForm() {
  rinInput.value = '';
  rfInput.value = '';
  vinInput.value = '';
  gainResult.textContent = '—';
  voutResult.textContent = '—';
}

modeInputs.forEach(input => {
  input.addEventListener('change', (e) => {
    mode = e.target.value;
    configLabel.textContent = mode === 'non-inverting' ? 'Non-Inverting' : 'Inverting';
    formulaText.textContent = mode === 'non-inverting'
      ? 'Gain = 1 + (Rf / Rin)'
      : 'Gain = - (Rf / Rin)';
  });
});

calcBtn.addEventListener('click', calculate);
resetBtn.addEventListener('click', resetForm);
