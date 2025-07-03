import { motion } from "framer-motion";

const CTASection = () => {
  return (
    <section className="py-20 bg-purple-500 rounded-full text-white text-center px-6 md:px-16 lg:px-24 xl:px-32">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Ready to Supercharge Your Productivity?
        </h2>
        <p className="mb-8 text-lg">
          Upload a PDF, summarize a news site, or test your own workflows — all with one dashboard.
        </p>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="bg-white text-purple-600 font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-gray-100 transition cursor-pointer duration-300"
        >
          Get Started Now
        </button>
      </motion.div>
    </section>
  );
};

export default CTASection;
