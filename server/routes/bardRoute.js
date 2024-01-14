const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jwtMiddleware = require('../middleware/jwtMiddleware');
require("dotenv").config();
const scienceFiction = require('../ai-models/scienceFiction');
const { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
router.use(bodyParser.json());

async function run(prompt) {
  // For text-only input, use the gemini-pro model
  const model = genAI.getGenerativeModel({ model: "gemini-pro", safetySettings: [{ category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_NONE }] });
  const result = await model.generateContent(prompt);
  const response = result.response;
  const text = response.text();
  return text
}

router.post('/textio', jwtMiddleware, async (req, res) => {
    const {prompt}=req.body
    const text = await run(prompt)
    res.send(text)
})

router.post('/science-fiction', jwtMiddleware, async (req, res) => {
    const {prompt}=req.body
    const text = await scienceFiction(prompt)
    res.send(text)
})

//i just added it once to check if gemini could replace my grammar checker and it doesn't do well 
router.post('/check-grammar', async (req, res) => {
    const {text}=req.body
    const ans= await run("Correct the grammar:'"+text+"'")
    res.send(ans)
})

module.exports = router;

