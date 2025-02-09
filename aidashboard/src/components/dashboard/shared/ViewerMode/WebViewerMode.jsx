import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useData } from '../../../context/DataContext';
import CodePlayground from './parts/CodePlayground';
import { IoMdBookmarks } from "react-icons/io";
import { GoArrowLeft } from "react-icons/go";
import Chat from './code/Chat';
import * as Popover from "@radix-ui/react-popover";
import * as Dialog from "@radix-ui/react-dialog";
import Preview from './parts/Preview';

function WebViewerMode() {
  const { id } = useParams();
  const { setExplanation, setHeading, explanation, heading, setConversation, isFullScreen, isCodeOpen, sharedwebSpace, reloadShared, setReloadShared } = useData();
  const [html, setHtml] = useState("");
  const [css, setCss] = useState("");
  const [js, setJs] = useState("");
  const [framework, setFramework] = useState("css");
  const [isAIOpen, setIsAIOpen] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    setConversation([]);
  }, []);

  const container = document.getElementById("sharedwebspace");

  useEffect(() => {
    const loadSpaceData = () => {
      try {
        const res = sharedwebSpace.find((item) => item.spaceid === id);
        if (!res?.isEditorMode) {
          console.log(res)
          setHtml(res.htmlCode);
          setCss(res.cssCode);
          setJs(res.jsCode);
          setFramework(res.frameworks);
          setExplanation(res?.explanation);
          setHeading(res?.heading);
          setData(res);
        }
        else {
          setReloadShared(!reloadShared);
          loadSpaceData();
          setData(null);
        }
      } catch (err) {
        console.log(err);
      }
    };

    loadSpaceData();
  }, [id, sharedwebSpace]);

  if (!data) {
    return <div className="flex items-center justify-center w-full h-screen">Loading or no space found...</div>;
  }

  return (
    <div id="sharedwebspace" className="w-full h-[90vh] px-4 pb-2 pt-2 bg-white flex md:gap-4">
      <div className={`${isCodeOpen ? "md:block hidden" : ""} md:w-1/2 w-full h-full space-y-4`}>
        <CodePlayground html={html} css={css} js={js} setHtml={setHtml} setCss={setCss} setJs={setJs} framework={framework} setFramework={setFramework} />
      </div>
      <div className={`${isCodeOpen ? "" : "md:block hidden"} md:w-1/2 w-full h-full`}>
        <Preview html={html} css={css} js={js} framework={framework} />
      </div>
      {!isFullScreen && <div className="fixed top-0 left-1/2 h-[50px] hidden md:flex gap-5 -translate-x-1/2">
        <button onClick={() => setIsAIOpen(true)} className="px-5 py-1 text-white transition-all bg-black rounded-b-lg shadow cursor-pointer  h-fit lg:active:pt-3">
          <p className="">Sara AI</p>
        </button>
      </div>}

      {isFullScreen && <div className="fixed top-0 right-[15%] h-[50px] hidden md:flex gap-5 -translate-x-[15%]">
        <button onClick={() => setIsAIOpen(true)} className="px-5 py-1 text-white transition-all bg-black rounded-b-lg shadow cursor-pointer  h-fit lg:active:pt-3">
          <p className="">Sara AI</p>
        </button>
      </div>}

      {!isFullScreen && <button onClick={() => setIsAIOpen(true)} className="fixed right-0 z-50 py-4 text-white transition-all bg-black shadow cursor-pointer md:hidden top-36 rounded-s-lg lg:active:pe-2">
        <p className="text-xs -rotate-90">Sara</p>
      </button>}

      <Dialog.Root open={isAIOpen} >
        <Dialog.Portal container={container}>
          <Dialog.Overlay onClick={() => { setIsAIOpen(!isAIOpen) }} className="bg-blackA6 z-[1000] data-[state=open]:left-0 left-[-50%] fixed inset-0" />
          <Dialog.Content className="z-[10000] h-screen data-[state=open]:animate-enterFromLeft data-[state=close]:animate-exitToLeft fixed top-0 left-0 w-full max-w-[600px] bg-white focus:outline-none">
            <div className="flex items-end justify-between p-4">
              <h1 className="text-2xl font-semibold text-black ms-2">Sara AI</h1>
              <div className="flex items-center gap-3">
                <button onClick={() => setIsAIOpen(!isAIOpen)} className="p-2 transition-all bg-gray-200 rounded-lg md:hidden active:scale-90">
                  <GoArrowLeft />
                </button>

                <Popover.Root>
                  <Popover.Trigger asChild>
                    <button title="chat data" className="p-2 transition-all bg-gray-200 rounded-lg active:scale-90">
                      <IoMdBookmarks />
                    </button>
                  </Popover.Trigger>
                  <Popover.Portal container={container}>
                    <Popover.Content
                      className="w-[300px] z-[100000] border rounded bg-white p-5 shadow-md mt-4 will-change-[transform,opacity] data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=top]:animate-slideDownAndFade"
                      side="left"
                      sideOffset={8}
                    >
                      <div className="flex flex-col gap-2.5">
                        <p className="mb-2.5 text-[15px] font-medium leading-[19px] text-mauve12">
                          Chat Memories
                        </p>

                        <h1 className="p-2 text-sm text-black bg-gray-200 rounded-md line-clamp-2 brightness-95">{heading}</h1>
                        <h1 className="p-2 text-sm text-black bg-gray-200 rounded-md line-clamp-3 brightness-95">{explanation.slice(0, 100)}...</h1>

                      </div>

                      <Popover.Arrow className="fill-gray-200 ms-4" />
                    </Popover.Content>
                  </Popover.Portal>
                </Popover.Root>
              </div>
            </div>
            <Chat />
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  )
}

export default WebViewerMode