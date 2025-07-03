import { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
import { assest } from "../../assets/assests";
import Loading from "../../components/Loading";

const WebPageAgent = () => {
  const { axios, user } = useAppContext();
  const [url, setUrl] = useState("");
  const [summary, setSummary] = useState("");
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);

  //   fetching Webpage Summary Logs
  const fetchLogs = async () => {
    const userToken = localStorage.getItem("user");
    try {
      axios.defaults.headers.common["Authorization"] = `Bearer ${userToken}`;
      const { data } = await axios.get("/api/webPage-agent/get-webLog");
      if (data.success) {
        setLogs(data.webLogs);
      }
    } catch (error) {
      console.error("Failed to fetch logs:", error.message);
    }
  };

  //   fetching Summary of Webpage
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!url) return toast.error("Please enter a valid URL");

    setLoading(true);
    const userToken = localStorage.getItem("user");

    try {
      axios.defaults.headers.common["Authorization"] = `Bearer ${userToken}`;
      const { data } = await axios.post("/api/webPage-agent/summary", { url });

      if (data.success) {
        setSummary(data.summary);
        toast.success("Summary created");
        fetchLogs();
      }
    } catch (err) {
      // Show specific backend message if available
      const message =
        err?.response?.data?.message || err?.message || "Something went wrong";

      if (message.includes("blocks scraping")) {
        toast.error("🚫 This website blocks scraping. Try another URL.");
      } else if (message.includes("insufficient content")) {
        toast.error("⚠️ Not enough content on this page to summarize.");
      } else {
        toast.error(message);
      }
    } finally {
      setLoading(false);
      setUrl("");
    }
  };

  //   Deleting WebPage Summary Log
  const handleDelete = async (id) => {
    const userToken = localStorage.getItem("user");
    try {
      axios.defaults.headers.common["Authorization"] = `Bearer ${userToken}`;
      const { data } = await axios.delete(
        `/api/webPage-agent/delete-webLog/${id}`
      );
      if (data.success) {
        toast.success(data.message);
        setLogs((prev) => prev.filter((log) => log._id !== id));
      }
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  return (
    <>
      {loading && <Loading />}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-primary">
          Web Page Summarizer Agent
        </h2>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-4"
        >
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter a webpage URL"
            className="flex-1 px-4 py-2 border rounded-lg"
          />
          <button
            type="submit"
            className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dull cursor-pointer"
            disabled={loading}
          >
            {loading ? "Summarizing..." : "Summarize"}
          </button>
        </form>

        {summary && (
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-medium text-lg mb-2">Summary:</h3>
            <p className="text-gray-800">{summary}</p>
          </div>
        )}

        <div>
          <h3 className="font-medium text-lg mb-2">Your Summaries (Logs):</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {logs.length === 0 && <p>No summaries yet.</p>}
            {logs.map((log) => (
              <div
                key={log._id}
                className="bg-white p-5 rounded shadow relative  overflow-hidden"
              >
                <div>
                  <p
                    className="text-sm font-medium text-primary mb-1 break-words"
                    title={log.url}
                  >
                    {log.url}
                  </p>
                  <p className="text-gray-700 text-sm break-words whitespace-pre-line">
                    {log.summary}
                  </p>
                </div>
                <img
                  onClick={() => handleDelete(log._id)}
                  src={assest.deleteIcon}
                  className="absolute size-5 bottom-1 right-1  cursor-pointer hover:size-7 transition-all"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default WebPageAgent;
