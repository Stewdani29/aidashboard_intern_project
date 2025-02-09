import { BiCopy, BiSolidCopy, BiSolidMessageSquareError } from "react-icons/bi";
import { VscLightbulbSparkle } from "react-icons/vsc";
import { useData } from "../../context/DataContext";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import { converter } from "../../../common/config";
import "../../../chat.css";

const OutputDisplay = ({ output, isOutputLoading, handleCopy, copied }) => {
    const { isErrorOccured, setisErrorOpen, isErrorOpen, handleErrorDegugging, errorSuggesion, isGenerating, isFullScreen } = useData();
    const container = document.getElementById("codespace");

    return (
        <div className={`bg-black/90 output-t overflow-auto ${isFullScreen ? 'h-[30vh]' : 'h-[25vh]'} mt-3 rounded-lg`}>
            <div className="px-3 flex justify-between items-center pt-2 mb-2">
                <h1 className="text-lg font-medium text-gray-100">Output:</h1>
                <div className="flex items-center justify-center gap-3 me-3">
                    {(output && isErrorOccured) &&
                        <div className="">
                            <button disabled={isGenerating} onClick={() => handleErrorDegugging()} className="cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed active:scale-95 transition-all" >
                                <VscLightbulbSparkle className="text-xl text-white" />
                            </button>
                            <Dialog.Root open={isErrorOpen} >
                                <Dialog.Portal container={container} >
                                    <Dialog.Overlay onClick={() => { setisErrorOpen(false) }} className="fixed inset-0 bg-black/5 data-[state=open]:animate-overlayShow" />
                                    <Dialog.Content className="fixed right-[7.8rem] bottom-[10%] max-h-[400px] h-[400px] w-[90vw] max-w-[450px] border rounded-md bg-white shadow focus:outline-none data-[state=open]:animate-contentShow">
                                        <div className="h-[400px] overflow-auto rounded-lg w-full bg-gray-100 px-[25px] pt-[10px] pb-[25px]">
                                            <h1 className="text-xl font-semibold mb-3 inline-flex items-center justify-center gap-2 text-gray-600"><BiSolidMessageSquareError /> Error Explanation</h1>
                                            <div className="Sara no-tailwindcss" dangerouslySetInnerHTML={{ __html: converter.makeHtml(errorSuggesion) }} />
                                        </div>
                                        {/* <div class="absolute bottom-[26%] mt-[6.5rem] right-2 z-[3] transform origin-[100%_0] translate-y-1/2 -rotate-90 translate-x-1/2">
                                            <svg
                                                class="block fill-gray-300 "
                                                width="16"
                                                height="8"
                                                viewBox="0 0 30 10"
                                                preserveAspectRatio="none"
                                            >
                                                <polygon points="0,0 30,0 15,10" />
                                            </svg>
                                        </div> */}
                                    </Dialog.Content>
                                </Dialog.Portal>
                            </Dialog.Root>
                        </div>
                    }
                    {output && (
                        <button onClick={handleCopy}>
                            {copied ? <BiSolidCopy className="text-gray-200 text-sm" /> : <BiCopy className="text-gray-200 text-sm" />}
                        </button>
                    )}
                </div>
            </div>
            <hr />
            <p
                dangerouslySetInnerHTML={{
                    __html: isOutputLoading ? "Loading output..." : output ?? 'Click "Run Code" to see the output here',
                }}
                className="text-lg p-3 text-gray-200"
            />
        </div>
    );
}

export default OutputDisplay;