
require('dotenv').config();

const express = require('express');
const multer = require('multer');
const axios = require('axios');
const app = express();
const upload = multer();

app.post('/scan', upload.single('file'), async (req, res) => {
  try {
    console.log('Using HuggingFace Token:', process.env.HF_API_TOKEN);

    const base64Image = req.file.buffer.toString('base64');
    const imageData = `data:image/jpeg;base64,${base64Image}`;

    const response = await axios.post(
      'https://api-inference.huggingface.co/models/thuyentruong/food_classification_model',
      { inputs: imageData },
      { headers: { Authorization: `Bearer ${process.env.HF_API_TOKEN}` } }
    );

    const prediction = response.data[0];

    res.json({
      food: prediction.label,
      confidence: prediction.score,
      image: imageData,
    });
  } catch (error) {
    console.error(error.response?.data || error);
    res.status(500).json({ error: 'Failed to classify food' });
  }
});

app.listen(3000, () => console.log('FoodieLens API running on port 3000'));
