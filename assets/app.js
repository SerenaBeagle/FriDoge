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
    "common.unknown": "Unknown",

    "home.title": "🏠 Home",
    "home.desc": "Choose what you want to do:",
    "home.inventory": "📦 Add inventory",
    "home.view_inventory": "📚 View inventory",
    "home.cook": "🍳 Cook recipes",
    "home.reminder": "🔔 Reminders",
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
    "inv.view_inventory": "View inventory",

    "inv.col_name": "Name",
    "inv.col_weight": "Weight (g)",
    "inv.col_energy": "Energy (kJ)",
    "inv.col_protein": "Protein (g/100g)",
    "inv.col_carb": "Carb (g/100g)",
    "inv.col_fat": "Fat (g/100g)",
    "inv.col_production": "Production",
    "inv.col_expiry": "Expiry",
    "inv.col_photo": "Photo",
    "inv.none": "None",
    "inv.upload_btn": "📷 Upload",
    "inv.upload_reading": "Reading nutrition label...",
    "inv.upload_done": "✅ Filled (confidence: {confidence})",
    "inv.upload_failed": "❌ Failed: {error}",
    "inv.remove_title": "Remove",
    "inv.delete_row": "Delete",
    "inv.edit_row": "Edit",
    "inv.save_row": "Save",
    "inv.cancel_row": "Cancel",
    "inv.edit_invalid": "Cannot edit: Name, Weight and Expiry are required.",

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
    "rem.title": "⏰ Expiry Reminders",
    "rem.desc": "Foods sorted by expiry date (nearest first).",
    "rem.no_expiry": "No expiry data available.",
    "rem.expired": "❌ Expired",
    "rem.expires_today": "⚠️ Expires today",
    "rem.left": "⏳ {n} day(s) left",
    "view.title": "📚 View inventory",
    "view.desc": "Check all saved fridge items. You can edit or delete here.",
    "view.back_inventory": "← Back to add inventory",
    "view.back_home": "← Back to home",

    "add.required_hint": "Please fill in Name, Weight and Expiry date before saving.",
    "add.estimating": "Estimating calories and nutrition…",
    "add.estimate_failed": "Estimation failed. Saved without nutrition fields.",
  },

  zh: {
    "subtitle": "你贴心的冰箱小管家",
    "pill": "✨ 快速演示：冰箱 → 目标 → 冰狗建议",

    "common.back": "← 返回",
    "common.copy": "复制",
    "common.clear": "清空",
    "common.unknown": "未知",

    "home.title": "🏠 主界面",
    "home.desc": "选择你要做的事：",
    "home.inventory": "📦 添加存货",
    "home.view_inventory": "📚 查看存货",
    "home.cook": "🍳 做饭菜谱",
    "home.reminder": "🔔 请求查看提醒",
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
    "inv.view_inventory": "查看存货",

    "inv.col_name": "名称",
    "inv.col_weight": "重量 (g)",
    "inv.col_energy": "能量 (kJ)",
    "inv.col_protein": "蛋白质 (g/100g)",
    "inv.col_carb": "碳水 (g/100g)",
    "inv.col_fat": "脂肪 (g/100g)",
    "inv.col_production": "生产日期",
    "inv.col_expiry": "保质期/到期",
    "inv.col_photo": "照片",
    "inv.none": "无",
    "inv.upload_btn": "📷 上传",
    "inv.upload_reading": "正在识别营养成分表...",
    "inv.upload_done": "✅ 已识别并回填（置信度：{confidence}）",
    "inv.upload_failed": "❌ 识别失败：{error}",
    "inv.remove_title": "移除",
    "inv.delete_row": "删除",
    "inv.edit_row": "编辑",
    "inv.save_row": "保存",
    "inv.cancel_row": "取消",
    "inv.edit_invalid": "无法编辑：名字、重量、过期日期为必填项。",

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
    "rem.title": "⏰ 到期提醒",
    "rem.desc": "按到期日期排序（越近越靠前）。",
    "rem.no_expiry": "暂无到期日期信息。",
    "rem.expired": "❌ 已过期",
    "rem.expires_today": "⚠️ 今天到期",
    "rem.left": "⏳ 剩余 {n} 天",
    "view.title": "📚 查看存货",
    "view.desc": "查看全部已保存存货，也可以在这里编辑或删除。",
    "view.back_inventory": "← 返回添加存货",
    "view.back_home": "← 返回首页",
    "add.required_hint": "请先填写：名字、重量、过期日期，才能保存。",
    "add.estimating": "正在估算热量等营养指标…",
    "add.estimate_failed": "估算失败：已先保存（不含营养信息）。",

  }
};


