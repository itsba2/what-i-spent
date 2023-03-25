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
    password: "",
    confirm: "",
    username: "",
}

const initialFeedback = { type: "", show: false, msg: "" }

const LogIn = () => {
    const { logIn, currentUser } = useAuth()
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
        password: zod.string().min(1, "Password is required"),
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
            await logIn(data.email, data.password, data.username)
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
            <CardHeader title="Log In" />
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
                    <Controller
                        name="password"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                variant="standard"
                                type="password"
                                required
                                label="Password"
                                error={!!errors.password}
                                helperText={
                                    errors.password
                                        ? errors?.password.message
                                        : ""
                                }
                            />
                        )}
                    ></Controller>

                    <Button
                        variant="contained"
                        startIcon={<LoginIcon />}
                        type="submit"
                        sx={{
                            alignSelf: "center",
                            width: "fit-content",
                        }}
                    >
                        Log In
                    </Button>
                </Box>
            </CardContent>
            <CardActions>
                <ButtonGroup
                    fullWidth
                    variant="text"
                >
                    <Button
                        startIcon={<ResetIcon />}
                        href="/reset-password"
                    >
                        Reset Password
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

export default LogIn
