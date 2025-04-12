
require('dotenv').config();
const express = require('express');
const app = express();
const Groq = require('groq-sdk')
const cors = require('cors');
const bodyParser = require('body-parser');
app.use(cors());
app.use(express.json());

const PORT = 3000;
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
app.post('/groq', async (req, res) => {
    const userInput = req.body.text;                    
    try {
    const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
        {
          role: "user",
          content: `As a mental health AI assinstant, ${userInput} response in 3 to 4 lines`,
        },
      ],
    });

    res.json(completion.choices[0]?.message?.content || "No response from model");
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to fetch from Groq API' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
