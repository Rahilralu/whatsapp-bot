import 'dotenv/config';
import { GoogleGenerativeAI } from "@google/generative-ai";

const client = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = client.getGenerativeModel({ model: "gemini-2.5-flash" });

async function test() {
  try {
    const result = await model.generateContent([
      { text: "Hello! How are you?" }
    ]);

    // Extract the generated text using the .text() function
    const reply = await result.response.text();
    console.log("Gemini reply:", reply);

  } catch (error) {
    console.error("Error:", error);
  }
}

test();
