import axios from "axios";
import xml2js from "xml2js";


// Function That Fetch 5 Headlines From Techcrunch Website
export default async function newsScraperAgent() {
  const url = "https://techcrunch.com/feed/";

  try {
    const { data } = await axios.get(url);
    const parser = new xml2js.Parser();
    const result = await parser.parseStringPromise(data);

    const items = result.rss.channel[0].item;
    const headlines = items.slice(0, 5).map((item) => item.title[0]);

    return headlines;
  } catch (error) {
    console.log("❌ Error fetching or parsing RSS feed:", error.message);
    return ["Error fetching news"];
  }
}
