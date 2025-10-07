// Theme utility: reads theme color and mode from localStorage and applies CSS variables
// Keys used in localStorage:
//  - themeColor: string like '#123456' (preferred accent / background color)
//  - themeMode: 'claro' | 'escuro' | 'sistema'

const STORAGE_COLOR_KEY = "themeColor";
const STORAGE_MODE_KEY = "themeMode";
const STORAGE_FONT_KEY = "rootFontSize";

function applyCssVars({ bg, text, primary, headerBg, iconColor }) {
  const root = document.documentElement;
  if (bg) root.style.setProperty("--bg", bg);
  if (text) root.style.setProperty("--text-color", text);
  if (primary) root.style.setProperty("--primary-color", primary);
  if (headerBg) root.style.setProperty("--header-bg", headerBg);
  if (iconColor) root.style.setProperty("--icon-color", iconColor);
}

function applyFontSize(sizePx) {
  try {
    const root = document.documentElement;
    if (!sizePx) return;
    root.style.setProperty("--root-font-size", `${sizePx}px`);
  } catch {
    // ignore
  }
}

function getStoredColor() {
  try {
    const c = localStorage.getItem(STORAGE_COLOR_KEY);
    return c || null;
  } catch {
    return null;
  }
}

function getStoredMode() {
  try {
    const m = localStorage.getItem(STORAGE_MODE_KEY);
    return m || "sistema";
  } catch {
    return "sistema";
  }
}

function getStoredFontSize() {
  try {
    const v = localStorage.getItem(STORAGE_FONT_KEY);
    return v ? Number(v) : null;
  } catch {
    return null;
  }
}

function buildVarsFromColor(hexColor, mode) {
  // Basic approach: for dark mode use dark backgrounds; for light mode invert
  const primary = hexColor;
  if (mode === "claro") {
    return {
      // light mode gradient requested by user
      bg: "linear-gradient(180deg, #6F95FF 0%, #413B6B 100%)",
      // force text to white regardless of theme as requested
      text: "#ffffff",
      primary,
      headerBg: "rgba(255,255,255,0.85)",
      iconColor: "#ffffff",
    };
  }

  // dark / sistema default
  return {
    // dark mode gradient requested by user (top -> bottom)
    bg: "linear-gradient(180deg, #1C1264 0%, #381D89 57%, #3A1789 79%, #391F80 100%)",
    text: "#ffffff",
    primary,
    headerBg: "rgba(10,10,10,0.35)",
    iconColor: "#ffffff",
  };
}

export function initTheme() {
  if (typeof window === "undefined" || !document) return;
  const storedColor = getStoredColor() || "#4a0ce0"; // fallback accent
  const mode = getStoredMode();
  const vars = buildVarsFromColor(
    storedColor,
    mode === "sistema" ? "escuro" : mode
  );
  applyCssVars(vars);
  // apply persisted font size if any
  const storedFont = getStoredFontSize();
  if (storedFont) applyFontSize(storedFont);
}

export function toggleTheme() {
  // Toggle between claro and escuro. If sistema, default to escuro -> claro
  const current = getStoredMode();
  const next = current === "claro" ? "escuro" : "claro";
  try {
    localStorage.setItem(STORAGE_MODE_KEY, next);
  } catch {
    // ignore
  }
  const storedColor = getStoredColor() || "#4a0ce0";
  const vars = buildVarsFromColor(storedColor, next);
  applyCssVars(vars);
}

export function setThemeColor(hexColor) {
  try {
    localStorage.setItem(STORAGE_COLOR_KEY, hexColor);
  } catch {
    // ignore
  }
  const mode = getStoredMode() === "sistema" ? "escuro" : getStoredMode();
  const vars = buildVarsFromColor(hexColor, mode);
  applyCssVars(vars);
}

export function setRootFontSize(px) {
  try {
    localStorage.setItem(STORAGE_FONT_KEY, String(px));
  } catch {
    // ignore storage errors
  }
  applyFontSize(px);
}

export default {
  initTheme,
  toggleTheme,
  setThemeColor,
  getStoredColor,
};
