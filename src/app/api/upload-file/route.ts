import OpenAI from "openai";
import pdfParse from "pdf-parse";

const openai = new OpenAI({
  organization: process.env.OPEN_AI_ORG_ID || "",
  apiKey: process.env.OPEN_AI_KEY || "",
  project: process.env.OPEN_AI_PROJECT_ID || "",
});

export const maxDuration = 60; // This function can run for a maximum of 60 seconds

export async function POST(request: Request) {
  try {
    // Parse the form data
    const formData = await request.formData();
    const file = formData.get("file") as File;

    // Read the file content as a buffer
    const buffer = Buffer.from(await file.arrayBuffer());

    // Extract text from the PDF file directly in memory
    const pdfData = await pdfParse(buffer);
    const pdfText = pdfData.text;

    const prompt = `אתה מערכת למידה חכמה. אנא צור 5 שאלות אמריקאיות על בסיס הטקסט הבא:
${pdfText}
השאלות חייבות להתייחס למלל של הטקסט עצמו.

{
  "data": [{question: "שאלה 1", answers: ["תשובה 1", "תשובה 2", "תשובה 3", "תשובה 4"], correct: "תשובה 2"}, {question: "שאלה 1", answers: ["תשובה 1", "תשובה 2", "תשובה 3", "תשובה 4"], correct: "תשובה 1"}]
}

תכלול שאלות ותשובות בעברית בלבד. השאלות והתשובות יהיו ללא סימנים מיוחדים בכלל, רק אותיות בעברית. אך ורק בפורמט JSON.
כל שאלה צריכה לבחון הבנה עמוקה של החומר, והתשובות השגויות צריכות להיות סבירות אך שגויות. אל תכלול הסברים. אל תכלול תשובות מחוץ לפורמט שביקשתי ממך.
 ${pdfText}`;

    const completionResponse = await openai.chat.completions.create({
      messages: [{ role: "system", content: prompt }],
      model: "gpt-4o",
      response_format: { type: "json_object" },
    });

    return Response.json({
      res: completionResponse.choices[0].message.content,
    });
  } catch (e) {
    console.error(e);
    return Response.json({ res: e, status: 400 });
  }
}
