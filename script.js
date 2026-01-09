const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const sampleRate = document.getElementById("sampleRate");
const bitDepth = document.getElementById("bitDepth");

function drawWave() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const samples = sampleRate.value;
  const bits = bitDepth.value;
  const levels = Math.pow(2, bits);

  // Draw analog signal
  ctx.beginPath();
  ctx.strokeStyle = "#00ffcc";

  for (let x = 0; x < canvas.width; x++) {
    let t = x / canvas.width * Math.PI * 2;
    let y = Math.sin(t);
    let py = canvas.height / 2 - y * 100;
    ctx.lineTo(x, py);
  }
  ctx.stroke();

  // ADC Sampling & Quantization
  ctx.fillStyle = "red";
  for (let i = 0; i < samples; i++) {
    let x = (i / samples) * canvas.width;
    let t = x / canvas.width * Math.PI * 2;
    let y = Math.sin(t);

    let q = Math.round((y + 1) / 2 * (levels - 1));
    let qy = (q / (levels - 1)) * 2 - 1;

    let py = canvas.height / 2 - qy * 100;
    ctx.fillRect(x - 2, py - 2, 4, 4);
  }
}

sampleRate.oninput = drawWave;
bitDepth.oninput = drawWave;

drawWave();
