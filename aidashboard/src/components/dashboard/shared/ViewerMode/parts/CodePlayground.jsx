import React, { useEffect, useRef, useState } from "react";
import { Editor } from "@monaco-editor/react";
import { useData } from "../../../../context/DataContext";
import * as Popover from "@radix-ui/react-popover";
import { RiSettingsLine } from "react-icons/ri";
import { PiEmptyBold } from "react-icons/pi";
import toast from "react-hot-toast";
import { FrameworksArray, monacoThemes } from "../../../../../constants";
import '../../../LoadSpace/editor.css';
import { emmetHTML, emmetCSS } from "emmet-monaco-es";
import { SiPrettier } from "react-icons/si";

function CodePlayground({ html, css, js, framework, setHtml, setCss, setJs, setFramework }) {
    const editorRef = useRef(null);
    const [activeTab, setActiveTab] = useState("HTML");
    const {
        Loading,
        isFullScreen,
        theme,
        HandleTheme,
        handleEditorValidation,
        isCodeOpen
    } = useData();

    const files = {
        "HTML": { name: "index.html", language: "html", value: html, title: "HTML" },
        "CSS": { name: "style.css", language: "css", value: css, title: "CSS" },
        "JS": { name: "script.js", language: "javascript", value: js, title: "JS" },
    };
    const file = files[activeTab];

    useEffect(() => {
        editorRef.current?.focus();
    }, [file.name]);

    const handleFrameworkChange = async (item) => {
        if (item.name === framework) return;

        try {
            setFramework(item.name);
            toast.success(`${item.name} has been applied to your WebSpace.`);
        } catch (error) {
            console.error("Error changing framework:", error);
            toast.error("Unable to change the CSS framework.");
        }
    };

    const editorOptions = {
        automaticLayout: false,
        fontSize: 18,
        fontLigatures: true,
        lineNumbers: "on",
        minimap: { enabled: true },
        wordWrap: "off",
        scrollBeyondLastLine: false,
        renderLineHighlight: "all",
        cursorBlinking: "smooth",
        autoClosingBrackets: "always",
        autoClosingQuotes: "always",
        folding: true,
        bracketPairColorization: { enabled: true },
        guides: {
            indentation: true,
            highlightActiveBracketPair: true,
        },
    };

    const FrameworkDropdown = () => {
        const webspaceElement = document.getElementById('sharedwebspace');
        return (
            <Popover.Root>
                <Popover.Trigger asChild>
                    <button className="transition-all cursor-pointer active:scale-95">
                        <RiSettingsLine className="text-xl text-black/80" />
                    </button>
                </Popover.Trigger>
                <Popover.Portal container={webspaceElement} >
                    <Popover.Content sideOffset={10} side="bottom" className="w-[200px]  rounded bg-white p-5 shadow-md z-50">
                        <div className="flex flex-col gap-2.5">
                            <div className="mb-2.5 text-[15px] font-medium">CSS Frameworks</div>
                            <div className="grid grid-cols-3 gap-3 place-items-center">
                                <button
                                    onClick={() => setFramework("css")}
                                    className={`bg-gray-100 p-2.5 rounded-md ${framework === "css" ? "border border-gray-400" : ""
                                        }`}
                                >
                                    <PiEmptyBold className="text-xl text-gray-500" />
                                </button>
                                {FrameworksArray.map((item, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleFrameworkChange(item)}
                                        className={`bg-gray-50 p-0.5 rounded-md ${item?.name === framework
                                            ? "border border-gray-400"
                                            : "grayscale"
                                            }`}
                                    >
                                        <img
                                            src={item?.logo || "https://via.placeholder.com/50"}
                                            alt={item?.name}
                                            className="w-10 rounded-md"
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>
                        <Popover.Arrow className="fill-gray-300 ms-8" />
                    </Popover.Content>
                </Popover.Portal>
            </Popover.Root>
        )
    };

    useEffect(() => {
        const resizeEditor = () => {
            if (editorRef.current) {
                editorRef.current.layout();
            }
        };

        window.addEventListener("resize", resizeEditor);

        return () => {
            window.removeEventListener("resize", resizeEditor);
        };
    }, []);

    useEffect(() => {
        const resizeEditor = () => {
            if (editorRef.current) {
                editorRef.current.layout();
            }
        };
        resizeEditor();
    }, [isFullScreen, isCodeOpen])

    const handleWebChange = (value) => {
        switch (file.language) {
            case "html":
                setHtml(value || "");
                break;
            case "css":
                setCss(value || "");
                break;
            case "javascript":
                setJs(value || "");
                break;
            default:
                break;
        }
    };


    const renderEditor = () => (
        <Editor
            onValidate={handleEditorValidation}
            language={file.language}
            value={file.value}
            onMount={(editor) => {
                emmetHTML(window.monaco);
                emmetCSS(window.monaco);
                editorRef.current = editor;
                editor.layout();
            }}
            loading={<Loading />}
            theme={theme}
            options={editorOptions}
            onChange={handleWebChange}
        />
    );

    return (
        <div
            className={`${isFullScreen ? 'h-[98vh]' : 'h-[82vh]'} bg-gray-100 border border-gray-100 rounded-md`}
        >
            <div className="flex items-center justify-between border-b h-[50px] bg-slate-50">
                <div className="flex">
                    {Object.keys(files).map((tab) => (
                        <button
                            key={tab}
                            className={`md:px-6 md:py-3 md:text-base text-sm px-3 py-3 font-normal hover:bg-gray-100 ${activeTab === tab
                                ? "text-black font-semibold border-b-2 border-black"
                                : "text-gray-500"
                                }`}
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab.split(".")[0].toUpperCase()}
                        </button>
                    ))}
                </div>
                <div className="flex items-center gap-3 px-3">
                    <select
                        className="p-1 bg-gray-50 w-[100px] md:w-[150px] rounded-md border border-gray-200"
                        onChange={HandleTheme}
                        value={theme}
                    >
                        <option value="vs-light">Light mode</option>
                        <option value="vs-dark">Dark mode</option>
                        {Object.entries(monacoThemes).map(([themeId, themeName]) => (
                            <option key={themeId} value={themeId}>
                                {themeName}
                            </option>
                        ))}
                    </select>
                    <button className="ms-3" onClick={() => {
                        editorRef.current.getAction('editor.action.formatDocument').run()
                    }} >
                        <SiPrettier />
                    </button>
                    {FrameworkDropdown()}
                </div>
            </div>

            <div style={{
                position: "relative",
                overflow: "hidden",
            }} className={`bg-gray-200 rounded-b-md ${isFullScreen ? 'h-[90vh]' : 'h-[100%]'} `}>{renderEditor()}</div>
        </div>
    );
}

export default CodePlayground;
