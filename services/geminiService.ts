
import { GoogleGenAI } from "@google/genai";
import { ChatMode } from '../types';

const getGemini = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API_KEY environment variable not set");
  }
  return new GoogleGenAI({ apiKey });
}

const fileToGenerativePart = async (file: File) => {
  const base64EncodedDataPromise = new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result.split(',')[1]);
      }
    };
    reader.readAsDataURL(file);
  });
  return {
    inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
  };
};

export const runGemini = async (
  prompt: string,
  mode: ChatMode,
  image?: File,
  location?: GeolocationPosition
) => {
  const ai = getGemini();

  try {
    if (image) {
      const model = ai.models;
      const imagePart = await fileToGenerativePart(image);
      const textPart = { text: prompt };
      const response = await model.generateContent({
        model: 'gemini-2.5-flash',
        contents: { parts: [textPart, imagePart] },
      });
      return { text: response.text, sources: [] };
    }

    switch (mode) {
      case ChatMode.THINKING:
        const thinkingResponse = await ai.models.generateContent({
          model: 'gemini-2.5-pro',
          contents: prompt,
          config: {
            thinkingConfig: { thinkingBudget: 32768 },
          },
        });
        return { text: thinkingResponse.text, sources: [] };

      case ChatMode.SEARCH:
        const searchResponse = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt,
          config: {
            tools: [{ googleSearch: {} }],
          },
        });
        const searchChunks = searchResponse.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
        const searchSources = searchChunks
          .map((chunk) => chunk.web)
          .filter((web) => web?.uri && web.title)
          .map((web) => ({ uri: web!.uri, title: web!.title! }));
          
        return { text: searchResponse.text, sources: searchSources };

      case ChatMode.MAPS:
        const mapsResponse = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt,
          config: {
            tools: [{ googleMaps: {} }],
            toolConfig: location ? {
              retrievalConfig: {
                latLng: {
                  latitude: location.coords.latitude,
                  longitude: location.coords.longitude,
                }
              }
            } : undefined
          },
        });
        const mapChunks = mapsResponse.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
        const mapSources = mapChunks
          .map((chunk) => chunk.maps)
          .filter((maps) => maps?.uri && maps.title)
          .map((maps) => ({ uri: maps!.uri, title: maps!.title! }));

        return { text: mapsResponse.text, sources: mapSources };
      
      case ChatMode.CHAT:
      default:
        const chat = ai.chats.create({ model: 'gemini-2.5-flash' });
        const chatResponse = await chat.sendMessage({ message: prompt });
        return { text: chatResponse.text, sources: [] };
    }
  } catch (error) {
    console.error("Gemini API Error:", error);
    let errorMessage = "An unexpected error occurred.";
    if (error instanceof Error) {
      errorMessage = `An error occurred while communicating with the AI: ${error.message}`;
    }
    return { text: errorMessage, sources: [] };
  }
};
