# Dandiya Partner Invitation ❤️💃🏻🕺🏻

A beautiful, romantic, and playful MERN stack application designed to ask someone to be your Dandiya partner.

## 🌟 Overview
This project features a playful "Yes/No" interaction. The NO button shrinks and generates cute messages, while the YES button grows until they eventually say Yes! When they do, a beautiful celebration animation takes over the screen.

## 🚀 Tech Stack
- **Frontend:** React, Vite, Tailwind CSS (v4), Framer Motion, Lucide React, react-confetti
- **Backend:** Node.js, Express, MongoDB (Mongoose)

## 📦 Installation & Setup

1. **Clone the project** and open the folder.

2. **Install dependencies:**
   From the root folder, run:
   ```bash
   npm run install-all
   ```

3. **Database Configuration (Optional but recommended):**
   - Create a MongoDB Atlas cluster or use a local MongoDB instance.
   - Create a `.env` file in the `server/` directory.
   - Add your connection string:
     ```env
     MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/dandiya?retryWrites=true&w=majority
     PORT=5000
     ```
   *(Note: The app will work perfectly even without the database connected. The frontend gracefully handles missing backend.)*

4. **Run Locally:**
   From the root folder, start both the client and server concurrently:
   ```bash
   npm run dev
   ```
   - Client runs on `http://localhost:5173`
   - Server runs on `http://localhost:5000`

## 🎨 How to Customize

All the personalizations live in one file! Open `client/src/config/invitationConfig.js` to change:

- **herName**: The name of the girl (leave blank `""` if you prefer not to show a name).
- **yourName**: Your name (currently unused in the UI but available).
- **eventName**: "Navratri", "Garba Night", etc.
- **question**: The main question text.
- **subtext**: The subtitle shown initially.
- **yesMessage**: The message shown on the celebration screen.
- **noMessages**: The array of playful messages shown sequentially when she clicks "NO".

## 🚀 Deployment

### Frontend (Vercel / Netlify)
1. Push the repository to GitHub.
2. Go to Vercel/Netlify and import the project.
3. Set the Root Directory to `client`.
4. Build command: `npm run build`
5. Output directory: `dist`

### Backend (Render / Railway)
1. Import the repository.
2. Set the Root Directory to `server`.
3. Build command: `npm install`
4. Start command: `npm start`
5. Set environment variable `MONGODB_URI`.

*(Remember to update the `fetch` URL in `App.jsx` if you deploy the backend!)*
