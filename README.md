# cf_ai_voice_assistant

A voice-enabled AI assistant built on Cloudflare's developer platform. Speak or type your questions and get spoken responses powered by Llama 3.3, with full conversation memory.

## Features

- 🎤 **Voice input** via Web Speech API
- 🔊 **Text-to-speech** responses read aloud automatically
- 🧠 **Conversation memory** — remembers context across turns (Durable Objects)
- ⚡ **LLM** — Llama 3.3 70B via Cloudflare Workers AI
- 💬 **Text fallback** — type instead of speaking anytime
- 🗑️ Clear chat history with one click

## Architecture
cat > README.md << 'EOF'
# cf_ai_voice_assistant

A voice-enabled AI assistant built on Cloudflare's developer platform. Speak or type your questions and get spoken responses powered by Llama 3.3, with full conversation memory.

## Features

- 🎤 **Voice input** via Web Speech API
- 🔊 **Text-to-speech** responses read aloud automatically
- 🧠 **Conversation memory** — remembers context across turns (Durable Objects)
- ⚡ **LLM** — Llama 3.3 70B via Cloudflare Workers AI
- 💬 **Text fallback** — type instead of speaking anytime
- 🗑️ Clear chat history with one click

## Architecture
```
Browser (Voice UI)
    │
    ▼
Cloudflare Worker (src/index.js)
    │
    ├── Durable Object: ConversationMemory
    │     └── Stores last 20 messages per session
    │
    └── Workers AI: Llama 3.3 70B
          └── Generates conversational responses
```

## Tech Stack

| Component | Technology |
|---|---|
| LLM | `@cf/meta/llama-3.3-70b-instruct-fp8-fast` |
| Memory / State | Cloudflare Durable Objects |
| Coordination | Cloudflare Workers |
| Frontend | Cloudflare Pages (static assets via Workers) |
| Voice Input | Web Speech API (browser-native) |
| Text-to-Speech | Web SpeechSynthesis API (browser-native) |

## Prerequisites

- Node.js 18+
- Cloudflare account (free tier works)
- Wrangler CLI: `npm install -g wrangler`

## Running Locally
```bash
git clone https://github.com/YOUR_USERNAME/cf_ai_voice_assistant
cd cf_ai_voice_assistant
npm install
wrangler login
wrangler dev
```

Then open **http://localhost:8787** in Chrome (Chrome required for Web Speech API).

## Deploying to Cloudflare
```bash
wrangler deploy
```

Wrangler will print a live URL like `https://cf-ai-voice-assistant.YOUR_SUBDOMAIN.workers.dev`.

## Usage

1. Open the app in Chrome
2. Click the **🎤 mic button** and speak your question
3. The assistant responds in text and reads the answer aloud
4. Toggle **🔊 TTS** on/off to mute spoken responses
5. Use the text box to type instead of speaking
6. Click **Clear Chat** to reset the conversation

## Project Structure
```
cf_ai_voice_assistant/
├── wrangler.toml       # Cloudflare Worker config, AI + DO bindings
├── src/
│   └── index.js        # Worker entry + ConversationMemory Durable Object
├── public/
│   └── index.html      # Voice UI (mic, TTS, chat bubbles)
├── README.md
└── PROMPTS.md
```
