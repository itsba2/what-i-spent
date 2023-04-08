import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

const Modal = ({
  open,
  toggle,
  title,
  text,
  noText = "No",
  onNo = () => {},
  yesText = "Yes",
  onYes = () => {},
}) => {
  return (
    <Dialog open={open} onClose={() => toggle(false)}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{text}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={toggle(false)}>
          {noText}
        </Button>
        <Button variant="contained" color="primary" onClick={() => {
          onYes()
          toggle(false)
        }}>
          {yesText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Modal;
