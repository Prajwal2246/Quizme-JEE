const { GoogleGenerativeAI, SchemaType } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

exports.generateQuiz = async (req, res) => {
  const { topic, count, difficulty } = req.body;
  

  try {
    // 1. Define a strict schema to prevent "control character" errors
    const schema = {
      type: SchemaType.OBJECT,
      properties: {
        questions: {
          type: SchemaType.ARRAY,
          items: {
            type: SchemaType.OBJECT,
            properties: {
              q: { type: SchemaType.STRING },
              options: { type: SchemaType.ARRAY, items: { type: SchemaType.STRING } },
              correct: { type: SchemaType.NUMBER },
              feedback: { type: SchemaType.STRING },
              fact: { type: SchemaType.STRING },
            },
            required: ["q", "options", "correct", "feedback", "fact"],
          },
        },
      },
      required: ["questions"],
    };

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: schema, // This forces Gemini to follow JSON rules
      },
    });

    const prompt = `Generate a JEE Advanced quiz on "${topic}". Difficulty: ${difficulty}. Questions: ${count}. Ensure all mathematical notation uses standard text or LaTeX.`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    // 2. Extra Safety: Remove invisible control characters (0-31 range) before parsing
    const sanitizedText = text.replace(/[\u0000-\u001F\u007F-\u009F]/g, "");
    
    const quizData = JSON.parse(sanitizedText);
  console.log(count);

    res.status(200).json(quizData);

  } catch (error) {
    console.error("❌ Final Error:", error);
    res.status(500).json({ error: "Data Format Error", details: error.message });
  }
};