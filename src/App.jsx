// library imports
import { Outlet } from "react-router-dom"
import { Box, Container } from "@mui/material"
import CssBaseline from "@mui/material/CssBaseline"

// layout imports
import BottomNav from "./layout/BottomNav/BottomNav"
import TopBar from "./layout/TopBar/TopBar"

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
                <Container
                    sx={{
                        pb: 7,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "start",
                        flexGrow: 1,
                    }}
                >
                    <Outlet />
                </Container>
                <BottomNav />
            </Box>
        </>
    )
}

export default App
