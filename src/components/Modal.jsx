import { MdClose } from "react-icons/md"

const Modal = ({
    header,
    content,
    yesButton,
    onClickYes,
    noButton,
    onClickNo,
}) => {
    return (
        <div
            tabIndex="-1"
            className="fixed inset-0 z-50 bg-gray-600 bg-opacity-75 dark:bg-gray-400 dark:bg-opacity-75"
            onClick={onClickNo}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="fixed top-1/2 w-full -translate-y-1/2 p-4 sm:left-1/2 sm:w-4/5 sm:-translate-x-1/2 md:w-3/5 lg:w-2/5"
            >
                <div className="flex flex-col justify-between rounded-lg bg-surface shadow dark:bg-surfaceDark">
                    <div className="flex items-center justify-between px-4 py-2.5 text-onSurface dark:text-onSurfaceDark">
                        <h1 className="font-bold">{header}</h1>
                        <button
                            type="button"
                            className=" inline-flex items-center rounded-full p-2 hover:bg-surfaceVar dark:hover:bg-surfaceVarDark"
                            onClick={onClickNo}
                        >
                            <MdClose />
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    <h3 className="px-6 py-2 text-center text-onSurface dark:text-onSurfaceDark">
                        {content}
                    </h3>
                    <div className="p-6 text-center ">
                        <button
                            onClick={onClickYes}
                            type="button"
                            className="mr-4 inline-flex items-center rounded-lg bg-primary px-5 py-2.5 text-center text-onPrimary duration-200 hover:bg-primaryVar focus:outline-none dark:bg-primaryDark dark:text-onPrimaryDark dark:hover:bg-primaryVarDark"
                        >
                            {yesButton || "Yes"}
                        </button>
                        <button
                            onClick={onClickNo}
                            type="button"
                            className="rounded-lg bg-gray-50 px-5 py-2.5 text-gray-900 duration-200 hover:bg-gray-100 dark:bg-slate-900 dark:text-gray-100 dark:hover:bg-slate-800"
                        >
                            {noButton || "No"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal
