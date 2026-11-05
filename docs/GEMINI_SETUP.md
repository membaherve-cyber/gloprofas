# Gemini setup

1. Create a key in Google AI Studio. Do not reuse any key that has appeared in a chat, a document
   or a repository.
2. Set server-only variables in `shared/.env`: `GEMINI_API_KEY=...` and
   `GEMINI_MODEL=gemini-2.0-flash` (confirm the current model name in the Gemini documentation).
   Never prefix the key with `NEXT_PUBLIC_`.
3. Restart the web service. The route `/api/assistant` (Node.js runtime) performs the call with a
   20-second timeout, one key-free fallback and database rate limits.
4. Verify: ask “How do I recognise an investment scam?” in EN and FR, confirm source chips appear,
   and grep the build output for the key: `grep -r "AIza" .next/ || echo "key not present"`.
5. If the key is absent or quota is exhausted, the assistant answers from published GLOPROFAS
   content and labels the answer accordingly.
