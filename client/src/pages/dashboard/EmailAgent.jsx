import { useState, useEffect } from "react";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
import Loading from "../../components/Loading";
import { assest } from "../../assets/assests";

const EmailAgent = () => {
  const { axios } = useAppContext();
  const [form, setForm] = useState({
    recipient: "",
    tone: "formal",
    purpose: "",
    keyPoints: "",
  });
  const [loading, setLoading] = useState(false);
  const [logs, setLogs] = useState([]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  //   Fetching Previous Email
  const fetchLogs = async () => {
    try {
      const token = localStorage.getItem("user");
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const { data } = await axios.get("/api/email-agent/getPreviousEmails");
      if (data.success) setLogs(data.emailLogs);
    } catch {
      toast.error("Failed to fetch previous emails");
    }
  };

  //   Generating Email
  const handleGenerate = async (e) => {
    e.preventDefault();
    const { recipient, tone, purpose, keyPoints } = form;
    if (!recipient || !purpose || !keyPoints)
      return toast.error("Recipient ,keyPoints and Purpose are required");
    setLoading(true);

    try {
      const token = localStorage.getItem("user");
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const { data } = await axios.post("/api/email-agent/generate-email", {
        recipient,
        tone,
        purpose,
        keyPoints: keyPoints.split(",").map((point) => point.trim()),
      });

      if (data.success) {
        toast.success("Email generated");
        fetchLogs();
        setForm({ recipient: "", tone: "formal", purpose: "", keyPoints: "" });
      }
    } catch {
      toast.error("Email generation failed");
    } finally {
      setLoading(false);
    }
  };

  //   Deleting Email
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("user");
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const { data } = await axios.delete(
        `/api/email-agent/delete-email/${id}`
      );
      if (data.success) {
        toast.success(data.message);
        fetchLogs();
      }
    } catch {
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
        <h2 className="text-2xl font-semibold mb-4">📧 Email Generator</h2>

        <form
          onSubmit={handleGenerate}
          className="bg-white p-6 rounded-lg shadow-md space-y-4 mb-6"
        >
          <input
            name="recipient"
            value={form.recipient}
            onChange={handleChange}
            placeholder="Recipient (e.g. HR Manager)"
            className="w-full border rounded-md px-4 py-2"
          />
          <input
            name="purpose"
            value={form.purpose}
            onChange={handleChange}
            placeholder="Purpose (e.g. job application)"
            className="w-full border rounded-md px-4 py-2"
            required
          />
          <select
            name="tone"
            value={form.tone}
            onChange={handleChange}
            className="w-full border rounded-md px-4 py-2 cursor-pointer"
          >
            <option value="formal">Formal</option>
            <option value="friendly">Friendly</option>
            <option value="casual">Casual</option>
            <option value="professional">Professional</option>
          </select>
          <textarea
            name="keyPoints"
            value={form.keyPoints}
            onChange={handleChange}
            placeholder="Key points (comma separated)"
            className="w-full border rounded-md px-4 py-2"
          ></textarea>

          <button
            type="submit"
            className="bg-primary text-white px-6 py-2 rounded hover:bg-primary-dull transition-all cursor-pointer"
            disabled={loading}
          >
            {loading ? "Generating..." : "Generate Email"}
          </button>
        </form>

        {logs.length === 0 ? (
          <p className="text-gray-500">No generated emails yet.</p>
        ) : (
          <div className="space-y-4">
            {logs.map((log) => (
              <div
                key={log._id}
                className="bg-gray-100 p-5 rounded shadow relative overflow-hidden"
              >
                <div className="pr-10">
                  <p className="text-sm font-medium text-primary mb-1">
                    To: {log.recipient || "Recipient"}
                  </p>
                  <p className="text-sm text-gray-500 mb-2">
                    Tone: {log.tone} | Purpose: {log.purpose}
                  </p>
                  <p className="text-gray-700 text-sm whitespace-pre-line mb-3">
                    {log.generatedEmail}
                  </p>

                  {/* ✅ Copy Button */}
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(log.generatedEmail);
                      toast.success("Copied to clipboard");
                    }}
                    className="text-md text-blue-600 hover:text-[15px] cursor-pointer transition-all"
                  >
                    📋 Copy to Clipboard
                  </button>
                </div>

                {/* Delete Icon */}
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

export default EmailAgent;
