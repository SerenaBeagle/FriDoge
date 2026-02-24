/* ========= Global config ========= */
let currentLang = "en";
const API_BASE = "https://fri-doge.vercel.app";
const INVENTORY_KEY = "fridoge_inventory_v1";

/* ========= i18n (复用你原来的) ========= */
const textMap = {
  en: {
    subtitle: "Your cozy fridge assistant",
    pill: "✨ Quick demo: fridge → goal → reaction",
    thinking: "🐶 FriDoge is thinking...",
    waiting: "FriDoge is waiting for your fridge info 🧊",
    copied: "✅ Copied!",
  },
  zh: {
    subtitle: "你贴心的冰箱小管家",
    pill: "✨ 快速演示：冰箱 → 目标 → 冰狗建议",
    thinking: "🐶 冰狗正在思考中...",
    waiting: "冰狗在等你告诉我冰箱里有什么 🧊",
    copied: "✅ 已复制！",
  }
};

const dict = {
  en: {
    "subtitle": "Your cozy fridge assistant",
    "pill": "✨ Quick demo: fridge → goal → reaction",

    "common.back": "← Back",
    "common.copy": "Copy",
    "common.clear": "Clear",

    "home.title": "🏠 Home",
    "home.desc": "Choose what you want to do:",
    "home.inventory": "📦 Add inventory",
    "home.cook": "🍳 Cook recipes",
    "home.reminder": "🔔 Reminders (coming soon)",
    "home.reminder_desc": "This will be implemented after DB + reminder system.",

    "inv.title": "📦 Add inventory",
    "inv.desc": "Record your fridge items (nutrition label upload supported).",
    "inv.items_title": "🥦 What's in your fridge?",
    "inv.add_item": "➕ Add item",
    "inv.clear_items": "🧹 Clear items",
    "inv.tip": "Tip: add one food per row. Leave blank if unknown (will be None).",
    "inv.save": "💾 Save to fridge",
    "inv.preview_title": "🧾 Inventory",
    "inv.delete": "🗑️ Delete inventory",
    "inv.preview_empty": "No items yet.",

    "inv.col_name": "Name",
    "inv.col_weight": "Weight (g)",
    "inv.col_energy": "Energy (kJ)",
    "inv.col_protein": "Protein (g/100g)",
    "inv.col_carb": "Carb (g/100g)",
    "inv.col_fat": "Fat (g/100g)",
    "inv.col_production": "Production",
    "inv.col_expiry": "Expiry",
    "inv.col_photo": "Photo",

    "cook.title": "🍳 Cook recipes",
    "cook.desc": "Continue with saved inventory, or add items first.",
    "cook.continue": "✅ Continue",
    "cook.add_inventory": "➕ Add inventory",
    "cook.people": "👥 How many people?",
    "cook.people_hint": "Set 1 for solo meal",
    "cook.appetite": "🍽️ Appetite",
    "cook.appetite_hint": "Helps portion sizing",
    "cook.goal": "🎯 Choose a style",
    "cook.goal_hint": "FriDoge will adapt tone + recipe choices",
    "cook.request": "💭 What do you want today?",
    "cook.request_ph": "I want a healthy and easy meal today",
    "cook.extra": "🧩 Personal needs (optional)",
    "cook.extra_ph": "e.g. no dairy, 15-min cooking, spicy...",
    "cook.extra_hint": "Allergies / dislikes / time limit / cookware",
    "cook.ask": "Ask FriDoge 🐾",
    "cook.reaction": "🧾 AI Reaction",
    "cook.waiting": "FriDoge is waiting for your fridge info 🧊",
  },

  zh: {
    "subtitle": "你贴心的冰箱小管家",
    "pill": "✨ 快速演示：冰箱 → 目标 → 冰狗建议",

    "common.back": "← 返回",
    "common.copy": "复制",
    "common.clear": "清空",

    "home.title": "🏠 主界面",
    "home.desc": "选择你要做的事：",
    "home.inventory": "📦 添加存货",
    "home.cook": "🍳 做饭菜谱",
    "home.reminder": "🔔 请求查看提醒（暂未实现）",
    "home.reminder_desc": "该功能后续接数据库与提醒系统再做。",

    "inv.title": "📦 添加存货",
    "inv.desc": "在这里录入冰箱食材（可上传营养表自动识别）。",
    "inv.items_title": "🥦 冰箱里有什么？",
    "inv.add_item": "➕ 添加一行",
    "inv.clear_items": "🧹 清空",
    "inv.tip": "提示：每行一个食物。未知可留空（视为 None）。",
    "inv.save": "💾 保存到冰箱",
    "inv.preview_title": "🧾 存货预览",
    "inv.delete": "🗑️ 删除存货",
    "inv.preview_empty": "暂无存货。",

    "inv.col_name": "名称",
    "inv.col_weight": "重量 (g)",
    "inv.col_energy": "能量 (kJ)",
    "inv.col_protein": "蛋白质 (g/100g)",
    "inv.col_carb": "碳水 (g/100g)",
    "inv.col_fat": "脂肪 (g/100g)",
    "inv.col_production": "生产日期",
    "inv.col_expiry": "保质期/到期",
    "inv.col_photo": "照片",

    "cook.title": "🍳 做饭菜谱",
    "cook.desc": "你可以继续（使用已保存存货），或先去添加存货。",
    "cook.continue": "✅ 继续",
    "cook.add_inventory": "➕ 添加存货",
    "cook.people": "👥 几个人吃？",
    "cook.people_hint": "1 表示单人餐",
    "cook.appetite": "🍽️ 食量",
    "cook.appetite_hint": "帮助估计分量",
    "cook.goal": "🎯 选择风格",
    "cook.goal_hint": "冰狗会根据风格调整口吻与食谱",
    "cook.request": "💭 今天想吃什么？",
    "cook.request_ph": "我想要健康、简单、好做的一餐",
    "cook.extra": "🧩 个性化需求（可选）",
    "cook.extra_ph": "例如：不吃奶制品、15 分钟、微辣、高蛋白…",
    "cook.extra_hint": "过敏 / 忌口 / 时间 / 厨具",
    "cook.ask": "问问冰狗 🐾",
    "cook.reaction": "🧾 冰狗回复",
    "cook.waiting": "冰狗在等你告诉我冰箱里有什么 🧊",
  }
};



