const express = require("express");
const axios = require("axios");

const app = express();
const PORT = 3000;

app.use(express.json());

const GEMINI_API_KEY = "AIzaSyCFau2SMF-hSqlxf5N2enUjDn1zSPktCr0";
const GEMINI_API_URL = "https://api.gemini.ai/v1/chat"; // Example URL (replace with actual Gemini API endpoint)

app.post("/chat", async (req, res) => {
    const userMessage = req.body.message;

    try {
        const response = await axios.post(
            GEMINI_API_URL,
            {
                prompt: userMessage,
                max_tokens: 150, 
            },
            {
                headers: {
                    Authorization: `Bearer ${AIzaSyCFau2SMF-hSqlxf5N2enUjDn1zSPktCr0}`,
                    "Content-Type": "application/json",
                },
            }
        );

        res.json({ response: response.data.choices[0].text.trim() });
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        res.status(500).json({ error: "Failed to get response from Gemini API" });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});