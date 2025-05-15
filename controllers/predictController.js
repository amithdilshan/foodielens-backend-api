
const hfClient = require('../utils/huggingfaceClient');

const predict = async (req, res, next) => {
    try {
        const { image } = req.body;
        if (!image) {
            return res.status(400).json({ error: 'Image data is required' });
        }

        const modelName = 'facebook/detr-resnet-50';

        const response = await hfClient.post(`/{nisuga/food_type_classification_model}`, {
            inputs: image
        });

        res.json(response.data);
    } catch (error) {
        next(error);
    }
};

module.exports = { predict };
