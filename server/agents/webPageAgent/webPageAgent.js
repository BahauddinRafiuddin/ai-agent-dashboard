import axios from "axios";
import * as cheerio from "cheerio";
import webPageSummarizerAgent from "./webPageSummarizerAgent.js";

const webPageAgent = async (url) => {
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    const paragraphs = $("p")
      .map((i, el) => $(el).text())
      .get()
      .join(" ")
      .slice(0, 3000); // Limit to avoid token overflow

    if (!paragraphs || paragraphs.length < 100) {
      throw new Error("Page has insufficient content to summarize.");
    }

    const summary = await webPageSummarizerAgent(paragraphs);
    return summary;

  } catch (error) {
    if (error.response && error.response.status === 403) {
      console.error("❌ Access denied (403): This site blocks scraping.");
      throw new Error("Access denied: This website blocks scraping. Try another URL.");
    }

    console.error("❌ Error in WebPageAgent:", error.message);
    throw new Error("Failed to summarize web page");
  }
};

export default webPageAgent;