function applyI18n() {
  const root = document.getElementById("view-root");
  if (!root) return;

  const t = dict[currentLang] || dict.en;

  // text nodes
  root.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (!key) return;
    if (t[key] !== undefined) el.innerText = t[key];
  });

  // placeholders
  root.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
    const key = el.getAttribute("data-i18n-placeholder");
    if (!key) return;
    if (t[key] !== undefined) el.setAttribute("placeholder", t[key]);
  });

  // global header (index.html)
  const subtitle = document.getElementById("subtitle");
  const pill = document.getElementById("pill");
  if (subtitle && t["subtitle"]) subtitle.innerText = t["subtitle"];
  if (pill && t["pill"]) pill.innerText = t["pill"];

  // ✅ 翻译完静态文案后，把 inventory 动态内容再渲染一次（不会改内容，只是保证 empty 显隐正确）
  if (document.getElementById("inventory-preview")) {
    renderInventoryPreview(loadInventoryFromDB());
  }

}



function applyLangStatic() {
  const t = textMap[currentLang];
  const subtitle = document.getElementById("subtitle");
  const pill = document.getElementById("pill");
  if (subtitle) subtitle.innerText = t.subtitle;
  if (pill) pill.innerText = t.pill;

  document.getElementById("lang-en")?.classList.toggle("active", currentLang === "en");
  document.getElementById("lang-zh")?.classList.toggle("active", currentLang === "zh");
}

function setLang(lang) {
  currentLang = lang;
  document.getElementById("lang-en")?.classList.toggle("active", currentLang === "en");
  document.getElementById("lang-zh")?.classList.toggle("active", currentLang === "zh");
  applyI18n(); // ✅ 切换语言后立即更新当前页面
}


