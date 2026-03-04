import OpenAI from "openai";

// NOTE: This endpoint extracts nutrition facts from an uploaded image
// and returns structured JSON for ONE item row.

function normalizeNumber(x) {
  if (x === null || x === undefined) return null;
  if (typeof x === "number" && Number.isFinite(x)) return x;
  const s = String(x).trim();
  if (!s) return null;
  const n = Number(s);
  return Number.isFinite(n) ? n : null;
}

function clampReasonable(item) {
  // Basic sanity (optional): avoid crazy values from OCR mistakes
  const out = { ...item };
  const nonneg = (v) => (v === null ? null : Math.max(0, v));

  out.weight_g = nonneg(normalizeNumber(out.weight_g));
  out.energy_kj = nonneg(normalizeNumber(out.energy_kj));
  out.protein_g_per_100g = nonneg(normalizeNumber(out.protein_g_per_100g));
  out.carb_g_per_100g = nonneg(normalizeNumber(out.carb_g_per_100g));
  out.fat_g_per_100g = nonneg(normalizeNumber(out.fat_g_per_100g));

  if (out.name !== null && out.name !== undefined) {
    const name = String(out.name).trim();
    out.name = name ? name : null;
  } else {
    out.name = null;
  }
  return out;
}

function parseJsonFromResponse(resp) {
  if (resp?.output_parsed) return resp.output_parsed;

  const text = resp?.output_text;
  if (!text || typeof text !== "string") {
    throw new Error("OpenAI response has no output_text to parse.");
  }
  try {
    return JSON.parse(text);
  } catch (e) {
    throw new Error(`JSON.parse failed: ${e.message}. output_text head: ${text.slice(0, 300)}`);
  }
}

async function estimateNutritionFromHint(client, { name, weight_g, userLang }) {
  const estimateSchema = {
    name: "nutrition_estimate_schema",
    schema: {
      type: "object",
      additionalProperties: false,
      properties: {
        item: {
          type: "object",
          additionalProperties: false,
          properties: {
            energy_kj: { type: ["number", "null"] },
            protein_g_per_100g: { type: ["number", "null"] },
            carb_g_per_100g: { type: ["number", "null"] },
            fat_g_per_100g: { type: ["number", "null"] }
          },
          required: ["energy_kj", "protein_g_per_100g", "carb_g_per_100g", "fat_g_per_100g"]
        },
        confidence: { type: "string", enum: ["high", "medium", "low"] },
        notes: { type: "string" }
      },
      required: ["item", "confidence", "notes"]
    }
  };

  const estInstruction = `
You are estimating nutrition values for a packaged food product when complete label data is unavailable.

Given:
- product name: ${name}
- net weight (g): ${weight_g}

Task:
Return plausible typical values PER 100g for:
- energy_kj
- protein_g_per_100g
- carb_g_per_100g
- fat_g_per_100g

Rules:
- If uncertain, return null rather than guessing wildly.
- Confidence should usually be "low" or "medium" for estimates.
- Keep notes short in ${userLang}.
- Output strict JSON matching schema; no extra keys.
`;

  const estResp = await client.responses.create({
    model: "gpt-4.1-mini",
    input: estInstruction,
    text: {
      format: {
        type: "json_schema",
        name: estimateSchema.name,
        strict: true,
        schema: estimateSchema.schema
      }
    }
  });

  const est = parseJsonFromResponse(estResp);
  if (!est || !est.item) {
    throw new Error("Failed to parse estimate response");
  }
  return {
    item: clampReasonable({ name: null, weight_g: null, ...est.item }),
    confidence: est.confidence,
    notes: est.notes
  };
}


