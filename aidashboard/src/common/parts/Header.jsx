import React from "react";
import { useUserAuth } from "../../components/context/UserAuthContext";
import { Link, useLocation } from "react-router-dom";
import { AppName } from "../links";
import { HiMiniBars3 } from "react-icons/hi2";
import * as Dialog from "@radix-ui/react-dialog";
import { useData } from "../../components/context/DataContext";
import { IoMdClose } from "react-icons/io";

function Header() {
  const { user } = useUserAuth();
  const location = useLocation();
  const { isHamOpen, setIsHamOpen } = useData();

  return (
    <header class="text-sky-600 body-font fixed top-0 w-full z-[9999999999] bg-white/20 rounded-lg shadow-md backdrop-blur-sm border border-white/30">
      <div class="container md:mx-auto flex flex-wrap p-5 flex-row items-center justify-between md:justify-normal">
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setIsHamOpen(!isHamOpen);
            }}
            className="text-lg transition-all md:hidden active:scale-90"
          >
            <HiMiniBars3 />
          </button>
          <Dialog.Root open={isHamOpen}>
            <Dialog.Portal>
              <Dialog.Overlay
                onClick={() => {
                  setIsHamOpen(!isHamOpen);
                }}
                className="bg-blackA6 z-[1000] data-[state=open]:left-0 left-[-50%] fixed inset-0"
              />
              <Dialog.Content className="z-[10000] min-h-auto data-[state=open]:animate-enterFromTop fixed top-0 left-0 w-full bg-gradient-to-br from-[#2193b0] via-[#6dd5ed] to-[#093676] focus:outline-none">
                <div class="container md:mx-auto flex flex-wrap p-5 flex-row items-center justify-between md:justify-normal">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setIsHamOpen(!isHamOpen);
                      }}
                      className="text-lg transition-all md:hidden active:scale-90"
                    >
                      <IoMdClose />
                    </button>
                    <Link
                      to="/"
                      onClick={() => {
                        setIsHamOpen(!isHamOpen);
                      }}
                      class="flex title-font font-medium items-center text-gray-900 "
                    >
                      <img
                        src={require("../../assets/logowebweave.png")}
                        alt="Logo"
                        className="size-8 md:size-10"
                      />
                      <span class="ml-1 md:ml-2 text-lg md:text-xl text-sky-600">
                        {AppName}
                      </span>
                    </Link>
                  </div>
                  <nav class="md:ml-auto hidden md:flex flex-wrap items-center text-base justify-center">
                    <Link
                      to="/home"
                      class={`mr-5 text-white hover:text-sky-700 ${
                        location.pathname.includes("home") &&
                        "underline underline-offset-2"
                      }`}
                    >
                      Home
                    </Link>
                    <Link
                      to="/need-spark"
                      class={`mr-5 hover:text-gray-900 ${
                        location.pathname.includes("need-spark") &&
                        "underline underline-offset-2"
                      }`}
                    >
                      Need a Spark?
                    </Link>
                    <Link
                      to="/contact"
                      class={`mr-5 hover:text-gray-900 ${
                        location.pathname.includes("contact") &&
                        "underline underline-offset-2"
                      }`}
                    >
                      Contact
                    </Link>
                  </nav>
                  {user ? (
                    <Link
                      to="/dashboard"
                      class="inline-flex items-center bg-sky-600 border-0 py-1 px-3 text-white focus:outline-none hover:bg-sky-800 rounded text-base "
                    >
                      Your Space
                      <svg
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        class="w-4 h-4 ml-1"
                        viewBox="0 0 24 24"
                      >
                        <path d="M5 12h14M12 5l7 7-7 7"></path>
                      </svg>
                    </Link>
                  ) : (
                    <Link
                      to="/auth"
                      class="inline-flex text-sky-600 hover:text-white bg-white border-2 border-sky-600 hover:bg-gradient-to-r from-sky-600 to-sky-700 py-2.5 px-6 focus:outline-none rounded-full text-lg "
                    >
                      Access Now
                      <svg
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        class="w-4 h-4 ml-1"
                        viewBox="0 0 24 24"
                      >
                        <path d="M5 12h14M12 5l7 7-7 7"></path>
                      </svg>
                    </Link>
                  )}
                </div>
                <div className="flex flex-col items-start justify-center gap-5 p-5 mt-24 text-base">
                  <Link
                    onClick={() => {
                      setIsHamOpen(!isHamOpen);
                    }}
                    to="/home"
                    class={`hover:text-sky-700 py-2 ${
                      location.pathname.includes("home") &&
                      "underline underline-offset-2"
                    }`}
                  >
                    Home
                  </Link>
                  <Link
                    onClick={() => {
                      setIsHamOpen(!isHamOpen);
                    }}
                    to="/need-spark"
                    class={`hover:text-sky-600 py-2 ${
                      location.pathname.includes("need-spark") &&
                      "underline underline-offset-2"
                    }`}
                  >
                    Need a Spark?
                  </Link>
                  <Link
                    onClick={() => {
                      setIsHamOpen(!isHamOpen);
                    }}
                    to="/contact"
                    class={`hover:text-gray-900 py-2 ${
                      location.pathname.includes("contact") &&
                      "underline underline-offset-2"
                    }`}
                  >
                    Contact
                  </Link>
                </div>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
          <Link
            to="/"
            class="flex title-font font-medium items-center text-gray-900 "
          >
            <img
              src={require("../../assets/logowebweave.png")}
              alt="Logo"
              className="size-8 md:size-10"
            />
            <span class="ml-1 md:ml-2 text-lg md:text-xl text-sky-600">{AppName}</span>
          </Link>
        </div>
        <nav class="md:ml-auto hidden md:flex flex-wrap items-center text-base justify-center">
          <Link
            to="/home"
            class={`mr-5 text-w hover:text-sky-800 ${
              location.pathname.includes("home") &&
              "underline underline-offset-2"
            }`}
          >
            Home
          </Link>
          <Link
            to="/need-spark"
            class={`mr-5 hover:text-sky-800 ${
              location.pathname.includes("need-spark") &&
              "underline underline-offset-2"
            }`}
          >
            Need a Spark?
          </Link>
          <Link
            to="/contact"
            class={`mr-5 hover:text-sky-800 ${
              location.pathname.includes("contact") &&
              "underline underline-offset-2"
            }`}
          >
            Contact
          </Link>
        </nav>
        {user ? (
          <Link
            to="/dashboard"
            class="inline-flex items-center bg-sky-600 border-0 py-1 px-3 text-white focus:outline-none hover:bg-sky-800 rounded text-base "
          >
            Your Space
            <svg
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              class="w-4 h-4 ml-1"
              viewBox="0 0 24 24"
            >
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
          </Link>
        ) : (
          <Link
            to="/auth"
            class="inline-flex items-center gap-1 text-sky-600  hover:text-white  bg-white border-2 border-sky-600 hover:bg-gradient-to-r from-sky-600 to-sky-700 py-2 px-6 focus:outline-none rounded-full text-lg "
          >
            Access Now
            <svg
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              class="w-4 h-4 ml-1"
              viewBox="0 0 24 24"
            >
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
          </Link>
        )}
      </div>
    </header>
  );
}

export default Header;
