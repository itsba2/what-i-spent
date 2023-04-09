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
  InputAdornment,
  IconButton,
} from "@mui/material";
import {
  PersonAdd as RegisterIcon,
  Login as LoginIcon,
  Visibility as ShowIcon,
  VisibilityOff as HideIcon,
} from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { resolveFirebaseError } from "../helpers/helpers";
import { useAuth } from "../auth/AuthProvider";
import { useNavigate } from "react-router-dom";
import Feedback from "../components/Feedback";

const defaultValues = {
  email: "",
  password: "",
  confirm: "",
  username: "",
};

const initialFeedback = { type: "error", show: false, msg: "" };

const Register = () => {
  const { createUser, currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) navigate("/transactions", { replace: true });
  }, [currentUser]);

  const [feedback, setFeedback] = useState(initialFeedback);
  const [showPassword, toggleShowPassword] = useState(false);

  const handleShowPassword = () => toggleShowPassword((prev) => !prev);

  const theme = useTheme();
  const mobileView = useMediaQuery(theme.breakpoints.down("sm"));
  const largeView = useMediaQuery(theme.breakpoints.up("lg"));

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
        });
      }
      if (!username.charAt(0).match(/[a-z]/i)) {
        ctx.addIssue({
          code: "custom",
          message: "Username must start with letter",
          path: ["username"],
        });
      }
      if (username.length < 5) {
        ctx.addIssue({
          code: "custom",
          message: "Username must contain at least 5 letters",
          path: ["username"],
        });
      }
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
    setFeedback(initialFeedback);
    try {
      await createUser(data.email, data.password, data.username);
    } catch (error) {
      setFeedback({
        type: "error",
        show: true,
        msg: resolveFirebaseError(error.code),
      });
    }
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
                  variant="outlined"
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
                  autoComplete="new-password"
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
            <Controller
              name="confirm"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  variant="outlined"
                  autoComplete="new-password"
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
                  label="Confirm Password"
                  error={!!errors.confirm}
                  helperText={errors.confirm ? errors?.confirm.message : ""}
                />
              )}
            />
            <Controller
              name="username"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  variant="outlined"
                  autoComplete="username"
                  required
                  label="Username"
                  error={!!errors.username}
                  helperText={errors.username ? errors?.username.message : ""}
                />
              )}
            />
            <Button
              variant="contained"
              type="submit"
              startIcon={<RegisterIcon />}
              sx={{
                alignSelf: "center",
                width: "fit-content",
              }}
            >
              Register
            </Button>
          </Box>
        </CardContent>
        <CardActions>
          <Button
            fullWidth
            startIcon={<LoginIcon />}
            onClick={() => navigate("/login")}
          >
            Already have an account?
          </Button>
        </CardActions>
      </Card>
      <Feedback feedback={feedback} setFeedback={setFeedback} />
    </>
  );
};

export default Register;
