# AI-Powered Task Prioritization App

A smart to-do list application that uses artificial intelligence to analyze and prioritize your tasks based on urgency, importance, and context. Built with Node.js, Express.js, and modern web technologies.

## 🚀 Features

### Core Functionality
- **Task Management**: Add, view, and manage your tasks with a clean, intuitive interface
- **AI-Powered Prioritization**: Let AI analyze your tasks and return them organized by priority (High, Medium, Low)
- **Smart Categorization**: Tasks are automatically categorized (Work, Home, Personal, Health, Finance, Social)
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

### Bonus Features
- **Loading States**: Visual feedback during AI processing
- **Error Handling**: Graceful error handling with user-friendly messages
- **Local Storage**: Tasks persist between browser sessions

- **Modern UI**: Beautiful, modern interface with smooth animations

## 🛠️ Technology Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **Axios** - HTTP client for AI API calls
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

### Frontend
- **React 18** - Modern React with TypeScript
- **React Router** - Client-side routing
- **Custom Hooks** - State management with useTasks hook
- **Axios** - HTTP client for API requests
- **CSS3** - Modern styling with animations
- **Font Awesome** - Icons
- **Local Storage API** - Data persistence

### AI Integration
- **Groq** (fast & free - great for development) llama 8b model used

## ⚡ Quick Start

1. Clone the repo
```bash
git clone <repository-url>
cd ai-powered-task-prioritization-app
```

2. Configure environments
```bash
# Backend (AI keys and port)
cp backend/env.example backend/.env
# Set one of: OPENAI_API_KEY / GEMINI_API_KEY / ANTHROPIC_API_KEY / GROQ_API_KEY

# Client (API URL for the backend)
cp client/env.example client/.env
# In client/.env set:
# VITE_API_URL=http://localhost:3000
```

3. Install and run both apps
```bash
npm install
npm run dev
```

4. Open the apps
- Client (Vite): http://localhost:5173
- Backend API: http://localhost:3000
- Health check: http://localhost:3000/api/health

5. Prioritize tasks
- Add tasks in the UI and click "Prioritize Tasks".

### Notes
- Default AI service in `backend/server.js` is `groq`. Ensure the matching API key is set in `backend/.env`.
- You can switch providers by changing `AI_SERVICE` in `backend/server.js` and adding the corresponding key in `.env`.

## 📋 Prerequisites

Before running this application, make sure you have:

1. **Node.js** (version 14 or higher)
2. **npm** (Node Package Manager)
3. **An AI API Key** from one of the supported providers:
   - OpenAI API key
   - Google Gemini API key
   - Anthropic Claude API key

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd ai-powered-task-prioritization-app
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Copy the example environment file and configure your API key:

```bash
cp env.example .env
```

Edit the `.env` file and add your AI API key:

```env
# For OpenAI (recommended)
OPENAI_API_KEY=your_openai_api_key_here

# For Google Gemini (alternative)
# GEMINI_API_KEY=your_gemini_api_key_here

# For Anthropic Claude (alternative)
# ANTHROPIC_API_KEY=your_anthropic_api_key_here

# Server Configuration
PORT=3000
```

### 4. Start the Application

#### Development (Recommended)
```bash
# Installs backend and client automatically, then runs both with hot reload
npm install
npm run dev
```

#### Production (One possible approach)
```bash
# Build the client from /client and serve separately, or add static hosting via Express
cd client && npm run build && cd ..
# Start backend (ensure it knows where to serve the built assets if you choose to serve from Express)
cd backend && npm start
```

### 5. Access the Application
Open your browser and navigate to:
```
Client:   http://localhost:5173
Backend:  http://localhost:3000
```

## 🔧 Configuration

### AI Service Selection
The application supports multiple AI providers. To switch between them, modify the `AI_SERVICE` variable in `server.js`:

```javascript
const AI_SERVICE = 'openai'; // Change to 'gemini', 'anthropic', or 'groq'
```

### API Key Setup

