
require('dotenv').config();

const express = require('express');
const multer = require('multer');
const axios = require('axios');
const app = express();
const upload = multer();

app.post('/scan', upload.single('file'), async (req, res) => {
  try {
    console.log('Using Replicate Token:', process.env.REPLICATE_API_TOKEN);

    const replicateResponse = await axios.post('https://api.replicate.com/v1/predictions', {
      version: 'your_model_version',
      input: { image: req.file.buffer.toString('base64') },
    }, {
      headers: {
        'Authorization': `Token ${process.env.REPLICATE_API_TOKEN}`,
      }
    });

    const prediction = replicateResponse.data;

    res.json({
      food: prediction?.output?.label || 'Burger',
      calories: 250,
      confidence: prediction?.output?.confidence || 0.90,
      image: prediction?.output?.image_url || 'https://via.placeholder.com/150',
    });
  } catch (error) {
    console.error(error.response?.data || error);
    res.status(500).json({ error: 'Failed to scan' });
  }
});

app.listen(3000, () => console.log('FoodieLens API running on port 3000'));
