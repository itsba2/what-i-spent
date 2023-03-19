import { useForm } from "react-hook-form"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

import { useAuth } from "../auth/AuthProvider"
import Input from "../components/Input"
import Button from "../components/Button"
import ResponseModal from "../components/ResponseModal"
import { resolveFirebaseError } from "../helpers/helpers"

const ResetPassword = () => {
    const navigate = useNavigate()
    const [modal, setModal] = useState({
        header: "Reset Password",
        content: "",
        error: false,
        show: false,
    })
    const { resetPassword } = useAuth()
    const {
        handleSubmit,
        formState: { errors },
        register,
        trigger,
    } = useForm()
    const onSubmit = async (data) => {
        try {
            await resetPassword(data.email)
            setModal((prev) => ({
                ...prev,
                show: true,
                error: false,
                content: "An email has been sent. Please check your inbox.",
            }))
        } catch (error) {
            const errorMsg = resolveFirebaseError(error.code)
            setModal((prev) => ({
                ...prev,
                content: errorMsg,
                show: true,
                error: true,
            }))
        }
    }
    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex w-full flex-col items-center gap-4 sm:w-3/4 md:w-1/2 lg:w-1/4"
        >
            <Input
                type="email"
                name="email"
                id="email"
                label="Your email"
                register={{
                    ...register("email", {
                        required: {
                            value: true,
                            message: "Email is required!",
                        },
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Invalid email address!",
                        },
                    }),
                }}
                onKeyUp={() => {
                    trigger("email")
                }}
                error={errors.email}
                autoFocus={true}
            />
            <Button
                text="Reset Password"
                type="submit"
            />
            {modal.show && (
                <ResponseModal
                    header={modal.header}
                    content={modal.content}
                    error={modal.error}
                    onSuccess={() => navigate("/login")}
                    onError={() =>
                        setModal((prev) => ({ ...prev, show: false }))
                    }
                />
            )}
        </form>
    )
}

export default ResetPassword
