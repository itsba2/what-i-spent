import { useState } from "react"

import Button from "../components/Button"
import Modal from "../components/Modal"
import { useAuth } from "../auth/AuthProvider"

const Account = () => {
    const { currentUser, logOut, verifyAccount } = useAuth()
    const [showModal, setShowModal] = useState(false)
    return (
        <div>
            {currentUser && (
                <div className="flex flex-col">
                    <h1>{currentUser.username}</h1>
                    <img
                        src={currentUser.avatar}
                        alt={`${currentUser.username}'s avatar`}
                        className="w-36"
                    />

                    <Button
                        text="Log Out"
                        onClick={() => setShowModal(true)}
                    />
                    {showModal && (
                        <Modal
                            header="Log out"
                            content="You are logging out. Are you sure?"
                            onClickYes={() => logOut()}
                            onClickNo={() => setShowModal(false)}
                        />
                    )}
                </div>
            )}
            {!currentUser.emailVerified && (
                <Button
                    text="Verify Email"
                    onClick={() => verifyAccount()}
                />
            )}
        </div>
    )
}

export default Account
