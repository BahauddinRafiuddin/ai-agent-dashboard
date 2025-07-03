# 🤖 AgentFlow – AI Agent Dashboard

A powerful full-stack web application that lets users automate tasks using AI-powered agents like:

* 📰 News Summarizer
* 📄 PDF Summarizer
* 🌐 Web Page Summarizer
* 📧 Email Generator
* ✍️ Creative Writing Agent
* 📺 YouTube Video Summarizer *(Coming Soon)*

Live Frontend: [https://agentflow-14fb.onrender.com](https://agentflow-14fb.onrender.com)
Live Backend: [https://workflow-ai-api.onrender.com](https://workflow-ai-api.onrender.com)

---

## 🚀 Features

### 👤 Authentication

* JWT-based secure login/register system
* Role-based access for users (admin coming soon)

### 🧠 Agents

Each AI agent is backed by the Groq API using LLaMA 3 (70B) to ensure high-quality output.

| Agent Name          | Description                                                      |
| ------------------- | ---------------------------------------------------------------- |
| News Summarizer     | Parses RSS feed from TechCrunch and summarizes top 5 headlines   |
| PDF Summarizer      | Upload any PDF and get a short summary using AI                  |
| Web Page Summarizer | Enter any URL to summarize its content                           |
| Email Generator     | Generate professional emails using tone, purpose, and key points |
| Creative Writing    | Create short stories, poems, or any creative text using AI       |
| YouTube Summarizer  | *(Coming soon)* Summarize YouTube videos using transcript + LLM  |

---

## 🧑‍💻 Tech Stack

### Frontend (Vite + React)

* Tailwind CSS for modern UI
* React Router DOM
* Framer Motion for animation
* Axios for API requests

### Backend (Express + MongoDB)

* Node.js & Express.js
* MongoDB & Mongoose
* Multer for file uploads (PDF)
* JWT for Auth
* Groq API for AI responses

---

## 📁 Project Structure

```bash
📦 ai-agent-dashboard
├── server
│   ├── routes
│   ├── models
│   ├── controllers
│   ├── agents
│   └── index.js
├── client
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── context
│   │   └── main.jsx
│   └── vite.config.js
```

---

## 🔐 Environment Variables

Create a `.env` file in both frontend and backend:

### Backend `.env`

```env
PORT=5000
MONGODB_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
GROQ_API_KEY=your_groq_api_key
```

### Frontend `.env`

```env
VITE_BACKEND_URL=https://workflow-ai-api.onrender.com
```

---

## 🧪 Run Locally

### Backend:

```bash
cd server
npm install
npm run server
```

### Frontend:

```bash
cd client
npm install
npm run dev
```

---

## 📤 Deployment

### Backend:

* Deployed on [Render](https://render.com)
* Auto-deploy from GitHub

### Frontend:

* Built with `vite build`
* Deploy folder: `dist/`
* Hosted on Render (Static Site)

---

## 🧠 Future Enhancements

* ✅ YouTube Summarizer
* ✅ Admin Panel (to manage users & logs)
* 🌍 Multi-language translation agent
* 📄 Resume Analyzer Agent
* 📅 Study Planner Agent

---

## 🙌 Author

**Bahauddin Rafiuddin**
MCA Student | MERN Stack Developer | AI Agent Enthusiast

🔗 [GitHub](https://github.com/BahauddinRafiuddin) | [LinkedIn](https://www.linkedin.com/in/bahauddin-rafiuddin-718aa6366/)

---


