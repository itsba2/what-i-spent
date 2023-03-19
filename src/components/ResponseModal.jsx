import { MdErrorOutline, MdCheckCircleOutline, MdClose } from "react-icons/md"
import { classNames } from "../helpers/helpers"

const ResponseModal = ({ header, content, error, onSuccess, onError }) => {
    const onClick = () => {
        if (error) onError()
        else onSuccess()
    }
    return (
        <div
            tabIndex="-1"
            className="fixed inset-0 z-50 bg-gray-600 bg-opacity-75 dark:bg-gray-400 dark:bg-opacity-75"
            onClick={onClick}
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
                            onClick={onClick}
                        >
                            <MdClose />
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    <div className="p-6">
                        {error ? (
                            <MdErrorOutline className="mx-auto h-20 w-20 text-error dark:text-errorDark" />
                        ) : (
                            <MdCheckCircleOutline className="mx-auto h-20 w-20 text-primary dark:text-primaryDark" />
                        )}
                    </div>
                    <h3 className="px-6 py-2 text-center text-onSurface dark:text-onSurfaceDark">
                        {content}
                    </h3>
                    <div className="p-6 text-center ">
                        <button
                            onClick={onClick}
                            type="button"
                            className={classNames(
                                error
                                    ? "bg-error hover:bg-errorVar dark:bg-errorDark dark:hover:bg-errorVarDark"
                                    : "bg-primary hover:bg-primaryVar dark:bg-primaryDark dark:hover:bg-primaryVarDark",
                                "inline-flex items-center rounded-lg  px-5 py-2.5 text-center text-onPrimary duration-200  focus:outline-none  dark:text-onPrimaryDark "
                            )}
                        >
                            OK
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ResponseModal
