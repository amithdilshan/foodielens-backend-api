const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 10000;

// Increase payload limit to 10mb
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

app.post('/predict', async (req, res) => {
    try {
        const imageBase64 = req.body.image;
        if (!imageBase64) {
            return res.status(400).json({ error: 'Image data not provided' });
        }

        const response = await axios.post(
            'https://api-inference.huggingface.co/models/your-model-name',
            { inputs: imageBase64 },
            {
                headers: {
                    Authorization: `Bearer ${process.env.HF_API_TOKEN}`
                }
            }
        );

        res.json(response.data);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Prediction failed' });
    }
});

app.listen(port, () => {
    console.log(`FoodieLens Backend running on port ${port}`);
});