import express from "express";
import cors from "cors";
import fetch from "node-fetch"; // Assuming you are using an older Node environment that needs this import

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/generate-ring", async (req, res) => {
  // 1. Get the necessary details from the request body
  const { cut, base, color } = req.body; 
  
  // 2. Dynamically construct a detailed prompt for better results
  const prompt = `A highly detailed, photorealistic image of an engagement ring. The center stone is a ${color} ${cut} gemstone. The metal setting is ${base}. Studio lighting, isolated on a white background.`;
  
  // 3. Define the image generation API URL (REPLACE THIS)
  const IMAGE_API_URL = "YOUR_IMAGE_GENERATION_API_URL"; 
  
  // 4. Define your API Key (REPLACE THIS and secure it better later)
  const API_KEY = "YOUR_API_KEY"; 

  try {
    const response = await fetch(IMAGE_API_URL, {
      method: "POST",
      headers: {
        // Use an API key/Bearer Token as required by your specific service
        "Authorization": `Bearer ${API_KEY}`, 
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 
        prompt: prompt, 
        width: 512, 
        height: 512,
        // Add any other parameters your specific API requires (model name, etc.)
      }),
    });

    // Check for non-200 status codes from the external API
    if (!response.ok) {
        const errorData = await response.text();
        console.error("External API Error:", errorData);
        return res.status(response.status).json({ 
            error: `External API returned status ${response.status}: ${errorData}` 
        });
    }

    const data = await response.json();
    console.log(data); 

    // 5. Send the image URL back to the frontend (ADJUST THIS PATH BASED ON YOUR API'S RESPONSE)
    // Assuming your API returns an array like { output: [{ url: "..." }] }
    const imageUrl = data.output && data.output[0] && data.output[0].url; 

    if (imageUrl) {
        res.json({ url: imageUrl });
    } else {
        res.status(500).json({ error: "External API response missing image URL" });
    }

  } catch (err) {
    console.error("Server Error:", err);
    res.status(500).json({ error: "Failed to generate image due to server error" });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));