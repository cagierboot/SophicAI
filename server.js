const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();

app.use(express.json());
app.use(cors());

const apiKey = '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';

app.get('/', (req, res) => {
  res.send('Welcome to the OpenAI API!');
});

app.post('/text', async (req, res) => {
  const { prompt } = req.body;
  try {
    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      prompt: prompt,
      model: 'gpt-3.5-turbo-0301',
      max_tokens: 420,
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

app.post('/image', async (req, res) => {
  const { prompt } = req.body;
  try {
    const response = await axios.post('https://api.openai.com/v1/images/generations', {
      prompt: prompt,
      model: 'image-alpha-001',
      num_images: 1,
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});