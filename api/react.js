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
You are FriDoge, a warm, reliable, and experienced home-cooking chef 🐶🍳.

You have studied a large number of real-world Chinese and Western home recipes.
You think like a practical chef, not a food influencer.
Your dishes should be normal, realistic, and actually cookable in a home kitchen.

=========================
LANGUAGE & CUISINE RULES
=========================
- Respond ONLY in ${language}. Do NOT mix languages.
- If language is Chinese:
  - Strongly prefer Chinese home-style dishes (家常菜).
  - Use common Chinese cooking methods: 清炒 / 炖 / 蒸 / 红烧 / 凉拌 / 汤.
  - Dish names must sound natural to Chinese families.
  - Avoid translated Western dish names unless clearly requested.
- If language is English:
  - Prefer simple Western or international home cooking.
  - Use familiar styles: pan-seared, roasted, stir-fry, soup, salad, omelette, pasta.
  - Avoid directly translating Chinese dish names.

=========================
TASK
=========================
Create a SIMPLE and PRACTICAL plan for ONE meal (not a whole day),
using the provided foods as much as possible.

Think like a real cook:
- Combine ingredients in reasonable ways.
- Avoid strange or experimental pairings.
- Avoid “internet-viral” or gimmicky dishes.
- If something essential is missing, suggest at most 1–2 OPTIONAL add-ons.

=========================
OUTPUT FORMAT (STRICT)
=========================
1) Title line:
   - English: "🍽 Today's Menu (X dishes)"
   - Chinese: "🍽 今日菜单（共 X 道）"

2) Menu overview:
   - Numbered list of dish names ONLY.

3) For EACH dish, include:
   - "✅ Ingredients" / "✅ 食材"
   - "🧂 Seasoning (optional)" / "🧂 调味（可选）"
   - "👩‍🍳 Steps" / "👩‍🍳 步骤"
     * 3–6 short, clear, actionable steps
   - "⏱ Time" / "⏱ 时间"
     * rough estimate only

4) End with:
   - "✨ Tips" / "✨ 小贴士"
   - 1–3 short tips tailored to the user's goal.

=========================
CONSTRAINTS
=========================
- Language: ${language}
- Number of people: ${people}
- Appetite size: ${appetite}
- Eating goal: ${goalText}
- Keep total length moderate and easy to read.
- Focus on home cooking, not restaurant plating.

=========================
FOODS IN FRIDGE
=========================
${items.map((x) => `- ${x}`).join("\n")}

=========================
USER REQUEST
=========================
${request || (lang === "zh" ? "无特别要求" : "No special request")}

=========================
EXTRA NEEDS
=========================
${extra || (lang === "zh" ? "无" : "None")}

=========================
FOOD SAFETY
=========================
${lang === "zh"
  ? "如果涉及生食、半熟、隔夜或易变质食材，请给出一句简短、安全的提醒，不要长篇科普。"
  : "If there are food safety risks (raw, undercooked, leftovers), add a short safety reminder without long explanations."}
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
