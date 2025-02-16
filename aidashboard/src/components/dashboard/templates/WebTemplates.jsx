import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useData } from "../../context/DataContext";
import { LANGUAGE_VERSIONS } from "../../../constants";
import { getUniqueWebLanguages } from "../../../common/methods";
import * as Popover from "@radix-ui/react-popover";
import * as Dialog from "@radix-ui/react-dialog";
import { Toaster } from "react-hot-toast";
import { PiEmptyBold } from "react-icons/pi";
import { FaFilter } from "react-icons/fa6";

const WebTemplates = () => {
    const {
        setpromptLang,
        setSearchPrompt,
        searchPrompt,
        promptLang,
        webspacestemplates,
        results,
        setResults,
        isLoading,
        handleWebTemplateAdd
    } = useData();

    const availableLangs = getUniqueWebLanguages(webspacestemplates);

    useEffect(() => {
        filterSpaces();
    }, [searchPrompt, promptLang, webspacestemplates]);

    const filterSpaces = () => {
        let filtered = webspacestemplates;

        if (searchPrompt) {
            filtered = filtered.filter(
                (space) =>
                    space.heading.toLowerCase().includes(searchPrompt.toLowerCase()) ||
                    space.frameworks.toLowerCase().includes(searchPrompt.toLowerCase())
            );
        } else if (promptLang?.trim()) {
            filtered = filtered.filter((space) => space.frameworks === promptLang);
        }

        setResults(filtered);
    };


    const renderSpaceCard = (space) => (
        <div key={space.heading} className="block p-4 transition bg-white rounded-lg shadow hover:shadow-md">
            <Dialog.Root >
                <Dialog.Trigger asChild>
                    <img src={LANGUAGE_VERSIONS[space.frameworks]?.banner || "https://via.placeholder.com/50"} alt={space.frameworks} className="w-full h-32 mb-3 transition-all rounded-lg shadow-md cursor-pointer active:scale-95" />
                </Dialog.Trigger>
                <Dialog.Portal>
                    <Dialog.Overlay className="fixed inset-0 bg-blackA6 data-[state=open]:animate-overlayShow" />
                    <Dialog.Content className="fixed top-1/2 left-1/2 max-h-[80vh] w-[90vw] max-w-[1000px] transform -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white shadow-md focus:outline-none p-6 z-50">
                        <div className="flex flex-col gap-6 md:flex-row">
                            <div className="flex items-center justify-center flex-1">
                                <img
                                    src={LANGUAGE_VERSIONS[space.frameworks]?.banner || "https://via.placeholder.com/50"}
                                    alt={space.frameworks}
                                    className="object-cover object-center w-full rounded-lg h-36 md:h-72"
                                />
                            </div>

                            <div className="flex flex-col flex-1">
                                <h1 className="mb-3 text-xl font-semibold md:text-2xl text-sky-800">Add this to Your WebSpace</h1>
                                <h2 className="text-lg font-medium line-clamp-1 text-sky-800">{space.heading}</h2>
                                <p className="mb-3 font-normal text-sky-500 line-clamp-4">{space.explanation}</p>
                                <div className="flex items-center justify-start gap-3">
                                    <h1 className="px-2 py-1 text-sm border rounded border-sky-600 text-sky-600">5 videos</h1>
                                    <h2 className="px-3 py-1 text-sm text-white uppercase rounded-md bg-sky-600">{space.frameworks}</h2>
                                </div>
                                <div className="flex flex-col gap-4 mt-4">
                                    <div className="flex justify-end gap-4 mt-6">
                                        <Dialog.Close asChild>
                                            <button
                                                type="button"
                                                className="px-6 py-2 rounded-lg bg-sky-200 text-sky-800"
                                            >
                                                Cancel
                                            </button>
                                        </Dialog.Close>
                                        <Dialog.Close asChild>
                                            <button
                                                type="button"
                                                disabled={isLoading}
                                                onClick={() => handleWebTemplateAdd(space)}
                                                className="hidden px-6 py-2 text-white rounded-lg bg-sky-600 md:block disabled:opacity-60 disabled:cursor-not-allowed"
                                            >
                                                Add to My WebSpace
                                            </button>
                                        </Dialog.Close>
                                        <Dialog.Close asChild>
                                            <button
                                                type="button"
                                                disabled={isLoading}
                                                onClick={() => handleWebTemplateAdd(space)}
                                                className="px-6 py-2 text-white rounded-lg bg-sky-600 md:hidden disabled:opacity-60 disabled:cursor-not-allowed"
                                            >
                                                Add Space
                                            </button>
                                        </Dialog.Close>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>
            <span className="flex items-center justify-between w-full gap-5 mb-2">
                <h2 className="text-lg font-semibold text-sky-800 line-clamp-1">{space.heading}</h2>
                <p className="text-xs font-normal capitalize text-white bg-sky border border-sky px-2 py-0.5 rounded-md">{space.frameworks}</p>
            </span>
            <p className="text-sm font-light leading-6 line-clamp-2">{space.explanation}</p>
        </div>

    );

    return (
        <div className="w-full min-h-screen px-6 py-6 bg-gray-50">
            <div className="flex items-center justify-between w-full mb-10">
                <h1 className="hidden text-2xl font-semibold text-sky-500 md:block ms-3 me-10">
                    WebSpace&nbsp;Templates
                </h1>
                <div className="flex items-center md:max-w-[500px] w-full">
                    <input
                        type="search"
                        onChange={(e) => setSearchPrompt(e.target.value)}
                        className="bg-gray-50 border border-sky-600 text-sky-900 text-sm rounded-lg focus:ring-sky-600 focus:border-sky-500 block w-full pl-3 p-2.5"
                        placeholder="Search for your Web Templates.."
                    />
                    <Popover.Root>
                        <Popover.Trigger asChild>
                            <button className="p-2.5 relative ml-2 text-sm font-medium text-white bg-sky-700 rounded-lg border border-sky-700 transition-all active:scale-95">
                                <FaFilter className="text-[1rem] mt-1" />
                                {promptLang !== "" && <div className="absolute bg-green-400 rounded -top-1 -right-1 size-3"></div>}
                            </button>
                        </Popover.Trigger>
                        <Popover.Portal>
                            <Popover.Content
                                sideOffset={10}
                                side="bottom"
                                className="z-[100] rounded-lg px-5 py-4 bg-white focus:outline-none border border-gray-300 shadow-lg w-fit"
                            >
                                <div className="pb-3">
                                    <h1 className="mb-3 text-sky-700">Language</h1>
                                    <div className="grid grid-cols-3 gap-3 place-items-center">
                                        <button onClick={() => setpromptLang('')} className="p-2 border rounded-md bg-sky-100 text-sky-400">
                                            <PiEmptyBold />
                                        </button>
                                        {availableLangs.map((item, index) => (
                                            <button
                                                title={item}
                                                key={index}
                                                onClick={() => setpromptLang(item)}
                                                className={` rounded-md ${item == promptLang ? 'border border-sky-500' : ''} p-1`}
                                            >
                                                <img src={LANGUAGE_VERSIONS[item]?.image || "https://via.placeholder.com/50"} alt={item} className="w-6" />
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
                {results.length < 1 && webspacestemplates.length > 0 && (
                    <div className="flex flex-col items-center justify-center h-[70vh]">
                        <img
                            src="https://ik.imagekit.io/vituepzjm/undraw_empty_re_opql.svg?updatedAt=1732993642328"
                            alt="Nothing to show"
                            className="w-40 mb-6"
                        />
                        <h2 className="text-base italic break-words text-sky-500">No WebSpaces are found matching given context.</h2>

                    </div>
                )}
                {webspacestemplates.length < 1 && <div className="flex flex-col items-center justify-center h-[70vh]">
                    <img
                        src="https://ik.imagekit.io/vituepzjm/undraw_taken_re_yn20.svg?updatedAt=1724617636363"
                        alt="Nothing to show"
                        className="w-32 mb-6"
                    />
                    <h2 className="text-xl font-medium text-sky-600">No WebTemplates are available</h2>
                    <p className="mt-2 text-sm text-center text-sky-500">
                        Create a new WebSpace to organize your projects and collaborate efficiently.
                    </p>
                    <Link
                        to="/dashboard/space/new"
                        className="px-5 py-2 mt-6 text-white transition rounded-lg shadow bg-sky-700 hover:bg-sky-800"
                    >
                        Create a WebSpace
                    </Link>
                </div>}
            </div>
            <Toaster />
        </div>
    );
};

export default WebTemplates;