function fmtI18n(key, vars = {}) {
  const table = dict[currentLang] || dict.en;
  let s = (table[key] !== undefined ? table[key] : (dict.en[key] ?? ""));
  for (const [k, v] of Object.entries(vars)) {
    s = s.replaceAll(`{${k}}`, String(v));
  }
  return s;
}


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
  
  // ✅ 切换语言后：Home 页提醒横幅需要重渲染（里面有动态文本）
  if (document.getElementById("home-reminder-container")) {
    renderHomeReminderBanner();
  }

  // ✅ 切换语言后：Reminder 页列表需要重渲染（里面有动态文本）
  if (document.getElementById("reminder-list")) {
    initReminderPage();
  }

  // ✅ 切换语言后：inventory 页列表需要重渲染（里面有动态文本）
  if (document.getElementById("inventory-required-banner")) {
    renderRequiredBannerIfNeeded();
  }

  if (document.getElementById("items-rows")) {
    localizeInventoryRows();
  }

  if (document.getElementById("save-status")) {
    renderInventorySaveStatus();
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

function updateInventoryItemById(id, nextFields = {}) {
  const db = loadInventoryFromDB();
  const updated = db.map(it => {
    if (it.id !== id) return it;
    return {
      ...it,
      ...nextFields,
      id: it.id,
      created_at: it.created_at ?? new Date().toISOString(),
    };
  });
  saveInventoryToDB(updated);
  return updated;
}

function clearInventoryDB() {
  localStorage.removeItem(INVENTORY_KEY);
  return [];
}

const LS_REQUIRED_BANNER = "fridoge_required_banner";

function setRequiredBanner(on) {
  if (on) localStorage.setItem(LS_REQUIRED_BANNER, "1");
  else localStorage.removeItem(LS_REQUIRED_BANNER);
}

function hasRequiredBanner() {
  return localStorage.getItem(LS_REQUIRED_BANNER) === "1";
}

const inventoryUiState = {
  saveStatusKey: null,
  saveStatusVars: {},
};

function setInventorySaveStatus(key = null, vars = {}) {
  inventoryUiState.saveStatusKey = key;
  inventoryUiState.saveStatusVars = vars;
  renderInventorySaveStatus();
}

function renderInventorySaveStatus() {
  const el = document.getElementById("save-status");
  if (!el) return;

  if (!inventoryUiState.saveStatusKey) {
    el.innerText = "";
    el.style.display = "none";
    return;
  }

  el.style.display = "block";
  el.innerText = fmtI18n(inventoryUiState.saveStatusKey, inventoryUiState.saveStatusVars);
}





/* ========= Router: load html partial ========= */
async function loadView(name) {
  const root = document.getElementById("view-root");
  root.innerHTML = `<div class="panel">Loading...</div>`;

  const res = await fetch(`/pages/${name}.html`, { cache: "no-store" });
  const html = await res.text();
  root.innerHTML = html;

  // bind page-specific logic
  if (name === "home") {
    initHome();
    renderHomeReminderBanner();
  }

  if (name === "inventory") initInventory();
  if (name === "view_inventory") initViewInventoryPage();
  if (name === "cook") initCook();

  if (name === "reminder") {
    initReminderPage();
  }

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

function initViewInventoryPage() {
  renderInventoryPreview(loadInventoryFromDB());
}

function renderHomeReminderBanner() {
  const container = document.getElementById("home-reminder-container");
  if (!container) return;

  const soon = getExpiringSoonItems(7);

  container.innerHTML = "";

  if (soon.length === 0) return;

  const banner = document.createElement("div");
  banner.className = "home-reminder-banner";

  soon.forEach(it => {
    const line = document.createElement("div");
    line.className = "home-reminder-line";
    line.innerText = `${it.name} — ${fmtI18n("rem.left", { n: it.diffDays })}`;
    banner.appendChild(line);
  });

  container.appendChild(banner);
}






/* ========= Page: Inventory ========= */
function addItemRow(prefill = {}) {
  const rows = document.getElementById("items-rows");
  const row = document.createElement("div");
  row.className = "item-row";

  row.innerHTML = `
    <div class="item-field-line">
      <span class="item-field-label" data-field-i18n="inv.col_name"></span>
      <input class="item-name" type="text" placeholder="e.g. chicken breast" value="${escapeHtml(prefill.name ?? "")}" />
    </div>
    <div class="item-field-line">
      <span class="item-field-label" data-field-i18n="inv.col_weight"></span>
      <input class="item-weight" type="number" min="0" step="any" placeholder="g" value="${prefill.weight_g ?? ""}" />
    </div>
    <div class="item-field-line">
      <span class="item-field-label" data-field-i18n="inv.col_energy"></span>
      <input class="item-energy" type="number" min="0" step="any" placeholder="kJ" value="${prefill.energy_kj ?? ""}" />
    </div>
    <div class="item-field-line">
      <span class="item-field-label" data-field-i18n="inv.col_protein"></span>
      <input class="item-protein" type="number" min="0" step="any" placeholder="g/100g" value="${prefill.protein_g_per_100g ?? ""}" />
    </div>
    <div class="item-field-line">
      <span class="item-field-label" data-field-i18n="inv.col_carb"></span>
      <input class="item-carb" type="number" min="0" step="any" placeholder="g/100g" value="${prefill.carb_g_per_100g ?? ""}" />
    </div>
    <div class="item-field-line">
      <span class="item-field-label" data-field-i18n="inv.col_fat"></span>
      <input class="item-fat" type="number" min="0" step="any" placeholder="g/100g" value="${prefill.fat_g_per_100g ?? ""}" />
    </div>
    <div class="item-field-line">
      <span class="item-field-label" data-field-i18n="inv.col_production"></span>
      <input class="item-prod" type="date" value="${prefill.production_date ?? ""}" />
    </div>
    <div class="item-field-line">
      <span class="item-field-label" data-field-i18n="inv.col_expiry"></span>
      <input class="item-exp" type="date" value="${prefill.expiry_date ?? ""}" />
    </div>
    <div class="item-field-line">
      <span class="item-field-label" data-field-i18n="inv.col_photo"></span>
      <div class="item-photo-actions">
        <button class="mini-btn item-upload-btn" type="button">${fmtI18n("inv.upload_btn")}</button>
        <input class="item-photo" type="file" accept="image/*" style="display:none" />
        <button class="remove-btn" type="button" title="${escapeHtml(fmtI18n("inv.remove_title"))}">✕</button>
      </div>
    </div>
    <div class="hint item-photo-status"></div>
  `;

  // bind upload
  const uploadBtn = row.querySelector(".item-upload-btn");
  const fileInput = row.querySelector(".item-photo");
  const statusEl = row.querySelector(".item-photo-status");

  uploadBtn.addEventListener("click", () => fileInput.click());
  fileInput.addEventListener("change", async () => {
    const file = fileInput.files?.[0];
    if (!file) return;

    statusEl.innerText = fmtI18n("inv.upload_reading");

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
      statusEl.innerText = fmtI18n("inv.upload_done", { confidence: out.confidence ?? "?" });
    } catch (e) {
      statusEl.innerText = fmtI18n("inv.upload_failed", { error: e.message });
    } finally {
      fileInput.value = "";
    }
  });

  // bind remove
  row.querySelector(".remove-btn").addEventListener("click", () => row.remove());

  rows.appendChild(row);
  localizeInventoryRows();
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

function localizeInventoryRows() {
  document.querySelectorAll("#items-rows .item-row").forEach(row => {
    row.querySelectorAll("[data-field-i18n]").forEach(label => {
      const key = label.getAttribute("data-field-i18n");
      label.innerText = `${fmtI18n(key)}:`;
    });

    const uploadBtn = row.querySelector(".item-upload-btn");
    if (uploadBtn) uploadBtn.innerText = fmtI18n("inv.upload_btn");

    const removeBtn = row.querySelector(".remove-btn");
    if (removeBtn) removeBtn.title = fmtI18n("inv.remove_title");
  });
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
  let hasMissingRequired = false;

  for (const r of rows) {
    const name = (r.querySelector(".item-name")?.value ?? "").trim();
    const weight = readNullableNumber(r.querySelector(".item-weight")?.value);
    const expiry = readNullableDate(r.querySelector(".item-exp")?.value);

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

    const hasRequired = !!name && weight !== null && expiry !== null;
    if (!hasRequired) {
      hasMissingRequired = true;
      continue;
    }

    items.push({
      name,
      weight_g: weight,
      energy_kj: readNullableNumber(r.querySelector(".item-energy")?.value),
      protein_g_per_100g: readNullableNumber(r.querySelector(".item-protein")?.value),
      carb_g_per_100g: readNullableNumber(r.querySelector(".item-carb")?.value),
      fat_g_per_100g: readNullableNumber(r.querySelector(".item-fat")?.value),
      production_date: readNullableDate(r.querySelector(".item-prod")?.value),
      expiry_date: expiry,
    });
  }

  return { items, hasMissingRequired };
}

function needsNutritionEstimation(item) {
  const hasRequired = !!item?.name && item?.weight_g !== null && item?.expiry_date !== null;
  if (!hasRequired) return false;
  return (
    item.energy_kj === null ||
    item.protein_g_per_100g === null ||
    item.carb_g_per_100g === null ||
    item.fat_g_per_100g === null
  );
}

function mergeEstimatedNutrition(item, estimatedItem = {}) {
  const toNum = (v) => readNullableNumber(v);
  return {
    ...item,
    energy_kj: item.energy_kj ?? toNum(estimatedItem.energy_kj),
    protein_g_per_100g: item.protein_g_per_100g ?? toNum(estimatedItem.protein_g_per_100g),
    carb_g_per_100g: item.carb_g_per_100g ?? toNum(estimatedItem.carb_g_per_100g),
    fat_g_per_100g: item.fat_g_per_100g ?? toNum(estimatedItem.fat_g_per_100g),
  };
}

async function estimateNutritionForItem(item) {
  const res = await fetch(`${API_BASE}/api/nutrition`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      lang: currentLang,
      estimate_only: true,
      hint: { name: item.name, weight_g: item.weight_g }
    })
  });

  const out = await res.json();
  if (!res.ok) {
    throw new Error(out?.detail || out?.error || "nutrition estimate failed");
  }
  return mergeEstimatedNutrition(item, out?.item);
}

