import dotenv from "dotenv";
dotenv.config();

const summarizerAgent=async(headlines)=>{
    const prompt = `Summarize the following tech news headlines into 2-3 lines:\n\n${headlines
        .map((h, i) => `${i + 1}. ${h}`)
        .join("\n")}`;

    try {
        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
            },
            body: JSON.stringify({
                model: "llama3-70b-8192", // ✅ Valid Groq model
                messages: [{ role: "user", content: prompt }],
            }),
        });

        const data = await response.json();
        // console.log("📦 Full Groq Response:", JSON.stringify(data, null, 2));
        return data.choices[0].message.content.trim();
    } catch (error) {
        console.error("❌ Groq summarizer error:", error.message);
        return "Failed to summarize headlines.";
    }
}
export default summarizerAgent