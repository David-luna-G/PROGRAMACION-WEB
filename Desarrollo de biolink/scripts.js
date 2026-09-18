/**
 * StudyQuest - Core Application Logic
 * Architecture: Clean Vanilla JS (ES6+)
 * Theme: Professional Solid Monochromatic (Slate / Gray / White)
 */

// State Management
const state = {
  userXp: 320,
  maxXp: 500,
  activeCodeTab: 'html',
  isWireframe: false
};

// Accessible Code Templates
const CODE_FILES = Object.freeze({
  html: `<!-- ESTRUCTURA PRINCIPAL index.html -->\n<!DOCTYPE html>\n<html lang="es">\n  <!-- Semantic HTML5, ARIA Landmarks y Schema JSON-LD -->\n</html>`,
  css: `/* styles.css - Monocromático & Accesibilidad */\n@media (prefers-reduced-motion: reduce) {\n  * { animation: none !important; transition: none !important; }\n}`,
  js: `// script.js - Gestión de estado y ARIA\nfunction updateProgress(xp) {\n  const el = document.getElementById('xpProgressBar');\n  if (el) el.setAttribute('aria-valuenow', xp);\n}`
});

// Lifecycle Initializer
window.addEventListener('DOMContentLoaded', () => {
  initializeIcons();
  updateCodeBlock();
});

function initializeIcons() {
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
}

/**
 * System Gamification & XP Handling
 */
function gainXp(amount) {
  state.userXp = Math.min(state.userXp + amount, state.maxXp);
  
  const isMax = state.userXp === state.maxXp;
  const message = isMax 
    ? "Nivel máximo alcanzado (500/500 XP)" 
    : `+${amount} XP recibidos`;
  
  showToast(message);
  renderXpUI();
}

function renderXpUI() {
  const pct = (state.userXp / state.maxXp) * 100;
  const xpBar = document.getElementById('xpBar');
  const xpText = document.getElementById('xpText');
  const xpProgressBar = document.getElementById('xpProgressBar');

  if (xpBar) xpBar.style.width = `${pct}%`;
  if (xpText) xpText.innerText = `${state.userXp} / ${state.maxXp} XP`;
  if (xpProgressBar) xpProgressBar.setAttribute('aria-valuenow', state.userXp);
}

/**
 * Interface Layout & View Modes
 */
function toggleMode() {
  state.isWireframe = !state.isWireframe;
  const app = document.getElementById('main-content');
  const wfBanner = document.getElementById('wfBanner');

  if (state.isWireframe) {
    app?.classList.add('wireframe-mode');
    wfBanner?.classList.remove('hidden');
    showToast("Modo Blueprint activado");
  } else {
    app?.classList.remove('wireframe-mode');
    wfBanner?.classList.add('hidden');
    showToast("Modo Estándar activado");
  }
}

function switchMainView(view) {
  const prev = document.getElementById('previewContainer');
  const code = document.getElementById('codeContainer');
  const btnApp = document.getElementById('btnViewApp');
  const btnCode = document.getElementById('btnViewCode');

  const isPreview = view === 'preview';

  prev?.classList.toggle('hidden', !isPreview);
  code?.classList.toggle('hidden', isPreview);
  
  btnApp?.setAttribute('aria-pressed', isPreview ? 'true' : 'false');
  btnCode?.setAttribute('aria-pressed', isPreview ? 'false' : 'true');
}

function switchCodeTab(tab) {
  state.activeCodeTab = tab;
  
  ['Html', 'Css', 'Js'].forEach(t => {
    const btn = document.getElementById('tab' + t);
    const isCurrent = t.toLowerCase() === tab;
    
    if (btn) {
      btn.setAttribute('aria-selected', isCurrent ? 'true' : 'false');
      btn.className = isCurrent 
        ? 'px-3 py-1.5 text-xs font-semibold text-slate-100 border-b-2 border-white transition-colors bg-slate-800'
        : 'px-3 py-1.5 text-xs font-semibold text-slate-400 border-b-2 border-transparent hover:text-slate-200 transition-colors';
    }
  });

  updateCodeBlock();
}

function updateCodeBlock() {
  const block = document.getElementById('codeBlock');
  if (block) {
    block.textContent = CODE_FILES[state.activeCodeTab];
  }
}

