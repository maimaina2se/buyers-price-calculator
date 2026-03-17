const hargaPerKgInput = document.getElementById("hargaPerKgInput");
const tableBody = document.getElementById("tableBody");

const rupiah = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 2,
});

function parseNumber(value) {
  if (!value) return 0;
  const cleaned = value
    .toString()
    .replace(/\s/g, "")
    .replace(/\./g, "")
    .replace(/,/g, ".");
  const num = Number(cleaned);
  return Number.isFinite(num) ? num : 0;
}

function formatCurrency(value) {
  if (!Number.isFinite(value)) return "Rp 0";
  return rupiah.format(value);
}

const totalCells = [];

for (let kg = 1; kg <= 50; kg += 1) {
  const row = document.createElement("tr");

  const kgCell = document.createElement("td");
  kgCell.textContent = `${kg} kg`;

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

hargaPerKgInput.addEventListener("input", updateTable);
hargaPerKgInput.addEventListener("keydown", (event) => {
  if (event.key !== "Enter") return;
  event.preventDefault();
  hargaPerKgInput.blur();
});

document.addEventListener(
  "pointerdown",
  (event) => {
    if (document.activeElement !== hargaPerKgInput) return;
    const target = event.target;
    if (!(target instanceof Element)) return;
    if (target.closest(".input-wrap")) return;
    hargaPerKgInput.blur();
  },
  { passive: true }
);

document.addEventListener(
  "scroll",
  () => {
    if (document.activeElement !== hargaPerKgInput) return;
    hargaPerKgInput.blur();
  },
  { passive: true }
);

document.addEventListener(
  "touchmove",
  () => {
    if (document.activeElement !== hargaPerKgInput) return;
    hargaPerKgInput.blur();
  },
  { passive: true }
);
updateTable();
