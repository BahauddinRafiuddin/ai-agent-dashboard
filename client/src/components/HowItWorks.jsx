import { motion } from "framer-motion";

const steps = [
  {
    step: "1. Choose an Agent",
    desc: "Pick from agents like PDF Summarizer, Web Page Summarizer, or News Agent depending on your task.",
  },
  {
    step: "2. Provide Input",
    desc: "Upload a PDF, paste a URL, or fetch news with a click. Our system prepares the data for processing.",
  },
  {
    step: "3. Get Summary",
    desc: "Your input is processed using powerful AI models to generate concise and useful summaries.",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const HowItWorks = () => {
  return (
    <div className="py-20 px-4 md:px-16 bg-white text-gray-800">
      <h2 className="text-3xl font-bold text-center mb-12">📊 How It Works</h2>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-8 cursor-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {steps.map((step, index) => (
          <motion.div
            key={index}
            className="bg-gray-100 rounded-xl p-6 shadow-md hover:shadow-xl transition-all"
            variants={itemVariants}
          >
            <h3 className="text-xl font-semibold mb-2 text-primary">
              {step.step}
            </h3>
            <p className="text-gray-700 text-sm">{step.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default HowItWorks;
