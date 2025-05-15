
const hfClient = require('../utils/huggingfaceClient');

const predict = async (req, res, next) => {
    try {
        const { image } = req.body;
        if (!image) {
            return res.status(400).json({ error: 'Image data is required' });
        }

        const modelName = 'Luke537/image_classification_food_model';

        const response = await hfClient.post(`/Luke537/image_classification_food_model`, {
            inputs: image
        });

        res.json(response.data);
    } catch (error) {
        next(error);
    }
};

module.exports = { predict };
