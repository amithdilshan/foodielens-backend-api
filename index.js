const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// Health check route
app.get('/', (req, res) => {
  res.send('FoodieLens Backend API is running successfully!');
});

// Prediction endpoint
app.post('/predict', async (req, res) => {
  try {
    const image = req.body.image;

    if (!image) {
      return res.status(400).json({ error: 'No image provided' });
    }

    const response = await axios.post(
      'https://api-inference.huggingface.co/models/thuyentruong/food_classification_model',
      { inputs: image },
      {
        headers: {
          Authorization: 'Bearer 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'
        }
      }
    );

    res.json(response.data);

  } catch (error) {
    console.error('Prediction Error:', error.message);

    if (error.response) {
      res.status(error.response.status).json({
        error: error.response.data.error || 'Prediction failed',
        detail: error.response.data
      });
    } else {
      res.status(500).json({ error: 'Prediction failed', detail: error.message });
    }
  }
});

app.listen(port, () => {
  console.log(`FoodieLens Backend API running on port ${port}`);
});
