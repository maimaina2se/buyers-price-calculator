const hargaPerKgInput = document.getElementById("hargaPerKgInput");
const berapaKgInput = document.getElementById("berapaKgInput");
const tambahanBelanjaInput = document.getElementById("tambahanBelanjaInput");
const hutangInput = document.getElementById("hutangInput");
const simpananInput = document.getElementById("simpananInput");
const totalBelanjaOutput = document.getElementById("totalBelanjaOutput");
const uangInput = document.getElementById("uangInput");
const kembalianOutput = document.getElementById("kembalianOutput");
const resetButton = document.getElementById("resetButton");
const tableBody = document.getElementById("tableBody");

const rupiah = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
  minimumFractionDigits: 0,
});

function parseNumber(value) {
  if (!value) return 0;
  const cleaned = value.toString().replace(/\D/g, "");
  const num = Number.parseInt(cleaned, 10);
  return Number.isFinite(num) ? num : 0;
}

function formatCurrency(value) {
  if (!Number.isFinite(value)) return "Rp 0";
  return rupiah.format(value);
}

function formatThousands(value) {
  if (!value) return "";
  return value.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function formatNumberInput(input) {
  const rawValue = input.value;
  const selectionStart =
    typeof input.selectionStart === "number" ? input.selectionStart : rawValue.length;
  const digitsBeforeCaret = rawValue
    .slice(0, selectionStart)
    .replace(/\D/g, "").length;
  const digitsOnly = rawValue.replace(/\D/g, "");
  const formatted = formatThousands(digitsOnly);
  input.value = formatted;

  if (typeof input.selectionStart !== "number") return;

  let caretIndex = 0;
  let digitsCount = 0;
  while (caretIndex < formatted.length && digitsCount < digitsBeforeCaret) {
    if (/\d/.test(formatted[caretIndex])) {
      digitsCount += 1;
    }
    caretIndex += 1;
  }
  input.setSelectionRange(caretIndex, caretIndex);
}

function hasNumericValue(input) {
  return input.value.replace(/\D/g, "").length > 0;
}

function hasAnyValue(inputs) {
  return inputs.some((input) => hasNumericValue(input));
}

const totalCells = [];

for (let kg = 1; kg <= 50; kg += 1) {
  const row = document.createElement("tr");

  const kgCell = document.createElement("td");
  kgCell.textContent = `${kg} Kg`;

  const totalCell = document.createElement("td");
  totalCell.textContent = formatCurrency(0);

  row.appendChild(kgCell);
  row.appendChild(totalCell);
  tableBody.appendChild(row);

  totalCells.push({ kg, cell: totalCell });
}

function updateTable() {
  const hargaPerKg = parseNumber(hargaPerKgInput.value);
  totalCells.forEach(({ kg, cell }) => {
    const total = hargaPerKg * kg;
    cell.textContent = formatCurrency(total);
  });
}

function updateTotalBelanja() {
  const totalInputs = [
    hargaPerKgInput,
    berapaKgInput,
    tambahanBelanjaInput,
    hutangInput,
    simpananInput,
  ];
  if (!hasAnyValue(totalInputs)) {
    totalBelanjaOutput.value = "";
    return null;
  }
  const hargaPerKg = parseNumber(hargaPerKgInput.value);
  const berapaKg = parseNumber(berapaKgInput.value);
  const tambahanBelanja = parseNumber(tambahanBelanjaInput.value);
  const hutang = parseNumber(hutangInput.value);
  const simpanan = parseNumber(simpananInput.value);
  const total = hargaPerKg * berapaKg + tambahanBelanja + hutang - simpanan;
  totalBelanjaOutput.value = formatCurrency(total);
  return total;
}

function updateKembalian(totalBelanja) {
  if (totalBelanja === null) {
    kembalianOutput.value = "";
    return;
  }
  if (!hasNumericValue(uangInput)) {
    kembalianOutput.value = "";
    return;
  }
  const uang = parseNumber(uangInput.value);
  const kembalian = uang - totalBelanja;
  kembalianOutput.value = formatCurrency(kembalian);
}

function updateAll() {
  updateTable();
  const totalBelanja = updateTotalBelanja();
  updateKembalian(totalBelanja);
}

function blurActiveInput() {
  const activeInput = document.activeElement;
  if (!(activeInput instanceof HTMLInputElement)) return;
  if (!inputElements.includes(activeInput)) return;
  activeInput.blur();
}

const inputElements = [
  hargaPerKgInput,
  berapaKgInput,
  tambahanBelanjaInput,
  hutangInput,
  simpananInput,
  uangInput,
];

inputElements.forEach((input) => {
  input.addEventListener("input", (event) => {
    formatNumberInput(event.target);
    updateAll();
  });
  input.addEventListener("keydown", (event) => {
    if (event.key !== "Enter") return;
    event.preventDefault();
    input.blur();
  });
});

resetButton.addEventListener("click", () => {
  inputElements.forEach((input) => {
    input.value = "";
  });
  totalBelanjaOutput.value = "";
  kembalianOutput.value = "";
  updateAll();
});

document.addEventListener(
  "pointerdown",
  (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    if (target.closest(".input-wrap")) return;
    blurActiveInput();
  },
  { passive: true }
);

document.addEventListener(
  "scroll",
  () => {
    blurActiveInput();
  },
  { passive: true }
);

let touchStartY = 0;
document.addEventListener(
  "touchstart",
  (event) => {
    if (event.touches.length === 1) {
      touchStartY = event.touches[0].clientY;
    }
  },
  { passive: true }
);

document.addEventListener(
  "touchmove",
  (event) => {
    if (event.touches.length !== 1) return;
    const deltaY = Math.abs(event.touches[0].clientY - touchStartY);
    if (deltaY > 10) {
      blurActiveInput();
    }
  },
  { passive: true }
);
updateAll();
