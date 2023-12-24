import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import zod from "zod";
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
} from "@mui/material";
import {
  Login as LoginIcon,
  LockReset as ResetIcon,
  PersonAdd as RegisterIcon,
} from "@mui/icons-material";
import { useEffect } from "react";
import { resolveFirebaseError } from "../helpers/helpers";
import { useAuth } from "../auth/AuthProvider";
import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { setFeedback, setLoading } from "../app/feedbackSlice";

const defaultValues = {
  email: "",
};

const ResetPassword = () => {
  const dispatch = useDispatch();

  const { resetPassword, currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) navigate("/", { replace: true });
  }, [currentUser]);

  const theme = useTheme();
  const mobileView = useMediaQuery(theme.breakpoints.down("sm"));
  const largeView = useMediaQuery(theme.breakpoints.up("lg"));

  const formSchema = zod.object({
    email: zod.string().min(1, "Email is required").email(),
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
      await resetPassword(data.email);
      dispatch(
        setFeedback({
          severity: "success",
          message: "Please check your inbox to reset your password.",
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
                  helperText={errors.email ? errors?.email.message : ""}
                />
              )}
            />
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
          <ButtonGroup fullWidth variant="text">
            <Button startIcon={<LoginIcon />} href="/login">
              Log In
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

export default ResetPassword;
