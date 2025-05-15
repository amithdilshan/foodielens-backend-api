
const hfClient = require('../utils/huggingfaceClient');

const predict = async (req, res, next) => {
    try {
        const { image } = req.body;
        if (!image) {
            return res.status(400).json({ error: 'Image data is required' });
        }

        const modelName = 'Kaludi/food-category-classification-v2.0';

        const response = await hfClient.post(`/${modelName}`, {
            inputs: image
        });

        res.json(response.data);
    } catch (error) {
        next(error);
    }
};

module.exports = { predict };
