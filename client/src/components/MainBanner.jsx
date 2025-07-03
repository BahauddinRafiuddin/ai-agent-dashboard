import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";

// ⬇️ MainBanner Component
const MainBanner = () => {
  const { navigate } = useAppContext();
  const text = "Automate Your Workflow With AI Agents";
  const [displayed, setDisplayed] = useState("");

  // Typing effect logic
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, index + 1));
      index++;
      if (index === text.length) clearInterval(interval);
    }, 100);
    return () => clearInterval(interval);
  }, [text]);

  return (
    <div className="relative w-full min-h-[80vh] flex flex-col items-center justify-center px-4 text-center text-gray-800 overflow-hidden bg-slide-up">
      {/* Overlay for better readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/60 to-white/80 z-0"></div>

      <div className="z-10 max-w-3xl">
        {/* Typing Heading */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6 text-primary text-center">
          {displayed}
          <span className="border-r-2 border-gray-900 animate-blink ml-1" />
        </h1>

        {/* Description */}
        <p className="text-md md:text-lg mb-8 max-w-3xl text-gray-700">
          This project lets you run custom AI-powered agents like a news
          summarizer. Easily extend it to scrape, process, or automate anything
          with LLMs.
        </p>

        {/* CTA Button */}
        <button
          onClick={() => navigate("/dashboard")}
          className="bg-purple-600 text-white py-3 px-7 rounded-lg shadow-lg hover:bg-purple-700 transition duration-300 cursor-pointer"
        >
          Try AI Agents Now
        </button>
      </div>

      {/* CSS for blink & bg animation */}
      {/* 🔧 Animation CSS */}
      <style>{`
        @keyframes blink {
          0%, 50% { opacity: 1 }
          50.01%, 100% { opacity: 0 }
        }
        .animate-blink {
          animation: blink 1s step-start infinite;
        }

        @keyframes slideUpFadeIn {
          0% {
            transform: translateY(100px);
            opacity: 0;
            background-size: 120%;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
            background-size: 100%;
          }
        }

        .bg-slide-up::before {
          content: "";
          position: absolute;
          inset: 0;
          background-image: url('/mainBg.jpg');
          background-position: center bottom;
          background-repeat: no-repeat;
          background-size: contain;
          z-index: 0;
          opacity: 0;
          animation: slideImageUp 2s ease-out forwards;
        }

        @keyframes slideImageUp {
          0% {
            transform: translateY(80px);
            opacity: 0;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }

      `}</style>
    </div>
  );
};

export default MainBanner;
