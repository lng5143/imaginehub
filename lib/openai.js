const DALLE_ENDPOINT = "https://api.openai.com/v1/images/generations";

export const generateDalleImages = async (data) => {

    const openaiKey = localStorage.getItem("openai_key");
    if (!openaiKey) {
        return { error: "No API key found" }
    }

    const response = await fetch(DALLE_ENDPOINT, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${openaiKey}`
        },
        body: JSON.stringify({
            // TODO: map data
        })
    })

    if (!response.ok) {
        return { error: "Failed to generate images" }
    }

    const resData = await response.json();
    if (resData.error) {
        return { error: resData.error }
    }

    return { success: true, data: resData?.data }
}