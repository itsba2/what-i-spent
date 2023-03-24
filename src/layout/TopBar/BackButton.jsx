import { MdArrowBack } from "react-icons/md"
import { useNavigate, useLocation } from "react-router-dom"
import { classNames } from "../../helpers/helpers"

import { IconButton } from "@mui/material"
import { ArrowBackIosNew } from "@mui/icons-material"

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
        <IconButton
            color="inherit"
            onClick={goBack}
            sx={{
                visibility: location.pathname === "/" ? "hidden" : "visible",
            }}
        >
            <ArrowBackIosNew />
        </IconButton>
    )
}

export default BackButton
