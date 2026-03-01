# DeepTalk (Deep Conversation)

A Web App inspired by *We're Not Really Strangers*, built to help people connect through meaningful, deep conversations. 

This project emphasizes a **Zen-like, minimalist aesthetic** and uses fluid physics animations to replicate the tactile feeling of drawing and examining tarot cards.

## Core Features

- **Three Depth Levels**: Slowly transition from simple icebreakers to deep, reflective questions.
- **Physics-based Tarot Draw**: Cards are dealt face down. Tap a card to execute a fluid 3D spin and reveal your question.
- **Swipe to Discard**: Once the question has been discussed, simply swipe the card left or right to discard it and draw the next one.
- **Immersive Design**: A serene color palette (`#F9F8F6`), classic serif typography (`Noto Serif SC`), and a clean, distraction-free interface.
- **Mobile First**: Configured precisely for modern mobile browsers (employing `100dvh` to prohibit intrusive browser bar shifting during swipe actions).

## Tech Stack

- **React / Vite**: For an ultra-fast local development experience and modern component architecture.
- **Tailwind CSS v4**: For zero-configuration utility styling.
- **Framer Motion**: Powering complex layout transitions, gesture physics (`drag`), and spring animations (`damping`, `stiffness`).

## Getting Started

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start the development server**
   ```bash
   npm run dev
   ```

3. **Open the App**  
   Navigate to `http://localhost:5173/` in your browser.

## Project Structure

- `/src/data/questions.js`: The question bank (90 questions across 3 levels).
- `/src/hooks/useGameLogic.js`: Custom hook handling deck shuffling, levels, and progress without repeats.
- `/src/components/Card.jsx`: The Framer Motion powered interactive card component featuring 3D flips and swipe-to-dismiss.
- `/src/App.jsx`: The layout containing the Level Selector UI and AnimatePresence wrappers for the Card.
