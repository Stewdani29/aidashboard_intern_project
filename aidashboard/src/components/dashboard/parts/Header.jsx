import React from 'react'
import * as Popover from "@radix-ui/react-popover";
import { TiPlusOutline } from "react-icons/ti";
import { TbLayoutSidebarLeftExpand } from "react-icons/tb";
import { IoMdCloudDone, IoMdCodeWorking } from "react-icons/io";
import * as Dialog from "@radix-ui/react-dialog";
import { useUserAuth } from '../../context/UserAuthContext';
import { Link, useLocation, useParams } from 'react-router-dom';
import { useData } from "../../context/DataContext";
import { LuUserSquare2 } from "react-icons/lu";
import { MdLogout, MdOutlineAdminPanelSettings } from 'react-icons/md';
import { MdOutlineGroups } from "react-icons/md";
import { AdminEmail, AdminUSerid } from '../../../common/links';
import { IoCloudOfflineSharp } from 'react-icons/io5';

function Header({ logOut, isDropdownOpen, setIsDropdownOpen, open, setOpen }) {
    const { id } = useParams();
    const { user } = useUserAuth();
    const location = useLocation();
    const { isSaving, isGenerating, reloadSpaces, setReloadSpaces, setNewOpen, setisCodeOpen, isCodeOpen, spaces, webspaces, isLoading, isFetching, setReloadShared, reloadShared } = useData();
    return (
        <div className="items-center justify-between h-[8vh] px-4 pt-5 pb-5 bg-white flex space-x-4 text-sky-600 body-font w-full top-0 z-[9999999999] bg-white/20 rounded-lg shadow-md backdrop-blur-sm border border-white/30">
            <div className="flex items-center gap-3 sm:gap-6">
                <button onClick={() => setOpen(true)} className="transition-all active:scale-95" >
                    <TbLayoutSidebarLeftExpand className="text-sky-500 size-7" />
                    {/* <RxHamburgerMenu className="text-gray-600 size-6 md:hidden" /> */}
                </button>

                <Dialog.Root open={open} >
                    <Dialog.Portal>
                        <Dialog.Overlay onClick={() => { setOpen(!open) }} className="bg-blackA6 z-[1000] data-[state=open]:left-0 left-[-50%] fixed inset-0" />
                        <Dialog.Content className="z-[10000] h-screen data-[state=open]:animate-enterFromLeft fixed top-0 left-0 w-[75%] max-w-[400px] bg-white focus:outline-none">
                            <div className="flex items-end justify-between px-11 pt-11 pb-11">
                                <h1 className="px-1 pt-4 pb-6 text-2xl font-semibold text-sky-600">Spaces List</h1>
                            </div>
                            <div className="block overflow-auto px-4 pb-4 h-[90vh]">

                                {spaces.length > 0 && <div className={` items-end ms-1 flex pb-2 justify-between`}>
                                    <h1 className="text-base font-normal text-sky-600 ">CodeSpaces</h1>
                                    <Link onClick={() => { setOpen(!open) }} to="/dashboard/space/list" className='mb-1 text-sm underline text-skyy-600 underline-offset-2' >see all</Link>
                                </div>}
                                <div className={`w-full flex gap-3 min-h-[20vh] flex-col ${(spaces.length === 0 && webspaces.length === 0) ? 'hidden' : 'block'} `}>
                                    {spaces.length > 0 && spaces.slice(0, 3).map((item, index) => (
                                        item.spaceid !== id ? (
                                            <Link
                                                key={index}
                                                onClick={() => setOpen(!open)}
                                                to={`/dashboard/space/info/${item.spaceid}`}
                                                className="w-full p-3 bg-gray-200 border-2 rounded-lg text-sky-500"
                                            >
                                                <h1>{item.spaceid}</h1>
                                                <p>{item.heading}</p>
                                            </Link>
                                        ) : (
                                            <div
                                                key={index}
                                                className="w-full p-3 bg-white border-2 rounded-lg text-sky-500"
                                            >
                                                <h1>{item.spaceid}</h1>
                                                <p>{item.heading}</p>
                                            </div>
                                        )
                                    ))}

                                </div>
                                {webspaces.length > 0 && <div className={`items-end ms-1 mt-5 flex pb-2 justify-between`}>
                                    <h1 className="text-base font-normal text-sky-600 ">WebSpaces</h1>
                                    <Link onClick={() => { setOpen(!open) }} to="/dashboard/webspace/list" className='mb-1 text-sm underline text-sky-600 underline-offset-2' >see all</Link>
                                </div>}
                                <div className={`w-full flex gap-3 min-h-[20vh] flex-col ${(spaces.length == 0 && webspaces.length == 0) ? 'hidden' : 'block'} `}>
                                    {webspaces.slice(0, 3).map((item, index) => (
                                        item.spaceid !== id ? (
                                            <Link
                                                key={index}
                                                onClick={() => setOpen(!open)}
                                                to={`/dashboard/webspace/info/${item.spaceid}`}
                                                className="p-3 bg-gray-200 border-2 rounded-lg text-sky-600"
                                            >
                                                <h1>{item.spaceid}</h1>
                                                <p>{item.heading}</p>
                                            </Link>
                                        ) : (
                                            <div
                                                key={index}
                                                className="p-5 text-white border-2 rounded-lg bg-sky-500"
                                            >
                                                <h1>{item.spaceid}</h1>
                                                <p>{item.heading}</p>
                                            </div>
                                        )
                                    ))}
                                </div>
                                {(spaces.length == 0 && webspaces.length == 0) && <div>
                                    <div className="h-[80vh] gap-3 flex flex-col text-sky-700 items-center justify-center">
                                        <img src="https://ik.imagekit.io/vituepzjm/undraw_taken_re_yn20.svg?updatedAt=1724617636363" alt="nothing to show" className="size-32" />
                                        <h1 className="text-base text-center break-words">No CodeSpaces (or) WebSpaces <br /> are available.</h1>
                                    </div>
                                </div>}
                            </div>
                        </Dialog.Content>
                    </Dialog.Portal>
                </Dialog.Root>
                <Link to="/dashboard/home" className="flex items-center">
                    <img src="../../assets/logowebweave.png" alt="Webweave" className="h-7" />
                    <h1 className="text-xl font-semibold ms-2 text-sky-500"><p className="hidden md:block">Webweave</p></h1>
                </Link>
                {(location.pathname.includes('dashboard/home') || location.pathname.includes('dashboard/profile')) && <Link to="/dashboard/space/list" className="text-sky-600" >
                    <p className="hidden text-xl sm:block ">CodeSpaces</p>
                </Link>}
                {(location.pathname.includes('dashboard/home') || location.pathname.includes('dashboard/profile')) && <Link to="/dashboard/webspace/list" className="text-sky-600" >
                    <p className="hidden text-xl sm:block ">WebSpaces</p>
                </Link>}
                {(location.pathname.includes('dashboard/webspace/list') || location.pathname.includes('dashboard/space/new') || location.pathname.includes('dashboard/trash/codespace') || location.pathname.includes('dashboard/shared') && !location.pathname.includes("/dashboard/shared/webspace") && !location.pathname.includes("/dashboard/shared/codespace")) && <Link to="/dashboard/space/list" className="text-sky-600" >
                    <p className="hidden text-xl sm:block ">CodeSpaces</p>
                </Link>}
                {(location.pathname.includes('dashboard/space/list') || location.pathname.includes('dashboard/webspace/new') || location.pathname.includes('dashboard/trash/webspace') || location.pathname.includes('dashboard/shared') && !location.pathname.includes("/dashboard/shared/webspace") && !location.pathname.includes("/dashboard/shared/codespace")) && <Link to="/dashboard/webspace/list" className="text-sky-600" >
                    <p className="hidden text-xl sm:block ">WebSpaces</p>
                </Link>}
                {/* <Link to="/dashboard/space/list" className="text-black" >
                    <p className="hidden text-base underline sm:block underline-offset-2">CodeSpaces</p>
                </Link>
                <Link to="/dashboard/webspace/list" className="text-black" >
                    <p className="hidden text-base underline sm:block underline-offset-2">WebSpaces</p>
                </Link> */}
            </div>
            <div className="flex items-center gap-2 md:gap-3">

                {location.pathname.includes("space") && <button onClick={() => { setisCodeOpen(!isCodeOpen) }} className="p-2 transition-all md:hidden active:scale-95" >
                    <IoMdCodeWorking className="text-2xl" />
                </button>}

                {!location.pathname.match(/\/dashboard\/space\/([a-f0-9-]+)/i) && !location.pathname.match(/\/dashboard\/webspace\/([a-f0-9-]+)/i) && !location.pathname.includes("shared") && <button disabled={isFetching} onClick={() => { setReloadSpaces(!reloadSpaces) }} className="p-2 transition-all rounded-lg bg-sky-500 disabled:opacity-60 disabled:brightness-75 disabled:cursor-not-allowed active:scale-95" >
                    <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="text-base transition-all group-active:animate-spin text-white" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M19.933 13.041a8 8 0 1 1 -9.925 -8.788c3.899 -1 7.935 1.007 9.425 4.747"></path><path d="M20 4v5h-5"></path></svg>
                </button>}

                {(!location.pathname.match(/\/dashboard\/space\/([a-f0-9-]+)/i) && !location.pathname.match(/\/dashboard\/webspace\/([a-f0-9-]+)/i) && location.pathname.includes("shared") && !location.pathname.includes("/dashboard/shared/webspace") && !location.pathname.includes("/dashboard/shared/codespace")) && <button disabled={isLoading} onClick={() => { setReloadShared(!reloadShared) }} className="p-2 transition-all rounded-lg bg-sky-500 y-200 disabled:opacity-60 disabled:cursor-not-allowed active:scale-95" >
                    <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="text-base transition-all group-active:animate-spin text-white" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M19.933 13.041a8 8 0 1 1 -9.925 -8.788c3.899 -1 7.935 1.007 9.425 4.747"></path><path d="M20 4v5h-5"></path></svg>
                </button>}

                {(!location.pathname.match(/\/dashboard\/space\/([a-f0-9-]+)/i) && !location.pathname.match(/\/dashboard\/webspace\/([a-f0-9-]+)/i)) && <button onClick={() => setNewOpen(true)} className="inline-flex active:scale-95 transition-all p-2 md:px-2.5 md:py-1.5 bg-sky-500 text-white rounded-lg items-center justify-center gap-1" >
                    <TiPlusOutline className="text-lg md:text-base" />  <p className="hidden sm:block">New Space</p>
                </button>}

                {(location.pathname.match(/\/dashboard\/space\/([a-f0-9-]+)/i) || location.pathname.match(/\/dashboard\/webspace\/([a-f0-9-]+)/i)) && <button className=" p-1.5 bg-sky-500 rounded-lg">
                    {isSaving || isLoading || isGenerating ? <IoCloudOfflineSharp title="data not synced with cloud" className="text-xl text-yellow-600 md:text-2xl" /> : <IoMdCloudDone title="data synced with cloud" className="text-xl text-green-600 md:text-2xl" />}
                </button>}

                <Popover.Root>
                    <Popover.Trigger asChild>
                        <button
                            onClick={() => {
                                setIsDropdownOpen(!isDropdownOpen);
                            }}
                            className="flex items-center gap-2 transition-all cursor-pointer w-fit active:scale-95"
                        >
                            <div className="relative flex items-center justify-center text-2xl text-center text-white border rounded-lg size-11 border-sky-700 md:text-3xl">
                                <img
                                    src={user?.photoURL || 'https://xsgames.co/randomusers/assets/avatars/pixel/51.jpg'}
                                    alt="user_logo"
                                    className="rounded-md size-9 bg-sky-500"
                                />
                            </div>
                        </button>
                    </Popover.Trigger>
                    <Popover.Portal>
                        <Popover.Content
                            className="grid grid-cols-1 me-4 px-5 py-5 z-[10000] gap-3 rounded-lg mt-2 dark:bg-sky-600 bg-white w-fit border border-gray-200 shadow-lg will-change-[transform,opacity] data-[state=open]:data-[side=top]:animate-slideDownAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade"
                            sideOffset={3}
                        >
                            <Link to="/dashboard/profile" className="flex flex-col items-center text-sky-700 dark:text-gray-200">
                                <img
                                    src={user?.photoURL || 'https://xsgames.co/randomusers/assets/avatars/pixel/51.jpg'}
                                    alt="user_logo"
                                    className="rounded-full shadow-md size-14 bg-sky-600"
                                />
                                <h1 className="mt-2 text-[1rem] font-semibold truncate text-center">{user.displayName}</h1>
                                <p className="text-[.8rem] text-sky-500 dark:text-sky-800">{user.uid}</p>
                            </Link>

                            {AdminUSerid.includes(user.uid) && <div className="">
                                <Link
                                    to="/dashboard/admin/spaces"
                                    className={`flex items-center justify-center gap-1 px-3 py-2 text-center text-sm font-medium rounded-lg transition-all ${location.pathname.includes('admin')
                                        ? 'bg-sky-700 text-white shadow-lg'
                                        : 'text-sky-700 bg-gray-100 '
                                        }`}
                                    role="menuitem"
                                    onClick={() => setIsDropdownOpen(false)}
                                >
                                    <MdOutlineAdminPanelSettings className='text-xl' /> Admin Spaces
                                </Link>
                            </div>}
                            <div className="">
                                <Link
                                    to="/dashboard/shared/list"
                                    className={`flex items-center justify-center gap-1 px-3 py-2 text-center text-sm font-medium rounded-lg transition-all ${location.pathname.includes('shared') && !location.pathname.includes("/dashboard/shared/webspace/view")
                                        ? 'bg-sky-600 text-white shadow-lg'
                                        : 'text-sky-700 bg-gray-100'
                                        }`}
                                    role="menuitem"
                                    onClick={() => setIsDropdownOpen(false)}
                                >
                                    <MdOutlineGroups className='text-xl' /> Shared Space
                                </Link>
                            </div>

                            <hr className="mt-2 mb-2 border-gray-300 dark:border-sky-700" />

                            <div role="menu" aria-orientation="vertical" aria-labelledby="user-menu">
                                <div className="block mb-2 md:hidden">
                                    <Link
                                        to="/dashboard/space/list"
                                        className={`flex items-center justify-center gap-1 px-3 py-2 text-center text-sm font-medium rounded-lg transition-all ${location.pathname.includes('dashboard/space/list')
                                            ? 'bg-sky-600 text-white shadow-lg'
                                            : 'text-sky-700 bg-gray-100'
                                            }`}
                                        role="menuitem"
                                        onClick={() => setIsDropdownOpen(false)}
                                    >
                                        CodeSpaces
                                    </Link>
                                </div>
                                <div className="block mb-2 md:hidden">
                                    <Link
                                        to="/dashboard/webspace/list"
                                        className={`flex items-center justify-center gap-1 px-3 py-2 text-center text-sm font-medium rounded-lg transition-all ${location.pathname.includes('dashboard/webspace/list')
                                            ? 'bg-sky-700 text-white shadow-lg'
                                            : 'text-sky-700 bg-gray-100'
                                            }`}
                                        role="menuitem"
                                        onClick={() => setIsDropdownOpen(false)}
                                    > WebSpaces
                                    </Link>
                                </div>
                                <div className="grid grid-cols-2 gap-2 mb-2">
                                    {[
                                        { to: '/dashboard/trash/codespace', label: 'CodeTrash' },
                                        { to: '/dashboard/trash/webspace', label: 'WebTrash' },
                                    ].map((item, index) => (
                                        <Link
                                            key={index}
                                            to={item.to}
                                            className={`inline-flex items-center justify-center gap-1 w-full px-3 py-2 text-center text-sm font-medium rounded-lg transition-all ${location.pathname.includes(item.to)
                                                ? 'bg-sky-700 text-white shadow-lg'
                                                : 'text-sky-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-sky-800'
                                                }`}
                                            role="menuitem"
                                            onClick={() => setIsDropdownOpen(false)}
                                        >
                                            {item.label}
                                        </Link>
                                    ))}
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                    <Link
                                        to="/dashboard/profile"
                                        className={`flex items-center justify-center gap-1 px-3 py-2 text-center text-sm font-medium rounded-lg transition-all ${location.pathname.includes('profile')
                                            ? 'bg-sky-700 text-white shadow-lg'
                                            : 'text-sky-700 dark:text-sky-200 hover:bg-sky-100 dark:hover:bg-sky-800'
                                            }`}
                                        role="menuitem"
                                        onClick={() => setIsDropdownOpen(false)}
                                    >
                                        <LuUserSquare2 /> Profile
                                    </Link>
                                    <button
                                        onClick={() => {
                                            localStorage.removeItem('Webweave');
                                            logOut();
                                            window.location.href = '/home';
                                        }}
                                        className="flex items-center justify-center gap-1 px-3 py-2 text-sm font-medium text-center text-white transition-all rounded-lg bg-sky-600 hover:bg-sky-800"
                                        role="menuitem"
                                    >
                                        <MdLogout /> Sign Out
                                    </button>

                                </div>
                            </div>
                            <Popover.Arrow className="fill-sky-800 -ms-3" />
                        </Popover.Content>
                    </Popover.Portal>
                </Popover.Root>
            </div>
        </div>
    )
}

export default Header