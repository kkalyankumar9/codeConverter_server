const express=require("express")
const axios=require("axios")


const convertCode=express.Router()
// Openai API KEY
// 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

convertCode.post("/convert", async (req, res) => {
  const { code, language } = req.body;
  try {
    if (!code) {
      return res.status(400).send({ msg: "Please provide some code in the editor." });
    }

    const requestBody = {
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `Convert the following code ${code}: to  ${language}`,
        },
      ],
      max_tokens: 100,
    };

    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      requestBody,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.API_KEY}`,
        },
      }
    );

    const convertCoding = response.data.choices[0].message.content
    console.log("Converted Code:", convertCoding); // Log the response
    res.json({ convertCoding });

  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Failed to convert code" });
  }
});

convertCode.post('/debug', async (req, res) => {
  try {
    const { code } = req.body;
    
    // Validate input
    if (!code) {
      return res.status(400).json({ error: 'Code is required for debugging.' });
    }
    const requestBody = {
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `Debug the following code: \n\n${code}`,
        },
      ],
      max_tokens: 150,
    };
    // OpenAI API request for code debugging
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
    requestBody,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.API_KEY}`,
        },
      }
    );

    // Extract and send back the debugged code
    const debuggedCode = response.data.choices[0].message.content;
    res.json({ debuggedCode });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Something went wrong' });
  }
});
convertCode.post('/check-quality', async (req, res) => {
  try {
    const { code } = req.body;
    if (!code) {
      return res.status(400).json({ error: 'Code is required for quality check.' });
    }

    const requestBody = {
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `Evaluate the quality of the following code: \n\n${code}`,
        },
      ],
      max_tokens: 150,
    };

    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
    requestBody,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.API_KEY}`,
        },
      }
    );

    // Extract and send back the quality evaluation
    const qualityEvaluation = response.data.choices[0].message.content;
    res.json({ qualityEvaluation });

  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Something went wrong' });
  }

})
module.exports=convertCode
