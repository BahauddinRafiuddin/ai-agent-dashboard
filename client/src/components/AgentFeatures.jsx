import { useAppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const features = [
  {
    title: "PDF Summarizer",
    icon: "📄",
    path: "/dashboard/pdf-agent",
    desc: "Upload any PDF and get a concise summary generated instantly using AI.",
    tag: "⭐ Popular",
  },
  {
    title: "News Summarizer",
    icon: "📰",
    path: "/dashboard/news-agent",
    desc: "Stay updated with the latest tech headlines summarized for you.",
  },
  {
    title: "Email Generator",
    icon: "📧",
    path: "/dashboard/email-agent",
    desc: "Generate professional emails by providing recipient, tone, and key points.",
    tag: "⭐ Popular", // ✅ Add this
  },
  {
    title: "Web Page Agent",
    icon: "🌐",
    path: "/dashboard/web-agent",
    desc: "Paste any URL and receive a summarized version of the entire webpage.",
  },
  {
    title: "Creative Writing Agent",
    icon: "💡",
    path: "/dashboard/creative-writing",
    desc: "Wirte Poam Story Or Get Idea And Content For Youtube Video .",
    tag: "⭐ Popular",
  },
];

// Animation variants
const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

const AgentFeatures = () => {
  const { user } = useAppContext();
  const navigate = useNavigate();

  return (
    <div className="py-16 px-4 md:px-16 bg-gray-50">
      <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
        🔍 Powerful AI Agents
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((f, index) => (
          <motion.div
            key={f.title}
            className="relative bg-white shadow-md p-6 rounded-xl text-center hover:shadow-xl transition-all"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            custom={index}
            variants={cardVariants}
          >
            {/* 🔖 Optional tag */}
            {f.tag && (
              <span className="absolute top-2 right-2 bg-blue-400 text-white text-xs font-semibold px-2 py-1 rounded-full shadow">
                {f.tag}
              </span>
            )}

            <div className="text-4xl mb-3">{f.icon}</div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800">
              {f.title}
            </h3>
            <p className="text-sm text-gray-600 mb-4">{f.desc}</p>
            <button
              onClick={() => (user ? navigate(f.path) : navigate("/auth"))}
              className="bg-primary text-white px-5 py-2 rounded-md hover:bg-primary-dull cursor-pointer transition-all"
            >
              Try Now
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AgentFeatures;
