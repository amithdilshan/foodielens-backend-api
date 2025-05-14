# 🍔 FoodieLens Backend API

This is a simple Node.js Express API for the FoodieLens mobile app.

## Features
- Accepts food image uploads
- Uses Replicate AI API to recognize food
- Returns food name, calories, and confidence score

## Example Response
```json
{
  "food": "Pizza",
  "calories": 285,
  "confidence": 0.95,
  "image": "https://cdn.example.com/pizza.jpg"
}
