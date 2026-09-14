// ============================================================
// HIERRO — script.js
// ============================================================

document.addEventListener("DOMContentLoaded", () => {
  setYear();
  initNavToggle();
  initNutritionTabs();
  initPlateCalculator();
  initContactForm();
});

/* ------------------------------------------------------------
   Año en el footer
   ------------------------------------------------------------ */
function setYear() {
  const el = document.getElementById("year");
  if (el) el.textContent = new Date().getFullYear();
}

/* ------------------------------------------------------------
   Menú móvil
   ------------------------------------------------------------ */
function initNavToggle() {
  const toggle = document.getElementById("navToggle");
  const nav = document.querySelector(".nav");
  if (!toggle || !nav) return;

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

/* ------------------------------------------------------------
   Sub-pestañas de Alimentación
   ------------------------------------------------------------ */
function initNutritionTabs() {
  const tabs = document.querySelectorAll(".nutri-tab");
  const panels = document.querySelectorAll(".nutri-panel");
  if (!tabs.length || !panels.length) return;

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const targetId = tab.getAttribute("data-target");

      tabs.forEach((t) => {
        t.classList.remove("active");
        t.setAttribute("aria-selected", "false");
      });
      tab.classList.add("active");
      tab.setAttribute("aria-selected", "true");

      panels.forEach((panel) => {
        const isTarget = panel.id === targetId;
        panel.classList.toggle("active", isTarget);
        panel.hidden = !isTarget;
      });
    });
  });
}

/* ------------------------------------------------------------
   Calculadora de discos
   Barra olímpica estándar: 20 kg. Discos disponibles por lado
   en kg, del más grande al más chico.
   ------------------------------------------------------------ */
const BAR_WEIGHT = 20;
const AVAILABLE_PLATES = [25, 20, 15, 10, 5, 2.5, 1.25];

// Ancho/alto visual de cada disco (px) para el dibujo de la barra
const PLATE_SIZES = {
  25: { w: 26, h: 150, color: "linear-gradient(180deg, #c1502e, #8a3a22)" },
  20: { w: 24, h: 138, color: "linear-gradient(180deg, #d2653f, #a3492b)" },
  15: { w: 20, h: 118, color: "linear-gradient(180deg, #8a7b52, #5f5335)" },
  10: { w: 18, h: 100, color: "linear-gradient(180deg, #8a7b52, #5f5335)" },
  5: { w: 14, h: 78, color: "linear-gradient(180deg, #6b6a63, #3f3d38)" },
  2.5: { w: 12, h: 60, color: "linear-gradient(180deg, #6b6a63, #3f3d38)" },
  1.25: { w: 10, h: 46, color: "linear-gradient(180deg, #6b6a63, #3f3d38)" },
};

function initPlateCalculator() {
  const input = document.getElementById("targetWeight");
  const resultBox = document.getElementById("calcResult");
  const visual = document.getElementById("calcVisual");
  if (!input || !resultBox || !visual) return;

  input.addEventListener("input", () => {
    const total = parseFloat(input.value);
    renderCalculator(total, resultBox, visual);
  });
}

function calculatePlatesPerSide(perSideWeight) {
  let remaining = Math.round(perSideWeight * 100) / 100;
  const used = [];

  for (const plate of AVAILABLE_PLATES) {
    while (remaining + 1e-9 >= plate) {
      used.push(plate);
      remaining = Math.round((remaining - plate) * 100) / 100;
    }
  }
  return { used, remaining };
}

function renderCalculator(total, resultBox, visual) {
  // Limpiar visual previo
  visual.querySelectorAll(".calc-plate-stack").forEach((n) => n.remove());

  if (!total || isNaN(total) || total <= 0) {
    resultBox.innerHTML = `<p class="calc-hint">Escribí un peso arriba para cargar la barra.</p>`;
    return;
  }

  if (total < BAR_WEIGHT) {
    resultBox.innerHTML = `<p class="calc-warn">La barra sola ya pesa ${BAR_WEIGHT} kg. Ingresá un total mayor.</p>`;
    return;
  }

  const perSide = (total - BAR_WEIGHT) / 2;
  const { used, remaining } = calculatePlatesPerSide(perSide);

  // Dibujo de discos sobre la barra (un lado, se refleja visualmente)
  const stack = document.createElement("div");
  stack.className = "calc-plate-stack";
  used.forEach((plate) => {
    const size = PLATE_SIZES[plate];
    const div = document.createElement("div");
    div.className = "calc-plate";
    div.style.width = `${size.w}px`;
    div.style.height = `${size.h}px`;
    div.style.background = size.color;
    stack.appendChild(div);
  });
  visual.appendChild(stack);

  // Chips de resultado
  const chipCounts = {};
  used.forEach((p) => (chipCounts[p] = (chipCounts[p] || 0) + 1));

  const chipsHtml = Object.keys(chipCounts).length
    ? Object.entries(chipCounts)
        .sort((a, b) => b[0] - a[0])
        .map(
          ([plate, count]) =>
            `<span class="calc-chip">${count} × ${plate} kg</span>`,
        )
        .join("")
    : `<span class="calc-hint">Sin discos — es solo la barra.</span>`;

  let warnHtml = "";
  if (remaining > 0.01) {
    warnHtml = `<p class="calc-warn">No se puede armar exacto con discos estándar. Faltan ${remaining.toFixed(2)} kg por lado — redondeá al disco más cercano.</p>`;
  }

  resultBox.innerHTML = `
    <div class="calc-side">
      <div class="calc-side-block">
        <h4>Por lado</h4>
        <div class="calc-chip-row">${chipsHtml}</div>
      </div>
    </div>
    ${warnHtml}
    <p class="calc-total">Barra <strong>${BAR_WEIGHT} kg</strong> + ${used.length} discos por lado = <strong>${total} kg</strong> totales.</p>
  `;
}

/* ------------------------------------------------------------
   Formulario de contacto (demo local, sin backend)
   ------------------------------------------------------------ */
function initContactForm() {
  const form = document.getElementById("ctaForm");
  const note = document.getElementById("ctaNote");
  if (!form || !note) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("ctaEmail").value.trim();
    if (!email) return;

    note.textContent = `Listo. Te escribimos a ${email} con el bloque introductorio.`;
    form.reset();
  });
}