export default async function handler(req, res) {
  // CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS, GET");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Max-Age", "86400");
  if (req.method === "OPTIONS") return res.status(200).end();

  if (req.method === "GET") {
    return res.status(200).json({ ok: true, msg: "nutrition api alive" });
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!process.env.OPENAI_API_KEY) {
    return res.status(500).json({ error: "Missing OPENAI_API_KEY in env" });
  }

  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  const {
    lang = "en",
    image_base64 = "",
    image_mime = "image/jpeg",
    hint = { name: null, weight_g: null },
    estimate_only = false
  } = req.body || {};

  const hintName = (hint?.name ?? "").toString().trim() || null;
  const hintWeight = normalizeNumber(hint?.weight_g);
  const userLang = lang === "zh" ? "Chinese" : "English";

  const estimateMode = !!estimate_only || !image_base64;
  if (estimateMode && (!hintName || hintWeight === null)) {
    return res.status(400).json({ error: "hint.name and hint.weight_g are required for estimate mode" });
  }

  if (estimateMode) {
    try {
      const est = await estimateNutritionFromHint(client, {
        name: hintName,
        weight_g: hintWeight,
        userLang
      });

      return res.status(200).json({
        item: {
          name: hintName,
          weight_g: hintWeight,
          energy_kj: est.item.energy_kj,
          protein_g_per_100g: est.item.protein_g_per_100g,
          carb_g_per_100g: est.item.carb_g_per_100g,
          fat_g_per_100g: est.item.fat_g_per_100g
        },
        confidence: est.confidence,
        notes: est.notes
      });
    } catch (err) {
      console.error("nutrition estimate error:", err);
      return res.status(500).json({ error: "Nutrition estimate failed", detail: err?.message || String(err) });
    }
  }


  const schema = {
    name: "nutrition_item_schema",
    schema: {
      type: "object",
      additionalProperties: false,
      properties: {
        item: {
          type: "object",
          additionalProperties: false,
          properties: {
            name: { type: ["string", "null"] },
            weight_g: { type: ["number", "null"] },
            energy_kj: { type: ["number", "null"] },
            protein_g_per_100g: { type: ["number", "null"] },
            carb_g_per_100g: { type: ["number", "null"] },
            fat_g_per_100g: { type: ["number", "null"] }
          },
          required: [
            "name",
            "weight_g",
            "energy_kj",
            "protein_g_per_100g",
            "carb_g_per_100g",
            "fat_g_per_100g"
          ]
        },
        confidence: {
          type: "string",
          enum: ["high", "medium", "low"]
        },
        notes: { type: "string" }
      },
      required: ["item", "confidence", "notes"]
    }
  };

  const extractionInstruction = `
You will be given ONE image of a nutrition facts table / ingredient label for ONE product.

Goal:
1) Extract the product name (if visible) and numeric fields:
   - weight_g (net weight/serving size in grams if clearly specified; otherwise null)
   - energy_kj (kJ; if only kcal is present, convert to kJ using 1 kcal = 4.184 kJ)
   - protein_g_per_100g (g per 100g, if label provides per 100g)
   - carb_g_per_100g
   - fat_g_per_100g
2) If the table provides per serving only (not per 100g), and serving size in grams is visible,
   convert to per 100g where possible; otherwise leave macros as null.
3) If any field is missing/uncertain, return null (NOT 0).
4) If the image is too blurry, use the provided hint as fallback only for name/weight, but do NOT invent numbers from the hint.
5) Output must be valid JSON matching the schema. No extra keys.

Language: respond in ${userLang} in the "notes" field only; the JSON keys remain English.

Hint (may be null): name=${hintName ?? null}, weight_g=${hintWeight ?? null}
`;

  try {
    // 1) Extract from image
    const resp = await client.responses.create({
      model: "gpt-4.1-mini",
      input: [
        {
          role: "user",
          content: [
            { type: "input_text", text: extractionInstruction },
            {
              type: "input_image",
              image_url: `data:${image_mime};base64,${image_base64}`
            }
          ]
        }
      ],
      text: {
        format: {
          type: "json_schema",
          name: schema.name,     // ✅ 必填
          strict: true,
          schema: schema.schema  // ✅ 这里要传“真正的 JSON schema”，不是外层对象
        }
      }
    });

    let parsed = parseJsonFromResponse(resp);
    if (!parsed || !parsed.item) {
      return res.status(500).json({ error: "Failed to parse structured output" });
    }

    let item = clampReasonable(parsed.item);

    // 2) If macros missing but name & weight exist, do estimation fill
    const hasNameAndWeight = !!item.name && item.weight_g !== null;
    const macrosMissing =
      item.energy_kj === null ||
      item.protein_g_per_100g === null ||
      item.carb_g_per_100g === null ||
      item.fat_g_per_100g === null;

    if (hasNameAndWeight && macrosMissing) {
      const est = await estimateNutritionFromHint(client, {
        name: item.name,
        weight_g: item.weight_g,
        userLang
      });

      if (est && est.item) {
        if (item.energy_kj === null) item.energy_kj = est.item.energy_kj;
        if (item.protein_g_per_100g === null) item.protein_g_per_100g = est.item.protein_g_per_100g;
        if (item.carb_g_per_100g === null) item.carb_g_per_100g = est.item.carb_g_per_100g;
        if (item.fat_g_per_100g === null) item.fat_g_per_100g = est.item.fat_g_per_100g;

        parsed.confidence = parsed.confidence === "high" ? "medium" : parsed.confidence;
        parsed.notes = `${parsed.notes}\n${est.notes}`.trim();
      }
    }

    return res.status(200).json({
      item,
      confidence: parsed.confidence,
      notes: parsed.notes
    });
  } catch (err) {
    console.error("nutrition api error:", err);
    return res.status(500).json({ error: "Nutrition extraction failed", detail: err?.message || String(err) });
  }
}