/**
 * Professional Modals & Notifications
 */
function openModal(type) {
  const overlay = document.getElementById('modalOverlay');
  const content = document.getElementById('modalContent');
  if (!content || !overlay) return;

  if (type === 'techStack') {
    content.innerHTML = `
      <div class="space-y-4">
        <h3 id="modalTitle" class="font-bold text-sm text-slate-100 flex items-center gap-2 border-b border-slate-700 pb-2">
          <i data-lucide="cpu" class="w-4 h-4 text-slate-300" aria-hidden="true"></i>
          Arquitectura del Sistema
        </h3>
        <p class="text-xs text-slate-300 leading-relaxed">
          Plataforma modular estructurada bajo estándares internacionales de accesibilidad (WCAG 2.1 AA) y optimización SEO.
        </p>
        <div class="flex flex-wrap gap-2 text-[11px]">
          <span class="bg-slate-800 text-slate-200 border border-slate-700 px-2.5 py-1 rounded font-mono">Semantic HTML5</span>
          <span class="bg-slate-800 text-slate-200 border border-slate-700 px-2.5 py-1 rounded font-mono">ARIA Standards</span>
          <span class="bg-slate-800 text-slate-200 border border-slate-700 px-2.5 py-1 rounded font-mono">JSON-LD Schema</span>
        </div>
        <button onclick="closeModal()" class="w-full py-2 bg-slate-100 hover:bg-white text-slate-900 font-bold text-xs rounded-lg transition-colors mt-2">
          Cerrar
        </button>
      </div>
    `;
  } else if (type === 'questDetails') {
    content.innerHTML = `
      <div class="space-y-4">
        <h3 id="modalTitle" class="font-bold text-sm text-slate-100 flex items-center gap-2 border-b border-slate-700 pb-2">
          <i data-lucide="layers" class="w-4 h-4 text-slate-300" aria-hidden="true"></i>
          Gestión de Módulos
        </h3>
        <p class="text-xs text-slate-300 leading-relaxed">
          Estructura jerárquica de actividades. El progreso se consolida mediante métricas en tiempo real dentro del panel principal.
        </p>
        <button onclick="closeModal()" class="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-100 font-bold text-xs rounded-lg border border-slate-700 transition-colors">
          Aceptar
        </button>
      </div>
    `;
  }

  initializeIcons();
  overlay.classList.remove('hidden');
}

function openServiceDetail(title, desc) {
  const overlay = document.getElementById('modalOverlay');
  const content = document.getElementById('modalContent');
  if (!content || !overlay) return;

  content.innerHTML = `
    <div class="space-y-4">
      <span class="text-[10px] uppercase tracking-wider bg-slate-800 text-slate-300 font-bold px-2 py-0.5 rounded border border-slate-700">Servicio</span>
      <h3 id="modalTitle" class="font-bold text-base text-slate-100">${title}</h3>
      <p class="text-xs text-slate-300 leading-relaxed">${desc}</p>
      <button onclick="clickAction('Solicitar: ${title}'); closeModal();" class="w-full py-2.5 bg-slate-100 hover:bg-white text-slate-900 font-bold text-xs rounded-lg transition-colors">
        Solicitar Información
      </button>
    </div>
  `;
  
  initializeIcons();
  overlay.classList.remove('hidden');
}

function closeModal() {
  document.getElementById('modalOverlay')?.classList.add('hidden');
}

function showToast(msg) {
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toastMsg');
  if (!toast || !toastMsg) return;

  toastMsg.innerText = msg;
  toast.classList.remove('translate-y-20', 'opacity-0');
  toast.classList.add('translate-y-0', 'opacity-100');

  setTimeout(() => {
    toast.classList.add('translate-y-20', 'opacity-0');
    toast.classList.remove('translate-y-0', 'opacity-100');
  }, 2600);
}

function clickAction(actionName) {
  showToast(`Acción: ${actionName}`);
}

function setActiveNav(btn) {
  document.querySelectorAll('.nav-btn').forEach(b => {
    b.classList.remove('text-slate-100', 'font-bold');
    b.classList.add('text-slate-400');
  });
  btn.classList.remove('text-slate-400');
  btn.classList.add('text-slate-100', 'font-bold');
}