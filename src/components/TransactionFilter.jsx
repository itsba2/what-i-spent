import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
    Slider,
} from "@mui/material"
import { Box } from "@mui/system"

const TransactionFilter = ({
    open,
    toggle,
    filterOptions,
    setFilterOptions,
}) => {
    const handleSlider = (event, newValue) =>
        setFilterOptions((prev) => ({ ...prev, amount: newValue }))
    return (
        <Dialog
            maxWidth="sm"
            fullWidth
            open={open}
            onClose={() => toggle(false)}
        >
            <DialogTitle>Filter</DialogTitle>
            <DialogContent>
                <Box
                    component="form"
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Slider
                        sx={{
                            marginTop: 4,
                            width: "95%",
                            justifySelf: "center",
                        }}
                        value={filterOptions.amount}
                        onChange={handleSlider}
                        min={filterOptions.min}
                        max={filterOptions.max}
                        disableSwap
                        valueLabelDisplay="auto"
                    />
                </Box>
            </DialogContent>
            <DialogActions>
                <Button
                    variant="outlined"
                    onClick={() => toggle(false)}
                >
                    Cancel
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                        console.log("Filters applied")
                    }}
                >
                    Apply
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default TransactionFilter
