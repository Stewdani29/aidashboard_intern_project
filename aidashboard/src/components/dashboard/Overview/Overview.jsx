import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { useUserAuth } from '../../context/UserAuthContext';
import Charts from './Charts';
import { HiMiniXMark, HiOutlineGlobeAlt } from "react-icons/hi2";
import { PiTerminalWindowFill } from 'react-icons/pi';
import * as Dialog from "@radix-ui/react-dialog";
import { Link } from 'react-router-dom';
import { LANGUAGE_VERSIONS } from '../../../constants';

function Overview() {
  const { user } = useUserAuth();
  const { profile, isWebTemplateOpen, setIsWebTemplateOpen, isTemplateOpen, setIsTemplateOpen, handleWebTemplateAdd, isLoading, handleCodeTemplateAdd, webspacestemplates, spacestemplates, spaces, webspaces, webTrashes, codeTrashes } = useData();
  const [isClosed, setisClosed] = useState(false);
  const [currentWeb, setcurrentWeb] = useState({});
  const [currentCode, setcurrentCode] = useState({});

  const filteredTemplates = profile ? spacestemplates.filter(item => profile?.lang.includes(item?.language)) : spacestemplates;
  const numTemplatesNeeded = Math.max(6, filteredTemplates.length);
  const finalTemplates = filteredTemplates.concat(
    spacestemplates.filter(item => !filteredTemplates.includes(item))
      .slice(0, numTemplatesNeeded - filteredTemplates.length)
  ).slice(0,6);

  const filteredWebTemplates = profile ? webspacestemplates.filter(item => profile?.web.includes(item?.frameworks)) : webspacestemplates;
  const numWebTemplatesNeeded = Math.max(6, filteredWebTemplates.length);
  const finalWebTemplates = filteredWebTemplates.concat(
    webspacestemplates.filter(item => !filteredWebTemplates.includes(item))
      .slice(0, numWebTemplatesNeeded - filteredWebTemplates.length)
  ).slice(0,6);

  return (
    <div className="py-5 px-3 bg-white min-h-[90vh] w-full">
      <div className={`grid grid-cols-2 lg:grid-cols-4 ${isClosed ? 'xl:grid-cols-4' : 'xl:grid-cols-5'} lg:grid-rows-5 gap-3`}>
        <div className="col-span-2 lg:col-span-4 row-span-3 py-3 bg-white rounded-lg flex flex-col-reverse md:flex-row items-center justify-center md:gap-5 md:justify-evenly bg-[url('https://dashboard.algolia.com/client-assets/c1c9361fe75370d1b156733e962f7214/514f2ec3798090c6df00dad1592c8166.svg')]">
          <span className="flex flex-col items-start justify-center p-2">
            <h1 className="hidden mb-4 text-2xl font-medium lg:text-4xl md:flex md:text-3xl ms-4 title-font text-start text-sky-400">
              Hello, <br className="flex md:hidden" />
              🥷<span className="font-semibold capitalize break-words text-sky-500">
                {user.displayName}
              </span>
              &nbsp;
            </h1>
            <h1 className="mb-4 text-2xl font-medium break-words lg:text-4xl md:text-3xl md:hidden ms-4 title-font text-start text-sky-400">
              {/* <br className="flex md:hidden" /> */}
              🥷<span className="font-semibold capitalize break-words text-sky-500">
                {user.displayName}
              </span>
              &nbsp;
            </h1>
            <p className="text-base break-words text-sky-400 md:ps-4 ms-4 text-start md:text-lg">
              Check what's happening on your Webweave Dashboard.
            </p>
            <div className="items-center justify-center hidden gap-5 mt-8 ms-4 ps-4 lg:flex">
              <Link to="/dashboard/space/new" class="inline-flex items-center bg-gradient-to-br from-[#2193b0] via-[#6dd5ed] to-[#093676] border-0 px-4 gap-2 py-2.5 text-white focus:outline-none hover:bg-black/80 rounded-full text-sm mt-4 md:mt-0">
                <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="16px" width="16px" xmlns="http://www.w3.org/2000/svg"><path d="M20.4668 8.69379L20.7134 8.12811C21.1529 7.11947 21.9445 6.31641 22.9323 5.87708L23.6919 5.53922C24.1027 5.35653 24.1027 4.75881 23.6919 4.57612L22.9748 4.25714C21.9616 3.80651 21.1558 2.97373 20.7238 1.93083L20.4706 1.31953C20.2942 0.893489 19.7058 0.893489 19.5293 1.31953L19.2761 1.93083C18.8442 2.97373 18.0384 3.80651 17.0252 4.25714L16.308 4.57612C15.8973 4.75881 15.8973 5.35653 16.308 5.53922L17.0677 5.87708C18.0555 6.31641 18.8471 7.11947 19.2866 8.12811L19.5331 8.69379C19.7136 9.10792 20.2864 9.10792 20.4668 8.69379ZM5.79993 16H7.95399L8.55399 14.5H11.4459L12.0459 16H14.1999L10.9999 8H8.99993L5.79993 16ZM9.99993 10.8852L10.6459 12.5H9.35399L9.99993 10.8852ZM15 16V8H17V16H15ZM3 3C2.44772 3 2 3.44772 2 4V20C2 20.5523 2.44772 21 3 21H21C21.5523 21 22 20.5523 22 20V11H20V19H4V5H14V3H3Z"></path></svg>
                CodeSpace
              </Link>
              <Link to="/dashboard/webspace/new" class="inline-flex items-center bg-gradient-to-br from-[#2193b0] via-[#6dd5ed] to-[#093676] border-0 px-4 gap-2 py-2.5 text-white focus:outline-none hover:bg-black/80 rounded-full text-sm mt-4 md:mt-0">
                <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="16px" width="16px" xmlns="http://www.w3.org/2000/svg"><path d="M20.4668 8.69379L20.7134 8.12811C21.1529 7.11947 21.9445 6.31641 22.9323 5.87708L23.6919 5.53922C24.1027 5.35653 24.1027 4.75881 23.6919 4.57612L22.9748 4.25714C21.9616 3.80651 21.1558 2.97373 20.7238 1.93083L20.4706 1.31953C20.2942 0.893489 19.7058 0.893489 19.5293 1.31953L19.2761 1.93083C18.8442 2.97373 18.0384 3.80651 17.0252 4.25714L16.308 4.57612C15.8973 4.75881 15.8973 5.35653 16.308 5.53922L17.0677 5.87708C18.0555 6.31641 18.8471 7.11947 19.2866 8.12811L19.5331 8.69379C19.7136 9.10792 20.2864 9.10792 20.4668 8.69379ZM5.79993 16H7.95399L8.55399 14.5H11.4459L12.0459 16H14.1999L10.9999 8H8.99993L5.79993 16ZM9.99993 10.8852L10.6459 12.5H9.35399L9.99993 10.8852ZM15 16V8H17V16H15ZM3 3C2.44772 3 2 3.44772 2 4V20C2 20.5523 2.44772 21 3 21H21C21.5523 21 22 20.5523 22 20V11H20V19H4V5H14V3H3Z"></path></svg>
                WebSpace
              </Link>
            </div>
          </span>
          <span className="flex ">
            {(spaces.length !== 0 && webspaces.length !== 0) ?
              <div className="hidden md:block size-72 md:w-96 md:h-[21rem]">
                <Charts />
              </div> : <img
                src="https://ik.imagekit.io/vituepzjm/Scribby/Notes-pana.svg?updatedAt=1723928906412"
                alt="banner"
                className="hidden md:block  w-72 grayscale-0 md:w-[22rem]"
              />}
            <img
              src="https://ik.imagekit.io/vituepzjm/Hand%20coding-pana.svg?updatedAt=1734118542225"
              alt="banner"
              className="md:hidden w-72 grayscale-0 md:w-[22rem]"
            />
          </span>
        </div>
        <div className={`row-span-5 hidden grayscale ${isClosed ? 'xl:hidden' : 'xl:flex'
          } brightness-95 col-start-5 flex-col justify-end bg-gradient-to-t relative from-black to-black/60 rounded-lg`}
        >
          <button
            onClick={() => setisClosed(true)}
            className="absolute top-3 p-1 bg-gradient-to-br from-[#2193b0] via-[#6dd5ed] to-[#093676] bg-opacity-30 rounded-md right-3 z-10 text-white"
          >
            <HiMiniXMark className="text-lg" />
          </button>

          <img
            src="https://ik.imagekit.io/vituepzjm/coffee-cups-on-light-blue-ground-3d-westend61.jpg?updatedAt=1734034589476"
            alt="Sample background"
            className="absolute object-cover w-full h-full rounded-lg brightness-90"
          />

          <Link
            to="/dashboard/shared/list"
            className="relative z-10 px-3 pb-3 pt-5 m-3 mb-3 bg-gradient-to-br from-[#2193b0] via-[#6dd5ed] to-[#093676] bg-opacity-80 rounded-lg"
          >
            <h1 className="mb-2 text-lg font-semibold text-white">
              Your Shared Space
            </h1>
            <p className="text-sm font-light leading-5 text-white line-clamp-2">
              Collaborate on projects by accessing Codespaces and Webspaces shared by
              others.
            </p>
          </Link>
        </div>
        <div data-aos="fade-down" className="relative flex flex-col items-start justify-end col-span-2 p-5 bg-gradient-to-br from-[#2193b0] to-[#6dd5ed]  rounded-lg lg:row-span-2 lg:row-start-4">
          {/* <PiTerminalWindowFill className='text-[2.5rem] mb-2' /> */}
          <svg stroke="white" fill="white" stroke-width="0" viewBox="0 0 24 24" className=' mb-3.5 w-8' xmlns="http://www.w3.org/2000/svg"><path d="M9.25 12a.75.75 0 0 1-.22.53l-2.75 2.75a.75.75 0 0 1-1.06-1.06L7.44 12 5.22 9.78a.75.75 0 1 1 1.06-1.06l2.75 2.75c.141.14.22.331.22.53Zm2 2a.75.75 0 0 0 0 1.5h5a.75.75 0 0 0 0-1.5h-5Z"></path><path d="M0 4.75C0 3.784.784 3 1.75 3h20.5c.966 0 1.75.784 1.75 1.75v14.5A1.75 1.75 0 0 1 22.25 21H1.75A1.75 1.75 0 0 1 0 19.25Zm1.75-.25a.25.25 0 0 0-.25.25v14.5c0 .138.112.25.25.25h20.5a.25.25 0 0 0 .25-.25V4.75a.25.25 0 0 0-.25-.25Z"></path></svg>
          <h2 className="text-xl font-semibold text-white">CodeSpaces</h2>
          <p className="mb-4 text-sm leading-6 text-white line-clamp-2">
            Set up Codespaces development environments for various programming languages, including Java and Python.
          </p>
          <Link to="/dashboard/space/list" class="inline-flex items-center bg-white border-0 px-4 py-2 text-sky-500 focus:outline-none hover:bg-sky-800 hover:text-white rounded-lg text-sm mt-4 md:mt-0">
            CodeSpaces
            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 ml-2 mt-0.5" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
          </Link>
          {codeTrashes.length > 0 && <Link to="/dashboard/trash/codespace" className="absolute px-2 py-1 text-xs font-medium border rounded-md top-3 right-3 border-sky-500">{codeTrashes.length} in CodeTrash</Link>}
        </div>
        <div data-aos="fade-down" className="relative flex flex-col items-start justify-end col-span-2 p-5 bg-gradient-to-br from-[#2193b0] to-[#6dd5ed]  rounded-lg lg:row-span-2 lg:row-start-4">
          <HiOutlineGlobeAlt className='text-[2.5rem] mb-3 text-white' />
          <h2 className="text-xl font-semibold text-white">WebSpaces</h2>
          <p className="mb-4 text-sm leading-6 text-white line-clamp-2">
            Create Webspaces development environments for HTML, CSS, JavaScript, and frameworks like Tailwind CSS and Bulma.
          </p>
          <Link to="/dashboard/webspace/list" class="inline-flex items-center bg-white border-0 px-4 py-2 text-sky-500 focus:outline-none hover:bg-sky-800 hover:text-white rounded-lg text-sm mt-4 md:mt-0">
            WebSpaces
            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 ml-2 mt-0.5" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
          </Link>
          {webTrashes.length > 0 && <Link to="/dashboard/trash/webspace" className="absolute px-2 py-1 text-xs font-medium border rounded-md top-3 right-3 border-sky-500">{webTrashes.length} in WebTrash</Link>}
        </div>
        {/* <div className="row-span-2 row-start-4 p-3 bg-white rounded-lg">5</div> */}
        {/* <div className="row-span-2 row-start-4 p-3 bg-white rounded-lg">4</div> */}
        {/* <div className="row-span-2 row-start-4 p-3 bg-white rounded-lg">5</div> */}
        {/* <div className="row-span-2 row-start-4 p-3 bg-white rounded-lg">6</div> */}
      </div>
      <div className="md:px-6 mt-14">
        <div className="flex items-center justify-between w-full mb-6">
          <h1 className="text-xl font-semibold ms-2 md:text-2xl line-clamp-1 me-2 text-sky-500">Recomended CodeSpaces</h1>
          <Link to="/dashboard/space/templates" className="inline-flex items-center gap-3 px-2 py-1 text-sm font-semibold transition-all border-2 rounded-lg active:scale-95 border-sky-500 text-sky-500 focus:outline-none">
            View&nbsp;all
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {
            finalTemplates.map((item, index) => (
              <div key={index} className="block p-4 transition bg-white rounded-lg shadow hover:shadow-md">
                <img onClick={() => {
                  setcurrentCode(item);
                  setIsTemplateOpen(true)
                }} src={LANGUAGE_VERSIONS[item.language]?.banner || "https://via.placeholder.com/50"} alt={item.language} className="w-full h-32 mb-3 transition-all rounded-lg shadow-md cursor-pointer active:scale-95" />
                <Dialog.Root open={isTemplateOpen} >
                  <Dialog.Portal>
                    <Dialog.Overlay onClick={() => setIsTemplateOpen(false)} className="fixed inset-0 bg-sky-400 data-[state=open]:animate-overlayShow" />
                    <Dialog.Content className="fixed top-1/2 left-1/2 max-h-[80vh] w-[90vw] max-w-[1000px] transform -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white shadow-md focus:outline-none p-6 z-50">
                      <div className="flex flex-col gap-6 md:flex-row">
                        <div className="flex items-center justify-center flex-1">
                          <img
                            src={LANGUAGE_VERSIONS[currentCode.language]?.banner || "https://via.placeholder.com/50"}
                            alt={currentCode.language}
                            className="object-cover object-center w-full rounded-lg h-36 md:h-72"
                          />
                        </div>

                        <div className="flex flex-col flex-1">
                          <h1 className="mb-3 text-xl font-semibold md:text-2xl text-sky-600">Add this to Your CodeSpace</h1>
                          <h2 className="text-lg font-medium line-clamp-1 text-sky-600">{currentCode.heading}</h2>
                          <p className="mb-3 font-normal text-sky-400 line-clamp-4">{currentCode.explanation}</p>
                          <div className="flex items-center justify-start gap-3">
                            <h1 className="px-2 py-1 text-sm border rounded border-sky-600 text-sky-500">5 videos</h1>
                            <h2 className="px-3 py-1 text-sm text-white uppercase rounded-md bg-sky-600">{currentCode.language}</h2>
                          </div>
                          <div className="flex flex-col gap-4 mt-4">
                            <div className="flex justify-end gap-4 mt-6">

                              <button
                                onClick={() => setIsTemplateOpen(false)}
                                type="button"
                                className="px-6 py-2 bg-gray-200 rounded-lg text-sky-600"
                              >
                                Cancel
                              </button>


                              <button
                                type="button"
                                disabled={isLoading}
                                onClick={() => handleCodeTemplateAdd(currentCode)}
                                className="hidden px-6 py-2 text-white rounded-lg bg-sky-600 md:block disabled:opacity-60 disabled:cursor-not-allowed"
                              >
                                Add to My CodeSpace
                              </button>

                              <button
                                type="button"
                                disabled={isLoading}
                                onClick={() => handleCodeTemplateAdd(currentCode)}
                                className="px-6 py-2 text-white rounded-lg bg-sky-600 md:hidden disabled:opacity-60 disabled:cursor-not-allowed"
                              >
                                Add Space
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Dialog.Content>
                  </Dialog.Portal>
                </Dialog.Root>
                <span className="flex items-center justify-between w-full gap-5 mb-2">
                  <h2 className="text-lg font-semibold text-sky-600 line-clamp-1">{item.heading}</h2>
                  <p className="text-xs font-normal capitalize text-white bg-sky-600 border border-sky-600 px-2 py-0.5 rounded-md">{item.language}</p>
                </span>
                <p className="text-sm font-light leading-6 line-clamp-2">{item.explanation}</p>
              </div>
            ))}
        </div>
      </div>
      <div className="md:px-6 mt-14">
        <div className="flex items-center justify-between w-full mb-6">
          <h1 className="text-xl font-semibold ms-2 md:text-2xl line-clamp-1 me-2 text-sky-500">Recomended WebSpaces</h1>
          <Link to="/dashboard/webspace/templates" className="inline-flex items-center gap-3 px-2 py-1 text-sm font-semibold transition-all border-2 rounded-lg active:scale-95 border-sky-600 text-sky-600 focus:outline-none">
            View&nbsp;all
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {
            finalWebTemplates.map((item, index) => (
              <div key={index} className="block p-4 transition bg-white rounded-lg shadow hover:shadow-md">
                <img onClick={() => {
                  setcurrentWeb(item);
                  setIsWebTemplateOpen(true)
                }} src={LANGUAGE_VERSIONS[item.frameworks]?.banner || "https://via.placeholder.com/50"} alt={item.frameworks} className="w-full h-32 mb-3 transition-all rounded-lg shadow-md cursor-pointer active:scale-95" />
                <Dialog.Root open={isWebTemplateOpen} >
                  <Dialog.Portal>
                    <Dialog.Overlay onClick={() => setIsWebTemplateOpen(false)} className="fixed inset-0 bg-sky-600 data-[state=open]:animate-overlayShow" />
                    <Dialog.Content className="fixed top-1/2 left-1/2 max-h-[80vh] w-[90vw] max-w-[1000px] transform -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white shadow-md focus:outline-none p-6 z-50">
                      <div className="flex flex-col gap-6 md:flex-row">
                        <div className="flex items-center justify-center flex-1">
                          <img
                            src={LANGUAGE_VERSIONS[currentWeb.frameworks]?.banner || "https://via.placeholder.com/50"}
                            alt={currentWeb.frameworks}
                            className="object-cover object-center w-full rounded-lg h-36 md:h-72"
                          />
                        </div>

                        <div className="flex flex-col flex-1">
                          <h1 className="mb-3 text-xl font-semibold md:text-2xl text-sky-600">Add this to Your WebSpace</h1>
                          <h2 className="text-lg font-medium line-clamp-1 text-sky-600">{currentWeb.heading}</h2>
                          <p className="mb-3 font-normal text-sky-400 line-clamp-4">{currentWeb.explanation}</p>
                          <div className="flex items-center justify-start gap-3">
                            <h1 className="px-2 py-1 text-sm border rounded border-sky-400 text-sky-500">5 videos</h1>
                            <h2 className="px-3 py-1 text-sm text-white uppercase rounded-md bg-sky-500">{currentWeb.frameworks}</h2>
                          </div>
                          <div className="flex flex-col gap-4 mt-4">
                            <div className="flex justify-end gap-4 mt-6">

                              <button
                                type="button"
                                onClick={() => setIsWebTemplateOpen(false)}
                                className="px-6 py-2 bg-gray-200 rounded-lg text-sky-600"
                              >
                                Cancel
                              </button>

                              <button
                                type="button"
                                disabled={isLoading}
                                onClick={() => handleWebTemplateAdd(currentWeb)}
                                className="hidden px-6 py-2 text-white rounded-lg bg-sky-600 md:block disabled:opacity-60 disabled:cursor-not-allowed"
                              >
                                Add to My WebSpace
                              </button>

                              <button
                                type="button"
                                disabled={isLoading}
                                onClick={() => handleWebTemplateAdd(currentWeb)}
                                className="px-6 py-2 text-white rounded-lg bg-sky-600 md:hidden disabled:opacity-60 disabled:cursor-not-allowed"
                              >
                                Add Space
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Dialog.Content>
                  </Dialog.Portal>
                </Dialog.Root>
                <span className="flex items-center justify-between w-full gap-5 mb-2">
                  <h2 className="text-lg font-semibold text-sky-600 line-clamp-1">{item.heading}</h2>
                  <p className="text-xs font-normal capitalize text-white bg-sky-600 border border-sky-600 px-2 py-0.5 rounded-md">{item.frameworks}</p>
                </span>
                <p className="text-sm font-light leading-6 line-clamp-2">{item.explanation}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export default Overview