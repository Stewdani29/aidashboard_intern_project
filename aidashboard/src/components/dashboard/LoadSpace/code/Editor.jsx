import React, { useEffect, useRef, useState } from "react";
import EditorJS from "@editorjs/editorjs";
import List from "@editorjs/list";
import Delimiter from "@editorjs/delimiter";
import Quote from "@editorjs/quote";
import Title from "title-editorjs";
import Alert from "editorjs-alert";
import MermaidTool from "editorjs-mermaid";
import EJLaTeX from "editorjs-latex";
import InlineCode from "@editorjs/inline-code";
import Marker from "@editorjs/marker";
import Underline from "@editorjs/underline";
import ChangeCase from "editorjs-change-case";
import TextVariantTune from "@editorjs/text-variant-tune";
import CodeTool from "@editorjs/code";
import IndentTune from "editorjs-indent-tune";
import Checklist from "@editorjs/checklist";
import { useData } from "../../../context/DataContext";
import toast from "react-hot-toast";

function Editor({ editorData, setCloudSync, Type }) {
    const editorRef = useRef(null);
    const { webspaceid, spaceid, UpdateExistingSpace, UpdateWebExistingSpace, setNotes, explanation } = useData();
    const [editorInstance, setEditorInstance] = useState(null);

    useEffect(() => {
        if (!editorRef.current || editorInstance) return;

        const defaultData = {
            blocks: [
                {
                    id: "M7gnw45_1k",
                    tunes: {
                        indentTune: { indentLevel: 0 },
                        textVariant: "",
                    },
                    type: "paragraph",
                    data: { text: explanation },
                },
            ],
            version: "2.30.7",
            time: Date.now(),
        };

        const initializeEditor = () => {
            try {
                const editor = new EditorJS({
                    holder: editorRef.current,
                    autofocus: true,
                    tools: {
                        title: { class: Title, shortcut: "alt+h", inlineToolbar: true },
                        delimiter: { class: Delimiter, shortcut: "alt+d" },
                        inlineCode: { class: InlineCode },
                        checklist: { class: Checklist, inlineToolbar: true },
                        code: { class: CodeTool, shortcut: "alt+c" },
                        list: {
                            class: List,
                            inlineToolbar: true,
                            shortcut: "alt+l",
                            config: { defaultStyle: "unordered" },
                        },
                        underline: { class: Underline, shortcut: "alt+u" },
                        marker: { class: Marker, shortcut: "alt+v" },
                        changeCase: {
                            class: ChangeCase,
                            config: { showLocaleOption: true, locale: "tr" },
                            shortcut: "alt+c",
                        },
                        textVariant: TextVariantTune,
                        indentTune: { class: IndentTune, inlineToolbar: true, shortcut: "alt+x" },
                        quote: {
                            class: Quote,
                            inlineToolbar: true,
                            shortcut: "alt+q",
                            config: {
                                quotePlaceholder: "Enter a quote",
                                captionPlaceholder: "Quote's author",
                            },
                        },
                        mermaid: { class: MermaidTool, shortcut: "alt+g" },
                        alert: { class: Alert, shortcut: "alt+a" },
                        math: { class: EJLaTeX, shortcut: "alt+m" },
                    },
                    data: Object.keys(editorData).length ? editorData : defaultData,
                    onChange: async () => {
                        try {
                            setCloudSync(true);
                            const savedData = await editor.save();
                            const updatedSpace = {
                                spaceid: Type === "web" ? webspaceid : spaceid,
                                updatedAt: new Date(),
                                notes: savedData,
                            };

                            const response = await (Type === "web" ? UpdateWebExistingSpace(updatedSpace) : UpdateExistingSpace(updatedSpace));

                            if (!response) throw new Error("Failed to upload to Cloud");

                            setNotes(savedData);
                            setCloudSync(false);
                        } catch (error) {
                            console.error("Error saving content:", error);
                            toast.error("Failed to save content");
                        }
                    },
                    onReady: () => MermaidTool.config({ theme: "neutral" }),
                    placeholder: "Let’s write an awesome story!",
                    tunes: ["textVariant", "indentTune"],
                });

                setEditorInstance(editor);
            } catch (error) {
                console.error("Failed to initialize Editor:", error);
                toast.error("Failed to initialize Editor");
            }
        };

        initializeEditor();

        return () => {
            editorInstance?.destroy?.();
        };
    }, [editorInstance, editorData, explanation, setCloudSync, Type, webspaceid, spaceid, UpdateExistingSpace, setNotes]);

    return (
        <div
            ref={editorRef}
            id="editorjs"
            className="w-full h-full bg-slate-100 relative text-main placeholder:text-main overflow-y-auto px-4 py-3"
        ></div>
    );
}

export default Editor;
