
const express = require('express');
const dotenv = require('dotenv');
const predictRoute = require('./routes/predict');
const errorHandler = require('./middlewares/errorHandler');

dotenv.config();

const app = express();

app.use(express.json());

app.use('/predict', predictRoute);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
