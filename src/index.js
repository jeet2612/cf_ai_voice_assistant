export class ConversationMemory {
  constructor(state, env) {
    this.state = state;
    this.storage = state.storage;
  }

  async fetch(request) {
    const url = new URL(request.url);

    if (request.method === "GET" && url.pathname === "/history") {
      const history = (await this.storage.get("history")) || [];
      return Response.json(history);
    }

    if (request.method === "POST" && url.pathname === "/add") {
      const { role, content } = await request.json();
      const history = (await this.storage.get("history")) || [];
      history.push({ role, content });
      const trimmed = history.slice(-20);
      await this.storage.put("history", trimmed);
      return Response.json({ ok: true });
    }

    if (request.method === "DELETE" && url.pathname === "/clear") {
      await this.storage.delete("history");
      return Response.json({ ok: true });
    }

    return new Response("Not found", { status: 404 });
  }
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      });
    }

    if (url.pathname === "/chat" && request.method === "POST") {
      const { message, sessionId } = await request.json();
      if (!message) return Response.json({ error: "No message" }, { status: 400 });

      const id = env.CONVERSATION.idFromName(sessionId || "default");
      const stub = env.CONVERSATION.get(id);

      await stub.fetch("http://do/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: "user", content: message }),
      });

      const histRes = await stub.fetch("http://do/history");
      const history = await histRes.json();

      const messages = [
        {
          role: "system",
          content:
            "You are a helpful, friendly voice assistant. Keep responses concise and conversational — ideally 2-3 sentences. Avoid markdown, bullet points, or special characters since your responses will be read aloud.",
        },
        ...history,
      ];

      const aiResponse = await env.AI.run("@cf/meta/llama-3.3-70b-instruct-fp8-fast", {
        messages,
        max_tokens: 300,
      });

      const reply = aiResponse.response || "Sorry, I couldn't generate a response.";

      await stub.fetch("http://do/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: "assistant", content: reply }),
      });

      return Response.json({ reply }, {
        headers: { "Access-Control-Allow-Origin": "*" },
      });
    }

    if (url.pathname === "/history" && request.method === "GET") {
      const sessionId = url.searchParams.get("sessionId") || "default";
      const id = env.CONVERSATION.idFromName(sessionId);
      const stub = env.CONVERSATION.get(id);
      const res = await stub.fetch("http://do/history");
      const history = await res.json();
      return Response.json(history, {
        headers: { "Access-Control-Allow-Origin": "*" },
      });
    }

    if (url.pathname === "/clear" && request.method === "DELETE") {
      const sessionId = url.searchParams.get("sessionId") || "default";
      const id = env.CONVERSATION.idFromName(sessionId);
      const stub = env.CONVERSATION.get(id);
      await stub.fetch("http://do/clear", { method: "DELETE" });
      return Response.json({ ok: true }, {
        headers: { "Access-Control-Allow-Origin": "*" },
      });
    }

    return new Response("Not found", { status: 404 });
  },
};
