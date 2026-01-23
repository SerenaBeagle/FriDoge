import OpenAI from "openai";

export default async function handler(req, res) {
  // =========================
  // CORS (统一放最前面)
  // =========================
  // 先用 * 跑通 demo；后面想更安全可以改成只允许 GitHub Pages 域名
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS, GET");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // 让浏览器缓存 preflight（可选）
  res.setHeader("Access-Control-Max-Age", "86400");

  // =========================
  // Preflight
  // =========================
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // =========================
  // Health check (用于验证部署成功)
  // =========================
  if (req.method === "GET") {
    return res.status(200).json({ ok: true, msg: "FriDoge API is alive" });
  }

  // =========================
  // Only allow POST for main logic
  // =========================
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // =========================
  // Init OpenAI client
  // =========================
  if (!process.env.OPENAI_API_KEY) {
    return res.status(500).json({
      error: "Missing OPENAI_API_KEY in environment variables (Vercel)."
    });
  }

  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  // =========================
  // Parse body
  // =========================
  const {
    lang = "en",                 // "zh" | "en"
    items = [],                  // array of strings
    request = "",                // main request
    extra = "",                  // extra constraints
    people = 1,                  // number
    appetite = "normal",         // "small" | "normal" | "big" (or free text)
    goal = "whatever"            // "fat_loss" | "muscle_gain" | "low_sugar" | "cheat" | "whatever"
  } = req.body || {};

  if (!Array.isArray(items) || items.length === 0) {
    return res.status(200).json({
      result:
        lang === "zh"
          ? "🐶 冰狗：你还没告诉我冰箱里有什么呢～（请在“冰箱里有什么”里输入食材）"
          : "🐶 FriDoge: Tell me what's in your fridge first! (Please enter some items.)"
    });
  }

  // =========================
  // Structured instruction prompt
  // =========================
  const language = lang === "zh" ? "Chinese" : "English";

  const goalMap = {
    fat_loss: lang === "zh" ? "减脂" : "Fat loss",
    muscle_gain: lang === "zh" ? "增肌" : "Muscle gain",
    low_sugar: lang === "zh" ? "控糖" : "Low sugar",
    cheat: lang === "zh" ? "欺骗餐" : "Cheat meal",
    whatever: lang === "zh" ? "随便吃" : "Anything"
  };
  const goalText = goalMap[goal] || goal;

  const safeNoteZh =
    "注意：如果涉及生食/半熟/隔夜菜等风险，请给出食品安全提醒（但不用长篇科普）。";
  const safeNoteEn =
    "Note: If there are food safety risks (raw/undercooked/leftovers), add a short safety reminder (no long lecture).";

  const prompt = `
You are FriDoge, a warm, cute, practical fridge assistant dog 🐶.
You help users decide what to cook based on what they have.
You already read a lot of recipes for traditional Chinese food and Western food, and know how to give proper and practical advice.

TASK:
Create a SIMPLE plan for ONE meal (not a whole day), using the provided foods as much as possible.
If something critical is missing, suggest 1-2 optional add-ons.

OUTPUT FORMAT (must be structured, easy to follow):
1) Title line:
   - English: "🍽 Today's Menu (X dishes)"
   - Chinese: "🍽 今日菜单（共 X 道）"
2) Overview list (numbered): list dish names only.
3) For each dish, include sections:
   - "✅ Ingredients" / "✅ 食材"
   - "🧂 Seasoning (optional)" / "🧂 调味（可选）"
   - "👩‍🍳 Steps" / "👩‍🍳 步骤" (3–6 steps, short, actionable)
   - "⏱ Time" / "⏱ 时间" (rough estimate)
4) End with a short "✨ Tips" / "✨ 小贴士" (1–3 bullets) tailored to the user's goal.

CONSTRAINTS:
- Language: respond ONLY in ${language}
- People: ${people}
- Appetite: ${appetite}
- Goal: ${goalText}
- Keep it practical and not too long.

FOODS IN FRIDGE:
${items.map((x) => `- ${x}`).join("\n")}

USER REQUEST:
${request || (lang === "zh" ? "无特别要求" : "No special request")}

EXTRA NEEDS:
${extra || (lang === "zh" ? "无" : "None")}

${lang === "zh" ? safeNoteZh : safeNoteEn}
`;

  // =========================
  // Call OpenAI
  // =========================
  try {
    const response = await client.responses.create({
      model: "gpt-4.1-mini",
      input: prompt
    });

    return res.status(200).json({
      result: response.output_text || ""
    });
  } catch (err) {
    console.error("OpenAI error:", err);

    // 给前端更可读的错误（不会泄露 key）
    return res.status(500).json({
      error: "OpenAI request failed",
      detail: err?.message || String(err)
    });
  }
}
