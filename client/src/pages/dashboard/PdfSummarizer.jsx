import { useState, useEffect, useRef } from "react";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
import { assest } from "../../assets/assests";
import Loading from "../../components/Loading";

const PdfSummarizer = () => {
  const { axios } = useAppContext();
  const [file, setFile] = useState(null);
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const fetchLogs = async () => {
    const userToken = localStorage.getItem("user");
    try {
      axios.defaults.headers.common["Authorization"] = `Bearer ${userToken}`;
      const { data } = await axios.get("/api/pdf-agent/logs");
      if (data.success) setLogs(data.logs);
    } catch (error) {
      toast.error("Failed to fetch PDF summaries");
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return toast.error("Please select a PDF file");

    const userToken = localStorage.getItem("user");
    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);
    try {
      axios.defaults.headers.common["Authorization"] = `Bearer ${userToken}`;
      const { data } = await axios.post("/api/pdf-agent/summary", formData);
      if (data.success) {
        toast.success("PDF summarized successfully");
        fetchLogs();
        setFile(null);
        fileInputRef.current.value = null;
      }
    } catch (error) {
      toast.error("Failed to summarize PDF");
    } finally {
      setFile(null);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const userToken = localStorage.getItem("user");
    try {
      axios.defaults.headers.common["Authorization"] = `Bearer ${userToken}`;
      const { data } = await axios.delete(`/api/pdf-agent/logs/${id}`);
      if (data.success) {
        toast.success(data.message);
        fetchLogs();
      }
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  return (
    <>
      {loading && <Loading />}
      <div className="min-h-screen px-4 py-6 md:px-16 lg:px-24 xl:px-32">
        <h2 className="text-2xl font-semibold mb-4">📄 PDF Summarizer</h2>

        <form
          onSubmit={handleUpload}
          className="bg-white p-6 rounded-lg shadow-md flex flex-col sm:flex-row gap-4 mb-6"
        >
          <input
            type="file"
            ref={fileInputRef}
            accept="application/pdf"
            onChange={(e) => setFile(e.target.files[0])}
            className="flex-1 border rounded-md px-4 py-2"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-primary text-white px-6 py-2 rounded hover:bg-primary-dull transition-all cursor-pointer"
          >
            {loading ? "Summarizing..." : "Summarize PDF"}
          </button>
        </form>

        {logs.length === 0 ? (
          <p className="text-gray-500">No summaries yet.</p>
        ) : (
          <div className="space-y-4 ">
            {logs.map((log) => (
              <div
                key={log._id}
                className="bg-gray-100 p-5 rounded shadow relative overflow-hidden "
              >
                <div className="pr-10">
                  <p className="text-sm font-medium text-primary mb-1">
                    📎 {log.fileName}
                  </p>
                  <p className="text-gray-700 text-sm whitespace-pre-line">
                    {log.summary}
                  </p>
                </div>
                <img
                  src={assest.deleteIcon}
                  alt="delete"
                  onClick={() => handleDelete(log._id)}
                  className="absolute bottom-2 right-2 size-5 cursor-pointer hover:scale-125 transition-all"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default PdfSummarizer;
