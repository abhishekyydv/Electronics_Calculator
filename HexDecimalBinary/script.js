function goBack() {
  if (history.length > 1) {
    history.back();
  } else {
    window.location.href = "main.html"; // Replace with your actual main page
  }
}

function openTab(tabId) {
  document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
  document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
  document.getElementById(tabId).classList.add('active');
  document.querySelector(`[onclick="openTab('${tabId}')"]`).classList.add('active');
}

// Reset input and result
function reset(type) {
  if (type === 'hex') {
    document.getElementById('hexInput').value = '';
    document.getElementById('hexToDec').textContent = '—';
    document.getElementById('hexToBin').textContent = '—';
  } else if (type === 'dec') {
    document.getElementById('decInput').value = '';
    document.getElementById('decToHex').textContent = '—';
    document.getElementById('decToBin').textContent = '—';
  } else if (type === 'bin') {
    document.getElementById('binInput').value = '';
    document.getElementById('binToDec').textContent = '—';
    document.getElementById('binToHex').textContent = '—';
  }
}

// HEX ➝ DEC & BIN
function convertHex() {
  const hex = document.getElementById("hexInput").value.trim();
  if (!hex.match(/^[0-9a-fA-F]+$/)) {
    alert("Please enter a valid hex number (0-9, A-F).");
    return;
  }
  const dec = parseInt(hex, 16);
  document.getElementById("hexToDec").textContent = dec;
  document.getElementById("hexToBin").textContent = dec.toString(2);
}

// DEC ➝ HEX & BIN
function convertDecimal() {
  const dec = parseInt(document.getElementById("decInput").value);
  if (isNaN(dec) || dec < 0) {
    alert("Please enter a valid positive decimal number.");
    return;
  }
  document.getElementById("decToHex").textContent = dec.toString(16).toUpperCase();
  document.getElementById("decToBin").textContent = dec.toString(2);
}

// BIN ➝ DEC & HEX
function convertBinary() {
  const bin = document.getElementById("binInput").value.trim();
  if (!/^[01]+$/.test(bin)) {
    alert("Please enter a valid binary number (0 or 1 only).");
    return;
  }
  const dec = parseInt(bin, 2);
  document.getElementById("binToDec").textContent = dec;
  document.getElementById("binToHex").textContent = dec.toString(16).toUpperCase();
}
