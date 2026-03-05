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
            text: 'A beautiful, warm illustration of a young woman with long brown hair, wearing a white V-neck shirt, sitting at a wooden table in a cozy room. She is typing on a laptop, and magical glowing golden letters and symbols are gracefully floating out of the screen into the air. Warm sunlight streams through a window with a grid pattern in the background. A small green plant in a terracotta pot is on the desk. Soft, cinematic lighting, 3D render style, high detail, cozy atmosphere.',
          },
        ],
      },
      config: {
        imageConfig: {
          aspectRatio: "3:4"
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
