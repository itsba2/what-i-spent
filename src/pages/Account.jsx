import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Typography,
  Button,
  Box,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  ButtonGroup,
  useMediaQuery,
  useTheme,
  Autocomplete,
  TextField,
  IconButton,
  InputAdornment,
  Alert,
} from "@mui/material";
import {
  ExpandMore as MoreIcon,
  Visibility as ShowIcon,
  VisibilityOff as HideIcon,
} from "@mui/icons-material";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import zod from "zod";

import Modal from "../components/Modal";
import Feedback from "../components/Feedback";

import { useAuth } from "../auth/AuthProvider";
import { resolveFirebaseError } from "../helpers/helpers";
import currencies from "../helpers/currency.json";
import { updateCurrencyPref } from "../firebase/user";
import ToggleTheme from "../components/ToggleTheme";

const initialFeedback = { type: "error", show: false, msg: "" };

const Account = () => {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const {
    currentUser,
    logOut,
    verifyAccount,
    updateUserEmail,
    updateUsername,
    updateUserPassword,
    deleteAccount,
  } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    !currentUser && navigate("/login");
  }, []);

  const [currencyPref, setCurrencyPref] = useState(currentUser.currencyPref);

  const [showLogoutModal, toggleLogoutModal] = useState(false);
  const [showCurrentPasswordField, toggleCurrentPasswordField] =
    useState(false);
  const [feedback, setFeedback] = useState(initialFeedback);

  const theme = useTheme();
  const mobileView = useMediaQuery(theme.breakpoints.down("sm"));
  const largeView = useMediaQuery(theme.breakpoints.up("lg"));

  const handleVerifyAccount = () => {
    try {
      verifyAccount();
      setFeedback({
        type: "success",
        show: true,
        msg: "An email has been sent. Please check your email.",
      });
    } catch (error) {
      setFeedback({
        type: "error",
        show: true,
        msg: resolveFirebaseError(error.code),
      });
    }
  };

  const handleChangeCurrencyPref = async () => {
    try {
      const response = await updateCurrencyPref(currentUser.id, currencyPref);
      setFeedback({
        type: "success",
        show: true,
        msg: response.msg,
      });
      navigate(0);
    } catch (error) {
      setFeedback({
        type: "error",
        show: true,
        msg: resolveFirebaseError(error),
      });
    }
  };

  const [showPassword, toggleShowPassword] = useState(false);

  const handleShowPassword = () => toggleShowPassword((prev) => !prev);

  const formSchema = zod
    .object({
      email: zod.string().min(1, "Email is required").email(),
      currentPassword: zod
        .string()
        .min(1, "Current password is required to apply changes")
        .min(6, "Password must contain at least 6 characters"),
      newPassword: zod.string(),
      newConfirm: zod.string(),
      username: zod.string().min(1, "Username is required"),
    })
    .superRefine(({ newPassword, newConfirm, username }, ctx) => {
      if (newPassword.length > 0) {
        if (newPassword.length < 6) {
          ctx.addIssue({
            code: "custom",
            message: "Password must contain at least 6 characters",
            path: ["newPassword"],
          });
        }
      }
      if (newConfirm.length > 0) {
        if (newConfirm !== newPassword) {
          ctx.addIssue({
            code: "custom",
            message: "Password does not match",
            path: ["newConfirm"],
          });
        }
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
    defaultValues: {
      email: currentUser.email,
      currentPassword: "",
      newPassword: "",
      newConfirm: "",
      username: currentUser.username,
    },
  });

  const onSubmit = async (data) => {
    let feedbackInvoked = false;
    setFeedback(initialFeedback);
    try {
      if (data.email !== currentUser.email) {
        await updateUserEmail(data.currentPassword, data.email);
        feedbackInvoked = true;
      }
      if (data.newPassword.length > 0 && data.newPassword === data.newConfirm) {
        await updateUserPassword(data.currentPassword, data.newPassword);
        feedbackInvoked = true;
      }
      if (data.username !== currentUser.username) {
        await updateUsername(data.currentPassword, data.username);
        feedbackInvoked = true;
      }
      navigate(0);
      setFeedback({
        type: feedbackInvoked ? "success" : "info",
        show: true,
        msg: feedbackInvoked
          ? "Changes have been made successfuly."
          : "No change has been made.",
      });
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
      {currentUser && (
        <Box
          component="div"
          display="flex"
          flexDirection="column"
          sx={{
            my: 2,
            minWidth: 350,
            maxWidth: 600,
            width: mobileView ? "100%" : largeView ? "50%" : "75%",
          }}
          marginY={2}
        >
          <Typography variant="h3" sx={{ textAlign: "center" }}>
            {currentUser.username}
          </Typography>
          <ButtonGroup
            fullWidth
            variant="outlined"
            sx={{
              marginY: 2,
              width: mobileView ? "100%" : largeView ? "50%" : "75%",
              alignSelf: "center",
            }}
          >
            <Button onClick={() => toggleLogoutModal(true)}>Log Out</Button>

            <Button
              onClick={handleVerifyAccount}
              disabled={currentUser.emailVerified}
            >
              {currentUser.emailVerified ? "Email Verified" : "Verify Email"}
            </Button>
          </ButtonGroup>
          <Accordion
            expanded={expanded === "general"}
            onChange={handleChange("general")}
          >
            <AccordionSummary
              expandIcon={<MoreIcon />}
              aria-controls="general-content"
              id="general-header"
            >
              <Typography variant="h5">General Settings</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box
                component="div"
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                }}
                gap={2}
              >
                <ToggleTheme />
                <Autocomplete
                  value={currencyPref}
                  fullWidth
                  disableClearable
                  options={currencies}
                  getOptionLabel={(option) =>
                    option.code ? option.code : option
                  }
                  isOptionEqualToValue={(option, value) =>
                    option.code === value
                  }
                  onChange={(event, option) => {
                    setCurrencyPref(option.code);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Currency Preference"
                      variant="outlined"
                    />
                  )}
                />

                <Button
                  variant="contained"
                  onClick={handleChangeCurrencyPref}
                  sx={{
                    alignSelf: "center",
                    width: "fit-content",
                  }}
                >
                  Apply
                </Button>
              </Box>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === "account"}
            onChange={handleChange("account")}
          >
            <AccordionSummary
              expandIcon={<MoreIcon />}
              aria-controls="account-content"
              id="account-header"
            >
              <Typography variant="h5">Account Settings</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box
                component="form"
                noValidate
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
                  name="newPassword"
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
                      label="New Password"
                      error={!!errors.newPassword}
                      helperText={
                        errors.newPassword ? errors?.newPassword.message : ""
                      }
                    />
                  )}
                />
                <Controller
                  name="newConfirm"
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
                      label="Confirm New Password"
                      error={!!errors.newConfirm}
                      helperText={
                        errors.newConfirm ? errors?.newConfirm.message : ""
                      }
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
                      required
                      label="Username"
                      error={!!errors.username}
                      helperText={
                        errors.username ? errors?.username.message : ""
                      }
                    />
                  )}
                />
                <Alert
                  severity="info"
                  sx={{
                    display: showCurrentPasswordField ? "flex" : "none",
                  }}
                >
                  Confirm your current password to apply changes
                </Alert>
                <Controller
                  name="currentPassword"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      variant="outlined"
                      required
                      sx={{
                        display: showCurrentPasswordField ? "flex" : "none",
                      }}
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
                      label="Current Password"
                      error={!!errors.currentPassword}
                      helperText={
                        errors.currentPassword
                          ? errors?.currentPassword.message
                          : ""
                      }
                    />
                  )}
                />
                <Button
                  variant="contained"
                  onClick={() => toggleCurrentPasswordField(true)}
                  sx={{
                    alignSelf: "center",
                    width: "fit-content",
                    display: showCurrentPasswordField ? "none" : "block",
                  }}
                >
                  Confirm
                </Button>
                <Box
                  component="div"
                  display="flex"
                  justifyContent="center"
                  gap={2}
                >
                  <Button
                    variant="outlined"
                    onClick={() => toggleCurrentPasswordField(false)}
                    sx={{
                      alignSelf: "center",
                      width: "fit-content",
                      display: showCurrentPasswordField ? "block" : "none",
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    type="submit"
                    sx={{
                      alignSelf: "center",
                      width: "fit-content",
                      display: showCurrentPasswordField ? "block" : "none",
                    }}
                  >
                    Apply
                  </Button>
                </Box>
              </Box>
            </AccordionDetails>
          </Accordion>
        </Box>
      )}
      {showLogoutModal && (
        <Modal
          open={showLogoutModal}
          toggle={toggleLogoutModal}
          title="Log out"
          text="You are logging out. Are you sure?"
          noText="Cancel"
          yesText="OK"
          onYes={() => {
            logOut();
            toggleLogoutModal(false);
          }}
        />
      )}
      <Feedback feedback={feedback} setFeedback={setFeedback} />
    </>
  );
};

export default Account;
