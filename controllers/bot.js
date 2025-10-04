import twilio from "twilio";
import { generateReply } from "../services/gemini.js";

const MessagingResponse = twilio.twiml.MessagingResponse;

export async function handleIncomingMessage(req, res) {
  const twiml = new MessagingResponse();
    try{
        const userMessage = req.body.Body;
        const reply = await generateReply(userMessage);
        twiml.message(reply);
        res.type("text/xml").send(twiml.toString());
    } 
    catch (error) {
        console.error("Controller error:", error);
        twiml.message("⚠️ Sorry, something went wrong. Please try again.");
        res.type("text/xml").status(200).send(twiml.toString());
    }
}
