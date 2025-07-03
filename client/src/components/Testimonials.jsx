import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Arjun M.",
    role: "Startup Founder",
    quote:
      "These AI agents saved me hours! The PDF Summarizer helped extract insights in seconds.",
  },
  {
    name: "Sneha P.",
    role: "Research Analyst",
    quote:
      "I use the Web Page Summarizer daily to stay up to date with tech news. Super useful!",
  },
  {
    name: "Dev S.",
    role: "Student",
    quote:
      "Amazing tool! The interface is clean and I love how responsive everything is.",
  },
];

const Testimonials = () => {
  return (
    <section className="py-16 bg-white px-6 md:px-16 lg:px-24 xl:px-32 text-center">
      <h2 className="text-3xl font-bold mb-12 text-primary">What Users Are Saying</h2>
      <div className="grid md:grid-cols-3 gap-8">
        {testimonials.map((t, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="bg-gray-100 p-6 rounded-xl shadow-md"
          >
            <p className="text-gray-700 italic mb-4">“{t.quote}”</p>
            <h4 className="font-semibold text-primary">{t.name}</h4>
            <span className="text-sm text-gray-500">{t.role}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
