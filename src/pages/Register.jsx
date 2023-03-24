import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import zod from "zod"
import {
    Box,
    TextField,
    Button,
    useMediaQuery,
    Alert,
    Card,
    CardHeader,
    CardContent,
    CardActions,
    ButtonGroup,
    Snackbar,
} from "@mui/material"
import { PersonAdd, Login } from "@mui/icons-material"
import { useTheme } from "@mui/material/styles"
import { useEffect, useState } from "react"
import { resolveFirebaseError } from "../helpers/helpers"
import { useAuth } from "../auth/AuthProvider"
import { useNavigate } from "react-router-dom"

const defaultValues = {
    email: "",
    password: "",
    confirm: "",
    username: "",
}

const initialFbError = { code: "", show: false }

const Register = () => {
    const { createUser, currentUser } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        if (currentUser) navigate("/", { replace: true })
    }, [currentUser])

    const [fbError, setFbError] = useState(initialFbError)
    // const [success, setSuccess] = useState(false)

    const theme = useTheme()
    const mobileView = useMediaQuery(theme.breakpoints.down("sm"))
    const largeView = useMediaQuery(theme.breakpoints.up("lg"))

    const formSchema = zod
        .object({
            email: zod.string().min(1, "Email is required").email(),
            password: zod
                .string()
                .min(1, "Password is required")
                .min(6, "Password must contain at least 6 characters"),
            confirm: zod.string().min(1, "Confirm password"),
            username: zod.string().min(1, "Username is required"),
        })
        .superRefine(({ password, confirm, username }, ctx) => {
            if (confirm !== password) {
                ctx.addIssue({
                    code: "custom",
                    message: "Password does not match",
                    path: ["confirm"],
                })
            }
            if (!username.charAt(0).match(/[a-z]/i)) {
                ctx.addIssue({
                    code: "custom",
                    message: "Username must start with letter",
                    path: ["username"],
                })
            }
            if (username.length < 5) {
                ctx.addIssue({
                    code: "custom",
                    message: "Username must contain at least 5 letters",
                    path: ["username"],
                })
            }
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
        // console.log(data)
        setFbError(initialFbError)
        try {
            await createUser(data.email, data.password, data.username)
            // setSuccess(true)
        } catch (error) {
            console.log(error.code)
            setFbError({ code: error.code, show: true })
        }
    }

    // const handleCloseAlert = (event, reason) => {
    //     if (reason === "clickaway") return
    //     setSuccess(false)
    // }

    return (
        <Card
            elevation={1}
            sx={{
                paddingY: 4,
                maxWidth: 550,
                width: mobileView ? "100%" : largeView ? "35%" : "50%",
            }}
        >
            <CardHeader title="Create Account" />
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
                    <Controller
                        name="confirm"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                variant="standard"
                                type="password"
                                required
                                label="Confirm Password"
                                error={!!errors.confirm}
                                helperText={
                                    errors.confirm
                                        ? errors?.confirm.message
                                        : ""
                                }
                            />
                        )}
                    ></Controller>
                    <Controller
                        name="username"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                variant="standard"
                                required
                                label="Username"
                                error={!!errors.username}
                                helperText={
                                    errors.username
                                        ? errors?.username.message
                                        : ""
                                }
                            />
                        )}
                    ></Controller>
                    <Button
                        variant="contained"
                        type="submit"
                        startIcon={<PersonAdd />}
                        sx={{
                            alignSelf: "center",
                            width: "fit-content",
                        }}
                    >
                        Register
                    </Button>
                    {fbError.show && (
                        <Alert severity="error">
                            {resolveFirebaseError(fbError.code)}
                        </Alert>
                    )}
                </Box>
            </CardContent>
            <CardActions>
                <Button
                    fullWidth
                    startIcon={<Login />}
                    onClick={() => navigate("/login")}
                >
                    Already have an account?
                </Button>
            </CardActions>
            {/* <Snackbar
                open={success}
                autoHideDuration={6000}
                onClose={handleCloseAlert}
            >
                <Alert
                    onClose={handleCloseAlert}
                    severity="success"
                    sx={{ width: "100%" }}
                >
                    Account has been created successfully.
                </Alert>
            </Snackbar> */}
        </Card>
    )
}

export default Register
