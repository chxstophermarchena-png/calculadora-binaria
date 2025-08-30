// Utilidades
const esBinario = (s) => /^[01]+$/.test(s);
const toDec = (bin) => parseInt(bin, 2);
const toBin = (num) => (num < 0 ? "-" + Math.abs(num).toString(2) : num.toString(2));

function mostrarAlerta(msg) {
  const a = document.getElementById("alerta");
  a.textContent = msg;
  a.hidden = false;
}
function ocultarAlerta() {
  const a = document.getElementById("alerta");
  a.hidden = true;
  a.textContent = "";
}

function calcular() {
  ocultarAlerta();

  const bin1 = document.getElementById("bin1").value.trim();
  const bin2 = document.getElementById("bin2").value.trim();
  const op   = document.getElementById("operacion").value;

  if (!bin1 || !bin2) {
    return mostrarAlerta("Por favor ingresa ambos números binarios.");
  }
  if (!esBinario(bin1) || !esBinario(bin2)) {
    return mostrarAlerta("Solo se permiten números binarios (0 y 1).");
  }

  const n1 = toDec(bin1);
  const n2 = toDec(bin2);
  let resultadoBin = "";
  let detalleDec = "";

  switch (op) {
    case "suma": {
      const r = n1 + n2;
      resultadoBin = toBin(r);
      detalleDec = `${n1} + ${n2} = ${r}`;
      break;
    }
    case "resta": {
      const r = n1 - n2; // Permitimos negativo: se muestra con signo
      resultadoBin = toBin(r);
      detalleDec = `${n1} - ${n2} = ${r}`;
      break;
    }
    case "multiplicacion": {
      const r = n1 * n2;
      resultadoBin = toBin(r);
      detalleDec = `${n1} × ${n2} = ${r}`;
      break;
    }
    case "division": {
      if (n2 === 0) return mostrarAlerta("No se puede dividir entre 0.");
      // División entera con residuo
      const cociente = Math.floor(n1 / n2);
      const residuo  = n1 % n2;
      const cocienteBin = toBin(cociente);
      const residuoBin  = toBin(residuo);
      resultadoBin = `cociente: ${cocienteBin}, residuo: ${residuoBin}`;
      detalleDec = `cociente: ${cociente} | residuo: ${residuo}`;
      break;
    }
    default:
      return mostrarAlerta("Operación no válida.");
  }

  document.getElementById("resultadoBin").textContent = resultadoBin;
  document.getElementById("detalleDec").textContent = detalleDec;
}

function limpiar() {
  document.getElementById("bin1").value = "";
  document.getElementById("bin2").value = "";
  document.getElementById("resultadoBin").textContent = "—";
  document.getElementById("detalleDec").textContent = "—";
  ocultarAlerta();
  document.getElementById("bin1").focus();
}

// Eventos
document.getElementById("btnCalcular").addEventListener("click", calcular);
document.getElementById("btnLimpiar").addEventListener("click", limpiar);

// Enter para calcular
["bin1", "bin2"].forEach(id => {
  document.getElementById(id).addEventListener("keydown", (e) => {
    if (e.key === "Enter") calcular();
  });
});
