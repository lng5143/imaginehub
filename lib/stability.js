export const generateStabilityImages = async (data) => {
    const stabilityKey = localStorage.getItem("stability_key");
    if (!stabilityKey) {
        throw new Error("No API key found");
    }

    
}