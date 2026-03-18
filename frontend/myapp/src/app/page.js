'use client';
import { useState } from "react";

export default function Home() {
  const [description, setDescription] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:5000";

    try {
      const res = await fetch(`${API_URL}/predict`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ description }),
      });

      if (!res.ok) {
        throw new Error(`Server error: ${res.status}`);
      }

      const data = await res.json();
      setResult(data);
    } catch (error) {
      console.error("Error:", error);
      setResult({
        error:
          "❌ Failed to fetch prediction. Check if backend is running & CORS is enabled.",
      });
    }

    setLoading(false);
  };

  return (
    <div>
      {/* HEADER */}
      <header className="relative text-center p-6 bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 text-white font-extrabold text-3xl shadow-2xl tracking-wider transition-all duration-300 transform hover:scale-[1.005]">
    {/* Use a larger, bolder font and a slightly darker gradient for contrast */}
    <span className="inline-block" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>
        Job Fraud Detection System 🔍
    </span>
    {/* Place navigation link here */}
    <a
        href="/performance" 
        className="absolute right-6 top-1/2 -translate-y-1/2 text-sm py-1.5 px-4 rounded-full border-2 border-white/70 bg-white/10 hover:bg-white/20 transition-colors font-medium"
    >
        Performance Metrics
    </a>
</header>

      

      {/* MAIN CONTAINER */}
      <div
      style={{ backgroundImage: 'url("bg.jpg")' }}
       className="min-h-screen flex flex-col items-center justify-center min-h-screen w-full bg-cover bg-center bg-scroll relative">
        <svg xmlns="http://www.w3.org/2000/svg" width="150" height="150" fill="currentColor" className="bi bi-brightness-alt-high-fill border-gray-400" viewBox="0 0 16 16">
  <path d="M8 3a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 3m8 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5m-13.5.5a.5.5 0 0 0 0-1h-2a.5.5 0 0 0 0 1zm11.157-6.157a.5.5 0 0 1 0 .707l-1.414 1.414a.5.5 0 1 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0m-9.9 2.121a.5.5 0 0 0 .707-.707L3.05 5.343a.5.5 0 1 0-.707.707zM8 7a4 4 0 0 0-4 4 .5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5 4 4 0 0 0-4-4"/>
</svg>
        <h2 className="text-left text-lg font-semibold text-gray-800 mb-4 bg-white/70 px-4 py-2 rounded-lg shadow-sm">
          ✍️ Enter or Paste the{" "}
          <span className="text-blue-800 font-bold">Job Description</span>
        </h2>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="bg-gray-800 p-6 rounded-2xl shadow-2xl w-full max-w-lg border border-gray-600 transition transform hover:scale-[1.01]"
        >
          <textarea
            className="w-full border border-gray-500 bg-gray-900 text-white placeholder-gray-400 p-3 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="6"
            placeholder="Paste the job description here..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-2 rounded-md font-semibold hover:from-blue-700 hover:to-indigo-800 transition-all shadow-md"
            disabled={loading}
          >
            {loading ? "⏳ Checking..." : "🔍 Check Job"}
          </button>
        </form>

        {/* RESULTS SECTION */}
        {result && (
          <div className="mt-6 p-6 bg-gradient-to-br from-violet-800 via-purple-500 to-fuchsia-500 shadow-xl rounded-2xl text-center w-full max-w-lg text-white">
            {result.error ? (
              <p className="text-red-300 font-semibold">{result.error}</p>
            ) : (
              <>
                <p className="text-xl font-semibold mb-2">
                  <strong>Prediction:</strong>{" "}
                  {result.prediction === "Fake" ? (
                    <span className="text-red-400">🟥 Fake Job</span>
                  ) : (
                    <span className="text-green-400">🟩 Real Job</span>
                  )}
                </p>

                <p className="mt-2 text-white/90">
                  Probability (Fake): {(result.probability * 100).toFixed(2)}%
                </p>

                {/* Job Type */}
                <p className="mt-3 text-yellow-50 text-sm">
                  <strong>Job Type:</strong> {result.job_type}
                </p>

                {/* LIME Explanation */}
                {result.lime_explanation && result.lime_explanation.length > 0 && (
                  <div className="mt-5 text-left bg-white/20 backdrop-blur-sm p-4 rounded-xl">
                    <h2 className="text-lg font-semibold mb-2 text-yellow-100">
                      💡 LIME Explanation (Key Influences)
                    </h2>
                    <ul className="list-disc list-inside text-sm text-white">
                      {result.lime_explanation.slice(0, 10).map((item, index) => (
                        <li key={index}>
                          <strong>{item.word}</strong> →{" "}
                          {item.weight > 0 ? (
                            <span className="text-red-300">
                              pushed towards Fake
                            </span>
                          ) : (
                            <span className="text-green-300">
                              pushed towards Real
                            </span>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {/* TECHNICAL & NON-TECHNICAL KEYWORDS LISTS */}
                {(result.technical_keywords_list || result.non_technical_keywords_list) && (
                    <div className="mt-5 text-left bg-white/20 backdrop-blur-sm p-4 rounded-xl">
                        <h2 className="text-lg font-semibold mb-3 text-yellow-100">
                            🏷️ Job Type Keywords
                        </h2>
                        
                        {/* Technical Keywords */}
                        <div className="mb-4">
                            <h3 className="text-sm font-bold text-cyan-200 mb-1">
                                Technical Keywords Found (Top 10):
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {result.technical_keywords_list.slice(0, 10).map((keyword, index) => (
                                    <span key={index} className="bg-cyan-700/70 text-xs px-2 py-0.5 rounded-full">
                                        {keyword}
                                    </span>
                                ))}
                                {result.technical_keywords_list.length > 10 && (
                                    <span className="bg-cyan-700/70 text-xs px-2 py-0.5 rounded-full">
                                        ... (+{result.technical_keywords_list.length - 10} more)
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Non-Technical Keywords */}
                        <div>
                            <h3 className="text-sm font-bold text-lime-200 mb-1">
                                Non-Technical Keywords Found (Top 10):
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {result.non_technical_keywords_list.slice(0, 10).map((keyword, index) => (
                                    <span key={index} className="bg-lime-700/70 text-xs px-2 py-0.5 rounded-full">
                                        {keyword}
                                    </span>
                                ))}
                                {result.non_technical_keywords_list.length > 10 && (
                                    <span className="bg-lime-700/70 text-xs px-2 py-0.5 rounded-full">
                                        ... (+{result.non_technical_keywords_list.length - 10} more)
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                )}
                
                {/* NEW BUTTON TO PERFORMANCE PAGE */}
                <div className="mt-6">
                    <a 
                        href="/performance" // Define a new route in your Next.js project
                        className="inline-block w-full bg-yellow-400 text-gray-900 py-2 rounded-lg font-bold hover:bg-yellow-500 transition-colors shadow-lg"
                    >
                        View Model Performance Metrics 📈
                    </a>
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {/* FOOTER */}
      <footer className="w-full text-center py-4 bg-gray-900 text-gray-300 text-sm md:text-base border-t border-gray-700 ">
    <div className="container mx-auto px-4">
        © {new Date().getFullYear()}{" "}
        <span className="text-blue-400 font-bold tracking-wide">
            Recruitment Fraud Detection
        </span>{" "}
        | All Rights Reserved.
    </div>
</footer>
    </div>
  );
}