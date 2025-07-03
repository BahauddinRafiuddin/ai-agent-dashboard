const pdfSummarizerAgent = async (text) => {
    const prompt = `Summarize the following PDF content in 3-5 bullet points:\n\n${text}`

    try {
        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
            },
            body: JSON.stringify({
                model: "llama3-70b-8192",
                messages: [{ role: "user", content: prompt }],
            })
        })
        const data =await response.json()
        return data.choices[0].message.content.trim();
    } catch (error) {
        console.error("❌ Groq summarizer[PDF Summary] error:", error.message);
        return "Summary failed due to model error.";
    }
}

export default pdfSummarizerAgent;