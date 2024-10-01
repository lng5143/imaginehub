export const generateDalleImages = async (data) => {
    const openaiKey = localStorage.getItem("openai_key");
    if (!openaiKey) {
        throw new Error("No API key found");
    }

}