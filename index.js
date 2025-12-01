import express from "express";
import fetch from "node-fetch"; // npm install node-fetch
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/generate-ring", async (req, res) => {
  const { prompt } = req.body;

  try {
    const response = await fetch("https://api.gemini.ai/v1/generate", {
      method: "POST",
      headers: {
        "Authorization": `Bearer YOUR_GEMINI_KEY`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt, width: 512, height: 512 }),
    });

    const data = await response.json();
    res.json({ url: data.output[0].url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to generate ring" });
  }
});

app.listen(5000, () => console.log("Backend running on port 5000"));
