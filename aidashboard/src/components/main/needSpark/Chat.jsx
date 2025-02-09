import React, { useEffect, useRef, useState } from 'react';
import { useData } from '../../context/DataContext';
import toast from "react-hot-toast";
import { TbShare } from "react-icons/tb";
import { IoArrowUpCircle, IoCopyOutline } from "react-icons/io5";
import { FaGear } from "react-icons/fa6";
import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
} from "@google/generative-ai";
import showdown from "showdown";
import { ParseAIDate } from '../../../common/methods';
import { useUserAuth } from '../../context/UserAuthContext';
import './chat.css';
import { API_KEY } from '../../../common/links';

function Creator() {
    const { conversation, setConversation } = useData();
    const heading = "";
    const explanation = "";
    const { user } = useUserAuth();
    const [prompt, setPrompt] = useState("");
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);
    const converter = new showdown.Converter();
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash-latest",
        systemInstruction: `Your name is Sara AI, Analyze the code snippets or programming-related content given. 
    Provide a detailed explanation of each segment, including its purpose, functionality, and potential areas for optimization.
    If relevant, recommend additional resources to clarify complex concepts or illustrate best practices. 
    Summarize any errors or inefficiencies and suggest solutions.
    heading of the code snippet: "${heading}",
    explanation of the code snippet: "${explanation}",
    `,
    });
    const generationConfig = {
        temperature: 1,
        topP: 0.95,
        topK: 64,
        maxOutputTokens: 8192,
        responseMimeType: "text/plain",
    };
    const safetySettings = [
        { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_NONE },
        { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_NONE },
        { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_NONE },
        { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_NONE },
    ];

    useEffect(() => {
        scrollToBottom();
    }, [conversation]);


    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const handleChatSubmission = async (message) => {
        setLoading(true);
        try {
            const history = conversation.map(item => [
                { role: "user", parts: [{ text: item.user }] },
                { role: "model", parts: [{ text: item.bot }] },
            ]).flat();

            const chatSession = model.startChat({ generationConfig, safetySettings, history });
            const result = await chatSession.sendMessage(message);
            const response = await result.response;

            if (response.status === "blocked") {
                toast.error("Unable to process request due to potentially harmful content!", {
                    position: "top-center",
                    icon: "❌",
                });
                throw new Error("Response blocked due to potentially harmful content");
            }

            const text = await response.text();
            const newMessage = { user: message, bot: text, timestamp: new Date() };
            setConversation(prev => [...prev, newMessage]);
            setPrompt("");
        } catch (error) {
            console.error(error);
            toast.error("Unable to process your request!", {
                position: "top-center",
                icon: "❌",
            });
        } finally {
            setLoading(false);
        }
    };

    const handleCopyResponse = (response) => {
        navigator.clipboard.writeText(response);
        toast.success("Response copied to clipboard!", {
            position: "top-center",
            icon: "✅",
        });
    };

    const handleShareResponse = (response) => {
        if (navigator.share) {
            navigator.share({
                text: `*${user.displayName} Shared a Response From Sara AI* \n\n${response}`,
            }).catch(err => console.error(err));
        } else {
            toast.error("Sharing not supported on this device!", {
                position: "top-center",
                icon: "❌",
            });
        }
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (!prompt.trim()) {
            toast.error("Please enter a prompt!", {
                position: "top-center",
                icon: "✏️",
            });
            return;
        }

        if (conversation.length > 3) {
            toast.error("Can't exceed 3 chats Trial Purpose.", {
                position: "top-center",
                icon: "✏️",
            });
            return;
        }
        handleChatSubmission(prompt);
    };

    return (
        <div className='flex w-full h-full gap-3 p-5' >
            <div className="w-full h-full bg-white rounded-md text-main">
                <div className={`w-full ${conversation.length == 0 ? 'flex flex-col items-center justify-center' : ''} h-[87%] px-3 pt-2 Sara-cont overflow-y-auto`}>
                    {conversation.length === 0 ? (
                        <div className="flex flex-col items-center justify-center gap-5">
                            <img src="https://ik.imagekit.io/vituepzjm/Scribby/QA_hero-rev.webp?updatedAt=1725384607039" alt="Logo" className="h-48" />
                            <p className="text-xl font-bold text-center text-main">
                                {user && `Hello ${user?.displayName?.length > 20
                                    ? `${user.displayName.slice(0, 20)}..`
                                    : user.displayName}`} <br /> I'm Sara AI, <br /> How can I help you today?
                            </p>
                        </div>
                    ) : (
                        conversation.map((msg, index) => (
                            <div key={index} className={` text-main Sara space-y-3`}>
                                {msg.user ? (
                                    <div className="p-3 bg-main/10 md:p-4 rounded-xl md:rounded-ss-2xl md:rounded-ee-2xl md:rounded-es-2xl md:rounded-se-none md:ms-5">
                                        <div className="flex items-center justify-between pb-3">
                                            <span className="inline-flex items-center justify-center gap-2">
                                                {user && <img
                                                    src={user?.photoURL}
                                                    alt="Sara"
                                                    className="w-6 h-6 rounded-md bg-main"
                                                />}
                                                <h1 className="block text-base font-semibold line-clamp-1 text-main">{user ? user?.displayName : 'Guest User'}</h1>

                                            </span>
                                            {msg.timestamp && (
                                                <h2 className="text-[10px] px-[6px] py-[6px] bg-main text-white rounded-lg w-fit leading-none">
                                                    {ParseAIDate(msg.timestamp)}
                                                </h2>
                                            )}
                                        </div>
                                        <div
                                            className="message-content"
                                            dangerouslySetInnerHTML={{
                                                __html: converter.makeHtml(msg.user),
                                            }}
                                        />
                                    </div>
                                ) : null}
                                <div className="p-3 bg-main/10 md:p-4 rounded-xl md:rounded-ss-none md:rounded-ee-2xl md:rounded-es-2xl md:rounded-se-2xl md:me-5">
                                    <div className="message-container">
                                        <div className="flex items-center justify-between pb-3">
                                            <span className="inline-flex items-center justify-center gap-2">
                                                <img
                                                    src="https://ik.imagekit.io/vituepzjm/Sara.png"
                                                    alt="Sara"
                                                    className="w-6 h-6 p-1 rounded-md bg-main"
                                                />
                                                <h1 className="block text-base font-semibold text-main">Sara AI</h1>
                                            </span>
                                            <div className="flex items-center justify-end gap-3 message-actions">
                                                <button
                                                    onClick={() => handleCopyResponse(msg.bot)}
                                                    className="action-button copy-button"
                                                >
                                                    <IoCopyOutline className='text-main' />
                                                </button>
                                                <button
                                                    onClick={() => handleShareResponse(msg.bot)}
                                                    className="action-button share-button"
                                                >
                                                    <TbShare className='text-main' />
                                                </button>
                                            </div>
                                        </div>
                                        <div
                                            className="message-content"
                                            dangerouslySetInnerHTML={{
                                                __html: converter.makeHtml(msg.bot),
                                            }}
                                        />
                                    </div>
                                </div>
                                <div
                                    ref={index === conversation.length - 1 ? messagesEndRef : null}
                                ></div>
                            </div>
                        ))
                    )}
                </div>
                <form
                    onSubmit={handleFormSubmit}
                    className="flex items-center justify-between w-full p-2 space-x-2 bg-white border-2 border-dashed rounded-xl border-main"
                >
                    <input
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="Tell me about your issues..."
                        className="w-full p-2 text-black bg-transparent rounded-sm placeholder:text-black hover:outline-none focus:outline-none hover:ring-0"
                    />
                    <button
                        type="submit"
                        className="p-1 text-4xl font-bold rounded-full focus:outline-none"
                        title="send"
                        disabled={loading}
                    >
                        {loading ? (
                            <FaGear className="animate-spin p-[0.5rem] text-black" />
                        ) : (
                            < IoArrowUpCircle
                                className={` ${prompt.length < 1 ? "text-black" : "text-black rotate-90"
                                    } transition-all duration-100 ease-linear`}
                            />
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Creator;