// ===== Inventory DB (localStorage) =====

// UUID：优先用浏览器自带 crypto.randomUUID()；不支持则 fallback
function uuid() {
  if (window.crypto && typeof window.crypto.randomUUID === "function") {
    return window.crypto.randomUUID();
  }
  // fallback: RFC4122 v4-ish
  const buf = new Uint8Array(16);
  window.crypto.getRandomValues(buf);
  buf[6] = (buf[6] & 0x0f) | 0x40;
  buf[8] = (buf[8] & 0x3f) | 0x80;
  const hex = [...buf].map(b => b.toString(16).padStart(2, "0")).join("");
  return `${hex.slice(0,8)}-${hex.slice(8,12)}-${hex.slice(12,16)}-${hex.slice(16,20)}-${hex.slice(20)}`;
}

function loadInventoryFromDB() {
  try {
    const raw = localStorage.getItem(INVENTORY_KEY);
    if (!raw) return [];
    const arr = JSON.parse(raw);
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}

function saveInventoryToDB(items) {
  localStorage.setItem(INVENTORY_KEY, JSON.stringify(items));
}

function appendToInventoryDB(newItems) {
  const db = loadInventoryFromDB();

  // 给每条新记录补 uuid；并标注创建时间（可选）
  const enriched = newItems.map(it => ({
    id: it.id ?? uuid(),
    created_at: it.created_at ?? new Date().toISOString(),
    ...it,
  }));

  const merged = db.concat(enriched);
  saveInventoryToDB(merged);
  return merged;
}

function deleteInventoryItemById(id) {
  const db = loadInventoryFromDB();
  const filtered = db.filter(it => it.id !== id);
  saveInventoryToDB(filtered);
  return filtered;
}

function clearInventoryDB() {
  localStorage.removeItem(INVENTORY_KEY);
  return [];
}



/* ========= Router: load html partial ========= */
async function loadView(name) {
  const root = document.getElementById("view-root");
  root.innerHTML = `<div class="panel">Loading...</div>`;

  const res = await fetch(`/pages/${name}.html`, { cache: "no-store" });
  const html = await res.text();
  root.innerHTML = html;

  // bind page-specific logic
  if (name === "home") initHome();
  if (name === "inventory") initInventory();
  if (name === "cook") initCook();

  // delegate nav buttons
  root.querySelectorAll("[data-nav]").forEach(el => {
    el.addEventListener("click", () => {
      const to = el.getAttribute("data-nav");
      loadView(to);
    });
  });

  applyI18n();
}

/* ========= LocalStorage "DB" ========= */
// function saveInventoryToDB(items) {
//   localStorage.setItem(INVENTORY_KEY, JSON.stringify(items));
// }

// function loadInventoryFromDB() {
//   try {
//     const raw = localStorage.getItem(INVENTORY_KEY);
//     if (!raw) return [];
//     const arr = JSON.parse(raw);
//     return Array.isArray(arr) ? arr : [];
//   } catch {
//     return [];
//   }
// }

/* ========= Shared helpers ========= */
function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function readNullableNumber(value) {
  const s = (value ?? "").toString().trim();
  if (!s) return null;
  const n = Number(s);
  return Number.isFinite(n) ? n : null;
}

function readNullableDate(value) {
  const s = (value ?? "").toString().trim();
  return s ? s : null; // "YYYY-MM-DD"
}

function readFileAsDataURL(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("file read error"));
    reader.onload = () => resolve(reader.result);
    reader.readAsDataURL(file);
  });
}



/* ========= Page: Home ========= */
function initHome() {
  // nothing special
}






