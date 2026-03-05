import { GoogleGenAI } from "@google/genai";

export async function generateHeroImage() {
  const apiKey = process.env.GEMINI_API_KEY;
  
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
    console.error("Gemini API Key is missing or not configured. Please set GEMINI_API_KEY in your environment variables.");
    return null;
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            text: 'A high-quality, realistic photo of a professional minimalist workspace. A laptop is open on a sleek desk, showing a marketing text being edited. A human hand is holding a premium pen, making notes. Subtle, elegant glowing blue digital particles and neural network lines emerge from the laptop screen, symbolizing AI assistance. Soft natural light, cinematic composition, professional photography, 4k.',
          },
        ],
      },
      config: {
        imageConfig: {
          aspectRatio: "1:1"
        }
      }
    });

    if (response.candidates && response.candidates[0].content.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          return `data:image/png;base64,${part.inlineData.data}`;
        }
      }
    }
    
    console.warn("No image data found in Gemini response.");
    return null;
  } catch (error) {
    console.error("Error generating image with Gemini:", error);
    return null;
  }
}
