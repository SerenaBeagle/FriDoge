import OpenAI from "openai";

export default async function handler(req, res) {
  // 只允许 POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  });

  const {
    lang = "en",
    items = [],
    request = "",
    extra = "",
    people = 1,
    appetite = "normal",
    goal = "whatever"
  } = req.body || {};

  if (!items.length) {
    return res.json({
      result: lang === "zh"
        ? "🐶 冰狗：你还没告诉我冰箱里有什么呢～"
        : "🐶 FriDoge: Tell me what's in your fridge first!"
    });
  }

  const prompt = `
You are FriDoge, a warm, cute fridge assistant dog 🐶.

Language: ${lang === "zh" ? "Chinese" : "English"}
People: ${people}
Appetite: ${appetite}
Goal: ${goal}

Foods:
${items.join(", ")}

User request:
${request}

Extra notes:
${extra || "None"}

Give a structured, practical meal suggestion.
Respond only in ${lang === "zh" ? "Chinese" : "English"}.
`;

  try {
    const response = await client.responses.create({
      model: "gpt-4.1-mini",
      input: prompt
    });

    res.status(200).json({
      result: response.output_text
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "OpenAI error" });
  }
}
