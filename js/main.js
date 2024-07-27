const canvas = document.getElementById("canvasEfect");
const ctx = canvas.getContext("2d");
const w = (canvas.width = document.body.offsetWidth);
const h = (canvas.height = document.body.offsetHeight);

function resizeCanvas() {
  canvas.width = document.body.offsetWidth;
  canvas.height = document.body.offsetHeight;
}

function resizeCanvasPlus() {
  canvas.width = document.body.offsetWidth;
  canvas.height = document.body.offsetHeight;
  //startAnimation(50);
}

window.addEventListener("load", resizeCanvas);
window.addEventListener("resize", resizeCanvasPlus);

const cols = Math.floor(w / 20) + 1;
const ypos = Array(cols).fill(0);

const colors = [
  "#0f0",
  "#0f0",
  "#0f0",
  "#0ff",
  "#0f0",
  "#0f0",
  "#0f0",
  "#800080",
  "#0f0",
  "#0f0",
  "#0f0",
  "#ff0",
  "#0f0",
  "#0f0",
  "#0f0",
];
let colorIndex = 0;

let intervalCount = 0;
let totalIntervals = 100;
let isRunning = true;
const stopButton = document.getElementById("stopButton");

function matrix() {
  ctx.fillStyle = "#0001";
  ctx.fillRect(0, 0, w, h);

  ctx.fillStyle = colors[colorIndex];
  ctx.font = "25pt monospace";

  ypos.forEach((y, ind) => {
    const text = String.fromCharCode(Math.random() * 128);
    const x = ind * 20;
    ctx.fillText(text, x, y);
    if (y > 100 + Math.random() * 10000) ypos[ind] = 0;
    else ypos[ind] = y + 20;
  });

  colorIndex = (colorIndex + 1) % colors.length;

  if (isRunning) {
    intervalCount++;
    if (intervalCount >= totalIntervals) {
      stopAnimation();
    }
  }
}

let animationInterval;

function startAnimation(customTotalIntervals) {
  intervalCount = 0;
  totalIntervals = customTotalIntervals;
  animationInterval = setInterval(matrix, 50);
  stopButton.textContent = "Detener";
  isRunning = true;
}

function stopAnimation() {
  clearInterval(animationInterval);
  stopButton.textContent = "Reanudar";
  isRunning = false;
}

startAnimation(50);

stopButton.addEventListener("click", () => {
  if (isRunning) {
    stopAnimation();
  } else {
    startAnimation();
  }
});

const encryptConteiner = document.querySelector(".encryptConteiner");
const QRConteiner = document.querySelector(".QRConteiner");
let buttonstatus = false;

//logica encriptador
const input = document.getElementById("input");
const output = document.getElementById("output");
const outputSpan = document.querySelector(".outputSpan");

input.addEventListener("keydown", function (event) {
  if (
    event.key.match(/[^a-zA-Z\s()&.:,;{}[\]¡!¿?"#$%/_-]/) &&
    event.key !== "Backspace" &&
    event.key !== "Delete" &&
    event.key !== "ArrowLeft" &&
    event.key !== "ArrowRight"
  ) {
    event.preventDefault();
    alert("Por favor, no ingrese números ni caracteres con acento.");
  }
});

const buttonEncrypt = document.querySelector(".encrypt");
const buttonDecrypt = document.querySelector(".decrypt");
const buttonCopy = document.querySelector("#copy");

buttonEncrypt.addEventListener("click", () => {
  stopAnimation();
  encryptConteiner.style.backgroundColor = "transparent";
  if (input.value) {
    startAnimation(20);
    encryptConteiner.style.backgroundColor = "transparent";
    setTimeout(() => {
      const inputEncrypt = encrypt(input.value);
      outputSpan.textContent = inputEncrypt;
      input.value = "";
      encryptConteiner.style.backgroundColor = "rgba(255, 255, 255, 0.4)";
      output.style.borderColor = "yellow";
    }, 1000);
  } else {
    alert("Nada que encriptar.");
    encryptConteiner.style.backgroundColor = "rgba(255, 255, 255, 0.4)";
  }
});

buttonDecrypt.addEventListener("click", () => {
  stopAnimation();
  if (input.value) {
    startAnimation(20);
    encryptConteiner.style.backgroundColor = "transparent";
    setTimeout(() => {
      const inputDecrypt = decrypt(input.value);
      outputSpan.textContent = inputDecrypt;
      input.value = "";
      encryptConteiner.style.backgroundColor = "rgba(255, 255, 255, 0.4)";
      output.style.borderColor = "yellow";
    }, 1000);
  } else {
    alert("Nada que desencriptar.");
    encryptConteiner.style.backgroundColor = "rgba(255, 255, 255, 0.4)";
  }
});

buttonCopy.addEventListener("click", () => {
  const textToCopy = outputSpan.textContent;
  navigator.clipboard
    .writeText(textToCopy)
    .then(() => {
      stopAnimation();
      startAnimation(20);
      encryptConteiner.style.backgroundColor = "transparent";
      setTimeout(() => {
        input.value = textToCopy;
        input.focus();
        output.style.borderColor = "#32ff32";
        outputSpan.textContent = "";
        encryptConteiner.style.backgroundColor = "rgba(255, 255, 255, 0.4)";
      }, 1000);
    })
    .catch((err) => {
      console.error("Error al copiar texto:", err);
    });
});

function encrypt(ciphertext) {
  let matrizCodigo = [
    ["e", "emter"],
    ["i", "imes"],
    ["a", "ai"],
    ["o", "ober"],
    ["u", "ufat"],
  ];
  ciphertext = ciphertext.toLowerCase();
  for (let i = 0; i < matrizCodigo.length; i++) {
    if (ciphertext.includes(matrizCodigo[i][0])) {
      ciphertext = ciphertext.replaceAll(
        matrizCodigo[i][0],
        matrizCodigo[i][1]
      );
    }
  }
  return ciphertext;
}

function decrypt(decryptedText) {
  let matrizCodigo = [
    ["e", "emter"],
    ["i", "imes"],
    ["a", "ai"],
    ["o", "ober"],
    ["u", "ufat"],
  ];
  decryptedText = decryptedText.toLowerCase();
  for (let i = 0; i < matrizCodigo.length; i++) {
    if (decryptedText.includes(matrizCodigo[i][0])) {
      decryptedText = decryptedText.replaceAll(
        matrizCodigo[i][1],
        matrizCodigo[i][0]
      );
    }
  }
  return decryptedText;
}

input.addEventListener("keydown", function (event) {
  if (
    event.key.match(/[^a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s]/) &&
    event.key !== "Backspace" &&
    event.key !== "Delete" &&
    event.key !== "ArrowLeft" &&
    event.key !== "ArrowRight"
  ) {
    event.preventDefault();
  }
});

input.addEventListener("focus", function () {
  output.style.borderColor = "#32ff32";
  outputSpan.textContent = "";
});
