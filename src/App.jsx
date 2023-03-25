// library imports
import { Box } from "@mui/material"
import CssBaseline from "@mui/material/CssBaseline"

// layout imports
import BottomNav from "./layout/BottomNav/BottomNav"
import TopBar from "./layout/TopBar/TopBar"
import Page from "./layout/Page"

const App = () => {
    return (
        <>
            <CssBaseline enableColorScheme />
            <Box
                minHeight="100vh"
                display="flex"
                flexDirection="column"
                justifyContent="start"
            >
                <TopBar />
                <Page />
                <BottomNav />
            </Box>
        </>
    )
}

export default App
