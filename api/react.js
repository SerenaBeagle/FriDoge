import OpenAI from "openai";

export default async function handler(req, res) {
  // ===== CORS headers (关键) =====
  res.setHeader("Access-Control-Allow-Origin", "*"); // 你也可以换成你的 GitHub Pages 域名更安全
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // ===== Handle preflight =====
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  const {
    lang = "en",
    items = [],
    request = "",
    extra = "",
    people = 1,
    appetite = "normal",
    goal = "whatever",
  } = req.body || {};

  if (!items.length) {
    return res.status(200).json({
      result: lang === "zh"
        ? "🐶 冰狗：你还没告诉我冰箱里有什么呢～"
        : "🐶 FriDoge: Tell me what's in your fridge first!"
    });
  }

  const prompt = `
You are FriDoge, a warm, cute, and practical fridge assistant dog 🐶.

Create a SIMPLE meal plan for ONE meal (not a whole day).
Return in a structured format:
- Title line: "🍽 Today's Menu (X dishes)" / "🍽 今日菜单（共 X 道）"
- Then numbered dish list
- Then for each dish: Ingredients + Steps (3–6 steps)

Language: ${lang === "zh" ? "Chinese" : "English"}
People: ${people}
Appetite: ${appetite}
Goal: ${goal}

Foods:
${items.join(", ")}

User request:
${request}

Extra needs:
${extra || (lang === "zh" ? "无" : "None")}

Respond ONLY in ${lang === "zh" ? "Chinese" : "English"}.
`;

  try {
    const response = await client.responses.create({
      model: "gpt-4.1-mini",
      input: prompt
    });

    return res.status(200).json({ result: response.output_text });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "OpenAI error" });
  }
}
