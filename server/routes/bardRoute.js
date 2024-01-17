const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jwtMiddleware = require('../middleware/jwtMiddleware');
require("dotenv").config();
const { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold,GoogleGenerativeAIResponseError } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
router.use(bodyParser.json());

async function run(prompt) {
  const model = genAI.getGenerativeModel({ model: "gemini-pro", safetySettings: [{ category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_NONE }] });
  const result = await model.generateContent(prompt);
  const response = result.response;
  const text = response.text();
  return text
}

function handleSafetyError(error) {
  const promptFeedback = error.response.promptFeedback;
  const response = "I'm unable to provide a review for this chapter right now. It's important to keep things safe and respectful, and you need to make some adjustments before I can share my thoughts. Please try again later.";
  console.error("Safety error:", promptFeedback);
  return response;
}

async function review(chapter) {
  const model = genAI.getGenerativeModel({ model: "gemini-pro", safetySettings: [{ category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_NONE },{ category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_NONE },{ category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_NONE },{ category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_NONE },] });
  const chat = model.startChat({history:[
      {
          role: "user",
          parts: "I want you to review this chapter titled '"+chapter.title+"'. I want you to review it based on what you think it has good about and it and bad aspects of it. Avoid using any offensive language."
      },{
        role: "model",
        parts: "I will review this chapter for you. I will tell you what I think is good about it and what I think is bad about it."
      }
  ]})
  try {
    const result = await chat.sendMessage("Here is the chapter content: '"+chapter.content+"'");
    const response = result.response;
    const text = response.text(); 
    return text;
  } catch (error) {
    return handleSafetyError(error);
  }
}

async function continueChp(chapter) {
  const model = genAI.getGenerativeModel({ model: "gemini-pro", safetySettings: [{ category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_NONE },{ category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_NONE },{ category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_NONE },{ category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_NONE },] });
  const chat = model.startChat({history:[
      {
          role: "user",
          parts: "I want you to continue this chapter titled '"+chapter.title+"'. I want you to continue it based on what you think it has. Avoid using any offensive language."
      },{
        role: "model",
        parts: "I will continue this chapter for you. I will not repeat the content you sent me but i will write after it. I will only respond with the continuation i wrote"
      }
  ]})
  try {
    const result = await chat.sendMessage("Here is the chapter title:'"+chapter.title+"',chapter content: '"+chapter.content+"'. I want you to continue this chapter **strictly after the provided content**. **Do not repeat any existing information**. Only write what happens next, starting from where the original text ends.");
    const response = result.response;
    const text = response.text(); 
    return text;
  } catch (error) {
    return handleSafetyError(error);
  }
}

router.post('/textio', jwtMiddleware, async (req, res) => {
    const {prompt}=req.body
    const text = await run(prompt)
    res.send(text)
})

router.post('/review',jwtMiddleware,async (req,res)=>{
    const {chapter}=req.body
    if(chapter.content.length>102000){
        res.send("Content is too long")
        return
    }else if(chapter.content.length<100){
        res.send("Content is too short")
        return
    }
    const text = await review(chapter)
    res.send(text)
})

router.post('/continue', jwtMiddleware, async (req, res) => {
    const {chapter}=req.body
    if(chapter.content.length>102000){
        res.send("Content is too long")
        return
    }else if(chapter.content.length<100){
        res.send("Content is too short")
        return
    }
    const text = await continueChp(chapter)
    res.send(text)
})

//i just added it once to check if gemini could replace my grammar checker and it doesn't do well 
router.post('/check-grammar', async (req, res) => {
    const {text}=req.body
    const ans= await run("Correct the grammar:'"+text+"'")
    res.send(ans)
})

module.exports = router;

