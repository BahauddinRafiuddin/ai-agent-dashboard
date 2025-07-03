import { useState, useEffect } from "react";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
import Loading from "../../components/Loading";
import { assest } from "../../assets/assests"; // Assuming assest.deleteIcon is here

const CreativeWritingAgent = () => {
  const { axios } = useAppContext();
  const [form, setForm] = useState({
    prompt: "",
    type: "other", // Default type, matches backend enum
  });
  const [loading, setLoading] = useState(false);
  const [logs, setLogs] = useState([]);

  // Available content types for the dropdown
  const contentTypes = [
    { value: "other", label: "General Creative" },
    { value: "short_story", label: "Short Story" },
    { value: "poem", label: "Poem" },
    { value: "outline", label: "Story Outline" },
    { value: "marketing_copy", label: "Marketing Copy" },
    { value: "brainstorm", label: "Brainstorm Ideas" },
  ];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Fetching Previous Creative Content Logs
  const fetchLogs = async () => {
    try {
      const token = localStorage.getItem("user");
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      // Assuming a GET endpoint for previous logs, similar to email agent
      const { data } = await axios.get("/api/creative-writing/getPreviousContent"); 
      if (data.success) {
        setLogs(data.creativeWritingLogs); // Adjust based on actual backend response field
      }
    } catch (error) {
      console.error("Failed to fetch previous creative content logs:", error);
      toast.error("Failed to fetch previous creative content.");
    }
  };

  // Generating Creative Content
  const handleGenerate = async (e) => {
    e.preventDefault();
    const { prompt, type } = form;
    if (!prompt) {
      return toast.error("Prompt is required to generate content.");
    }
    setLoading(true);

    try {
      const token = localStorage.getItem("user");
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const { data } = await axios.post("/api/creative-writing/generate", {
        prompt,
        type,
      });

      if (data.success) {
        toast.success("Content generated successfully!");
        fetchLogs(); // Refresh logs after successful generation
        setForm({ prompt: "", type: "other" }); // Reset form
      }
    } catch (error) {
      console.error("Content generation failed:", error);
      // Backend error message is more specific now
      toast.error(error.response?.data?.message || "Content generation failed.");
    } finally {
      setLoading(false);
    }
  };

  // Deleting Creative Content Log
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("user");
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      // Assuming a DELETE endpoint for logs, similar to email agent
      const { data } = await axios.delete(
        `/api/creative-writing/delete-content/${id}` 
      );
      if (data.success) {
        toast.success(data.message);
        fetchLogs(); // Refresh logs
      }
    } catch (error) {
      console.error("Delete failed:", error);
      toast.error("Failed to delete content.");
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  return (
    <>
      {loading && <Loading />}
      <div className="min-h-screen px-4 py-6 md:px-16 lg:px-24 xl:px-32">
        <h2 className="text-2xl font-semibold mb-4">✍️ Creative Writing Agent</h2>

        <form
          onSubmit={handleGenerate}
          className="bg-white p-6 rounded-lg shadow-md space-y-4 mb-6"
        >
          <textarea
            name="prompt"
            value={form.prompt}
            onChange={handleChange}
            placeholder="Enter your prompt for creative content (e.g., 'Write a short story about a lonely robot who finds a flower', 'Brainstorm ideas for a fantasy novel', 'Write a poem about the sea')."
            className="w-full border rounded-md px-4 py-2 h-32 resize-y" // Added h-32 and resize-y
            required
          ></textarea>
          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            className="w-full border rounded-md px-4 py-2 cursor-pointer"
          >
            {contentTypes.map((typeOption) => (
              <option key={typeOption.value} value={typeOption.value}>
                {typeOption.label}
              </option>
            ))}
          </select>

          <button
            type="submit"
            className="bg-primary text-white px-6 py-2 rounded hover:bg-primary-dull transition-all cursor-pointer"
            disabled={loading}
          >
            {loading ? "Generating..." : "Generate Content"}
          </button>
        </form>

        {logs.length === 0 ? (
          <p className="text-gray-500">No generated content yet.</p>
        ) : (
          <div className="space-y-4">
            {logs.map((log) => (
              <div
                key={log._id}
                className="bg-gray-100 p-5 rounded shadow relative overflow-hidden"
              >
                <div className="pr-10">
                  <p className="text-sm font-medium text-primary mb-1">
                    Prompt: {log.prompt}
                  </p>
                  <p className="text-sm text-gray-500 mb-2">
                    Type: {contentTypes.find(t => t.value === log.type)?.label || log.type}
                  </p>
                  <p className="text-gray-700 text-sm whitespace-pre-line mb-3">
                    {log.generatedContent} {/* Changed from generatedEmail */}
                  </p>

                  {/* Copy Button */}
                  <button
                    onClick={() => {
                      document.execCommand('copy', false, log.generatedContent); // Using execCommand for iFrame compatibility
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

export default CreativeWritingAgent;