/* ========= Page: Inventory ========= */
function addItemRow(prefill = {}) {
  const rows = document.getElementById("items-rows");
  const row = document.createElement("div");
  row.className = "item-row";

  row.innerHTML = `
    <input class="item-name" type="text" placeholder="e.g. chicken breast" value="${escapeHtml(prefill.name ?? "")}" />
    <input class="item-weight" type="number" min="0" step="any" placeholder="g" value="${prefill.weight_g ?? ""}" />
    <input class="item-energy" type="number" min="0" step="any" placeholder="kJ" value="${prefill.energy_kj ?? ""}" />
    <input class="item-protein" type="number" min="0" step="any" placeholder="g/100g" value="${prefill.protein_g_per_100g ?? ""}" />
    <input class="item-carb" type="number" min="0" step="any" placeholder="g/100g" value="${prefill.carb_g_per_100g ?? ""}" />
    <input class="item-fat" type="number" min="0" step="any" placeholder="g/100g" value="${prefill.fat_g_per_100g ?? ""}" />

    <input class="item-prod" type="date" value="${prefill.production_date ?? ""}" />
    <input class="item-exp" type="date" value="${prefill.expiry_date ?? ""}" />

    <div class="photo-cell">
      <button class="mini-btn" type="button">📷 Upload</button>
      <input class="item-photo" type="file" accept="image/*" style="display:none" />
      <div class="hint item-photo-status" style="margin-top:6px; font-size:11px;"></div>
    </div>

    <div class="remove-cell">
      <button class="remove-btn" type="button" title="Remove">✕</button>
    </div>
  `;

  // bind upload
  const uploadBtn = row.querySelector(".photo-cell .mini-btn");
  const fileInput = row.querySelector(".item-photo");
  const statusEl = row.querySelector(".item-photo-status");

  uploadBtn.addEventListener("click", () => fileInput.click());
  fileInput.addEventListener("change", async () => {
    const file = fileInput.files?.[0];
    if (!file) return;

    statusEl.innerText = currentLang === "zh" ? "正在识别营养成分表..." : "Reading nutrition label...";

    try {
      const dataUrl = await readFileAsDataURL(file);
      const base64 = dataUrl.split(",")[1] || "";
      const mime = (dataUrl.split(";")[0] || "data:image/jpeg").replace("data:", "");

      const fallbackName = (row.querySelector(".item-name")?.value ?? "").trim();
      const fallbackWeight = row.querySelector(".item-weight")?.value ?? "";

      const res = await fetch(`${API_BASE}/api/nutrition`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lang: currentLang,
          image_base64: base64,
          image_mime: mime,
          hint: {
            name: fallbackName || null,
            weight_g: fallbackWeight ? Number(fallbackWeight) : null
          }
        })
      });

      const out = await res.json();
      if (!res.ok) throw new Error(out?.detail || out?.error || "nutrition api failed");

      fillRowFromItem(row, out.item);
      statusEl.innerText = currentLang === "zh"
        ? `✅ 已识别并回填（置信度：${out.confidence ?? "?"}）`
        : `✅ Filled (confidence: ${out.confidence ?? "?"})`;
    } catch (e) {
      statusEl.innerText = currentLang === "zh" ? `❌ 识别失败：${e.message}` : `❌ Failed: ${e.message}`;
    } finally {
      fileInput.value = "";
    }
  });

  // bind remove
  row.querySelector(".remove-btn").addEventListener("click", () => row.remove());

  rows.appendChild(row);
}

function fillRowFromItem(row, item) {
  const setIf = (selector, val) => {
    if (val === null || val === undefined) return;
    const el = row.querySelector(selector);
    if (!el) return;
    el.value = String(val);
  };

  setIf(".item-name", item.name);
  setIf(".item-weight", item.weight_g);
  setIf(".item-energy", item.energy_kj);
  setIf(".item-protein", item.protein_g_per_100g);
  setIf(".item-carb", item.carb_g_per_100g);
  setIf(".item-fat", item.fat_g_per_100g);
}

function clearItemsTable() {
  document.getElementById("items-rows").innerHTML = "";
}


