import { useState } from "react"
import {
    Avatar,
    Typography,
    Button,
    Box,
    Snackbar,
    Slide,
    Alert,
} from "@mui/material"

import Modal from "../components/Modal"
import { useAuth } from "../auth/AuthProvider"
import { resolveFirebaseError } from "../helpers/helpers"
import Feedback from "../components/Feedback"

const initialFeedback = { type: "error", show: false, msg: "" }

const Account = () => {
    const { currentUser, logOut, verifyAccount } = useAuth()
    const [showLogoutModal, toggleLogoutModal] = useState(false)
    const [feedback, setFeedback] = useState(initialFeedback)

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
        <Box>
            {currentUser && (
                <Box>
                    <Typography variant="h3">{currentUser.username}</Typography>
                    <Avatar
                        src={currentUser.avatar}
                        alt={currentUser.username}
                        sx={{
                            width: 128,
                            height: 128,
                        }}
                    />
                    <Button
                        variant="contained"
                        onClick={() => toggleLogoutModal(true)}
                    >
                        Log Out
                    </Button>
                    {showLogoutModal && (
                        <Modal
                            open={showLogoutModal}
                            toggle={toggleLogoutModal}
                            title="Log out"
                            text="You are logging out. Are you sure?"
                            noText="Cancel"
                            onNo={() => toggleLogoutModal(false)}
                            yesText="OK"
                            onYes={() => logOut()}
                        />
                    )}
                </Box>
            )}
            {!currentUser.emailVerified && (
                <Button
                    variant="contained"
                    onClick={handleVerifyAccount}
                >
                    Verify Email
                </Button>
            )}
            <Feedback
                feedback={feedback}
                setFeedback={setFeedback}
            />
        </Box>
    )
}

export default Account
