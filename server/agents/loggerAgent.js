import fs from "fs";
import path from "path";

const logFilePath = path.join(process.cwd(), "logs", "news_logs.json");

export default function loggerAgent(data) {
  try {
    // Ensure directory exists
    if (!fs.existsSync(path.dirname(logFilePath))) {
      fs.mkdirSync(path.dirname(logFilePath), { recursive: true });
    }

    const logs = fs.existsSync(logFilePath)
      ? JSON.parse(fs.readFileSync(logFilePath, "utf8"))
      : [];

    const logEntry = {
      timestamp: new Date().toISOString(),
      headlines: data.headlines,
      summary: data.summary,
    };

    logs.unshift(logEntry); // Add new entry to the top
    fs.writeFileSync(logFilePath, JSON.stringify(logs, null, 2), "utf8");
  } catch (error) {
    console.error("❌ Error writing log:", error.message);
  }
}
