
const generateCreativeContent = async (userPrompt, contentType = 'other') => {
    if (!userPrompt || userPrompt.trim().length === 0) {
        throw new Error("User prompt cannot be empty for creative content generation.");
    }

    const groqApiKey = process.env.GROQ_API_KEY;
    if (!groqApiKey) {
        throw new Error("GROQ_API_KEY is not set in environment variables.");
    }

    let systemInstruction = "";
    // Customize the system instruction based on the content type for better results
    switch (contentType) {
        case 'short_story':
            systemInstruction = "You are a creative storyteller. Write a compelling and engaging short story based on the user's prompt. Focus on plot, character, and setting. Aim for a narrative structure.";
            break;
        case 'poem':
            systemInstruction = "You are a poetic AI. Write a poem based on the user's prompt. Consider rhyme, rhythm, and imagery.";
            break;
        case 'outline':
            systemInstruction = "You are a story architect. Create a detailed outline for a story based on the user's prompt. Include main characters, setting, key plot points (beginning, rising action, climax, falling action, resolution), and themes.";
            break;
        case 'marketing_copy':
            systemInstruction = "You are a persuasive copywriter. Generate concise and engaging marketing copy (e.g., ad text, social media post, product description) based on the user's prompt. Focus on benefits and call to action.";
            break;
        case 'brainstorm':
            systemInstruction = "You are a creative brainstorming assistant. Generate a list of diverse ideas related to the user's prompt. Be imaginative and provide multiple angles.";
            break;
        default:
            systemInstruction = "You are a versatile creative writing assistant. Generate creative text based on the user's prompt.";
            break;
    }

    try {
        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${groqApiKey}`,
            },
            body: JSON.stringify({
                model: "llama3-70b-8192", // You can choose other Groq models if preferred
                messages: [
                    { role: "system", content: systemInstruction },
                    { role: "user", content: userPrompt }
                ],
                temperature: 0.7, // Adjust for creativity (higher = more creative, lower = more focused)
                max_tokens: 1000, // Adjust based on desired output length
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Groq API error: ${response.status} - ${errorData.error?.message || response.statusText}`);
        }

        const data = await response.json();
        const generatedContent = data.choices[0]?.message?.content?.trim();

        if (!generatedContent || generatedContent.length === 0) {
            throw new Error("LLM returned empty or invalid creative content.");
        }

        return generatedContent;

    } catch (error) {
        console.error("❌ Groq creative content generation error:", error.message);
        throw new Error("Failed to generate creative content: " + error.message);
    }
};

export default generateCreativeContent;
