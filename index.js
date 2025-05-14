
const express = require('express');
const multer = require('multer');
const axios = require('axios');
const FormData = require('form-data');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

const upload = multer({ storage: multer.memoryStorage() });

app.post('/upload', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image uploaded' });
    }

    const formData = new FormData();
    formData.append('file', req.file.buffer, {
      filename: req.file.originalname,
      contentType: req.file.mimetype,
    });

    const response = await axios.post(
      'https://api-inference.huggingface.co/models/thuyentruong/food_classification_model',
      formData,
      {
        headers: {
          Authorization: `Bearer ${process.env.HF_TOKEN}`,
          ...formData.getHeaders(),
        },
      }
    );

    const result = response.data;

    if (Array.isArray(result) && result.length > 0 && result[0].label) {
      res.json({
        food: result[0].label,
        confidence: result[0].score,
        calories: calculateCalories(result[0].label),
      });
    } else {
      res.status(404).json({ error: 'No food detected' });
    }
  } catch (error) {
    console.error(error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Failed to classify image' });
  }
});

function calculateCalories(food) {
  const foodCalories = {
    Pizza: 285,
    Burger: 295,
    Salad: 150,
    Sushi: 200,
    Rice: 250,
    Sandwich: 300,
  };

  return foodCalories[food] || 0;
}

app.get('/', (req, res) => {
  res.send('FoodieLens API is running');
});

app.listen(port, () => {
  console.log(`FoodieLens API running on port ${port}`);
});
