# 📄 AI Resume Analyzer & ATS Checker

An AI-powered Resume Analyzer that evaluates resumes against job descriptions to generate an ATS score, identify matching and missing skills, and provide personalized improvement suggestions. Built with **React**, **TypeScript**, **n8n**, and **AI** for fast and intelligent resume analysis.

---

## 🚀 Live Demo

🔗 **Demo:** https://ai-resume-analyzer-ats-checkers.vercel.app/

---

## 📸 Preview

<img width="1918" height="923" alt="Screenshot 2026-07-08 052007" src="https://github.com/user-attachments/assets/e6b1a1fe-47f4-4de4-9f14-5ac20784ae89" />
<img width="1918" height="917" alt="Screenshot 2026-07-08 051940" src="https://github.com/user-attachments/assets/49974d13-d620-4c23-807c-b5a85151d246" />



---

## ✨ Features

- 📄 Upload Resume (PDF & DOCX)
- 📝 Paste Job Description
- 🤖 AI-powered Resume Analysis
- 📊 ATS Score Calculation
- 🎯 Job Match Percentage
- ✅ Matched Skills Detection
- ❌ Missing Skills Identification
- 💪 Resume Strength Analysis
- ⚠️ Weakness Detection
- 💡 Personalized Improvement Suggestions
- 🌙 Modern Responsive UI
- ⚡ Fast Analysis using n8n Workflows

---

## 🛠️ Tech Stack

### Frontend
- React
- TypeScript
- Tailwind CSS
- shadcn/ui

### Backend & Automation
- n8n
- AI Agent
- Webhooks

### AI
- Groq LLM *(or replace with Gemini/OpenAI if applicable)*

### Document Processing
- PDF Extraction
- DOCX Extraction

---

## 🏗️ Project Architecture

```
                 Resume Upload
                       │
                       ▼
               Extract Resume Text
                       │
                       ▼
            Job Description Input
                       │
                       ▼
                 AI Resume Analysis
                       │
                       ▼
             ATS Score & Skill Match
                       │
                       ▼
               Results Dashboard
```

---

## 📊 AI Analysis Includes

- ATS Compatibility Score
- Resume Match Percentage
- Matched Skills
- Missing Skills
- Resume Strengths
- Weaknesses
- Resume Summary
- Improvement Suggestions

---

## 📁 Folder Structure

```
AI-Resume-Analyzer/
│
├── src/
│   ├── components/
│   ├── pages/
│   ├── hooks/
│   ├── lib/
│   └── App.tsx
│
├── public/
├── package.json
├── tsconfig.json
└── README.md
```

---

## ⚙️ Installation

Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/ai-resume-analyzer.git
```

Navigate into the project

```bash
cd ai-resume-analyzer
```

Install dependencies

```bash
npm install
```

Start the development server

```bash
npm run dev
```

---

## 🔗 API Integration

The frontend communicates with an **n8n Webhook** using **multipart/form-data**.

### Request

```
POST /webhook
```

Fields

```
resume
jobDescription
```

---

## 📦 Example Response

```json
{
  "atsScore": 84,
  "matchPercentage": 81,
  "matchedSkills": [
    "Python",
    "MongoDB",
    "Git"
  ],
  "missingSkills": [
    "Docker",
    "AWS"
  ],
  "strengths": [
    "Strong backend development",
    "Relevant projects"
  ],
  "weaknesses": [
    "No cloud experience"
  ],
  "summary": "The resume is a good match for the job role.",
  "suggestions": [
    "Add Docker experience.",
    "Mention AWS projects."
  ]
}
```

---

## 🎯 Use Cases

- Job Seekers
- Recruiters
- HR Teams
- Career Coaches
- Resume Review Platforms
- ATS Screening Tools

---

## 🌟 Future Improvements

- Upload Job Description as PDF
- Resume Score History
- Download PDF Report
- Multi-language Support
- AI Resume Rewriting
- Cover Letter Generator
- Authentication & User Dashboard

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a new branch

```bash
git checkout -b feature-name
```

3. Commit your changes

```bash
git commit -m "Added new feature"
```

4. Push your branch

```bash
git push origin feature-name
```

5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**Chaitanya Ramisetti**

- GitHub: https://github.com/chaitanyaramisetti4589-gif
- LinkedIn: https://linkedin.com/in/chaitanya-ramisetti-b00b44322

---

⭐ If you found this project useful, don't forget to star the repository!
