import { Paper, Typography } from "@mui/material"

const PieTooltip = ({ active, payload }) => {
    // console.log(payload[0]?.payload.payload)
    console.log(payload)
    if (active && payload && payload.length) {
        return (
            <Paper elevation={2}>
                <Typography variant="body2">
                    asd
                    {/* {JSON.stringify(payload[0]?.payload.payload)} */}
                </Typography>
            </Paper>
        )
    } else return null
}

export default PieTooltip
