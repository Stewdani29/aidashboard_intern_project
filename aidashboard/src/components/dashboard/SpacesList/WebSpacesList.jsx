import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useData } from "../../context/DataContext";
import { LANGUAGE_VERSIONS } from "../../../constants";
import { getUniqueWebLanguages, ParseAIDate } from "../../../common/methods";
import * as Popover from "@radix-ui/react-popover";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { HiTrash } from "react-icons/hi";
import { Toaster } from "react-hot-toast";
import { PiEmptyBold } from "react-icons/pi";
import { FaFilter } from "react-icons/fa6";

const WebSpacesList = () => {
    const {
        setwebpromptLang,
        setWebSearchPrompt,
        websearchPrompt,
        webpromptLang,
        webspaces,
        handleDeleteWebSpace,
        isWebSpaceDeleting,
        webresults,
        setWebResults, setNewOpen
    } = useData();


    const availableLangs = getUniqueWebLanguages(webspaces);

    useEffect(() => {
        filterSpaces();
    }, [websearchPrompt, webpromptLang, webspaces]);

    const filterSpaces = () => {
        let filtered = webspaces;

        if (websearchPrompt) {
            filtered = filtered.filter(
                (space) =>
                    space.heading.toLowerCase().includes(websearchPrompt.toLowerCase()) ||
                    space.frameworks.toLowerCase().includes(websearchPrompt.toLowerCase())
            );
        } else if (webpromptLang?.trim()) {
            filtered = filtered.filter((space) => space.frameworks === webpromptLang);
        }

        setWebResults(filtered);
    };

    const renderSpaceCard = (space) => (
        <div key={space.spaceid} className="">
            <img
                src={LANGUAGE_VERSIONS[space.frameworks]?.banner || "https://via.placeholder.com/50"}
                alt={space.frameworks}
                className="object-cover w-full h-32 rounded-t-xl"
            />
            <div
                className="relative block px-5 pt-3 pb-5 transition-all duration-300 transform bg-white border border-gray-200 rounded-b-lg shadow-md hover:shadow-lg"
            >
                <div className="flex items-center justify-between mb-4">
                    <Link to={`/dashboard/webspace/info/${space.spaceid}`} className="flex items-center">
                        <img
                            src={LANGUAGE_VERSIONS[space.frameworks]?.image || "https://via.placeholder.com/50"}
                            alt={space.frameworks}
                            className="object-cover w-8"
                        />
                        <div className="ml-3">
                            <h2 className="text-[0.9rem]leading-relaxed line-clamp-1 font-semibold text-sky-700 group-hover:text-sky-900">
                                {space.heading.slice(0, 30)}
                            </h2>
                            <p className="text-xs leading-relaxed text-sky-500 line-clamp-1">{space.spaceid}</p>
                        </div>
                    </Link>

                    <AlertDialog.Root>
                        <AlertDialog.Trigger asChild>
                            <button
                                disabled={isWebSpaceDeleting}
                                className="p-1 text-red-500 transition-all bg-red-100 rounded-md disabled:opacity-50 active:scale-95"
                            >
                                <HiTrash className="text-xl" />
                            </button>
                        </AlertDialog.Trigger>
                        <AlertDialog.Portal>
                            <AlertDialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" />
                            <AlertDialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] z-50 rounded-[6px] bg-white p-[25px] shadow-lg focus:outline-none">
                                <AlertDialog.Title className="m-0 text-xl font-semibold text-red-600">
                                    Are you absolutely sure?
                                </AlertDialog.Title>
                                <AlertDialog.Description className="text-sky-600 mt-3 mb-5 text-[15px] leading-normal">
                                    This action cannot be undone. This will move{" "}
                                    <span className="font-semibold capitalize text-sky-700">
                                        {space.type} WebSpace
                                    </span>{" "}
                                    on <span className="font-semibold text-sky-700">{space.heading}</span> to the Trash
                                    page. You can restore it anytime.
                                </AlertDialog.Description>
                                <div className="flex justify-start gap-[25px]">
                                    <AlertDialog.Action asChild>
                                        <button
                                            onClick={() => handleDeleteWebSpace(space)}
                                            className="bg-red-500 text-white hover:bg-red-600 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none"
                                        >
                                            Move to Trash
                                        </button>
                                    </AlertDialog.Action>
                                    <AlertDialog.Cancel asChild>
                                        <button className="bg-gray-200 hover:bg-gray-300 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none">
                                            Cancel
                                        </button>
                                    </AlertDialog.Cancel>
                                </div>
                            </AlertDialog.Content>
                        </AlertDialog.Portal>
                    </AlertDialog.Root>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-sky-600 line-clamp-2">
                    {space.explanation || "No description available for this space."}
                </p>
            </div>
        </div>
    );

    return (
        <div className="w-full min-h-screen px-6 py-6 bg-gradient-to-br from-[#2193b0] to-[#6dd5ed]">
            <div className="flex items-center justify-between w-full mb-10">
                <h1 className="hidden text-2xl font-semibold text-white md:block ms-3 me-10">
                    Your&nbsp;WebSpaces
                </h1>
                <div className="flex items-center md:max-w-[500px] w-full">
                    <input
                        type="search"
                        onChange={(e) => setWebSearchPrompt(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-sky-200 text-sm rounded-lg focus:ring-white focus:border-white block w-full pl-3 p-2.5"
                        placeholder="Search for your WebSpaces.."
                    />
                    <Popover.Root>
                        <Popover.Trigger asChild>
                            <button className="p-2.5 relative ml-2 text-sm font-medium text-sky-500 bg-white rounded-lg border border-white transition-all active:scale-95">
                                <FaFilter className="text-[1rem] mt-1" />
                                {webpromptLang !== "" && <div className="absolute bg-green-400 rounded -top-1 -right-1 size-3"></div>}
                            </button>
                        </Popover.Trigger>
                        <Popover.Portal>
                            <Popover.Content
                                sideOffset={10}
                                side="bottom"
                                className="z-[100] rounded-lg px-5 py-4 bg-white focus:outline-none border border-gray-300 shadow-lg w-fit"
                            >
                                <div className="pb-3">
                                    <h1 className="mb-3 text-white">Language</h1>
                                    <div className="grid grid-cols-3 gap-3 place-items-center">
                                        <button onClick={() => setwebpromptLang('')} className="p-2 text-gray-400 bg-gray-100 border rounded-md">
                                            <PiEmptyBold />
                                        </button>
                                        {availableLangs.map((item, index) => (
                                            <button
                                                title={item}
                                                key={index}
                                                onClick={() => setwebpromptLang(item)}
                                                className={` rounded-md ${item == webpromptLang ? 'border border-gray-500' : ''} p-1`}
                                            >
                                                <img src={LANGUAGE_VERSIONS[item]?.image || "https://via.placeholder.com/50"} alt={item} className="w-6" />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <Popover.Arrow className="fill-main/50" />
                            </Popover.Content>
                        </Popover.Portal>
                    </Popover.Root>
                </div>
            </div>
            <div className="container mx-auto">
                {webresults.length > 0 && (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {webresults.map((space) => renderSpaceCard(space))}
                    </div>
                )}
                {webresults.length < 1 && webspaces.length > 0 && (
                    <div className="flex flex-col items-center justify-center h-[70vh]">
                        <img
                            src="https://ik.imagekit.io/vituepzjm/undraw_empty_re_opql.svg?updatedAt=1732993642328"
                            alt="Nothing to show"
                            className="w-40 mb-6"
                        />
                        <h2 className="text-base italic text-white break-words">No WebSpaces are found matching given context.</h2>

                    </div>
                )}
                {webspaces.length < 1 && <div className="flex flex-col items-center justify-center h-[70vh]">
                    <img
                        src="https://ik.imagekit.io/vituepzjm/undraw_taken_re_yn20.svg?updatedAt=1724617636363"
                        alt="Nothing to show"
                        className="w-32 mb-6"
                    />
                    <h2 className="text-xl font-medium text-white">No WebSpaces are available</h2>
                    <p className="mt-2 text-sm text-center text-white">
                        Create a new WebSpace to organize your projects and collaborate efficiently.
                    </p>
                    <button onClick={() => setNewOpen(true)}
                        className="px-5 py-2 mt-6 transition bg-white rounded-lg shadow text-sky-600 hover:bg-white/80"
                    >
                        Create a WebSpace
                    </button>
                </div>}
            </div>
            <Toaster />
        </div>
    );
};

export default WebSpacesList;
