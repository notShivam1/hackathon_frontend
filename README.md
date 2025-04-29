# Candidate-Employer Match Platform – Frontend Information

The **frontend application** for a candidate-job matching platform is built with **Next.js** and **TypeScript**.

---

## 🛠 Tech Stack

- **Next.js** + **React**
- **TypeScript**
- **Axios** for HTTP requests
- **Inline CSS styles** (no external CSS framework)
- Deployed on **Vercel**

---

### 👤 Candidate

- Register/Login
- Upload resume PDF + full name
- Resume text is parsed & sent to backend
- View recommended job matches

### 🏢 Employer

- Register/Login
- Post job with title, description, requirements
- View matched candidates per job

### 🤖 AI Matching

- Resume and job description are vectorized via OpenAI
- Cosine similarity calculates best matches

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/your-username/your-frontend-repo.git
cd your-frontend-repo
npm install
```

Create a .env file:

```bash
NEXT_PUBLIC_API_URL=backend_url
```

Run locally:

```bash
npm run dev
```
