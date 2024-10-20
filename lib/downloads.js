import JSZip from "jszip"

export const downloadImages = async (imageUrls, genId) => {

    // Simulate processing time
    const simulateProcessing = async () => {
        const processingTime = Math.random() * 2000 + 1000; // Random time between 1-3 seconds
        await new Promise(resolve => setTimeout(resolve, processingTime));
    };

    await simulateProcessing();
    const zip = new JSZip();

    try {
        const fetchPromises = imageUrls.map(async (url, index) => {
            const response = await fetch(url);
            const blob = await response.blob();
            const fileName = `${index}.png`;
            zip.file(fileName, blob);
        });

        await Promise.all(fetchPromises);

        const content = await zip.generateAsync({ type: "blob" });

        const link = document.createElement("a");
        link.href = URL.createObjectURL(content);
        link.download = `${genId}.zip`;
        link.click();

        URL.revokeObjectURL(link.href);

        return { success: true, message: "Images downloaded successfully" };
    } catch (error) {
        return { success: false, message: "Error downloading images" };
    }
}