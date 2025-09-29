const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from React build
app.use(express.static('client/build'));

// AI Service Configuration
const AI_SERVICE = 'groq'; // Change to 'gemini', 'anthropic', or 'groq' as needed

// OpenAI API configuration

const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';
const OPENAI_MODEL = 'gpt-3.5-turbo';

// Gemini API configuration (if using Google Gemini)
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

// Anthropic Claude API configuration (if using Claude)
const ANTHROPIC_API_URL = 'https://api.anthropic.com/v1/messages';

// Groq API configuration (if using Groq)
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';
const GROQ_MODEL = 'llama-3.1-8b-instant';

/**
 * Generate AI prompt for task prioritization
 */
function generatePrompt(tasks) {
  return `You are a task prioritization expert. Analyze the following list of tasks and return a JSON array of objects. Each object should have three keys: 'task' (the original task string), 'priority' (a string which can be 'High', 'Medium', or 'Low'), and 'category' (a simple one-word category like 'Work', 'Home', 'Personal', 'Health', 'Finance', 'Social'). 

Prioritize based on urgency and importance. Consider factors like:
- Deadlines and time sensitivity
- Impact on work or personal life
- Dependencies between tasks
- Health and safety concerns

Here are the tasks to analyze:
${tasks.map((task, index) => `${index + 1}. ${task}`).join('\n')}

Return ONLY the JSON array, no additional text or formatting.`;
}

/**
 * Call OpenAI API
 */
async function callOpenAI(tasks) {
  try {
    const response = await axios.post(OPENAI_API_URL, {
      model: OPENAI_MODEL,
      messages: [
        {
          role: 'user',
          content: generatePrompt(tasks)
        }
      ],
      temperature: 0.3,
      max_tokens: 1000
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    const content = response.data.choices[0].message.content;
    return JSON.parse(content);
  } catch (error) {
    console.error('OpenAI API Error:', error.response?.data || error.message);
    throw new Error('Failed to process tasks with AI');
  }
}

/**
 * Call Google Gemini API
 */
async function callGemini(tasks) {
  try {
    const response = await axios.post(`${GEMINI_API_URL}?key=${process.env.GEMINI_API_KEY}`, {
      contents: [{
        parts: [{
          text: generatePrompt(tasks)
        }]
      }]
    });

    const content = response.data.candidates[0].content.parts[0].text;
    return JSON.parse(content);
  } catch (error) {
    console.error('Gemini API Error:', error.response?.data || error.message);
    throw new Error('Failed to process tasks with AI');
  }
}

/**
 * Call Anthropic Claude API
 */
async function callAnthropic(tasks) {
  try {
    const response = await axios.post(ANTHROPIC_API_URL, {
      model: 'claude-3-sonnet-20240229',
      max_tokens: 1000,
      messages: [{
        role: 'user',
        content: generatePrompt(tasks)
      }]
    }, {
      headers: {
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'Content-Type': 'application/json',
        'anthropic-version': '2023-06-01'
      }
    });

    const content = response.data.content[0].text;
    return JSON.parse(content);
  } catch (error) {
    console.error('Anthropic API Error:', error.response?.data || error.message);
    throw new Error('Failed to process tasks with AI');
  }
}

/**
 * Call Groq API
 */
async function callGroq(tasks) {
  try {
    const response = await axios.post(GROQ_API_URL, {
      model: GROQ_MODEL,
      messages: [
        {
          role: 'user',
          content: generatePrompt(tasks)
        }
      ],
      temperature: 0.3,
      max_tokens: 1000
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    const content = response.data.choices[0].message.content;
    return JSON.parse(content);
  } catch (error) {
    console.error('Groq API Error:', error.response?.data || error.message);
    throw new Error('Failed to process tasks with AI');
  }
}

/**
 * Main AI processing function
 */
async function processTasksWithAI(tasks) {
  if (!tasks || !Array.isArray(tasks) || tasks.length === 0) {
    throw new Error('No tasks provided');
  }

  // Check for API key
  const apiKey = process.env.OPENAI_API_KEY || process.env.GEMINI_API_KEY || process.env.ANTHROPIC_API_KEY || process.env.GROQ_API_KEY;
  if (!apiKey) {
    throw new Error('AI API key not configured');
  }

  try {
    switch (AI_SERVICE) {
      case 'openai':
        return await callOpenAI(tasks);
      case 'gemini':
        return await callGemini(tasks);
      case 'anthropic':
        return await callAnthropic(tasks);
      case 'groq':
        return await callGroq(tasks);
      default:
        throw new Error('Invalid AI service configuration');
    }
  } catch (error) {
    console.error('AI Processing Error:', error);
    throw error;
  }
}

// API Routes
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/client/build/index.html');
});

app.post('/api/prioritize', async (req, res) => {
  try {
    const { tasks } = req.body;
    
    if (!tasks || !Array.isArray(tasks)) {
      return res.status(400).json({ 
        error: 'Invalid request. Expected an array of tasks.' 
      });
    }

    if (tasks.length === 0) {
      return res.status(400).json({ 
        error: 'No tasks provided for prioritization.' 
      });
    }

    console.log(`Processing ${tasks.length} tasks with AI...`);
    const prioritizedTasks = await processTasksWithAI(tasks);
    
    res.json({
      success: true,
      tasks: prioritizedTasks,
      originalCount: tasks.length,
      processedAt: new Date().toISOString()
    });

  } catch (error) {
    console.error('Prioritization Error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to prioritize tasks'
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    aiService: AI_SERVICE
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server Error:', err);
  res.status(500).json({
    success: false,
    error: 'Internal server error'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found'
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📝 AI Service: ${AI_SERVICE}`);
  console.log(`🔑 API Key configured: ${process.env.OPENAI_API_KEY || process.env.GEMINI_API_KEY || process.env.ANTHROPIC_API_KEY || process.env.GROQ_API_KEY ? 'Yes' : 'No'}`);
});

