# cf_ai_voice_assistant

**Vox** — a voice-enabled AI assistant built on Cloudflare's developer platform. Speak or type your questions and get spoken responses powered by Llama 3.3, with full conversation memory per session.

🔗 **Live Demo**: https://cf-ai-voice-assistant.YOUR_SUBDOMAIN.workers.dev

## Features

- 🎤 **Voice input** via Web Speech API with animated waveform
- 🔊 **Text-to-speech** responses read aloud automatically (toggleable)
- 🧠 **Conversation memory** — remembers full context across turns via Durable Objects
- ⚡ **LLM** — Llama 3.3 70B via Cloudflare Workers AI
- 💬 **Text fallback** — type instead of speaking anytime
- ✨ **Suggestion chips** — quick-start prompts on the empty state
- 🗑️ Clear chat history with one click

## Architecture
cat > ~/Desktop/cf_ai_voice_assistant/README.md << 'EOF'
# cf_ai_voice_assistant

**Vox** — a voice-enabled AI assistant built on Cloudflare's developer platform. Speak or type your questions and get spoken responses powered by Llama 3.3, with full conversation memory per session.

🔗 **Live Demo**: https://cf-ai-voice-assistant.YOUR_SUBDOMAIN.workers.dev

## Features

- 🎤 **Voice input** via Web Speech API with animated waveform
- 🔊 **Text-to-speech** responses read aloud automatically (toggleable)
- 🧠 **Conversation memory** — remembers full context across turns via Durable Objects
- ⚡ **LLM** — Llama 3.3 70B via Cloudflare Workers AI
- 💬 **Text fallback** — type instead of speaking anytime
- ✨ **Suggestion chips** — quick-start prompts on the empty state
- 🗑️ Clear chat history with one click

## Architecture
```
Browser (Vox UI — voice + text)
    │
    ▼
Cloudflare Worker (src/index.js)
    │
    ├── Durable Object: ConversationMemory
    │     └── Stores last 20 messages per session
    │
    └── Workers AI: Llama 3.3 70B
          └── Generates concise, conversational responses
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
- Wrangler CLI: `sudo npm install -g wrangler`
- Chrome browser (required for Web Speech API)

## Running Locally
```bash
git clone https://github.com/YOUR_USERNAME/cf_ai_voice_assistant
cd cf_ai_voice_assistant
wrangler login
wrangler dev
```

Open **http://localhost:8787** in Chrome.

## Deploying to Cloudflare
```bash
wrangler deploy
```

Wrangler will print a live URL like:
`https://cf-ai-voice-assistant.YOUR_SUBDOMAIN.workers.dev`

## Usage

1. Open the app in **Chrome**
2. Click the **🎤 mic button** and speak your question — a waveform animates while listening
3. The assistant responds in the chat and reads the answer aloud
4. Toggle **Voice On/Off** to mute spoken responses
5. Use the text box to type instead of speaking
6. Click **Clear** to reset the conversation
7. Use the **suggestion chips** on the home screen for quick prompts

## Project Structure
```
cf_ai_voice_assistant/
├── wrangler.toml       # Cloudflare Worker config, AI + DO bindings
├── src/
│   └── index.js        # Worker entry + ConversationMemory Durable Object
├── public/
│   └── index.html      # Vox UI (voice input, waveform, TTS, chat bubbles)
├── README.md
└── PROMPTS.md
```
