# 🎵 Music Streaming Web App

A full-stack music streaming application built using **React (Vite)** and **Express.js**, supporting real-time audio playback via HTTP range-based streaming. The application streams music files directly from a local system folder (downloads).

---

## 🚀 Features

* 🎧 Stream audio using **HTTP Range Requests (206 Partial Content)**
* ⏯ **Play / Pause / Next / Previous** controls
* 📊 Real-time **progress tracking (current time & duration)**
* 🔊 **Volume control**
* 🔁 Auto-play next song in playlist
* 🔍 Dynamic **song search**
* 📱 Responsive UI (mini player + expanded player)

---

## 🧠 Project Approach

This project was developed using a combination of:

* **Manual backend implementation** (core streaming logic)
* **AI-assisted frontend development (Antigravity)**

The backend was built from scratch to understand how real-world media streaming works, while the frontend and integration were generated and refined using AI tools, followed by manual debugging and validation.

---

## ⚙️ Backend (Core Focus)

* Built with **Express.js**
* Implements streaming using:

  * `fs.createReadStream`
  * HTTP **Range headers**
* Supports:

  * Partial content responses (**206**)
  * Efficient memory usage
  * Error handling for invalid/missing files

---

## 🎨 Frontend

* Built with **React (Vite)**
* Uses **HTML5 Audio API** for playback
* Centralized playback logic using a custom hook:
  `useAudioPlayer`

⚠️ Note:
Frontend UI and integration were implemented using **AI-assisted tools**, with manual debugging and validation.

---

## 🔥 Key Learnings

* Implemented real-world **audio streaming using HTTP range requests**
* Understood how browsers:

  * Request audio chunks
  * Buffer and play media
* Debugged issues like:

  * Range header errors
  * Streaming failures
  * Audio playback issues
* Built a **synchronized UI + audio system**
* Learned effective use of **AI in development workflows**

---

## 🛠 Tech Stack

**Frontend:**

* React (Vite)
* Bootstrap / Custom CSS
* Lucide Icons

**Backend:**

* Node.js
* Express.js
* File System (`fs`)

---

## ⚙️ Setup Instructions

### 🔹 Backend

```bash
cd server
npm install
npm run dev
```

### 🔹 Frontend

```bash
cd client
npm install
npm run dev
```

---

## ⚙️ How Streaming Works

1. Client requests audio file
2. Server checks for `Range` header
3. Responds with:

   * `200 OK` (full file) OR
   * `206 Partial Content` (chunk)
4. Browser requests chunks continuously
5. Audio plays seamlessly 🎵

---

## 📌 Future Improvements

* 🎚 Drag-to-seek functionality
* 📡 Buffering indicator
* 🔀 Shuffle & repeat modes
* ☁️ Cloud integration (Azure / AWS)
* 📂 Playlist management system

---

