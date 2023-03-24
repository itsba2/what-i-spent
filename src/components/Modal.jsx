import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@mui/material"

const Modal = ({ open, toggle, title, text, noText, onNo, yesText, onYes }) => {
    return (
        <Dialog
            open={open}
            onClose={() => toggle(false)}
        >
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <DialogContentText>{text}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button
                    variant="outlined"
                    onClick={onNo}
                >
                    {noText}
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={onYes}
                >
                    {yesText}
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default Modal
