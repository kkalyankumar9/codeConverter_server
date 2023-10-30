const express=require("express")
const axios=require("axios")


const convertCode=express.Router()


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
          content: `Convert the following code ${code}: to  ${language} and highlight any errors for correction.`,
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
          content: `Evaluate the quality of the following code: \n\n${code} 
          Below is a percentage-wise evaluation of each parameter:
          1. Code Consistency:[Percentage]
          2. Code Performance:[Percentage]
          3. Code Documentation:[Percentage]
          4. Error Handling:[Percentage]
          5. Code Testability:[Percentage]
          6. Code Modularity:[Percentage]
          7. Code Complexity:[Percentage]
          8. Code Duplication:[Percentage]
          9. Code Readability:[Percentage]
          
          A detailed explanation of each parameter follows:
          `,
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
