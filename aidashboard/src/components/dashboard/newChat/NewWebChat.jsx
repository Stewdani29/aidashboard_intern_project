import React from 'react';
import { BsStars } from "react-icons/bs";
import { FaGear } from "react-icons/fa6";
import { useData } from '../../context/DataContext';
import { Toaster } from 'react-hot-toast';

function WebNewChat() {
    const { webprompt, setWebPrompt, isWebLoading, handleNewWebSubmission } = useData();

    return (
        <div className='px-3' >
            <textarea
                className={`w-full ${isWebLoading ? "opacity-50" : ""} h-[80vh] px-4 py-2  border border-sky-700 rounded-lg resize-none focus:ring focus:ring-sky-400`}
                placeholder={
                    "Briefly describe your UI needs or component name.\n\n" +
                    "- What specific issue are you facing?\n" +
                    "- Include any key details or context.\n\n" +
                    "Example:\n" +
                    "Create a Caluculator with Tailwindcss"
                }
                autoFocus={true}
                value={webprompt}
                disabled={isWebLoading}
                onChange={(e) => setWebPrompt(e.target.value)}
            />
            <div className="flex gap-3 mt-2 max-h-[10vh] items-center">
                <button
                    onClick={handleNewWebSubmission}
                    className="w-full py-3 active:scale-[99%] transition-all flex items-center justify-center gap-2 bg-sky-500 text-white font-semibold rounded-lg hover:bg-sky-700"
                    disabled={isWebLoading}
                >
                    <BsStars /> Generate Your WebSpace
                </button>
                {isWebLoading && <FaGear className="text-3xl animate-spin text-sky-500" />}
            </div>
            <Toaster />
        </div>
    )
}

export default WebNewChat