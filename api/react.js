import OpenAI from "openai";

function toNone(val) {
  // null/undefined/"" -> "None"
  if (val === null || val === undefined) return "None";
  if (typeof val === "string" && val.trim() === "") return "None";
  return String(val);
}

function isItemObject(x) {
  return x && typeof x === "object" && !Array.isArray(x);
}

function formatItemsForPrompt(items) {
  // Accept both:
  // 1) string[]
  // 2) { name, weight_g, energy_kj, protein_g_per_100g, carb_g_per_100g, fat_g_per_100g }[]
  if (!Array.isArray(items)) return { lines: [], count: 0 };

  // Old format: string[]
  if (items.length > 0 && typeof items[0] === "string") {
    const cleaned = items.map(s => String(s).trim()).filter(Boolean);
    return {
      lines: cleaned.map(x => `- ${x}`),
      count: cleaned.length
    };
  }

  // New format: object[]
  const lines = [];
  for (const it of items) {
    if (!isItemObject(it)) continue;

    const name = (it.name ?? "").toString().trim() || "Unknown item";

    const weight_g = it.weight_g;
    const energy_kj = it.energy_kj;
    const protein = it.protein_g_per_100g;
    const carb = it.carb_g_per_100g;
    const fat = it.fat_g_per_100g;
    const prod = it.production_date;
    const exp = it.expiry_date;

    // Skip totally empty rows (if someone sends them)
    const hasAny =
      (it.name ?? "").toString().trim() ||
      weight_g !== null && weight_g !== undefined ||
      energy_kj !== null && energy_kj !== undefined ||
      protein !== null && protein !== undefined ||
      carb !== null && carb !== undefined ||
      fat !== null && fat !== undefined;

    if (!hasAny) continue;

    lines.push(
      `- ${name} | weight_g=${toNone(weight_g)} | energy_kJ=${toNone(energy_kj)} | ` +
      `protein_g/100g=${toNone(protein)} | carb_g/100g=${toNone(carb)} | fat_g/100g=${toNone(fat)} production_date=${toNone(prod)} | expiry_date=${toNone(exp)}`
    );
  }

  return { lines, count: lines.length };
}

export default async function handler(req, res) {
  // =========================
  // CORS
  // =========================
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS, GET");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Max-Age", "86400");

  if (req.method === "OPTIONS") return res.status(200).end();

  // Health check
  if (req.method === "GET") {
    return res.status(200).json({ ok: true, msg: "FriDoge API is alive" });
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

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
    items = [],                  // string[] OR object[]
    request = "",
    extra = "",
    people = 1,
    appetite = "normal",
    goal = "whatever"
  } = req.body || {};

  const { lines: fridgeLines, count: fridgeCount } = formatItemsForPrompt(items);

  if (fridgeCount === 0) {
    return res.status(200).json({
      result:
        lang === "zh"
          ? "🐶 冰狗：你还没告诉我冰箱里有什么呢～（请先添加至少一条食材）"
          : "🐶 FriDoge: Tell me what's in your fridge first! (Please add at least one item.)"
    });
  }

  // =========================
  // Prompt
  // =========================
  const language = lang === "zh" ? "Chinese" : "English";

  // NOTE: front-end uses cheat_meal in index.html :contentReference[oaicite:1]{index=1}
  const goalMap = {
    fat_loss: lang === "zh" ? "减脂" : "Fat loss",
    muscle_gain: lang === "zh" ? "增肌" : "Muscle gain",
    low_sugar: lang === "zh" ? "控糖" : "Low sugar",
    cheat: lang === "zh" ? "欺骗餐" : "Cheat meal",
    cheat_meal: lang === "zh" ? "欺骗餐" : "Cheat meal",
    whatever: lang === "zh" ? "随便吃" : "Anything"
  };
  const goalText = goalMap[goal] || goal;

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

If nutrition fields are provided (energy/macros), you MAY use them to:
- choose leaner options for fat loss,
- choose higher protein options for muscle gain,
- reduce sugar-heavy choices for low sugar,
but do NOT do heavy calculations. Keep it practical.

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
${fridgeLines.join("\n")}

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
    return res.status(500).json({
      error: "OpenAI request failed",
      detail: err?.message || String(err)
    });
  }
}
