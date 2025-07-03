import { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import { assest } from "../../assets/assests";
import toast from "react-hot-toast";
import Loading from "../../components/Loading";

const NewsAgent = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [logs, setLogs] = useState([]);
  const { axios } = useAppContext();

  // Starting News Agent
  const runAgent = async () => {
    setLoading(true);
    const userToken = localStorage.getItem("user");
    try {
      axios.defaults.headers.common["Authorization"] = `Bearer ${userToken}`;
      const { data } = await axios.get("/api/news-agent/run-news-workflow");
      if (data.success) {
        // const json = await data.json();
        // console.log(data);
        setData(data);
        loadLogs()
      }
    } catch (err) {
      setData({ error: "Failed to run agent" });
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Getting Logs
  const loadLogs = async () => {
    const userToken = localStorage.getItem("user");
    try {
      axios.defaults.headers.common["Authorization"] = `Bearer ${userToken}`;
      const res = await axios.get("/api/news-agent/get-news-logs");
      setLogs(res.data.logs || []);
    } catch (err) {
      console.error("Failed to fetch logs");
    }
  };

  // Delete logs
  const handleDelte = async (id) => {
    const userToken = localStorage.getItem("user");
    try {
      axios.defaults.headers.common["Authorization"] = `Bearer ${userToken}`;
      const { data } = await axios.delete(`/api/news-agent/delete-log/${id}`);
      if (data.success) {
        toast.success(data.message);
        loadLogs();
      } else {
        toast.error(data.message || "Failed to delete");
      }
    } catch (error) {
      console.log(error.message);
      toast.error("An error occurred while deleting log");
    }
  };
  useEffect(() => {
    loadLogs(); // Load logs on page load
  }, []);
  return (
    <>
    {loading&&<Loading/>}
    <div>
      <h2 className="text-2xl font-bold mb-4">🧠 News Agent</h2>
      <button
        onClick={runAgent}
        className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dull cursor-pointer transition"
      >
        {loading ? "Running..." : "Run News Agent"}
      </button>

      {data && (
        <div className="mt-4 p-4 bg-white shadow rounded">
          <h4 className="text-lg font-semibold mb-2">📰 Headlines:</h4>
          <ul className="list-disc ml-6 mb-4">
            {data.headlines?.map((h, i) => (
              <li key={i}>{h}</li>
            ))}
          </ul>

          <h4 className="text-lg font-semibold mb-2">🧠 Summary:</h4>
          <p>{data.summary}</p>
        </div>
      )}

      {/* 🧾 Logs Section */}
      {logs.length > 0 && (
        <div className="mt-10">
          <h3 className="text-xl font-bold mb-3">📜 Past Agent Runs</h3>
          <ul className="space-y-4">
            {logs.map((log, index) => (
              <li
                key={index}
                className="bg-white p-4 rounded shadow border-l-4 border-primary relative"
              >
                <div className="text-sm text-gray-500">
                  🕒 {new Date(log.timestamp).toLocaleString()}
                </div>
                <div className="mt-1 font-medium">{log.summary}</div>
                <img
                  className="absolute size-5 bottom-1 right-1 sm:size-6 sm:top-1 sm:right-1 sm:hover:top-2 cursor-pointer hover:size-7 sm:hover:bottom-2 transition-all"
                  onClick={() => handleDelte(log._id)}
                  src={assest.deleteIcon}
                  alt="delete"
                />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
    </>
  );
};

export default NewsAgent;
