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
    const pdfText = pdfData.text.trim();

    if (!pdfText) {
      return Response.json(
        {
          res: "Sorry, we couldn't identify any content in the PDF file you uploaded. Please try another file.",
        },
        { status: 400 }
      );
    }

    const prompt = `You are AI based learning system, and you need to generate a set of question (5-10 questions) and answers based on the following text:
    ${pdfText}
    {
      "data": [{question: "question1", answers: ["answer1", "answer2", "answer3", "answer4"], correct: "answer2"}, {question: "question1", answers: ["answer1", "answer2", "answer3", "answer4"], correct: "answer3"}]
    }
    
    Everything will be in English only. If the text content is in Hebrew, please translate it to English before generating the questions.
    Please give me only JSON format.
    Every question should require a deep understanding of the material, and the wrong answers should be plausible but incorrect. Do not include explanations. Do not include answers outside the format I requested from you.
`;

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
    return Response.json({
      res: "An error occurred on our end. Please try again later.",
      status: 400,
    });
  }
}
