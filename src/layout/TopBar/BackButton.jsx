import { MdArrowBack } from "react-icons/md"
import { useNavigate, useLocation } from "react-router-dom"
import { classNames } from "../../helpers/helpers"

const BackButton = () => {
    const navigate = useNavigate()
    const location = useLocation()

    const goBack = () => {
        let currentPathArray = location.pathname.split("/")
        currentPathArray.pop()
        const backPath =
            currentPathArray.length < 2 ? "/" : currentPathArray.join("/")

        navigate(backPath)
    }
    return (
        <button
            onClick={goBack}
            className={classNames(
                location.pathname === "/" && "invisible",
                "cursor-pointer rounded-full p-2 text-2xl hover:bg-surfaceVar dark:hover:bg-surfaceVarDark"
            )}
        >
            <span className="text-onSurface">
                <MdArrowBack />
            </span>
        </button>
    )
}

export default BackButton