async function estimateItemsForSave(items) {
  const shouldEstimate = items.some(needsNutritionEstimation);
  if (!shouldEstimate) return { items, failedCount: 0 };

  setInventorySaveStatus("add.estimating");

  try {
    const settled = await Promise.all(items.map(async (item) => {
      if (!needsNutritionEstimation(item)) {
        return { item, failed: false };
      }
      try {
        const estimated = await estimateNutritionForItem(item);
        return { item: estimated, failed: false };
      } catch {
        return { item, failed: true };
      }
    }));

    return {
      items: settled.map(x => x.item),
      failedCount: settled.filter(x => x.failed).length
    };
  } finally {
    setInventorySaveStatus(null);
  }
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

  const asText = (val) => {
    if (val === null || val === undefined || String(val).trim() === "") {
      return fmtI18n("inv.none");
    }
    return String(val);
  };

  const detailLine = (labelKey, value) => {
    const line = document.createElement("div");
    line.className = "inv-detail-line";
    const k = document.createElement("span");
    k.className = "inv-detail-key";
    k.innerText = `${fmtI18n(labelKey)}:`;
    const v = document.createElement("span");
    v.className = "inv-detail-value";
    v.innerText = value;
    line.appendChild(k);
    line.appendChild(v);
    return line;
  };

  items.forEach((it, idx) => {
    const row = document.createElement("div");
    row.className = "inv-preview-row";

    const header = document.createElement("div");
    header.className = "inv-preview-head";
    header.innerText = `${idx + 1}. ${(it.name ?? "").toString().trim() || fmtI18n("common.unknown")}`;

    const details = document.createElement("div");
    details.className = "inv-preview-details";
    details.appendChild(detailLine("inv.col_weight", (it.weight_g === null || it.weight_g === undefined) ? fmtI18n("inv.none") : `${it.weight_g}g`));
    details.appendChild(detailLine("inv.col_energy", (it.energy_kj === null || it.energy_kj === undefined) ? fmtI18n("inv.none") : `${it.energy_kj} kJ`));
    details.appendChild(detailLine("inv.col_protein", (it.protein_g_per_100g === null || it.protein_g_per_100g === undefined) ? fmtI18n("inv.none") : `${it.protein_g_per_100g} g/100g`));
    details.appendChild(detailLine("inv.col_carb", (it.carb_g_per_100g === null || it.carb_g_per_100g === undefined) ? fmtI18n("inv.none") : `${it.carb_g_per_100g} g/100g`));
    details.appendChild(detailLine("inv.col_fat", (it.fat_g_per_100g === null || it.fat_g_per_100g === undefined) ? fmtI18n("inv.none") : `${it.fat_g_per_100g} g/100g`));
    details.appendChild(detailLine("inv.col_production", asText(it.production_date)));
    details.appendChild(detailLine("inv.col_expiry", asText(it.expiry_date)));

    const actions = document.createElement("div");
    actions.className = "inv-entry-actions";

    const editBtn = document.createElement("button");
    editBtn.className = "mini-btn split-btn";
    editBtn.type = "button";
    editBtn.innerText = fmtI18n("inv.edit_row");

    const del = document.createElement("button");
    del.className = "mini-btn split-btn";
    del.type = "button";
    del.innerText = fmtI18n("inv.delete_row");

    actions.appendChild(editBtn);
    actions.appendChild(del);

    const editor = document.createElement("div");
    editor.className = "inv-inline-edit hidden";
    editor.innerHTML = `
      <div class="item-field-line">
        <span class="item-field-label">${fmtI18n("inv.col_name")}:</span>
        <input class="edit-name" type="text" value="${escapeHtml(it.name ?? "")}" />
      </div>
      <div class="item-field-line">
        <span class="item-field-label">${fmtI18n("inv.col_weight")}:</span>
        <input class="edit-weight" type="number" min="0" step="any" value="${escapeHtml(String(it.weight_g ?? ""))}" />
      </div>
      <div class="item-field-line">
        <span class="item-field-label">${fmtI18n("inv.col_energy")}:</span>
        <input class="edit-energy" type="number" min="0" step="any" value="${escapeHtml(String(it.energy_kj ?? ""))}" />
      </div>
      <div class="item-field-line">
        <span class="item-field-label">${fmtI18n("inv.col_protein")}:</span>
        <input class="edit-protein" type="number" min="0" step="any" value="${escapeHtml(String(it.protein_g_per_100g ?? ""))}" />
      </div>
      <div class="item-field-line">
        <span class="item-field-label">${fmtI18n("inv.col_carb")}:</span>
        <input class="edit-carb" type="number" min="0" step="any" value="${escapeHtml(String(it.carb_g_per_100g ?? ""))}" />
      </div>
      <div class="item-field-line">
        <span class="item-field-label">${fmtI18n("inv.col_fat")}:</span>
        <input class="edit-fat" type="number" min="0" step="any" value="${escapeHtml(String(it.fat_g_per_100g ?? ""))}" />
      </div>
      <div class="item-field-line">
        <span class="item-field-label">${fmtI18n("inv.col_production")}:</span>
        <input class="edit-prod" type="date" value="${escapeHtml(String(it.production_date ?? ""))}" />
      </div>
      <div class="item-field-line">
        <span class="item-field-label">${fmtI18n("inv.col_expiry")}:</span>
        <input class="edit-exp" type="date" value="${escapeHtml(String(it.expiry_date ?? ""))}" />
      </div>
      <div class="hint edit-hint"></div>
      <div class="inv-entry-actions">
        <button class="mini-btn split-btn btn-save-edit" type="button">${fmtI18n("inv.save_row")}</button>
        <button class="mini-btn split-btn btn-cancel-edit" type="button">${fmtI18n("inv.cancel_row")}</button>
      </div>
    `;

    editBtn.addEventListener("click", () => {
      editor.classList.toggle("hidden");
    });

    del.addEventListener("click", () => {
      const updated = deleteInventoryItemById(it.id);
      renderInventoryPreview(updated);
      updateInventoryHint(null);
    });

    const saveEditBtn = editor.querySelector(".btn-save-edit");
    const cancelEditBtn = editor.querySelector(".btn-cancel-edit");
    const editHint = editor.querySelector(".edit-hint");

    cancelEditBtn?.addEventListener("click", () => {
      editor.classList.add("hidden");
      if (editHint) editHint.innerText = "";
    });

    saveEditBtn?.addEventListener("click", async () => {
      const name = (editor.querySelector(".edit-name")?.value ?? "").trim();
      const weight = readNullableNumber(editor.querySelector(".edit-weight")?.value);
      const expiry = readNullableDate(editor.querySelector(".edit-exp")?.value);

      if (!name || weight === null || expiry === null) {
        if (editHint) editHint.innerText = fmtI18n("inv.edit_invalid");
        return;
      }

      if (editHint) editHint.innerText = "";
      saveEditBtn.disabled = true;

      try {
        const candidate = {
          ...it,
          name,
          weight_g: weight,
          energy_kj: readNullableNumber(editor.querySelector(".edit-energy")?.value),
          protein_g_per_100g: readNullableNumber(editor.querySelector(".edit-protein")?.value),
          carb_g_per_100g: readNullableNumber(editor.querySelector(".edit-carb")?.value),
          fat_g_per_100g: readNullableNumber(editor.querySelector(".edit-fat")?.value),
          production_date: readNullableDate(editor.querySelector(".edit-prod")?.value),
          expiry_date: expiry,
        };

        const { items: estimatedItems } = await estimateItemsForSave([candidate]);
        const updated = updateInventoryItemById(it.id, estimatedItems[0]);
        renderInventoryPreview(updated);
        updateInventoryHint(null);
      } finally {
        saveEditBtn.disabled = false;
      }
    });

    row.appendChild(header);
    row.appendChild(details);
    row.appendChild(actions);
    row.appendChild(editor);
    box.appendChild(row);
  });


}

