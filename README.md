# Civic Eye 👁️

**See a Problem. Report It. Track the Change.**

Civic Eye is an AI-powered civic issue reporting platform designed to bridge the gap between citizens and local authorities. It empowers users to easily report infrastructural problems—like potholes, garbage overflow, or broken streetlights—and tracks their resolution status in real-time.

---

## 🛑 The Problem
Cities suffer from aging infrastructure, but reporting issues is traditionally a slow, bureaucratic process. Citizens lack a unified platform to quickly submit reports, and when they do, they rarely receive feedback on whether the issue was verified or resolved. Municipalities, on the other hand, are overwhelmed by duplicate reports and lack prioritized, categorized data.

## 💡 The Solution
Civic Eye streamlines this entirely using AI. A user simply takes a photo, and our Gemini-powered integration automatically categorizes the issue, determines its severity, assesses safety risks, and routes it to the appropriate department. 

Features like Smart Duplicate Detection and Community Confirmations prevent database clutter by grouping similar reports together, prioritizing issues with the highest public impact.

---

## ✨ Core Features
*   **🤖 AI Auto-Classification:** Upload a photo, and Google's Gemini AI automatically fills out the report (Category, Severity, Safety Risk).
*   **🗺️ Interactive Exploration Map:** View all reported issues city-wide on a dynamic Mapbox interface.
*   **🛡️ Smart Duplicate Detection:** AI actively compares new reports against existing nearby issues to prevent clutter.
*   **👍 Community Confirmation:** Instead of reporting the same pothole twice, users can "Confirm" existing issues, upvoting their priority.
*   **📊 Citizen Dashboard:** Track your personal impact, view real-time metrics, and visualize your activity over time.
*   **📱 Mobile-First Responsive Design:** Looks and works perfectly on mobile, tablet, and desktop.

---

## 🛠️ Tech Stack
*   **Framework:** Next.js 16 (App Router)
*   **Frontend:** React, Tailwind CSS, Framer Motion, shadcn/ui
*   **Database:** MongoDB
*   **Authentication:** Custom JWT-based Authentication
*   **AI Integration:** Google Gemini API (gemini-1.5-flash)
*   **Maps:** Mapbox GL JS (`react-map-gl`)

---

## 🚀 Setup Instructions

1.  **Clone the repository and install dependencies:**
    ```bash
    git clone https://github.com/student-ompandey/Civic-Eye.git
    cd "Civic Eye"
    npm install
    ```

2.  **Environment Variables:**
    Create a `.env.local` file in the root directory based on `.env.example`:
    ```env
    MONGODB_URI=your_mongodb_connection_string
    JWT_SECRET=your_super_secret_jwt_key
    GEMINI_API_KEY=your_google_gemini_key
    NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_public_token
    ```

3.  **Run the Development Server:**
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🎭 Demo Mode
Civic Eye is built to be resilient for live hackathon demonstrations!
*   **AI Fallback:** If the `GEMINI_API_KEY` is missing, expired, or rate-limited, the application will not crash. It enters **Demo Mode**, simulating a brief network delay and returning realistic mocked AI analysis data so your presentation flow remains uninterrupted.
*   **Map Fallback:** If `NEXT_PUBLIC_MAPBOX_TOKEN` is missing, the Explore Map automatically falls back to a responsive, fully functional "Grid View" interface of issue cards.
