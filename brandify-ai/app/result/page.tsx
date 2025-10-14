"use client";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";

export default function ResultPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const prompt = searchParams.get("prompt");

  const [loading, setLoading] = useState(true);
  const [snippet, setSnippet] = useState("");
  const [keywords, setKeywords] = useState<string[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!prompt) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError("");

        // ✅ call your Next.js proxy route instead of AWS directly
        const res = await fetch(`/api/generate?prompt=${encodeURIComponent(prompt)}`);

        if (!res.ok) {
          throw new Error(`Server responded with ${res.status}`);
        }

        const data = await res.json();

        setSnippet(data.snippet || "No snippet generated.");
        setKeywords(data.keywords || []);
      } catch (err: any) {
        console.error("Fetch error:", err);
        setError("Failed to fetch branding results. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [prompt]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#040037]">
      {/* Center White Box */}
      <div className="flex flex-col items-center justify-center bg-white rounded-2xl shadow-2xl p-10 w-full max-w-md">
        {/* Logo */}
        <Image
          src="/brandifyai_logo.svg"
          alt="BrandifyAI Logo"
          width={80}
          height={80}
          className="mb-4"
        />

        {/* Brand Name */}
        <h1 className="text-3xl font-bold text-[#040037] mb-2">BrandifyAI</h1>

        {/* Tagline */}
        <p className="text-gray-600 mb-6 text-center">
          Your AI Branding Assistant
        </p>

        {/* Loading / Error / Result */}
        {loading ? (
          <p className="text-gray-700">Generating results...</p>
        ) : error ? (
          <p className="text-red-600">{error}</p>
        ) : (
          <>
            {/* Branding Snippet */}
            <div className="w-full text-left mb-6">
              <h2 className="text-lg font-semibold text-[#040037] mb-2">
                Branding Snippet
              </h2>
              <div className="p-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-700 italic">
                {snippet}
              </div>
            </div>

            {/* Keywords */}
            <div className="w-full text-left">
              <h2 className="text-lg font-semibold text-[#040037] mb-2">
                Keywords
              </h2>
              <div className="flex flex-wrap gap-2">
                {keywords.map((kw, i) => (
                  <span
                    key={i}
                    className="bg-[#1037dd1a] text-[#1037dd] px-3 py-1 rounded-full text-sm"
                  >
                    {kw}
                  </span>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Back Button */}
        <button
          onClick={() => router.push("/")}
          className="mt-8 w-full bg-gradient-to-r from-[#040037] via-[#1037dd] to-[#d11d4d] text-white py-2 rounded-lg hover:opacity-90 transition"
        >
          Generate Another
        </button>
      </div>
    </div>
  );
}
