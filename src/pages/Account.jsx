import { useState } from "react"
import { Avatar, Typography, Button, Box } from "@mui/material"

// import Button from "../components/Button"
import Modal from "../components/Modal"
import { useAuth } from "../auth/AuthProvider"

const Account = () => {
    const { currentUser, logOut, verifyAccount } = useAuth()
    const [showLogoutModal, toggleLogoutModal] = useState(false)
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
                    onClick={() => verifyAccount()}
                >
                    Verify Email
                </Button>
            )}
        </Box>
    )
}

export default Account
