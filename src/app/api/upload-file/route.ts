import { GoogleAIFileManager } from "@google/generative-ai/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { prompt } from "@/app/api/upload-file/constants";

const fileManager = new GoogleAIFileManager(process.env.GOOGLE_API_KEY || "");
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "");
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const response = await fetch(
      `https://generativelanguage.googleapis.com/upload/v1beta/files?&key=${fileManager.apiKey}`,
      { method: "post", body: formData }
    );
    const uploadResponse = await response.json();

    const result = await model.generateContent([
      {
        fileData: {
          mimeType: uploadResponse.file.mimeType,
          fileUri: uploadResponse.file.uri,
        },
      },
      { text: prompt },
    ]);

    const quiz = result.response.text();

    return Response.json({ res: quiz });
  } catch (e) {
    console.error(e);
    return Response.json({ res: e, status: 400 });
  }
}
