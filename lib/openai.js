const DALLE_ENDPOINT = "https://api.openai.com/v1/images/generations";

export const generateDalleImages = async (data) => {
    const openaiKey = localStorage.getItem("ib_openai_api_key");
    if (!openaiKey) {
        return { success: false, message: "No OpenAI API key found. Please enter your API key in settings." }
    }

    let modelName;
    switch(data.model) {
        case "de-2":
            modelName = "dall-e-2";
            break;
        case "de-3":
            modelName = "dall-e-3";
            break;
    }

    const response = await fetch(DALLE_ENDPOINT, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${openaiKey}`
        },
        body: JSON.stringify({
            model: modelName,
            prompt: data?.prompt,
            n: data?.samples,
            size: data?.de_size,
            quality: data?.de_quality
        })
    })

    if (!response.ok) {
        return { success: false, message: "Failed to generate images" }
    }

    const resData = await response.json();
    if (resData.error) {
        return { success: false, message: "Failed to generate images" }
    }

    return { success: true, data: resData?.data }
}