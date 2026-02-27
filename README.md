# 📈 Trendboard AI | Financial Intelligence Dashboard

A high-performance financial news aggregator that uses **GPT-4o-mini** to provide instant sentiment analysis and **Firebase Firestore** as a cache-first intelligence layer.

Built with the **Vite + React + Tailwind + shadcn/ui** stack for the Spacenos Assessment.

## 🚀 Core Features

- **Real-time News Aggregation:** Fetches the latest general and financial news via the Finnhub API.
- **AI-Powered Summarization:** Automatically generates summaries and classifies sentiment (Bullish/Bearish) using OpenAI.
- **Cache-First Architecture:** Implements a Firestore caching strategy to reduce AI latency and API costs.
- **Dynamic Visualizations:** Real-time topic frequency charts built with Recharts.
- **Responsive UI:** Fully themed with shadcn/ui and optimized for all device sizes.

## 🛠️ Tech Stack

- **Frontend:** React 18, Vite, TypeScript.
- **Styling:** Tailwind CSS + shadcn/ui.
- **Backend/Database:** Firebase Firestore (NoSQL).
- **Intelligence:** OpenAI API (GPT-4o-mini).
- **Charts:** Recharts.

## 🏗️ Architectural Highlight: The Intelligence Layer

To optimize for the "Trusted" business model and performance, this app doesn't just call an LLM on every reload.

1. **Check:** App checks Firestore for an existing `article_id`.
2. **Serve:** If found, the cached summary and sentiment are served instantly (0ms LLM cost).
3. **Analyze:** If not found, OpenAI analyzes the headline, and the result is persisted to Firestore for all future users.

## 📦 Installation & Setup

1. **Clone the repository:**

```bash
git clone https://github.com/your-username/trendboard-ai.git
cd trendboard-ai

```

2. **Install dependencies:**

```bash
npm install

```

3. **Environment Variables:**
   Create a `.env` file in the root directory and add your keys:

```env
VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_PROJECT_ID=your_id
VITE_OPENAI_API_KEY=your_openai_key

```

4. **Run the development server:**

```bash
npm run dev

```

## 📜 Database Security Rules

For the evaluation, ensure your Firestore rules allow the frontend to communicate:

```javascript
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}

```
