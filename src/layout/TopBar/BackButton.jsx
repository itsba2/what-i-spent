import { useNavigate, useLocation } from "react-router-dom"

import { IconButton } from "@mui/material"
import { ArrowBackIosNew } from "@mui/icons-material"

const BackButton = () => {
    const navigate = useNavigate()
    const location = useLocation()

    const goBack = () => {
        let currentPathArray = location.pathname.split("/")
        currentPathArray.pop()
        let backPath
        if (currentPathArray.length < 2) {
            backPath = "/"
        } else if (currentPathArray.includes("edit")) {
            // if path is /transactions/edit/:id, directly return to /transactions, not /transactions/edit
            const index = currentPathArray.indexOf("edit")
            currentPathArray.splice(index)
            backPath = currentPathArray.join("/")
        } else {
            backPath = currentPathArray.join("/")
        }

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
