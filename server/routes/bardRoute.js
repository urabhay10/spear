const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");
// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
router.use(bodyParser.json());


async function run(prompt) {
  // For text-only input, use the gemini-pro model
  const model = genAI.getGenerativeModel({ model: "gemini-pro"});
  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  return text
}

router.post('/textio', async (req, res) => {
    const {prompt}=req.body
    const text = await run(prompt)
    res.send(text)
})

router.post('/check-grammar', async (req, res) => {
    const {text}=req.body
    const ans= await run("Correct the grammar:'"+text+"'")
    res.send(ans)
})

module.exports = router;

