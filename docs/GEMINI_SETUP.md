# Gemini

1. Create a key in Google AI Studio. Do not paste it into chat or Git.
2. Set `GEMINI_API_KEY` and optionally `GEMINI_MODEL` (default `gemini-2.5-flash`) in the server environment only. Never use a `NEXT_PUBLIC_` prefix.
3. Restart the app. The assistant route calls `https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent` with the key in a header.
4. If the key is missing or the model errors, the assistant still answers from published GLOPROFAS pages and says so.
5. Limits and the system instructions are editable by the AI Manager role under `/admin/assistant`.
