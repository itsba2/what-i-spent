import { Snackbar, Alert, Slide, useMediaQuery, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setFeedback } from "../../app/feedbackSlice";

const Feedback = () => {
  const { severity, message } = useSelector((state) => state.feedback);
  const dispatch = useDispatch();

  const theme = useTheme();

  const mobileView = useMediaQuery(theme.breakpoints.down("sm"));

  const handleCloseFeedback = (event, reason) => {
    if (reason === "clickaway") return;
    dispatch(setFeedback({ severity: "", message: "" }));
  };
  return (
    <Snackbar
      anchorOrigin={{
        vertical: mobileView ? "top" : "bottom",
        horizontal: mobileView ? "center" : "left",
      }}
      TransitionComponent={(props) => <Slide {...props} direction="down" />}
      open={!!severity}
      autoHideDuration={4000}
      onClose={handleCloseFeedback}
    >
      <Alert
        severity={severity || "error"}
        onClose={handleCloseFeedback}
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Feedback;