function updateInventoryHint(addedCount = null) {
  const hint = document.getElementById("save-hint");
  if (!hint) return;

  const total = loadInventoryFromDB().length;

  // If caller passes addedCount, show "Added ... Total ..."
  if (addedCount !== null) {
    hint.innerText = (currentLang === "zh")
      ? `✅ 已加入 ${addedCount} 条（当前共 ${total} 条）`
      : `✅ Added ${addedCount} item(s). Total: ${total}`;
    return;
  }

  // Otherwise, just show total (used after deletions)
  hint.innerText = (currentLang === "zh")
    ? `📦 当前存货总数：${total}`
    : `📦 Total items: ${total}`;
}


function readItemsFromTable() {
  const rows = Array.from(document.querySelectorAll("#items-rows .item-row"));
  const items = [];

  for (const r of rows) {
    const name = (r.querySelector(".item-name")?.value ?? "").trim();

    const hasAnyField =
      name ||
      (r.querySelector(".item-weight")?.value ?? "").trim() ||
      (r.querySelector(".item-energy")?.value ?? "").trim() ||
      (r.querySelector(".item-protein")?.value ?? "").trim() ||
      (r.querySelector(".item-carb")?.value ?? "").trim() ||
      (r.querySelector(".item-fat")?.value ?? "").trim() ||
      (r.querySelector(".item-prod")?.value ?? "").trim() ||
      (r.querySelector(".item-exp")?.value ?? "").trim();

    if (!hasAnyField) continue;

    items.push({
      name: name || null,
      weight_g: readNullableNumber(r.querySelector(".item-weight")?.value),
      energy_kj: readNullableNumber(r.querySelector(".item-energy")?.value),
      protein_g_per_100g: readNullableNumber(r.querySelector(".item-protein")?.value),
      carb_g_per_100g: readNullableNumber(r.querySelector(".item-carb")?.value),
      fat_g_per_100g: readNullableNumber(r.querySelector(".item-fat")?.value),
      production_date: readNullableDate(r.querySelector(".item-prod")?.value),
      expiry_date: readNullableDate(r.querySelector(".item-exp")?.value),
    });
  }

  return items;
}


function renderInventoryPreview(items) {
  const box = document.getElementById("inventory-preview");
  const empty = document.getElementById("inventory-empty");
  if (!box) return;

  box.innerHTML = "";

  if (!items || items.length === 0) {
    if (empty) empty.style.display = "block";
    return;
  }

  if (empty) empty.style.display = "none";

  items.forEach((it, idx) => {
    const row = document.createElement("div");
    row.className = "inv-preview-row";

    const name = (it.name ?? "Unknown").trim() || "Unknown";
    const weight = (it.weight_g ?? "None");
    const prod = (it.production_date ?? "None");
    const exp = (it.expiry_date ?? "None");

    // 左侧文字
    const text = document.createElement("div");
    text.className = "inv-preview-text";
    text.textContent = `${idx + 1}. ${name} | weight=${weight}g | prod=${prod} | exp=${exp}`;

    // 右侧删除按钮（删除单条）
    const del = document.createElement("button");
    del.className = "mini-btn";
    del.type = "button";
    del.textContent = (currentLang === "zh") ? "删除" : "Delete";
    del.addEventListener("click", () => {
      const updated = deleteInventoryItemById(it.id);
      renderInventoryPreview(updated);
      updateInventoryHint(null);
    });

    row.appendChild(text);
    row.appendChild(del);
    box.appendChild(row);
  });
}


