// import { useForm } from "react-hook-form"
// import { useState } from "react"
// import { useNavigate } from "react-router-dom"

// import { useAuth } from "../auth/AuthProvider"
// import Input from "../components/Input"
// import Button from "../components/Button"
// import ResponseModal from "../components/ResponseModal"
// import { resolveFirebaseError } from "../helpers/helpers"

// const ResetPassword = () => {
//     const navigate = useNavigate()
//     const [modal, setModal] = useState({
//         header: "Reset Password",
//         content: "",
//         error: false,
//         show: false,
//     })
//     const { resetPassword } = useAuth()
//     const {
//         handleSubmit,
//         formState: { errors },
//         register,
//         trigger,
//     } = useForm()
//     const onSubmit = async (data) => {
//         try {
//             await resetPassword(data.email)
//             setModal((prev) => ({
//                 ...prev,
//                 show: true,
//                 error: false,
//                 content: "An email has been sent. Please check your inbox.",
//             }))
//         } catch (error) {
//             const errorMsg = resolveFirebaseError(error.code)
//             setModal((prev) => ({
//                 ...prev,
//                 content: errorMsg,
//                 show: true,
//                 error: true,
//             }))
//         }
//     }
//     return (
//         <form
//             onSubmit={handleSubmit(onSubmit)}
//             className="flex w-full flex-col items-center gap-4 sm:w-3/4 md:w-1/2 lg:w-1/4"
//         >
//             <Input
//                 type="email"
//                 name="email"
//                 id="email"
//                 label="Your email"
//                 register={{
//                     ...register("email", {
//                         required: {
//                             value: true,
//                             message: "Email is required!",
//                         },
//                         pattern: {
//                             value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
//                             message: "Invalid email address!",
//                         },
//                     }),
//                 }}
//                 onKeyUp={() => {
//                     trigger("email")
//                 }}
//                 error={errors.email}
//                 autoFocus={true}
//             />
//             <Button
//                 text="Reset Password"
//                 type="submit"
//             />
//             {modal.show && (
//                 <ResponseModal
//                     header={modal.header}
//                     content={modal.content}
//                     error={modal.error}
//                     onSuccess={() => navigate("/login")}
//                     onError={() =>
//                         setModal((prev) => ({ ...prev, show: false }))
//                     }
//                 />
//             )}
//         </form>
//     )
// }

import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import zod from "zod"
import {
    Box,
    TextField,
    Button,
    useMediaQuery,
    Card,
    CardHeader,
    CardContent,
    CardActions,
    ButtonGroup,
    useTheme,
} from "@mui/material"
import {
    Login as LoginIcon,
    LockReset as ResetIcon,
    PersonAdd as RegisterIcon,
} from "@mui/icons-material"
import { useEffect, useState } from "react"
import { resolveFirebaseError } from "../helpers/helpers"
import { useAuth } from "../auth/AuthProvider"
import { useNavigate } from "react-router-dom"
import Feedback from "../components/Feedback"

const defaultValues = {
    email: "",
}

const initialFeedback = { type: "", show: false, msg: "" }

const ResetPassword = () => {
    const { resetPassword, currentUser } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        if (currentUser) navigate("/", { replace: true })
    }, [currentUser])

    const [feedback, setFeedback] = useState(initialFeedback)

    const theme = useTheme()
    const mobileView = useMediaQuery(theme.breakpoints.down("sm"))
    const largeView = useMediaQuery(theme.breakpoints.up("lg"))

    const formSchema = zod.object({
        email: zod.string().min(1, "Email is required").email(),
    })

    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(formSchema),
        mode: "all",
        defaultValues,
    })
    const onSubmit = async (data) => {
        setFeedback(initialFeedback)
        try {
            await resetPassword(data.email)
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
        <Card
            elevation={1}
            sx={{
                mt: 4,
                maxWidth: 550,
                width: mobileView ? "100%" : largeView ? "35%" : "50%",
            }}
        >
            <CardHeader title="Reset Password" />
            <CardContent>
                <Box
                    component="form"
                    noValidate
                    autoComplete="off"
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                    }}
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <Controller
                        name="email"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                variant="standard"
                                required
                                label="Email"
                                error={!!errors.email}
                                helperText={
                                    errors.email ? errors?.email.message : ""
                                }
                            />
                        )}
                    ></Controller>
                    <Button
                        variant="contained"
                        startIcon={<ResetIcon />}
                        type="submit"
                        sx={{
                            alignSelf: "center",
                            width: "fit-content",
                        }}
                    >
                        Reset Password
                    </Button>
                </Box>
            </CardContent>
            <CardActions>
                <ButtonGroup
                    fullWidth
                    variant="text"
                >
                    <Button
                        startIcon={<LoginIcon />}
                        href="/login"
                    >
                        Log In
                    </Button>
                    <Button
                        startIcon={<RegisterIcon />}
                        href="/register"
                    >
                        Create Account
                    </Button>
                </ButtonGroup>
            </CardActions>
            <Feedback
                feedback={feedback}
                setFeedback={setFeedback}
            />
        </Card>
    )
}

export default ResetPassword
