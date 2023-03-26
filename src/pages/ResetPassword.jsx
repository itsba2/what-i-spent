import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import zod from "zod"
import {
    Box,
    TextField,
    Button,
    Card,
    CardHeader,
    CardContent,
    CardActions,
    ButtonGroup,
    useMediaQuery,
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

const initialFeedback = { type: "error", show: false, msg: "" }

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
        <>
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
                                    variant="outlined"
                                    required
                                    label="Email"
                                    error={!!errors.email}
                                    helperText={
                                        errors.email
                                            ? errors?.email.message
                                            : ""
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
            </Card>
            <Feedback
                feedback={feedback}
                setFeedback={setFeedback}
            />
        </>
    )
}

export default ResetPassword
