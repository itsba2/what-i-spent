import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import zod from "zod";
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
  IconButton,
  InputAdornment,
} from "@mui/material";
import {
  Login as LoginIcon,
  LockReset as ResetIcon,
  PersonAdd as RegisterIcon,
  Visibility as ShowIcon,
  VisibilityOff as HideIcon,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useAuth } from "../auth/AuthProvider";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setFeedback, setLoading } from "../app/feedbackSlice";
import { resolveFirebaseError } from "../helpers/helpers";

const defaultValues = {
  email: "",
  password: "",
  confirm: "",
  username: "",
};

const LogIn = () => {
  const { logIn, currentUser } = useAuth();
  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    if (currentUser) navigate("/transactions", { replace: true });
  }, [currentUser]);

  const [showPassword, toggleShowPassword] = useState(false);

  const handleShowPassword = () => toggleShowPassword((prev) => !prev);

  const theme = useTheme();
  const mobileView = useMediaQuery(theme.breakpoints.down("sm"));
  const largeView = useMediaQuery(theme.breakpoints.up("lg"));

  const formSchema = zod.object({
    email: zod.string().min(1, "Email is required").email(),
    password: zod.string().min(1, "Password is required"),
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    mode: "all",
    defaultValues,
  });
  const onSubmit = async (data) => {
    dispatch(setLoading(true));
    try {
      await logIn(data.email, data.password, data.username);

      dispatch(
        setFeedback({
          severity: "success",
          message: "Successfully logged in.",
        })
      );
    } catch (error) {
      dispatch(
        setFeedback({
          severity: "error",
          message: resolveFirebaseError(error.code),
        })
      );
    }
    dispatch(setLoading(false));
  };

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
                  variant="outlined"
                  autoComplete="username"
                  required
                  label="Email"
                  error={!!errors.email}
                  helperText={errors.email ? errors?.email.message : ""}
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  variant="outlined"
                  autoComplete="current-password"
                  type={showPassword ? "text" : "password"}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          tabIndex={-1}
                          onClick={handleShowPassword}
                          onMouseDown={(event) => event.preventDefault()}
                        >
                          {showPassword ? <HideIcon /> : <ShowIcon />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  required
                  label="Password"
                  error={!!errors.password}
                  helperText={errors.password ? errors?.password.message : ""}
                />
              )}
            />

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
          <ButtonGroup fullWidth variant="text">
            <Button startIcon={<ResetIcon />} href="/reset-password">
              Reset Password
            </Button>
            <Button startIcon={<RegisterIcon />} href="/register">
              Create Account
            </Button>
          </ButtonGroup>
        </CardActions>
      </Card>
    </>
  );
};

export default LogIn;
