import React from 'react';
import { BsStars } from "react-icons/bs";
import { FaGear } from "react-icons/fa6";
import { useData } from '../../context/DataContext';
import { Toaster } from 'react-hot-toast';

function NewChat() {
    const { prompt, setPrompt, isLoading, handleNewSubmission } = useData();

    return (
        <div className='px-3' >
            <textarea
                className={`w-full ${isLoading ? "opacity-50" : ""} h-[80vh] px-4 py-2  border border-sky-700 rounded-lg resize-none focus:ring focus:ring-sky-400`}
                placeholder={
                    "Briefly describe your problem statement or problem name.\n\n" +
                    "- What specific issue are you facing?\n" +
                    "- Include any key details or context.\n\n" +
                    "Example:\n" +
                    "Explain about the palindrome in java."
                }
                autoFocus={true}
                value={prompt}
                disabled={isLoading}
                onChange={(e) => setPrompt(e.target.value)}
            />
            <div className="flex gap-3 mt-2 max-h-[10vh] items-center">
                <button
                    onClick={handleNewSubmission}
                    className="w-full py-3 active:scale-[99%] transition-all flex items-center justify-center gap-2 bg-sky-600 text-white font-semibold rounded-lg hover:bg-sky-500"
                    disabled={isLoading}
                >
                    <BsStars /> Generate Your CodeSpace
                </button>
                {isLoading && <FaGear className="text-3xl animate-spin text-sky-600" />}
            </div>
            <Toaster />
        </div>
    )
}

export default NewChat