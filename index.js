
// Fixed index.js (Working with correct model and token)
const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

require('dotenv').config();
app.use(express.json());

app.get('/', (req, res) => {
    res.send('FoodieLens API is Live');
});

app.post('/classify', async (req, res) => {
    const imageUrl = req.body.image_url;
    if (!imageUrl) return res.status(400).json({ error: 'Missing image_url' });

    try {
        const response = await axios.post(
            'https://api-inference.huggingface.co/models/thuyentruong/food_classification_model',
            { inputs: imageUrl },
            { headers: { Authorization: `Bearer ${process.env.HF_API_TOKEN}` } }
        );

        const result = response.data[0];
        res.json({
            food: result.label,
            confidence: result.score,
            calories: result.label === 'Pizza' ? 285 : 0 // Example logic
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`FoodieLens API running on port ${PORT}`);
});
    