"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    if (!prompt.trim()) return alert("Please enter a prompt.");
    setLoading(true);
    try {
      router.push(`/result?prompt=${encodeURIComponent(prompt)}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#040037]">
      <div className="flex flex-col items-center justify-center bg-white rounded-2xl shadow-2xl p-10 w-full max-w-md">
        <Image
          src="/brandifyai_logo.svg"
          alt="BrandifyAI Logo"
          width={80}
          height={80}
          className="mb-4"
        />
        <h1 className="text-3xl font-bold text-[#040037] mb-2">BrandifyAI</h1>
        <p className="text-gray-600 mb-6 text-center">
          Your AI Branding Assistant
        </p>

        <p className="text-gray-700 text-center mb-3 text-sm">
          Tell me what your brand is about and I will generate keywords for you
        </p>

        <div className="w-full p-[1px] rounded-lg bg-gradient-to-r from-[#040037] via-[#1037dd] to-[#d11d4d] mb-4">
          <input
            type="text"
            placeholder="Enter your prompt..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full bg-white text-[#040037] rounded-lg px-4 py-2 focus:outline-none"
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-gradient-to-r from-[#040037] via-[#1037dd] to-[#d11d4d] hover:opacity-90 text-white font-medium py-2 rounded-lg transition disabled:opacity-50"
        >
          {loading ? "Generating..." : "Submit"}
        </button>
      </div>
    </div>
  );
}
