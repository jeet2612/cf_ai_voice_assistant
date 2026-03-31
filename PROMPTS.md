# AI Prompts Used

This file documents the AI prompts used during the development of this project, as required by the assignment.

## 1. Initial Project Planning

**Prompt:**
> I have to build an AI-powered application on Cloudflare for a job application. Requirements: LLM (recommend Llama 3.3 on Workers AI), Workflow/coordination (Workflows, Workers or Durable Objects), User input via chat or voice (Pages or Realtime), Memory or state. I want to build a voice-enabled AI app. I'm comfortable with web dev. Guide me from scratch.

**Used for:** Overall project architecture and stack selection.

---

## 2. Cloudflare Worker + Durable Object Logic

**Prompt:**
> Write a Cloudflare Worker in JavaScript that: accepts POST /chat with a message and sessionId, uses a Durable Object called ConversationMemory to store and retrieve the last 20 messages, sends the full conversation history to Llama 3.3 70B via Workers AI, and returns the assistant reply as JSON. Include GET /history and DELETE /clear endpoints.

**Used for:** `src/index.js`

---

## 3. Voice UI Frontend

**Prompt:**
> Build a single-file HTML/CSS/JS voice assistant UI with: a mic button that uses the Web Speech API to record and transcribe voice, sends the transcript to a /chat API endpoint, displays user and assistant messages as chat bubbles, reads assistant responses aloud using SpeechSynthesis, a toggle for TTS on/off, a text input fallback, and a clear chat button. Dark theme with orange accent colors.

**Used for:** `public/index.html`

---

## 4. Wrangler Configuration

**Prompt:**
> Write a wrangler.toml for a Cloudflare Worker named cf-ai-voice-assistant that uses Workers AI binding, a Durable Object binding called CONVERSATION with class ConversationMemory, and serves static assets from a ./public directory.

**Used for:** `wrangler.toml`

---

## 5. Debugging Permission Error

**Prompt:**
> I got EACCES permission denied when running npm install -g wrangler on Mac. How do I fix it?

**Used for:** Local environment setup.

---

## 6. UI Redesign

**Prompt:**
> I want a proper website with a proper UI, not this. Build a production-grade voice assistant frontend called "Vox" with: animated glowing background orbs, Syne + DM Sans fonts, gradient branding, animated waveform bars when recording, bouncing thinking dots, suggestion chips on the empty state, proper chat bubbles with avatars, and a dark theme with purple/pink accents.

**Used for:** `public/index.html` (full redesign)
