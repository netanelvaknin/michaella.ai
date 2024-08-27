import path from "path";
import fs from "fs";
import { GoogleAIFileManager } from "@google/generative-ai/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { prompt } from "@/app/api/upload-file/constants";

const UPLOAD_DIR = path.resolve("./public/uploads");
const fileManager = new GoogleAIFileManager(process.env.GOOGLE_API_KEY || "");
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "");
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

export async function POST(request: Request, response: Response) {
  try {
    const formData = await request.formData();
    const body = Object.fromEntries(formData);
    const file = (body.files as Blob) || null;
    const buffer = Buffer.from(await file.arrayBuffer());
    const filePath = path.resolve(UPLOAD_DIR, (file as File).name);

    if (!fs.existsSync(UPLOAD_DIR)) {
      fs.mkdirSync(UPLOAD_DIR);
    }

    fs.writeFileSync(filePath, buffer);

    const uploadResponse = await fileManager.uploadFile(filePath, {
      mimeType: "application/pdf",
      displayName: "Gemini 1.5 PDF",
    });

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
    fs.unlinkSync(filePath);

    return Response.json({ res: quiz });
  } catch (e) {
    console.error(e);
    return Response.json({ res: null, status: 400 });
  }
}