#### OpenAI (Recommended)
1. Visit [OpenAI Platform](https://platform.openai.com/)
2. Create an account and generate an API key
3. Add the key to your `.env` file as `OPENAI_API_KEY`

#### Google Gemini
1. Visit [Google AI Studio](https://makersuite.google.com/)
2. Create a project and generate an API key
3. Add the key to your `.env` file as `GEMINI_API_KEY`

#### Anthropic Claude
1. Visit [Anthropic Console](https://console.anthropic.com/)
2. Create an account and generate an API key
3. Add the key to your `.env` file as `ANTHROPIC_API_KEY`

#### Groq (Fast & Free)
1. Visit [Groq Console](https://console.groq.com/)
2. Create an account and generate an API key
3. Add the key to your `.env` file as `GROQ_API_KEY`
4. **Note**: Groq offers free tier with high-speed inference, great for development!

## 📖 Usage

### Adding Tasks
1. Type your task in the input field
2. Click "Add Task" or press Enter
3. Tasks are automatically saved to your browser's local storage

### Prioritizing Tasks
1. Add multiple tasks to your list
2. Click the "Prioritize Tasks" button
3. Wait for AI analysis (usually 2-5 seconds)
4. View your tasks organized by priority and category

### Managing Tasks
- **Delete**: Click the trash icon next to any task
- **Clear All**: Remove all tasks at once
- **Back to Tasks**: Return to the task list from results view

## 🔒 Security Features

- **API Key Protection**: AI API keys are stored securely on the backend
- **Input Validation**: All user inputs are validated and sanitized
- **Error Handling**: Comprehensive error handling prevents data leaks
- **CORS Configuration**: Proper cross-origin resource sharing setup

## 🎨 UI/UX Features

- **Responsive Design**: Works on all device sizes
- **Loading States**: Visual feedback during AI processing
- **Smooth Animations**: Modern, polished user experience
- **Keyboard Shortcuts**: 
  - `Enter` to add tasks
  - `Ctrl/Cmd + Enter` to prioritize tasks
  - `Escape` to close modals
- **Accessibility**: Semantic HTML and proper ARIA labels

## 🧪 API Endpoints

### POST /api/prioritize
Prioritizes a list of tasks using AI.

**Request Body:**
```json
{
  "tasks": [
    "Finish the monthly report",
    "Buy groceries",
    "Call the plumber"
  ]
}
```

**Response:**
```json
{
  "success": true,
  "tasks": [
    {
      "task": "Call the plumber",
      "priority": "High",
      "category": "Home"
    },
    {
      "task": "Finish the monthly report",
      "priority": "High",
      "category": "Work"
    },
    {
      "task": "Buy groceries",
      "priority": "Medium",
      "category": "Home"
    }
  ],
  "originalCount": 3,
  "processedAt": "2024-01-15T10:30:00.000Z"
}
```

### GET /api/health
Health check endpoint.

**Response:**
```json
{
  "status": "OK",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "aiService": "openai"
}
```

## 🐛 Troubleshooting

### Common Issues

1. **"AI API key not configured" error**
   - Ensure your `.env` file exists and contains a valid API key
   - Check that the API key is correctly named (OPENAI_API_KEY, GEMINI_API_KEY, or ANTHROPIC_API_KEY)

2. **"Failed to prioritize tasks" error**
   - Verify your API key is valid and has sufficient credits
   - Check your internet connection
   - Ensure the AI service is operational

3. **Tasks not saving**
   - Check if localStorage is enabled in your browser
   - Clear browser cache and try again

4. **Server won't start**
   - Ensure Node.js is installed (version 14+)
   - Run `npm install` to install dependencies
   - Check that port 3000 is available

### Debug Mode
To enable debug logging, set the NODE_ENV environment variable:
```bash
NODE_ENV=development npm start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- OpenAI for providing the GPT API
- Google for the Gemini API
- Anthropic for the Claude API
- Font Awesome for the beautiful icons
- The open-source community for inspiration and tools

## 📞 Support

If you encounter any issues or have questions:

1. Check the troubleshooting section above
2. Review the error messages in the browser console
3. Ensure all dependencies are properly installed
4. Verify your API key configuration

For additional support, please open an issue in the repository.

---

**Happy Task Prioritizing! 🎯**

