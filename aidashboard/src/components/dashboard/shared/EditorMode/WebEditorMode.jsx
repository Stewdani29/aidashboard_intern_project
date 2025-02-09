import React, { useEffect, useRef, useState } from 'react'
import { Toaster } from 'react-hot-toast'
import ChatInput from './parts/ChatInput'
import CodePlayground from './parts/CodePlayground'
import Preview from './parts/Preview'
import { Link, useParams } from 'react-router-dom'
import { useData } from '../../../context/DataContext'
import { useUserAuth } from '../../../context/UserAuthContext'
import * as Popover from "@radix-ui/react-popover";
import * as Dialog from "@radix-ui/react-dialog";
import "./load.css";
import Editor from "./code/Editor";
import Chat from "./code/Chat";
import { IoMdBookmarks, IoMdCloudDone } from "react-icons/io";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import { IoCloudOfflineSharp } from "react-icons/io5";

function LoadWebSpace() {
  const { id } = useParams();
  const { user } = useUserAuth();
  const {
    setHeading,
    setExplanation,
    setFramework,
    setLastInput,
    sharedwebSpace,
    setInput,
    setWebSpaceid,
    setType,
    setNotes,
    notes,
    input,
    isLoading,
    htmlCode,
    cssCode,
    jsCode,
    framework,
    setHtmlCode,
    setCssCode,
    setJsCode,
    setCodeShared,
    setReloadShared,
    reloadShared,
    isFullScreen,
    setConversation,
    heading,
    explanation,
    isCodeOpen
  } = useData();
  const [cloudSync, setCloudSync] = useState(false);
  const [data, setData] = useState(null);
  const [isAIOpen, setIsAIOpen] = useState(false);
  const [isNotesOpen, setIsNotesOpen] = useState(false);
  const [time, setTime] = useState({ minutes: 0, seconds: 0 });
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    setConversation([]);
  }, []);

  const container = document.getElementById("sharedwebspace");

  useEffect(() => {
    const loadSpaceData = () => {
      try {
        const res = sharedwebSpace.find((item) => item.spaceid === id);
        if (res?.isEditorMode) {
          setHeading(res?.heading);
          setWebSpaceid(res?.spaceid);
          setInput(res?.input);
          setLastInput(res?.lastinput);
          setExplanation(res?.explanation);
          setType(res?.type);
          setNotes(res?.notes);
          setFramework(res?.frameworks);
          setHtmlCode(res?.htmlCode);
          setCssCode(res?.cssCode);
          setJsCode(res?.jsCode);
          setCodeShared(res?.shared);
          setData(res || null);
        } else {
          setReloadShared(!reloadShared);
          loadSpaceData();
          setData(null);
        }
      }
      catch (err) {
        console.log(err)
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
        /*<CodePlayground htmlCode={htmlCode} cssCode={cssCode} jsCode={jsCode} framework={framework} />*/
        <ChatInput input={input} setInput={setInput} handleWebChatSubmission={() => { }} isLoading={isLoading} />
      </div>
      <div className={`${isCodeOpen ? "" : "md:block hidden"} md:w-1/2 w-full h-full`}>
        <Preview setTime={setTime} intervalRef={intervalRef} setIsRunning={setIsRunning} isRunning={isRunning} htmlCode={htmlCode} cssCode={cssCode} jsCode={jsCode} framework={framework} />
      </div>

      {isFullScreen && <h1 className="fixed px-4 py-1 text-xl font-bold text-white -translate-x-1/2 bg-black rounded-lg bg-opacity-70 top-5 left-1/2">
        {String(time.minutes).padStart(2, '0')}:
        {String(time.seconds).padStart(2, '0')}
      </h1>}

      {isFullScreen && <button onClick={() => setIsAIOpen(true)} className="fixed right-0 z-50 py-5 text-white transition-all bg-black shadow cursor-pointer md:hidden top-24 rounded-s-lg lg:active:pe-3">
        <p className="-rotate-90">Sara</p>
      </button>}

      {isFullScreen && <button onClick={() => setIsNotesOpen(true)} className="fixed right-0 z-50 py-5 text-white transition-all bg-black shadow cursor-pointer md:block top-48 rounded-s-lg lg:active:pe-3">
        <p className="-rotate-90">Notes</p>
      </button>}

      {isFullScreen && <div className="fixed top-0 right-[15%] h-[50px] hidden md:flex gap-5 -translate-x-[15%]">
        <button onClick={() => setIsAIOpen(true)} className="px-5 py-1 text-white transition-all bg-black rounded-b-lg shadow cursor-pointer h-fit lg:active:pt-3">
          <p className="">Sara AI</p>
        </button>

        <button onClick={() => setIsNotesOpen(true)} className="px-5 py-1 text-white transition-all bg-black rounded-b-lg shadow cursor-pointer h-fit lg:active:pt-3">
          <p className="">Notes</p>
        </button>
      </div>}

      {!isFullScreen && <div className="fixed top-0 left-1/2 h-[50px] hidden md:flex gap-5 -translate-x-1/2">
        <button onClick={() => setIsAIOpen(true)} className="px-5 py-1 text-white transition-all bg-black rounded-b-lg shadow cursor-pointer h-fit lg:active:pt-3">
          <p className="">Sara AI</p>
        </button>

        <button onClick={() => setIsNotesOpen(true)} className="px-5 py-1 text-white transition-all bg-black rounded-b-lg shadow cursor-pointer h-fit lg:active:pt-3">
          <p className="">Notes</p>
        </button>
      </div>}

      {!isFullScreen && <button onClick={() => setIsAIOpen(true)} className="fixed right-0 z-50 py-4 text-white transition-all bg-black shadow cursor-pointer md:hidden top-36 rounded-s-lg lg:active:pe-2">
        <p className="text-xs -rotate-90">Sara</p>
      </button>}

      {!isFullScreen && <button onClick={() => setIsNotesOpen(true)} className="fixed left-0 z-50 py-4 text-white transition-all bg-black shadow cursor-pointer md:hidden top-36 rounded-e-lg lg:active:ps-2">
        <p className="text-xs rotate-90">Notes</p>
      </button>}

      <Dialog.Root open={isAIOpen} >
        <Dialog.Portal container={container}>
          <Dialog.Overlay onClick={() => { setIsAIOpen(!isAIOpen) }} className="bg-blackA6 z-[1000] data-[state=open]:left-0 left-[-50%] fixed inset-0" />
          <Dialog.Content className="z-[10000] h-screen data-[state=open]:animate-enterFromLeft data-[state=close]:animate-exitToLeft fixed top-0 left-0 w-full max-w-[600px] bg-white focus:outline-none">
            <div className="flex items-end justify-between p-4">
              <Link to="https://aiSara.vercel.app/v1" className="text-2xl font-semibold text-black ms-2">Sara AI</Link>
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

      <Dialog.Root open={isNotesOpen} >
        <Dialog.Portal container={container}>
          <Dialog.Overlay onClick={() => { setIsNotesOpen(!isNotesOpen) }} className="bg-blackA6 z-[1000] data-[state=open]:right-0 right-[-50%] fixed inset-0" />
          <Dialog.Content className="z-[10000] h-screen data-[state=open]:animate-enterFromRight fixed top-0 right-0 w-full max-w-[600px] bg-white focus:outline-none">
            <div className="flex items-end justify-between p-4">
              <h1 className="text-2xl font-semibold text-black">Space Notes</h1>
              <div className="flex items-center gap-3">
                <button className=" p-1.5 bg-gray-100 rounded-lg active:scale-90 transition-all">
                  {cloudSync ? <IoCloudOfflineSharp title="data not synced with cloud" className="text-xl text-yellow-600 md:text-2xl" /> : <IoMdCloudDone title="data synced with cloud" className="text-xl text-green-600 md:text-2xl" />}
                </button>
                <button onClick={() => setIsNotesOpen(!isNotesOpen)} className="p-2 transition-all bg-gray-200 rounded-lg md:hidden active:scale-90">
                  <GoArrowRight />
                </button>
              </div>
            </div>
            <Editor editorData={notes} setCloudSync={setCloudSync} Type={"web"} />
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  )
}

export default LoadWebSpace