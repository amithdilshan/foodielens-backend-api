const express = require('express');
const multer = require('multer');
const axios = require('axios');
const cors = require('cors');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(cors());
const upload = multer({ storage: multer.memoryStorage() });

app.post('/upload', upload.single('image'), async (req, res) => {
  try {
    const image = req.file.buffer.toString('base64');

    const response = await axios.post(
      'https://huggingface.co/thuyentruong/food_classification_model',
      { inputs: `data:image/jpeg;base64,${image}` },
      {
        headers: {
          Authorization: `Bearer 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`,
        },
      }
    );

    const result = response.data;
    console.log(result);

    if (result && Array.isArray(result) && result.length > 0) {
      const topResult = result[0];
      res.json({
        food: topResult.label || 'Unknown Food',
        confidence: topResult.score || 0,
        calories: 0, // You can add a calories API here if needed
      });
    } else {
      res.status(500).json({ error: 'Invalid response from model' });
    }
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`FoodieLens API running on port ${port}`);
});
