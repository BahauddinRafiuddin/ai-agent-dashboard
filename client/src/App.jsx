import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import { Route, Routes, useLocation } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import DashboardHome from "./pages/dashboard/DashboardHome";
import NewsAgent from "./pages/dashboard/NewsAgent";
import "./index.css";
import AuthForm from "./components/AuthForm";
import WebPageAgent from "./pages/dashboard/WebPageAgent";
import { useAppContext } from "./context/AppContext";
import PdfSummarizer from "./pages/dashboard/PdfSummarizer";
import EmailAgent from "./pages/dashboard/EmailAgent";
import CreativeWritingAgent from "./pages/dashboard/CreativeWritingAgent";

const App = () => {
  const isDashboardPath = useLocation().pathname.includes("dashboard");
  const { user, navigate } = useAppContext();
  return (
    <div className="min-h-screen text-default text-gray-700 bg-white">
      <Navbar />

      {isDashboardPath ? (
        <div className="h-[calc(100vh-72px)] overflow-hidden">
          {/* Adjust 72px to your Navbar height */}
          <Routes>
            <Route path="/dashboard" element={user ? <Dashboard /> : <AuthForm />}>
              <Route index element={<DashboardHome />} />
              <Route path="news-agent" element={<NewsAgent />} />
              <Route path="web-agent" element={<WebPageAgent />} />
              <Route path="pdf-agent" element={<PdfSummarizer />} />
              <Route path="email-agent" element={<EmailAgent/>}/>
              <Route path="creative-writing" element={<CreativeWritingAgent/>}/>
            </Route>
          </Routes>
        </div>
      ) : (
        <div className="px-6 md:px-16 lg:px-24 xl:px-32 py-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<AuthForm />} />
          </Routes>
        </div>
      )}
    </div>
  );
};

export default App;
