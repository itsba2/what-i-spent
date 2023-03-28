import { Typography } from "@mui/material"

const TabSummaryPanel = (props) => {
    const { tabValue, tabIndex, ...other } = props
    return (
        <div
            role="tabtransactionpanel"
            hidden={tabValue !== tabIndex}
            id={`tabtransactionpanel-${tabIndex}`}
            aria-labelledby={`tab-${tabIndex}`}
            {...other}
        >
            {tabValue === tabIndex && (
                <Typography>Summary</Typography>
            )}
        </div>
    )
}
export default TabSummaryPanel
