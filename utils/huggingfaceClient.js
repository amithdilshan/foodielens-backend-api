
const axios = require('axios');

const hfClient = axios.create({
    baseURL: 'https://api-inference.huggingface.co/models/',
    headers: {
        'Authorization': `Bearer ${process.env.HF_TOKEN}`
    }
});

module.exports = hfClient;
