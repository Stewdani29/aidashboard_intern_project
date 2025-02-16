import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useData } from "../../context/DataContext";
import { LANGUAGE_VERSIONS } from "../../../constants";
import { getUniqueLanguages, ParseAIDate } from "../../../common/methods";
import * as Popover from "@radix-ui/react-popover";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { HiTrash } from "react-icons/hi";
import { Toaster } from "react-hot-toast";
import { PiEmptyBold } from "react-icons/pi";
import { FaFilter } from "react-icons/fa6";

const SpacesList = () => {
    const {
        setpromptLang,
        setSearchPrompt,
        searchPrompt,
        promptLang,
        spaces,
        handleDeleteCodeSpace,
        isCodeSpaceDeleting,
        results, setResults,
        setNewOpen
    } = useData();

    const availableLangs = getUniqueLanguages(spaces);

    useEffect(() => {
        filterSpaces();
    }, [searchPrompt, promptLang, spaces]);

    const filterSpaces = () => {
        let filtered = spaces;

        if (searchPrompt) {
            filtered = filtered.filter(
                (space) =>
                    space.heading.toLowerCase().includes(searchPrompt.toLowerCase()) ||
                    space?.language.toLowerCase().includes(searchPrompt.toLowerCase())
            );
        } else if (promptLang?.trim()) {
            filtered = filtered.filter((space) => space?.language === promptLang);
        }

        setResults(filtered);
    };


    const renderSpaceCard = (space) => (
        <div key={space.spaceid} className="">
            <img
                src={LANGUAGE_VERSIONS[space?.language.toLowerCase()]?.banner || "https://via.placeholder.com/50"}
                alt={space?.language}
                className="object-cover w-full h-32 rounded-t-xl"
            />
            <div className="relative block px-5 pt-3 pb-5 transition-all duration-300 transform bg-white border rounded-b-lg shadow-md hover:shadow-lg border-sky-600 "
            >
                <div className="flex items-center justify-between mb-4">
                    <Link to={`/dashboard/space/info/${space.spaceid}`} className="flex items-center">
                        <img
                            src={LANGUAGE_VERSIONS[space?.language.toLowerCase()]?.image || "https://via.placeholder.com/50"}
                            alt={space?.language}
                            className="object-cover p-1 size-10 rounded-xl"
                        />
                        <div className="ml-3">
                            <h2 className="text-[0.9rem] leading-relaxed line-clamp-1 me-6 font-semibold text-sky-600 group-hover:text-sky-900">
                                {space.heading}
                            </h2>
                            <p className="text-xs leading-relaxed line-clamp-1 text-sky-500">{space.spaceid}</p>
                        </div>
                    </Link>

                    <AlertDialog.Root>
                        <AlertDialog.Trigger asChild>
                            <button
                                disabled={isCodeSpaceDeleting}
                                className="p-1 text-red-500 transition-all bg-red-100 rounded-md disabled:opacity-50 active:scale-95"
                            >
                                <HiTrash className="text-xl" />
                            </button>
                        </AlertDialog.Trigger>
                        <AlertDialog.Portal>
                            <AlertDialog.Overlay className="bg-sky-800 data-[state=open]:animate-overlayShow fixed inset-0" />
                            <AlertDialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] z-50 rounded-[6px] bg-white p-[25px] shadow-lg focus:outline-none">
                                <AlertDialog.Title className="m-0 text-xl font-semibold text-red-600">
                                    Are you absolutely sure?
                                </AlertDialog.Title>
                                <AlertDialog.Description className="text-sky-600 mt-3 mb-5 text-[15px] leading-normal">
                                    This action cannot be undone. This will move{" "}
                                    <span className="font-semibold capitalize text-sky-700">
                                        {space?.language} CodeSpace
                                    </span>{" "}
                                    on <span className="font-semibold text-sky-700">{space.heading}</span> to the Trash
                                    page. You can restore it anytime.
                                </AlertDialog.Description>
                                <div className="flex justify-start gap-[25px]">
                                    <AlertDialog.Action asChild>
                                        <button
                                            onClick={() => handleDeleteCodeSpace(space)}
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
        <div className="w-full min-h-screen px-6 py-6 bg-gray-50">
            <div className="flex items-center justify-between w-full mb-10">
                <h1 className="hidden text-2xl font-semibold text-sky-600 md:block ms-3 me-10">
                    Your&nbsp;CodeSpaces
                </h1>
                <div className="flex items-center md:max-w-[500px] w-full">
                    <input
                        type="search"
                        onChange={(e) => setSearchPrompt(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-sky-900 text-sm rounded-lg focus:ring-sky-800 focus:border-sky-600 block w-full pl-3 p-2.5"
                        placeholder="Search for your CodeSpaces.."
                    />
                    <Popover.Root>
                        <Popover.Trigger asChild>
                            <button className="p-2.5 relative ml-2 text-sm font-medium text-white bg-sky-500 rounded-lg border border-sky-600 transition-all active:scale-95">
                                <FaFilter className="text-[1rem] mt-1" />
                                {promptLang !== "" && <div className="absolute bg-green-400 rounded -top-1 -right-1 size-3"></div>}
                            </button>
                        </Popover.Trigger>
                        <Popover.Portal>
                            <Popover.Content
                                sideOffset={10}
                                side="bottom"
                                className="z-[100] rounded-lg px-5 py-4 bg-white focus:outline-none border border-sky-300 shadow-lg w-fit"
                            >
                                <div className="pb-3">
                                    <h1 className="mb-3 text-sky-700">Language</h1>
                                    <div className="grid grid-cols-3 gap-3 place-items-center">
                                        <button onClick={() => setpromptLang('')} className="p-2 bg-gray-100 border rounded-md text-sky-400">
                                            <PiEmptyBold />
                                        </button>
                                        {availableLangs.map((item, index) => (
                                            <button
                                                key={index}
                                                onClick={() => setpromptLang(item)}
                                                className={` rounded-md ${item == promptLang ? 'border border-gray-500' : ''} p-1`}
                                            >
                                                <img src={LANGUAGE_VERSIONS[item]?.image || "https://via.placeholder.com/50"} alt={item} className="size-6" />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <Popover.Arrow className="fill-sky-500" />
                            </Popover.Content>
                        </Popover.Portal>
                    </Popover.Root>
                </div>
            </div>
            <div className="container mx-auto">
                {results.length > 0 && (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {results.map((space) => renderSpaceCard(space))}
                    </div>
                )}
                {results.length < 1 && spaces.length > 0 && (
                    <div className="flex flex-col items-center justify-center h-[70vh]">
                        <img
                            src="https://ik.imagekit.io/vituepzjm/undraw_empty_re_opql.svg?updatedAt=1732993642328"
                            alt="Nothing to show"
                            className="w-40 mb-6"
                        />
                        <h2 className="text-base italic break-words text-sky-500">No CodeSpaces are found matching given context.</h2>

                    </div>
                )}
                {spaces.length < 1 && <div className="flex flex-col items-center justify-center h-[70vh]">
                    <img
                        src="https://ik.imagekit.io/vituepzjm/undraw_taken_re_yn20.svg?updatedAt=1724617636363"
                        alt="Nothing to show"
                        className="w-32 mb-6"
                    />
                    <h2 className="text-xl font-medium text-sky-600">No CodeSpaces are available</h2>
                    <p className="mt-2 text-sm text-center text-sky-500">
                        Create a new CodeSpace to organize your projects and collaborate efficiently.
                    </p>
                    <button
                        onClick={() => setNewOpen(true)}
                        className="px-5 py-2 mt-6 text-white transition rounded-lg shadow bg-sky-600 hover:bg-sky-700"
                    >
                        Create a CodeSpace
                    </button>
                </div>}
            </div>
            <Toaster />
        </div>
    );
};

export default SpacesList;
