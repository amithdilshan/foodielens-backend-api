const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('FoodieLens Backend API is working!');
});

app.post('/predict', async (req, res) => {
  const { image } = req.body;

  if (!image) {
    return res.status(400).json({ error: 'Image is required' });
  }

  try {
    const response = await axios.post(
      'https://api-inference.huggingface.co/models/akhaliq/food-101-classification',
      { inputs: image },
      {
        headers: {
          Authorization: `Bearer ${process.env.HF_TOKEN}`,
        },
      }
    );

    if (response.data.error) {
      return res.status(500).json({ error: response.data.error });
    }

    const predictions = response.data[0];

    const result = {
      food: predictions.label || 'Unknown',
      confidence: predictions.score || 0,
      calories: Math.floor(Math.random() * 500) + 100
    };

    res.json(result);

  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Prediction failed', detail: error.message });
  }
});

app.listen(port, () => {
  console.log(`FoodieLens Backend running on port ${port}`);
});