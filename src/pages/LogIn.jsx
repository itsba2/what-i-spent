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
    Slide,
} from "@mui/material"
import { Login, LockReset, PersonAdd } from "@mui/icons-material"
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

const LogIn = () => {
    const { logIn, currentUser } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        if (currentUser) navigate("/", { replace: true })
    }, [currentUser])

    const [fbError, setFbError] = useState(initialFbError)

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
        setFbError(initialFbError)
        try {
            await logIn(data.email, data.password, data.username)
        } catch (error) {
            setFbError({ code: error.code, show: true })
        }
    }

    const handleCloseAlert = (event, reason) => {
        if (reason === "clickaway") return
        setFbError((prev) => ({ ...prev, show: false }))
    }

    return (
        <Card
            elevation={1}
            sx={{
                paddingY: 4,
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
                        paddingY: 4,
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
                        startIcon={<Login />}
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
                        startIcon={<LockReset />}
                        href="/reset-password"
                        // onClick={() => navigate("/reset-password")}
                    >
                        Reset Password
                    </Button>
                    <Button
                        startIcon={<PersonAdd />}
                        href="/register"
                        // onClick={() => navigate("/register")}
                    >
                        Create Account
                    </Button>
                </ButtonGroup>
            </CardActions>
            <Snackbar
                TransitionComponent={(props) => (
                    <Slide
                        {...props}
                        direction="right"
                    />
                )}
                open={fbError.show}
                autoHideDuration={4000}
                onClose={handleCloseAlert}
            >
                <Alert
                    severity="error"
                    onClose={handleCloseAlert}
                    sx={{ width: "100%" }}
                >
                    {resolveFirebaseError(fbError.code)}
                </Alert>
            </Snackbar>
        </Card>
    )
}

export default LogIn
