const emailGenerater = async ( recipient, tone, purpose, keyPoints ) => {
    const prompt = `Write a ${tone} email to ${recipient}. Purpose: ${purpose}. Include: ${keyPoints.join(", ")}`
    try {
        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: "llama3-70b-8192",
                messages: [{ role: "user", content: prompt }],
            })
        })
        const data = await response.json()
        return data.choices[0].message.content.trim();
    } catch (error) {
        console.error("❌ Groq Email Generate error:", error.message);
        return "Email Generation failed due to model error.";
    }
}

export default emailGenerater;