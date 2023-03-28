import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import {
    Typography,
    Button,
    Box,
    Accordion,
    AccordionDetails,
    AccordionSummary,
    ButtonGroup,
    useMediaQuery,
    useTheme,
} from "@mui/material"
import { ExpandMore as MoreIcon } from "@mui/icons-material"
import Modal from "../components/Modal"
import Feedback from "../components/Feedback"
import { useAuth } from "../auth/AuthProvider"
import { resolveFirebaseError } from "../helpers/helpers"

const initialFeedback = { type: "error", show: false, msg: "" }

const Account = () => {
    const [expanded, setExpanded] = useState(false)

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false)
    }
    const { currentUser, logOut, verifyAccount } = useAuth()
    const navigate = useNavigate()
    useEffect(() => {
        !currentUser && navigate("/login")
    }, [])

    const [showLogoutModal, toggleLogoutModal] = useState(false)
    const [feedback, setFeedback] = useState(initialFeedback)

    const theme = useTheme()
    const mobileView = useMediaQuery(theme.breakpoints.down("sm"))

    const handleVerifyAccount = () => {
        try {
            verifyAccount()
            setFeedback({
                type: "success",
                show: true,
                msg: "An email has been sent. Please check your email.",
            })
        } catch (error) {
            setFeedback({
                type: "error",
                show: true,
                msg: resolveFirebaseError(error.code),
            })
        }
    }

    return (
        <>
            {currentUser && (
                <Box
                    component="div"
                    display="flex"
                    flexDirection="column"
                    marginY={2}
                >
                    <Typography
                        variant="h3"
                        sx={{ textAlign: "center" }}
                    >
                        {currentUser.username}
                    </Typography>
                    <ButtonGroup
                        fullWidth
                        variant="outlined"
                        sx={{
                            marginY: 2,
                            maxWidth: mobileView ? "100%" : "50%",
                            alignSelf: "center",
                        }}
                    >
                        <Button onClick={() => toggleLogoutModal(true)}>
                            Log Out
                        </Button>

                        <Button
                            onClick={handleVerifyAccount}
                            disabled={currentUser.emailVerified}
                        >
                            {currentUser.emailVerified
                                ? "Email Verified"
                                : "Verify Email"}
                        </Button>
                    </ButtonGroup>
                    <Accordion
                        expanded={expanded === "panel1"}
                        onChange={handleChange("panel1")}
                    >
                        <AccordionSummary
                            expandIcon={<MoreIcon />}
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                        >
                            <Typography variant="h5">
                                General Settings
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            {/* TODO: Currency Preference */}
                            <Typography>
                                Nulla facilisi. Phasellus sollicitudin nulla et
                                quam mattis feugiat. Aliquam eget maximus est,
                                id dignissim quam.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion
                        expanded={expanded === "panel2"}
                        onChange={handleChange("panel2")}
                    >
                        <AccordionSummary
                            expandIcon={<MoreIcon />}
                            aria-controls="panel2bh-content"
                            id="panel2bh-header"
                        >
                            <Typography variant="h5">
                                Account Settings
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            {/* TODO: Change Email */}
                            {/* TODO: Change Password */}
                            {/* TODO: Change Username */}
                            {/* TODO: Disable Account */}
                            <Typography>
                                Donec placerat, lectus sed mattis semper, neque
                                lectus feugiat lectus, varius pulvinar diam eros
                                in elit. Pellentesque convallis laoreet laoreet.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                </Box>
            )}
            {showLogoutModal && (
                <Modal
                    open={showLogoutModal}
                    toggle={toggleLogoutModal}
                    title="Log out"
                    text="You are logging out. Are you sure?"
                    noText="Cancel"
                    onNo={() => toggleLogoutModal(false)}
                    yesText="OK"
                    onYes={() => {
                        logOut()
                        toggleLogoutModal(false)
                    }}
                />
            )}
            <Feedback
                feedback={feedback}
                setFeedback={setFeedback}
            />
        </>
    )
}

export default Account
