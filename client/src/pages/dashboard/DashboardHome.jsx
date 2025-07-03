import { Link } from "react-router-dom";

const agents = [
  {
    icon: "📧",
    title: "Email Generator Agent",
    description:
      "Craft professional emails in seconds. Input tone, purpose, and key points — get polished emails instantly.",
    route: "/dashboard/email-agent",
  },
  {
    icon: "💡",
    title: "Creative Writing Agent",
    description:"Unleash your imagination with AI-powered storytelling.Craft engaging blogs, poems, or creative content in seconds.",
    route: "/dashboard/creative-writing",
  },
  {
    icon: "📰",
    title: "News Agent",
    description:
      "Scrapes the latest tech headlines and gives you a summarized report using AI.",
    route: "/dashboard/news-agent",
  },
  {
    icon: "📄",
    title: "PDF Summary Agent",
    description:
      "Extracts insights from PDFs using AI summarization. Great for reports, papers, invoices, and more.",
    route: "/dashboard/pdf-agent",
  },
  {
    icon: "🌐",
    title: "Web Page Summary Agent",
    description:
      "Fetches any web page URL and generates a short AI summary to quickly understand key points.",
    route: "/dashboard/web-agent",
  },
];

const DashboardHome = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">👋 Welcome to AI Agent Dashboard</h2>
      <p className="text-gray-600 mb-6">
        This is your control center to run powerful autonomous agents with a
        single click. Choose an agent below to get started.
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        {agents.map((agent, index) => (
          <div key={index} className="p-4 bg-white shadow rounded-lg border">
            <h3 className="text-lg font-semibold mb-2">
              {agent.icon} {agent.title}
            </h3>
            <p className="text-sm text-gray-500 mb-3">{agent.description}</p>
            <Link
              to={agent.route}
              className="text-primary hover:text-primary-dull transition-all font-medium"
            >
              ➤ Run {agent.title}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardHome;