function initInventory() {
  document.getElementById("btn-add-row").addEventListener("click", () => addItemRow());
  document.getElementById("btn-clear-rows").addEventListener("click", () => clearItemsTable());

  // load existing inventory
  let existing = loadInventoryFromDB();

  // ✅ migration: ensure every item has id
  let changed = false;
  existing = existing.map(it => {
    if (it && !it.id) {
      changed = true;
      return { id: uuid(), created_at: new Date().toISOString(), ...it };
    }
    return it;
  });
  if (changed) saveInventoryToDB(existing);

  // fill table (optional: show existing items in the left table)
  clearItemsTable();
  existing.forEach(addItemRow);
  if (existing.length === 0) addItemRow();

  // preview right panel
  renderInventoryPreview(existing);

  // ✅ Save: append to DB (ONLY ONE handler)
  document.getElementById("btn-save-inventory").addEventListener("click", () => {
    const newItems = readItemsFromTable();

    const cleaned = newItems.filter(it => {
      const hasName = (it.name ?? "").trim().length > 0;
      const hasAny =
        hasName ||
        it.weight_g != null ||
        it.energy_kj != null ||
        it.protein_g_per_100g != null ||
        it.carb_g_per_100g != null ||
        it.fat_g_per_100g != null ||
        it.production_date != null ||
        it.expiry_date != null;
      return hasAny;
    });

    const merged = appendToInventoryDB(cleaned);
    renderInventoryPreview(merged);

    updateInventoryHint(cleaned.length);
  });

  // ✅ Delete all inventory
  document.getElementById("btn-delete-inventory").addEventListener("click", () => {
    const cleared = clearInventoryDB();
    renderInventoryPreview(cleared);

    updateInventoryHint(null); // will show Total items: 0
  });
}



















/* ========= Page: Cook ========= */
function initCook() {
  const choice = document.getElementById("cook-choice");
  const form = document.getElementById("cook-form");
  const hint = document.getElementById("cook-items-hint");

  document.getElementById("btn-cook-continue").addEventListener("click", () => {
    const items = loadInventoryFromDB();
    if (!items.length) {
      hint.innerText = currentLang === "zh"
        ? "❌ 你的冰箱还没有存货，请先添加存货。"
        : "❌ No inventory yet. Please add items first.";
      return;
    }
    choice.classList.add("hidden");
    form.classList.remove("hidden");
    hint.innerText = "";
  });

  // result buttons
  document.getElementById("btn-clear")?.addEventListener("click", clearResult);
  document.getElementById("btn-copy")?.addEventListener("click", copyResult);

  document.getElementById("ask-btn").addEventListener("click", sendCook);
}

function clearResult() {
  const result = document.getElementById("result");
  if (!result) return;
  result.dataset.hasResult = "";
  result.classList.remove("loading");
  result.innerText = textMap[currentLang].waiting;
}

async function copyResult() {
  const result = document.getElementById("result");
  if (!result) return;
  const text = result.innerText || "";
  try {
    await navigator.clipboard.writeText(text);
    const t = document.getElementById("reaction-title");
    if (!t) return;
    const old = t.innerText;
    t.innerText = textMap[currentLang].copied;
    setTimeout(() => (t.innerText = old), 900);
  } catch {
    alert("Copy failed. Please select text and copy manually.");
  }
}

async function sendCook() {
  const items = loadInventoryFromDB();
  const request = document.getElementById("request")?.value ?? "";
  const extra = document.getElementById("extra")?.value ?? "";
  const people = parseInt(document.getElementById("people")?.value || "1", 10);
  const appetite = document.getElementById("appetite")?.value ?? "normal";
  const goal = document.getElementById("goal")?.value ?? "fat_loss";

  const result = document.getElementById("result");
  result.innerText = textMap[currentLang].thinking;
  result.classList.add("loading");

  try {
    const res = await fetch(`${API_BASE}/api/react`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ lang: currentLang, items, request, extra, people, appetite, goal })
    });

    const data = await res.json();
    result.classList.remove("loading");
    result.dataset.hasResult = "1";
    result.innerText = data.result || JSON.stringify(data, null, 2);
  } catch {
    result.classList.remove("loading");
    result.dataset.hasResult = "1";
    result.innerText = currentLang === "zh"
      ? "❌ 请求失败：请检查网络或 API 地址是否正确。"
      : "❌ Request failed: please check network or API URL.";
  }
}

/* ========= Boot ========= */
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("lang-en").addEventListener("click", () => setLang("en"));
  document.getElementById("lang-zh").addEventListener("click", () => setLang("zh"));
  applyI18n();
  loadView("home");
});