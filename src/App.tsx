import { useEffect, useState } from "react";

const App = () => {
  const [text, setText] = useState("");
  const [summarize, setSummarize] = useState("");
  const [aiReady, setAiReady] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const checkReady = setInterval(() => {
      if (
        window.puter &&
        window.puter.ai &&
        typeof window.puter.ai.chat === "function"
      ) {
        setAiReady(true);
        clearInterval(checkReady);
      }
    }, 300);
    return () => clearInterval(checkReady);
  }, []);

  const summarizeText = async () => {
    setLoading(true);
    setSummarize("");
    setError("");
    try {
      const res = await window?.puter?.ai?.chat(
        `Please summarize this ${text}`
      );
      if (typeof res === "string") {
      setSummarize(res);
    } else {
      setSummarize(res?.message?.content || "");
    }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message || "Something Went Wrong");
      }
    }
    setLoading(false);
  };
  const clearText = () => {
    setLoading(false);
    setText("");
    setSummarize("");
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-950 via-slate-950 to-purple-900 p-3 flex flex-col justify-center items-center gap-6">
      <h1 className="text-6xl sm:text-7xl md:text-8xl bg-gradient-to-r from-blue-500 via-rose-400 to-indigo-400 bg-clip-text text-transparent text-center font-semibold">
        AI Text Summarizer
      </h1>
      <div
        className={`px-4 py-2 text-sm rounded-full ${
          aiReady
            ? "bg-green-500/20 text-green-400 border-border-green-500/30"
            : "bg-yellow-500/20 text-yellow-400 border-yellow-green-500/30"
        }`}
      >
        {aiReady ? "🟢 AI Ready" : "🟡 waiting for AI"}
      </div>
      <div className="w-full max-w-2xl bg-gradient-to-r from-gray-800/90 to-gray-700/90 border border-gray-600 p-6 rounded-2xl shadow-xl">
        <textarea
          className="w-full p-4 bg-gray-700/80 rounded-2xl shadow-xl text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 disabled:opacity-50 resize-none transition duration-200 "
          value={text}
          onChange={(e) => setText(e.target.value)}
          disabled={!aiReady}
          placeholder="Paste your text here..."
        />
        <div className="flex gap-3 mt-2">
          <button
            className="px-6 py-3 bg-gradient-to-r from-rose-500 to-purple-500 hover:opacity-80 text-white font-semibold rounded-2xl transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            disabled={loading || !aiReady || !text.trim()}
            onClick={summarizeText}
          >
            {loading ? (
              <div className="flex gap-2 justify-center items-center">
                <div className="animate-spin w-4 h-4 border-2 border-white/30 border-t-white rounded-full"></div>
                Summarizing...
              </div>
            ) : (
              <div>Summarize</div>
            )}
          </button>
          {summarize && (
            <button
              className="px-6 py-3 bg-gradient-to-r from-gray-600 to-gray-700 hover:opacity-80 text-white font-semibold rounded-2xl transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              onClick={clearText}
            >
              Clear
            </button>
          )}
        </div>
        <div className="mt-4 space-y-4 text-white">
          {summarize && (
            <div className="p-4 bg-gray-700/70 rounded-2xl shadow-2xl">
              {summarize}
            </div>
          )}
          {error && (
            <div className="p-4 bg-red-100 text-red-500 border border-red-400 rounded-2xl">
              {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