function renderRequiredBannerIfNeeded() {
  const host = document.getElementById("inventory-required-banner");
  if (!host) return;

  if (!hasRequiredBanner()) {
    host.innerHTML = "";
    return;
  }

  host.innerHTML = `
    <div class="notice warning">
      ${fmtI18n("add.required_hint")}
    </div>
  `;
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
  renderRequiredBannerIfNeeded();
  localizeInventoryRows();
  renderInventorySaveStatus();

  const rowsHost = document.getElementById("items-rows");
  const clearBannerOnEdit = (e) => {
    const target = e.target;
    if (!(target instanceof Element) || !target.closest(".item-row")) return;
    if (!hasRequiredBanner()) return;
    setRequiredBanner(false);
    renderRequiredBannerIfNeeded();
  };
  rowsHost.addEventListener("input", clearBannerOnEdit);
  rowsHost.addEventListener("change", clearBannerOnEdit);

  // ✅ Save: append to DB (ONLY ONE handler)
  document.getElementById("btn-save-inventory").addEventListener("click", async (e) => {
    const btn = e.currentTarget;
    if (!(btn instanceof HTMLButtonElement) || btn.disabled) return;
    btn.disabled = true;

    try {
      const { items: newItems, hasMissingRequired } = readItemsFromTable();

      if (hasMissingRequired || newItems.length === 0) {
        setRequiredBanner(true);
        await loadView("inventory");
        return;
      }

      setRequiredBanner(false);
      renderRequiredBannerIfNeeded();

      const { items: estimatedItems } = await estimateItemsForSave(newItems);
      const merged = appendToInventoryDB(estimatedItems);
      renderInventoryPreview(merged);
      updateInventoryHint(estimatedItems.length);

      // Save succeeded: clear current input rows once for next entry batch.
      clearItemsTable();
      addItemRow();
    } finally {
      setInventorySaveStatus(null);
      btn.disabled = false;
    }
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








/* ========= Page: Reminder========= */
function getSortedInventoryByExpiry() {
  const items = loadInventoryFromDB();

  const today = new Date();

  return items
    .filter(it => it.expiry_date)
    .map(it => {
      const expiry = new Date(it.expiry_date);
      const diffDays = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));
      return { ...it, diffDays };
    })
    .sort((a, b) => a.diffDays - b.diffDays);
}


function getExpiringSoonItems(days = 7) {
  return getSortedInventoryByExpiry()
    .filter(it => it.diffDays >= 0 && it.diffDays <= days);
}



function initReminderPage() {
  const list = document.getElementById("reminder-list");
  if (!list) return;

  const items = getSortedInventoryByExpiry();
  list.innerHTML = "";

  if (items.length === 0) {
    const p = document.createElement("p");
    p.innerText = fmtI18n("rem.no_expiry");
    list.appendChild(p);
    return;
  }

  items.forEach(it => {
    const div = document.createElement("div");
    div.className = "reminder-item";

    const name = (it.name && String(it.name).trim()) ? it.name : fmtI18n("common.unknown");

    let status = "";
    if (it.diffDays < 0) {
      status = fmtI18n("rem.expired");
    } else if (it.diffDays === 0) {
      status = fmtI18n("rem.expires_today");
    } else {
      status = fmtI18n("rem.left", { n: it.diffDays });
    }

    div.innerText = `${name} — ${status}`;
    list.appendChild(div);
  });
}



/* ========= Boot ========= */
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("lang-en").addEventListener("click", () => setLang("en"));
  document.getElementById("lang-zh").addEventListener("click", () => setLang("zh"));
  applyI18n();
  loadView("home");
});
