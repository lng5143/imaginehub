export default function ModelsSetting() {
    return (
        <div>
            <h2 className="text-lg font-medium mb-4">Models Settings</h2>
            <div className="space-y-4">
                <div>
                    <label htmlFor="openai-api-key" className="block font-medium mb-2">OpenAI API Key</label>
                    <input type="text" id="openai-api-key" className="border border-gray-300 rounded-md px-3 py-2 w-full" />
                    <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md mt-2">Save</button>
                </div>
                <div>
                    <label htmlFor="stability-api-key" className="block font-medium mb-2">Stability AI API Key</label>
                    <input type="text" id="stability-api-key" className="border border-gray-300 rounded-md px-3 py-2 w-full" />
                    <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md mt-2">Save</button>
                </div>
            </div>
        </div>
    )
}