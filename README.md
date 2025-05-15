
# FoodieLens Backend API

This is a simple Node.js API for food image recognition using HuggingFace Inference API.

## How to use

1. Copy your HuggingFace Token to `.env` file:
```
HF_TOKEN=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
PORT=5000
```

2. Install dependencies:
```
npm install
```

3. Run server:
```
npm start
```

4. POST image data to `/predict` endpoint.
