import { Snackbar, Alert, Slide, useMediaQuery, useTheme } from "@mui/material"

const Feedback = ({ feedback, setFeedback }) => {
    const theme = useTheme()

    const mobileView = useMediaQuery(theme.breakpoints.down("sm"))

    const handleCloseFeedback = (event, reason) => {
        if (reason === "clickaway") return
        setFeedback((prev) => ({ ...prev, show: false }))
    }
    return (
        <Snackbar
            anchorOrigin={{
                vertical: mobileView ? "top" : "bottom",
                horizontal: mobileView ? "center" : "left",
            }}
            TransitionComponent={(props) => (
                <Slide
                    {...props}
                    direction="down"
                />
            )}
            open={feedback.show}
            autoHideDuration={4000}
            onClose={handleCloseFeedback}
        >
            <Alert
                severity={feedback.type}
                onClose={handleCloseFeedback}
                sx={{ width: "100%" }}
            >
                {feedback.msg}
            </Alert>
        </Snackbar>
    )
}

export default Feedback
