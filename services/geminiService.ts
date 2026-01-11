
import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult, SoilRecommendation } from "../types";

// Always initialize GoogleGenAI with a named apiKey parameter from process.env.API_KEY
const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeCropImage = async (base64Image: string): Promise<AnalysisResult> => {
  const ai = getAI();
  // Using gemini-3-pro-preview for complex multimodal analysis tasks as per guidelines
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: {
      parts: [
        { inlineData: { mimeType: 'image/jpeg', data: base64Image } },
        { text: 'Analyze this crop/plant image for diseases or pests. Provide a structured analysis including a title of the condition, a simple explanation for non-experts, specific current treatments, and a general health status (healthy, warning, or critical).' }
      ]
    },
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          description: { type: Type.STRING },
          recommendations: { 
            type: Type.ARRAY, 
            items: { type: Type.STRING } 
          },
          status: { 
            type: Type.STRING,
            description: "Must be one of: healthy, warning, critical"
          }
        },
        required: ["title", "description", "recommendations", "status"]
      }
    }
  });

  // Access the text directly as a property, not a method
  return JSON.parse(response.text || "{}");
};

export const analyzeSoilHealth = async (base64Image: string, moisture: number): Promise<SoilRecommendation> => {
  const ai = getAI();
  // Using gemini-3-pro-preview for complex soil suitability reasoning
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: {
      parts: [
        { inlineData: { mimeType: 'image/jpeg', data: base64Image } },
        { text: `Analyze this soil image. The reported moisture level is ${moisture}%. Recommend the top 3 best crops to grow in these specific conditions. Provide a clear explanation for each recommendation and practical soil management tips.` }
      ]
    },
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          bestCrops: { 
            type: Type.ARRAY, 
            items: { type: Type.STRING } 
          },
          explanation: { type: Type.STRING },
          tips: { 
            type: Type.ARRAY, 
            items: { type: Type.STRING } 
          }
        },
        required: ["bestCrops", "explanation", "tips"]
      }
    }
  });

  // Access the text directly as a property
  return JSON.parse(response.text || "{}");
};
