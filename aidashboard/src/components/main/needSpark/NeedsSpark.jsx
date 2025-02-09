import React, { useEffect, useRef, useState } from 'react'
import Header from '../../../common/parts/Header'
import Footer from '../../../common/parts/Footer'
import { useUserAuth } from '../../context/UserAuthContext';
import { Link } from 'react-router-dom';
import Chat from "./Chat";
import { Toaster } from 'react-hot-toast';
import * as Dialog from "@radix-ui/react-dialog";
import Editors from './Editor';
import { BsStars } from 'react-icons/bs';
import { Editor } from "@monaco-editor/react";
import { FaPlay } from 'react-icons/fa6';
import { TbSettingsCode } from 'react-icons/tb';
import { RiFullscreenExitLine } from 'react-icons/ri';
import WebSpace from './WebSpace';
import { useData } from '../../context/DataContext';
import { HashLink } from 'react-router-hash-link';

function NeedsSpark() {
  const { user } = useUserAuth();
  const { Loading } = useData();
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [theme, setTheme] = useState("dark");

  return (
    <div>
      <Header />
      <section id="custom-back" class="flex min-h-[60vh] md:min-h-fit py-24 md:py-0 flex-col bg-contain items-center justify-center bg-[url(https://dashboard.algolia.com/client-assets/c1c9361fe75370d1b156733e962f7214/514f2ec3798090c6df00dad1592c8166.svg)]">
        <div  data-aos="zoom-in-up"
          data-aos-duration="3000" class="flex max-w-5xl flex-col px-6 items-center text-center lg:pb-48 lg:pt-32">
          <h1 class="mb-8 text-4xl font-semibold text-sky-500 sm:text-5xl md:mb-6 md:text-6xl">Why Webweave?</h1>
          <h2 class="mb-8 text-xl font-medium text-sky-500 ">Webweave centralizes coding and web development, offering seamless integration of features, AI-powered assistance, collaboration, and real-time tools—all in one dashboard, ensuring efficiency, convenience, and an enhanced learning experience.</h2>
          <a href="#top-features">
            <button className="group/button relative inline-flex items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-[#2193b0] via-[#6dd5ed] to-[#093676] backdrop-blur-lg px-6 py-3 text-base font-semibold text-white transition-all duration-300 ease-in-out hover:scale-[1.03] border border-white">
              <span className="text-lg">Explore Top Features</span>
              <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-13deg)_translateX(-100%)] group-hover/button:duration-1000 group-hover/button:[transform:skew(-13deg)_translateX(100%)]">
                <div className="relative w-10 h-full bg-white"></div>
              </div>
            </button>
          </a>
        </div>
      </section>
      {/* <section id="top-features" class="text-white bg-black body-font">
        <div class="container px-5 md:px-12 py-24 mx-auto">
          <div className="flex items-center justify-between w-full mb-12">
            <div class="flex flex-col">
              <h1 class="sm:text-3xl text-2xl font-medium title-font text-white">Explore the Full Potential of Webweave</h1>
              <p class="leading-relaxed text-base text-gray-200">Discover the Top Features That Make Webweave Unstoppable!</p>
            </div>
            <h1 className="hidden px-5 py-2 text-sm font-medium tracking-widest text-white uppercase border-2 border-white border-dashed rounded-md md:block">TOP FEATURES</h1>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-5 ">
            <HashLink to="#codespace" class="active:scale-95 group transition-all">
              <div class="flex relative rounded-lg h-full p-5 bg-gray-100 flex-col">
                <div class="flex items-center mb-8">
                  <div class="w-8 h-8 inline-flex items-center justify-center rounded-full text-black flex-shrink-0">
                    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" className='size-8' xmlns="http://www.w3.org/2000/svg"><path d="M9.25 12a.75.75 0 0 1-.22.53l-2.75 2.75a.75.75 0 0 1-1.06-1.06L7.44 12 5.22 9.78a.75.75 0 1 1 1.06-1.06l2.75 2.75c.141.14.22.331.22.53Zm2 2a.75.75 0 0 0 0 1.5h5a.75.75 0 0 0 0-1.5h-5Z"></path><path d="M0 4.75C0 3.784.784 3 1.75 3h20.5c.966 0 1.75.784 1.75 1.75v14.5A1.75 1.75 0 0 1 22.25 21H1.75A1.75 1.75 0 0 1 0 19.25Zm1.75-.25a.25.25 0 0 0-.25.25v14.5c0 .138.112.25.25.25h20.5a.25.25 0 0 0 .25-.25V4.75a.25.25 0 0 0-.25-.25Z"></path></svg>
                  </div>
                </div>
                <div class="flex-grow">
                  <h1 className="text-lg font-medium leading-relaxed text-black">CodeSpace</h1>
                  <p class="leading-5 text-sm font-normal text-black/60">CodeSpace is an innovative platform enhancing
                    programming learning with AI-driven tools and collaboration.</p>
                </div>
                <button className='absolute top-5 group-hover:rotate-[135deg] transition-all text-black right-5'>
                  <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" aria-hidden="true" className='size-4' xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8.25 3.75H19.5a.75.75 0 0 1 .75.75v11.25a.75.75 0 0 1-1.5 0V6.31L5.03 20.03a.75.75 0 0 1-1.06-1.06L17.69 5.25H8.25a.75.75 0 0 1 0-1.5Z" clip-rule="evenodd"></path></svg>
                </button>
              </div>
            </HashLink>
            <HashLink to="#webspace" class="active:scale-95 group transition-all">
              <div class="flex relative rounded-lg h-full p-5 bg-gray-100 flex-col">
                <div class="flex items-center mb-8">
                  <div class="w-8 h-8 inline-flex items-center justify-center rounded-full text-black flex-shrink-0">
                    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" className='size-8' xmlns="http://www.w3.org/2000/svg"><path d="M256 48h-.7c-55.4.2-107.4 21.9-146.6 61.1C69.6 148.4 48 200.5 48 256s21.6 107.6 60.8 146.9c39.1 39.2 91.2 60.9 146.6 61.1h.7c114.7 0 208-93.3 208-208S370.7 48 256 48zm180.2 194h-77.6c-.9-26.7-4.2-52.2-9.8-76.2 17.1-5.5 33.7-12.5 49.7-21 22 28.2 35 61.6 37.7 97.2zM242 242h-61.8c.8-24.5 3.8-47.7 8.8-69.1 17.4 3.9 35.1 6.3 53 7.1v62zm0 28v61.9c-17.8.8-35.6 3.2-53 7.1-5-21.4-8-44.6-8.8-69H242zm28 0h61.3c-.8 24.4-3.8 47.6-8.8 68.9-17.2-3.9-34.8-6.2-52.5-7V270zm0-28v-62c17.8-.8 35.4-3.2 52.5-7 5 21.4 8 44.5 8.8 69H270zm109.4-117.9c-12.3 6.1-25 11.3-38 15.5-7.1-21.4-16.1-39.9-26.5-54.5 24 8.3 45.9 21.6 64.5 39zM315 146.8c-14.7 3.2-29.8 5.2-45 6V79.4c17 9.2 33.6 33.9 45 67.4zM242 79v73.7c-15.4-.8-30.6-2.8-45.5-6.1 11.6-33.8 28.4-58.5 45.5-67.6zm-45.6 6.4c-10.3 14.5-19.2 32.9-26.3 54.1-12.8-4.2-25.4-9.4-37.5-15.4 18.4-17.3 40.1-30.5 63.8-38.7zm-82.9 59.5c15.8 8.4 32.3 15.4 49.2 20.8-5.7 23.9-9 49.5-9.8 76.2h-77c2.6-35.4 15.6-68.8 37.6-97zM75.8 270h77c.9 26.7 4.2 52.3 9.8 76.2-16.9 5.5-33.4 12.5-49.2 20.8-21.9-28.1-34.9-61.5-37.6-97zm56.7 117.9c12.1-6 24.7-11.2 37.6-15.4 7.1 21.3 16 39.6 26.3 54.2-23.7-8.4-45.4-21.5-63.9-38.8zm64-22.6c14.9-3.3 30.2-5.3 45.5-6.1V433c-17.2-9.1-33.9-33.9-45.5-67.7zm73.5 67.3v-73.5c15.2.8 30.3 2.8 45 6-11.4 33.6-28 58.3-45 67.5zm45-5.7c10.4-14.6 19.4-33.1 26.5-54.5 13 4.2 25.8 9.5 38 15.6-18.6 17.3-40.6 30.6-64.5 38.9zm83.5-59.8c-16-8.5-32.6-15.5-49.7-21 5.6-23.9 8.9-49.4 9.8-76.1h77.6c-2.7 35.5-15.6 68.9-37.7 97.1z"></path></svg>
                  </div>
                </div>
                <div class="flex-grow">
                  <h1 className="text-lg font-medium leading-relaxed text-black">WebSpace</h1>
                  <p class="leading-5 text-sm font-normal text-black/60">WebSpace streamlines web development with powerful
                    tools, collab, and AI support for learners and developers on WebDev.</p>
                </div>
                <button className='absolute top-5 group-hover:rotate-[135deg] transition-all text-black right-5'>
                  <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" aria-hidden="true" className='size-4' xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8.25 3.75H19.5a.75.75 0 0 1 .75.75v11.25a.75.75 0 0 1-1.5 0V6.31L5.03 20.03a.75.75 0 0 1-1.06-1.06L17.69 5.25H8.25a.75.75 0 0 1 0-1.5Z" clip-rule="evenodd"></path></svg>
                </button>
              </div>
            </HashLink>
            <HashLink to="#Sara" class="active:scale-95 group transition-all">
              <div class="flex relative rounded-lg h-full p-5 bg-gray-100 flex-col">
                <div class="flex items-center mb-8">
                  <div class="w-8 h-8 inline-flex items-center justify-center rounded-full text-black flex-shrink-0">
                    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" className='size-8' xmlns="http://www.w3.org/2000/svg"><path d="M241.063 54.406c-2.31.008-4.61.032-6.907.094-1.805.05-3.61.106-5.406.188-8.814 1.567-12.884 5.426-15.094 9.843-2.435 4.87-2.34 11.423.375 17.25 2.717 5.83 7.7 10.596 14.657 12.376 6.958 1.78 16.536.86 29.125-7.187l10.063 15.75c-15.818 10.11-31.124 12.777-43.813 9.53-12.688-3.247-22.103-12.123-26.968-22.563-4.584-9.836-5.426-21.376-1.03-31.624-42.917 6.94-81.777 23.398-111.626 46.562-9.81 10.688-10.77 23.11-6.47 31.594 4.83 9.526 16.21 16.48 38.97 9.28l5.656 17.813c-28.58 9.04-52.137-.588-61.28-18.625-2.23-4.397-3.592-9.156-4.127-14.063-4.814 5.712-9.16 11.658-13 17.844l.126.06c-8.614 19.616-8.81 33.203-5.376 42.032 3.436 8.83 10.635 14.44 21.72 17.532 22.168 6.18 58.065-1.277 83.343-20.156 10.82-8.08 21.077-27.677 21.97-42.875.445-7.6-1.165-13.604-4.345-17.438-3.18-3.834-8.272-6.703-18.813-6.594l-.187-18.686c14.487-.15 26.25 4.754 33.375 13.344 7.124 8.59 9.26 19.652 8.625 30.468-1.27 21.633-12.595 44.172-29.438 56.75-29.876 22.314-69.336 31.606-99.53 23.188-13.988-3.9-26.37-12.386-32.75-25.53-9.546 45.446 4.323 87.66 30.718 116.874 3.45 3.82 7.122 7.43 10.97 10.78-2.754-7.887-4.016-16.1-3.72-24.093.53-14.325 6.082-28.346 17.22-38.03 9.134-7.946 21.752-12.53 36.843-12.5 1.006 0 2.034.018 3.062.06 2.35.1 4.763.304 7.22.626l-2.44 18.532c-15.588-2.048-25.705 1.522-32.436 7.375-6.73 5.854-10.443 14.614-10.813 24.625-.74 20.024 12.07 43.406 39.69 50.188l-.032.188c27.192 5.19 57.536.372 88-18.22.018-.012.043-.017.062-.03 6.34-4.45 9.755-8.808 11.438-12.563 1.985-4.432 1.943-8.292.53-12.438-2.824-8.29-12.94-16.812-22.218-19.187-15.002-3.84-24.532 1.436-29 7.72-4.468 6.28-4.74 12.45 2.156 17.81l-11.47 14.75c-14.187-11.033-15.092-30.487-5.905-43.405 6.892-9.688 18.985-16.326 33.564-16.75.607-.018 1.228-.036 1.844-.03 4.306.03 8.79.622 13.437 1.81 15.505 3.97 29.84 15.277 35.28 31.25 1.416 4.155 2.09 8.69 1.876 13.314 16.71-8.538 34.332-16.12 52.282-21.814 30.156-13.78 43.23-37.938 42.72-58.28-.515-20.493-13.187-37.74-42.376-40.626l1.844-18.594c36.666 3.626 58.462 29.848 59.188 58.75.422 16.84-5.754 34.363-18.188 49.28 16.072-1.8 32.044-1.495 47.53 1.627-3.152-6.472-4.68-13.478-4.467-20.438.677-22.036 19.42-42.593 48.875-42.906 1.963-.022 3.974.053 6.03.218l-1.5 18.625c-24.927-1.998-34.3 11.086-34.718 24.656-.412 13.42 8.545 28.442 34.22 30.436 28.3.25 48.588-15.098 58.53-37.906 13.31-30.536 6.997-76.317-34.844-118.188-.792-.793-1.578-1.593-2.375-2.375-.444 3.792-1.424 7.443-2.842 10.844-7.25 17.39-24.233 29.128-41.875 32.407-24.335 4.522-44.29-5.347-53.5-20.406-9.21-15.057-6.792-36.35 9.78-47.56l10.47 15.5c-8.913 6.028-9.28 14.19-4.313 22.31 4.967 8.122 16.17 15.156 34.156 11.814 11.306-2.102 23.896-11.33 28.03-21.25 2.07-4.96 2.47-9.862.408-15.47-1.675-4.555-5.187-9.764-11.72-15.25l-.187-.155c-27.316-20.587-56.338-35.393-85.75-45.157.018.032.045.06.063.093 6.684 12.22 7.18 26.082 3.063 38.344-8.233 24.525-34.07 43.848-66.032 42.78-6.948-.23-13.56 3.12-19.186 9.657-5.627 6.537-9.735 16.113-10.688 26.313-1.905 20.4 6.923 42.886 41.344 54L277 258.28c-41.083-13.264-56.83-45.546-54.22-73.5 1.307-13.975 6.706-26.962 15.157-36.78 8.452-9.818 20.475-16.603 33.97-16.156 24.04.802 42.323-14.084 47.687-30.063 2.682-7.988 2.335-15.937-1.75-23.405-3.968-7.252-11.83-14.423-25.906-19.656-17.114-2.967-34.16-4.367-50.875-4.314zM342.28 306.344c-41.915 3.41-87.366 23.4-125.28 46.562-55.98 34.198-114.89 26.733-156.688-4.28 16.444 58.844 74.712 70.788 135.5 55.905 6.083-2.285 12.06-6.538 17.157-12.03 7.057-7.607 12.17-17.47 13.78-25.625l18.344 3.625c-2.445 12.383-9.078 24.666-18.406 34.72-8.95 9.645-20.61 17.35-34.094 19.374-6.766 15.07-12.334 29.68-14.594 39.906-3.55 16.06 14.206 22.225 22.156 6.03 19.022-38.743 45.87-73.23 79.406-102.967 26.064-17.153 48.406-38.303 62.72-61.22z"></path></svg>
                  </div>
                </div>
                <div class="flex-grow">
                  <h1 className="text-lg font-medium leading-relaxed text-black">Sara AI</h1>
                  <p class="leading-5 text-sm font-normal text-black/60">Sara AI provides real-time assistance, enhancing learning and empowering mastery in code space and webspace</p>
                </div>
                <button className='absolute top-5 group-hover:rotate-[135deg] transition-all text-black right-5'>
                  <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" aria-hidden="true" className='size-4' xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8.25 3.75H19.5a.75.75 0 0 1 .75.75v11.25a.75.75 0 0 1-1.5 0V6.31L5.03 20.03a.75.75 0 0 1-1.06-1.06L17.69 5.25H8.25a.75.75 0 0 1 0-1.5Z" clip-rule="evenodd"></path></svg>
                </button>
              </div>
            </HashLink>
            <HashLink to="#spacenotes" class="active:scale-95 group transition-all">
              <div class="flex relative rounded-lg h-full p-5 bg-gray-100 flex-col">
                <div class="flex items-center mb-8">
                  <div class="w-8 h-8 inline-flex items-center justify-center rounded-full text-black flex-shrink-0">
                    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 32 32" className='size-8' xmlns="http://www.w3.org/2000/svg"><path d="M 5 5 L 5 27 L 20.40625 27 L 20.71875 26.71875 L 26.71875 20.71875 L 27 20.40625 L 27 5 Z M 7 7 L 25 7 L 25 19 L 19 19 L 19 25 L 7 25 Z M 21 21 L 23.5625 21 L 21 23.5625 Z"></path></svg>
                  </div>
                </div>
                <div class="flex-grow">
                  <h1 className="text-lg font-medium leading-relaxed text-black">SpaceNotes</h1>
                  <p class="leading-5 text-sm font-normal text-black/60">Space Notes enhances learning by allowing users to take,
                    organize, and review notes efficiently.</p>
                </div>
                <button className='absolute top-5 group-hover:rotate-[135deg] transition-all text-black right-5'>
                  <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" aria-hidden="true" className='size-4' xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8.25 3.75H19.5a.75.75 0 0 1 .75.75v11.25a.75.75 0 0 1-1.5 0V6.31L5.03 20.03a.75.75 0 0 1-1.06-1.06L17.69 5.25H8.25a.75.75 0 0 1 0-1.5Z" clip-rule="evenodd"></path></svg>
                </button>
              </div>
            </HashLink>
            <HashLink to="#spacetrash" class="active:scale-95 group transition-all">
              <div class="flex relative rounded-lg h-full p-5 bg-gray-100 flex-col">
                <div class="flex items-center mb-8">
                  <div class="w-8 h-8 inline-flex items-center justify-center rounded-full text-black flex-shrink-0">
                    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" className='size-8' xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M10 3h3v1h-1v9l-1 1H4l-1-1V4H2V3h3V2a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v1zM9 2H6v1h3V2zM4 13h7V4H4v9zm2-8H5v7h1V5zm1 0h1v7H7V5zm2 0h1v7H9V5z"></path></svg>
                  </div>
                </div>
                <div class="flex-grow">
                  <h1 className="text-lg font-medium leading-relaxed text-black">SpaceTrash</h1>
                  <p class="leading-5 text-sm font-normal text-black/60">The SpaceTrash feature ensures safe deletion and recovery of work, promoting efficient and worry-free learning.</p>
                </div>
                <button className='absolute top-5 group-hover:rotate-[135deg] transition-all text-black right-5'>
                  <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" aria-hidden="true" className='size-4' xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8.25 3.75H19.5a.75.75 0 0 1 .75.75v11.25a.75.75 0 0 1-1.5 0V6.31L5.03 20.03a.75.75 0 0 1-1.06-1.06L17.69 5.25H8.25a.75.75 0 0 1 0-1.5Z" clip-rule="evenodd"></path></svg>
                </button>
              </div>
            </HashLink>
            <HashLink to="#sharedspace" class="active:scale-95 group transition-all">
              <div class="flex relative rounded-lg h-full p-5 bg-gray-100 flex-col">
                <div class="flex items-center mb-8">
                  <div class="w-8 h-8 inline-flex items-center justify-center rounded-full text-black flex-shrink-0">
                    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" className='size-8' xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"></path><path d="M16.5 13c-1.2 0-3.07.34-4.5 1-1.43-.67-3.3-1-4.5-1C5.33 13 1 14.08 1 16.25V19h22v-2.75c0-2.17-4.33-3.25-6.5-3.25zm-4 4.5h-10v-1.25c0-.54 2.56-1.75 5-1.75s5 1.21 5 1.75v1.25zm9 0H14v-1.25c0-.46-.2-.86-.52-1.22.88-.3 1.96-.53 3.02-.53 2.44 0 5 1.21 5 1.75v1.25zM7.5 12c1.93 0 3.5-1.57 3.5-3.5S9.43 5 7.5 5 4 6.57 4 8.5 5.57 12 7.5 12zm0-5.5c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm9 5.5c1.93 0 3.5-1.57 3.5-3.5S18.43 5 16.5 5 13 6.57 13 8.5s1.57 3.5 3.5 3.5zm0-5.5c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2z"></path></svg>
                  </div>
                </div>
                <div class="flex-grow">
                  <h1 className="text-lg font-medium leading-relaxed text-black">SharedSpace</h1>
                  <p class="leading-5 text-sm font-normal text-black/60">The collaboration feature enhances teamwork and learning by
                    enabling real-time code sharing and role management.</p>
                </div>
                <button className='absolute top-5 group-hover:rotate-[135deg] transition-all text-black right-5'>
                  <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" aria-hidden="true" className='size-4' xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8.25 3.75H19.5a.75.75 0 0 1 .75.75v11.25a.75.75 0 0 1-1.5 0V6.31L5.03 20.03a.75.75 0 0 1-1.06-1.06L17.69 5.25H8.25a.75.75 0 0 1 0-1.5Z" clip-rule="evenodd"></path></svg>
                </button>
              </div>
            </HashLink>
          </div>
        </div>
      </section> */}
      {/* <section id="codespace" class="body-font">
        <div class="container mx-auto flex lg:px-20 px-5 gap-12 md:gap-0 py-12 md:py-24 md:flex-row flex-col-reverse items-center">
          <div class="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
            <h1 class="title-font text-3xl capitalize mb-4 font-semibold text-black">Begin Your Code Journey with CodeSpace!</h1>
            <ul class="mb-8 text-black/60 md:ms-10 text-start leading-relaxed list-disc w-[80%]">
              <li className="mb-2 text-justify">CodeSpace offers AI-powered code generation, error
                explanations, a code engine, collaborative tools, and Focus
                Mode with a timer to track learning time. Full screen activates
                Focus Mode.</li>
              <li className="mb-2 text-justify">The platform features a guided tour, integrated YouTube
                videos, AI-generated Space Notes, real-time collaboration,
                and the ability to switch between five video perspectives.
              </li>
              <li className="mb-2 text-justify">It includes a blank code editor, code trash for safe deletion
                and retrieval, and Sara AI to assist with learner queries,
                creating a dynamic environment for coding practice.</li>
            </ul>
            <Link to='/dashboard/space/new' class="flex md:hidden justify-center items-center bg-main ps-5 pe-3 py-3 rounded-md gap-2">
              <span class="text-white">Try Now</span>
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 ml-1 text-white" viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7"></path>
              </svg>
            </Link>

            <Dialog.Root >
              <Dialog.Trigger asChild>
                <button class="hidden md:flex justify-center items-center bg-main ps-5 pe-3 py-3 rounded-md gap-2">
                  <span class="text-white">Try Now</span>
                  <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 ml-1 text-white" viewBox="0 0 24 24">
                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                  </svg>
                </button>
              </Dialog.Trigger>
              <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/10 data-[state=open]:animate-overlayShow" />
                <Dialog.Content className="fixed top-1/2 left-1/2 w-[90%] h-[90%] transform -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white shadow-md focus:outline-none z-50">
                  <div className="w-full h-[90vh] p-5 bg-white rounded-lg flex gap-4">
                    <div className={`w-1/2 space-y-4 my-first-step`}>
                      <div className={`h-[40vh] relative`}>
                        <iframe
                          className="w-full h-full mb-2 rounded-md shadow-lg video-t"
                          src={`https://www.youtube.com/embed/kNE3vq1g2e8`}
                          title="YouTube video player"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>
                      <div className={`p-4 explanation-t cursor-pointer hover:brightness-75 active:scale-[99%] transition-all bg-gray-100 h-[25vh] overflow-y-auto rounded-lg border border-gray-300`}>
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-lg font-semibold text-black">Palindrome Checker in Java</h3>
                          <h3 className="text-sm px-2 pb-0.5 pt-1 uppercase rounded-md bg-black font-semibold  text-gray-100">JAVA</h3>
                        </div>
                        <div className="Sara no-tailwindcss">
                          The Java code efficiently checks if a given string is a palindrome. It first preprocesses the input string by converting it to lowercase and removing non-alphanumeric characters. This ensures case-insensitive and punctuation-insensitive palindrome detection. Then, it uses two pointers, one at the beginning and one at the end of the string, to compare characters symmetrically. If a mismatch is found, it's not a palindrome; otherwise, the pointers move towards the center until they meet, confirming the palindrome.
                        </div>
                      </div>
                      <div className="">
                        <textarea
                          className={`input-t w-full max-h-[50px] h-[8vh] px-4 py-2  border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-black`}
                          placeholder="Type your prompt here..."
                        />
                        <button
                          className={`w-full button-t py-3 active:scale-[99%] transition-all flex items-center justify-center gap-2 bg-black text-white font-semibold rounded-lg hover:bg-black`}
                        >
                          <BsStars /> Generate Contents
                        </button>
                      </div>
                    </div>
                    <div className={`w-1/2 h-full my-other-step`}>
                      <div
                        className={` editor-t rounded-lg`}
                        style={{
                          position: "relative",
                          overflow: "hidden",
                          height: "50vh",
                        }}
                      >
                        <Editor
                          language={'java'}
                          loading={<Loading />}
                          value={`import java.lang.Character;

public class Palindrome {
    public static boolean isPalindrome(String text) {
        // Optimized: Perform processing and comparison in one pass
        int left = 0;
        int right = text.length() - 1;
        char leftChar, rightChar;
        while (left < right) {
            leftChar = Character.toLowerCase(text.charAt(left));
            rightChar = Character.toLowerCase(text.charAt(right));

            //Skip non-alphanumeric characters. Further improved efficiency by using a single conditional check within the loop.
            while (left < right && !Character.isLetterOrDigit(leftChar)) {
                left++;
                leftChar = Character.toLowerCase(text.charAt(left)); // Update leftChar after incrementing left
            }
            while (left < right && !Character.isLetterOrDigit(rightChar)) {
                right--;
                rightChar = Character.toLowerCase(text.charAt(right)); // Update rightChar after decrementing right
            }

            if (leftChar != rightChar) {
                return false;
            }
            left++;
            right--;
        }
        return true;
    }

    public static void main(String[] args) {
        String text1 = "Racecar";
        String text2 = "hello";
        String text3 = "A man, a plan, a canal: Panama";
        System.out.println(text1 + " is a palindrome: " + isPalindrome(text1));
        System.out.println(text2 + " is a palindrome: " + isPalindrome(text2));
        System.out.println(text3 + " is a palindrome: " + isPalindrome(text3));
    }
}`}
                          theme={theme}
                        />
                      </div>
                      <div className="flex justify-between mt-4">
                        <div className="flex items-center gap-2">
                          <button
                            className="flex run-t md:text-base text-sm active:scale-95 transition-all items-center justify-center py-1 px-2.5 md:px-4 bg-black text-white font-medium rounded-lg hover:bg-black/85"
                          >
                            <FaPlay className="mr-2 text-sm md:text-base" /> Run Code
                          </button>
                          <button className="p-1 transition-all bg-black rounded-md optimizer-t disabled:opacity-50 disabled:animate-bounce active:scale-95" >
                            <TbSettingsCode className="text-[1.2rem] md:text-[1.4rem] text-white" />
                          </button>
                        </div>
                        <div className="flex items-center gap-3">
                          <button
                            className={`bg-gray-200 p-1.5 rounded-md focusmode-t active:scale-90 transition-all`} >
                            <RiFullscreenExitLine className="text-base text-gray-700 md:text-xl" />
                          </button>
                          <select
                            onChange={(e) => setTheme(e.target.value)}
                            value={theme}
                            className="p-0.5 md:p-1 bg-gray-100 w-[100px] mode-t md:w-[150px] rounded-md border border-gray-300 focus:ring-0"
                          >
                            <option value="vs-light">Light mode</option>
                            <option value="vs-dark">Dark mode</option>
                          </select>
                        </div>
                      </div>
                      <div className={`bg-black/90 output-t overflow-auto h-[25vh] mt-3 rounded-lg`}>
                        <div className="flex items-center justify-between px-3 pt-2 mb-2">
                          <h1 className="text-lg font-medium text-gray-100">Output:</h1>

                        </div>
                        <hr />
                        <p className="p-3 text-lg text-gray-200">Racecar is a palindrome: true <br />
                          hello is a palindrome: false <br />
                          A man, a plan, a canal: Panama is a palindrome: true</p>
                      </div>
                    </div>
                  </div>
                </Dialog.Content>
              </Dialog.Portal>
            </Dialog.Root>
          </div>
          <div class="lg:max-w-xl lg:w-full h-80 md:w-1/2 w-full">
            <iframe class="object-cover w-full h-full lg:-ml-12 object-center rounded" src="https://www.youtube.com/embed/ULQqSYihvdk?si=WpkseySB-A9-CNpd" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
          </div>
        </div>
      </section> */}
      {/* <section id="webspace" class="body-font">
        <div class="container mx-auto flex lg:px-24 px-5 pt-24 pb-12 md:py-24 md:flex-row flex-col items-center">
          <div class="lg:max-w-xl lg:w-full h-80 mb-10 md:mb-0 md:w-1/2 w-full">
            <iframe class="object-cover w-full h-full lg:-ml-12 object-center rounded" src="https://www.youtube.com/embed/RgMmZlUhV2Y?si=_wVVY1mqN3JSIUwb" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
          </div>
          <div class="lg:flex-grow md:w-1/2 lg:pl-32 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
            <h1 class="title-font text-3xl capitalize mb-4 font-semibold text-black">Kickstart Your WebDev with WebSpace!</h1>
            <ul class="mb-8 text-black/60 md:ms-8 text-start leading-relaxed list-disc w-[90%]">
              <li className="mb-2 text-justify">WebSpace is an AI-powered web development platform. Live code, preview, and collaborate in real-time. Supports HTML, CSS, JavaScript, frameworks, and templates. Includes content recovery and AI tools for creation and code generation.</li>
              <li className="mb-2 text-justify">Sara AI provides query resolution, and Focus Mode with a timer tracks learning time. The platform includes blank workspaces, a guided tour, and a flexible editor, ideal for both learners and developers.</li>
              <li className="mb-2 text-justify">Web Space combines practical tools and user-friendly features to streamline web development, helping users build, test, and collaborate effectively.</li>
            </ul>
            <Link to='/dashboard/webspace/new' class="flex md:hidden justify-center items-center bg-main ps-5 pe-3 py-3 rounded-md gap-2">
              <span class="text-white">Try Now</span>
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 ml-1 text-white" viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7"></path>
              </svg>
            </Link>

            <Dialog.Root >
              <Dialog.Trigger asChild>
                <button class="hidden md:flex justify-center items-center bg-main ps-5 pe-3 py-3 rounded-md gap-2">
                  <span class="text-white">Try Now</span>
                  <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 ml-1 text-white" viewBox="0 0 24 24">
                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                  </svg>
                </button>
              </Dialog.Trigger>
              <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/10 data-[state=open]:animate-overlayShow" />
                <Dialog.Content className="fixed top-1/2 left-1/2 w-[90%] h-[90%] transform -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white shadow-md focus:outline-none z-50">
                  <WebSpace />
                </Dialog.Content>
              </Dialog.Portal>
            </Dialog.Root>
          </div>
        </div>
      </section> */}
      {/* <section id="Sara" className="body-font">
        <div class="container mx-auto flex lg:px-20 px-5 gap-12 py-12 md:gap-0 md:flex-row flex-col-reverse items-center">
          <div class="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
            <h1 class="title-font text-3xl capitalize mb-4 font-semibold text-black">Try Seamless Assistance with Sara AI!</h1>
            <ul class="mb-8 text-black/60 md:ms-10 text-start leading-relaxed list-disc w-[80%]">
              <li className="mb-2 text-justify">Sara AI is an advanced AI model integrated into both Code Space and Web Space, offering real-time assistance to learners. It acts as a virtual tutor, answering queries, clarifying doubts, and providing detailed explanations for coding errors in both programming and web development.</li>
              <li className="mb-2 text-justify">In Code Space, Sara AI provides tailored solutions for programming challenges, while in Web Space, it helps with web development techniques and framework-related queries. It also integrates with Space Notes, allowing users to save answers for later reference.</li>
              <li className="mb-2 text-justify">By fostering an interactive, supportive learning environment, Sara AI empowers learners to confidently master programming and web development.</li>
            </ul>
            <div className="w-[80%] grid grid-cols-2 gap-5">
              <Link to='https://aiSara.vercel.app' class="flex justify-center items-center bg-main ps-5 pe-5 py-3 rounded-md gap-2">
                <span class="text-white">OG Sara AI</span>
              </Link>
              <h1 class="flex justify-center items-center bg-white ps-5 pe-3 py-3 rounded-md gap-2">
                <span class="text-black">Try Now</span>
                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 ml-1 text-black" viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
              </h1>
            </div>
          </div>
          <div class="lg:max-w-xl lg:w-full h-[70vh] md:h-[80vh] shadow border border-black rounded-md md:w-1/2 w-full">
            <Chat />
          </div>
        </div>
      </section> */}
      <section id="spacenotes" class="body-font bg-gradient-to-br from-[#2193b0] via-[#6dd5ed] to-[#093676]">
        <div class="container mx-auto flex lg:pe-24 lg:ps-0 px-5 pt-24 pb-12 md:py-24 md:flex-row flex-col items-center " >
          <div  data-aos="fade-right"
          data-aos-duration="3000" class="lg:max-w-4xl lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
            <img class="object-cover object-center rounded" alt="hero" src="https://ik.imagekit.io/vituepzjm/notes-code.png?updatedAt=1735150393340" />
          </div>
          <div  data-aos="fade-left"
          data-aos-duration="3000" class="lg:flex-grow md:w-1/2 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
            <h1 class="title-font text-3xl capitalize mb-2 font-semibold text-white">Capture Insights with Space Notes!</h1>
            <p className="mb-5 text-white text-justify leading-relaxed list-disc w-[90%]">Space Notes, integrated into Code & Web Space, lets users take detailed, AI-assisted notes during development. Real-time syncing, easy organization, and search help consolidate learning, track progress, and improve knowledge retention without workflow disruption.</p>
            <ul className="grid w-full h-full grid-cols-2 p-5 mb-5 text-left list-disc list-inside bg-white border rounded-md text-sky-500 border-sky-500 outline outline-4 outline-sky-400">
              <li>Title</li>
              <li>Delimiter</li>
              <li>CheckList</li>
              <li>Code</li>
              <li>List</li>
              <li>Quote</li>
              <li>Mermaid</li>
              <li>Alert</li>
              <li>Math</li>
            </ul>
            <Link to='/dashboard/webspace/new' class="flex md:hidden justify-center items-center bg-white ps-5 pe-3 py-3 rounded-md gap-2">
              <span class="text-sky-500">Try Now</span>
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 ml-1 text-white" viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7"></path>
              </svg>
            </Link>
            <Dialog.Root open={isEditorOpen} onOpenChange={setIsEditorOpen} >
              <Dialog.Trigger asChild>
                <button class="md:flex hidden justify-center items-center bg-white ps-5 pe-3 py-3 rounded-md gap-2">
                  <span class="text-sky-500">Try Now</span>
                  <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 ml-1 text-white" viewBox="0 0 24 24">
                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                  </svg>
                </button>
              </Dialog.Trigger>
              <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/10 data-[state=open]:animate-overlayShow" />
                <Dialog.Content className="fixed top-1/2 left-1/2 w-[90%] h-[90%] transform -translate-x-1/2 -translate-y-1/2  bg-white shadow-md focus:outline-none rounded-lg z-50">
                  <Editors />
                </Dialog.Content>
              </Dialog.Portal>
            </Dialog.Root>
          </div>
        </div>
      </section>
      {/* <section id="spacetrash" class="body-font">
        <div class="w-full grid grid-cols-5 gap-5 md:grid-cols-4 py-12">
          <div class="col-span-2 md:col-span-1 h-full w-full mb-10 md:mb-0">
            <img class="object-cover h-[60vh] md:h-[80vh] object-right rounded" alt="hero" src="https://ik.imagekit.io/vituepzjm/trash.png?updatedAt=1735156736090" />
          </div>
          <div class="md:px-8 flex pe-3 md:pe-0 col-span-3 md:col-span-2 md:text-center flex-col items-start md:items-center justify-start mt-12 md:mt-0 md:justify-center">
            <h1 className="px-8 py-3 mb-5 text-sm font-bold text-white bg-gradient-to-br from-[#6dd5ed] to-[#093676] rounded-full">SPACE TRASH </h1>
            <h1 class="title-font text-3xl capitalize mb-2 font-semibold text-sky-600">Safe deletion and recovery with Space Trash!</h1>
            <p className="mb-8 text-sky-400 text-justify line-clamp-5 md:line-clamp-none leading-relaxed list-disc w-[90%]">The Trash feature in Code Space and Web Space provides a safety net by allowing easy deletion and retrieval of code or web spaces. Deleted items are temporarily moved to the Trash, where they can be reviewed before permanent removal.This feature is particularly useful for learners and developers who may want to revisit or restore previous versions of their work. Items in the Trash can be restored to their original location, offering flexibility and peace of mind.The Trash also helps keep workspaces organized by clearing unnecessary content without the risk of irreversible deletion, promoting a more efficient and worry-free learning experience.</p>
            <Link to='/dashboard/trash/codespace' class="flex justify-center items-center bg-gradient-to-br from-[#6dd5ed] to-[#093676] ps-5 pe-3 py-3 rounded-md gap-2">
              <span class="text-white">See Yours</span>
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 ml-1 text-white" viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7"></path>
              </svg>
            </Link>
          </div>
          <div class="col-span-1 hidden md:block h-full w-full mb-10 md:mb-0">
            <img class="object-cover h-[80vh] object-left rounded" alt="hero" src="https://ik.imagekit.io/vituepzjm/trash.png?updatedAt=1735156736090" />
          </div>
        </div>
      </section> */}
      <hr className="md:mx-12" />
      <section id="sharedspace" class="py-24 md:pb-0 relative">
        <div class="w-full mb-6 px-4 md:px-12 lg:px-5 mx-auto">
          <div class="w-full flex-col justify-center items-center lg:gap-14 gap-10 inline-flex">
            <div  data-aos="fade-right"
          data-aos-duration="3000" class="w-full flex-col lg:flex-row md:gap-5 md:mb-12 justify-center md:justify-evenly items-center gap-5 flex">
              <img className='h-auto sm:h-96' src="https://ik.imagekit.io/vituepzjm/Scribby/front_main_hero_together.webp?updatedAt=1725384601380" alt="under maintenance image" />
              <div class="w-fit flex-col justify-center items-center gap-6 flex">
                <div  data-aos="fade-left" data-aos-duration="3000" class="w-fit flex-col justify-start items-center gap-2.5 flex">
                  <h2 class="sm:text-center text-sky-600 text-3xl font-bold leading-normal">Share and collaborate</h2>
                  <p class="text-justify max-w-2xl mb-6 md:mb-12 text-sky-500 text-lg font-medium leading-relaxed">The collaboration feature in Code Space and Web Space allows users to share their code or web space for real-time teamwork. Collaborators can be assigned roles: Viewer, who can only view, and Editor, who can modify and contribute.The sender can switch these roles at any time, offering flexibility in managing the collaboration. This setup fosters a cooperative learning environment, promoting idea exchange and collective problem-solving.With shared editing, code reviews, and instant updates, the collaboration feature strengthens teamwork, improving learning outcomes and the final product</p>
                  <div className="flex items-center gap-6 md:hidden ">
                    <h1 className="px-8 py-3 text-sm font-bold text-black uppercase bg-gray-200 rounded-full">Editor Mode</h1>
                    <h1 className="px-8 py-3 text-sm font-bold text-black uppercase bg-gray-200 rounded-full">Viewer Mode</h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="hidden w-full gap-5 px-12 pb-24 md:flex bg-gradient-to-br from-[#2193b0] via-[#6dd5ed] to-[#093676]">
          <div  data-aos="flip-up"
          data-aos-duration="3000" className="w-1/2 relative rounded-lg group px-6 py-10 flex flex-col items-center justify-center bg-white border-[3.5px] border-dashed border-sky-400">
            <div className="flex flex-col items-center justify-center gap-3 text-justify transition-all text-sky-500">
              <p className="master-mind w-[90%] text-xl">In Viewer mode, collaborators can access and view the shared code or web space but cannot make any edits. This role ensures secure content sharing without altering the original work.</p>
            </div>
            <Link to="/dashboard/shared/list" className="absolute px-8 py-3 mb-5 text-sm font-bold text-white uppercase bg-gradient-to-br from-[#6dd5ed] to-[#093676] rounded-full -top-6 left-5">Editor Mode</Link>
          </div>
          <div  data-aos="fade-down"
          data-aos-duration="3000" className="w-1/2 relative rounded-lg group px-6 py-10 flex flex-col items-center justify-center bg-white border-[3.5px] border-dashed border-sky-400">
            <div className="flex flex-col items-center justify-center gap-3 text-justify transition-all text-sky-500">
              <p className="master-mind w-[90%] text-xl">In Editor mode, collaborators have full access to modify and contribute to the shared code or web space. This role enables real-time collaboration, fostering teamwork and active participation in projects.</p>
            </div>
            <Link to="/dashboard/shared/list" className="absolute px-8 py-3 mb-5 text-sm font-bold text-white uppercase bg-gradient-to-br from-[#6dd5ed] to-[#093676]  rounded-full -top-6 left-5">Viewer Mode</Link>
          </div>
        </div>
      </section>
      <section class="text-sky-600 bg-white">
        <div  data-aos="zoom-in-down"
          data-aos-duration="3000"  class="container px-5 py-24 mx-auto">
                  <div class="flex flex-col text-center items-center justify-center w-full mb-12">
                    <h1 className="px-8 py-3 mb-5 text-sm font-bold bg-white rounded-full text-sky-600">
                      Join With Us{" "}
                    </h1>
                    <h1 class="sm:text-4xl text-2xl lg:font-semibold font-bold title-font mb-4 text-transparent bg-gradient-to-br from-[#093676] via-[#03cefb] to-[#093676] bg-clip-text break-words">
                      Try it now for an efficient and Collabrative experience!
                    </h1>
                    <p class="lg:w-2/3 mx-auto leading-relaxed lg:text-xl">
                      Unlock The future of Learning is seamless and connected.
                    </p>
                    {user ? (
                      <Link
                        to="/dashboard/home"
                        class="flex mt-10 justify-center  items-center bg-white ps-5 pe-3 py-3 rounded-md "
                      >
                        <span class="text-sky-600 font-semibold">Explore More</span>
                        <svg
                          fill="none"
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          class="w-4 h-4 ml-1 text-black"
                          viewBox="0 0 24 24"
                        >
                          <path d="M5 12h14M12 5l7 7-7 7"></path>
                        </svg>
                      </Link>
                    ) : (
                      <Link
                        to="/auth"
                        class="flex mt-10 justify-center  items-center bg-white ps-5 pe-3 py-3 rounded-md "
                      >
                        <span class="text-sky-600 font-semibold">Get Started Now</span>
                        <svg
                          fill="none"
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          class="w-4 h-4 ml-1 text-sky-600"
                          viewBox="0 0 24 24"
                        >
                          <path d="M5 12h14M12 5l7 7-7 7"></path>
                        </svg>
                      </Link>
                    )}
                  </div>
                </div>
              </section>
      <Footer />
      <Toaster />
    </div>
  )
}

export default NeedsSpark