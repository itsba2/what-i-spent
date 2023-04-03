import { AppBar, Container, Box, Toolbar, Typography } from "@mui/material"
import { Link } from "react-router-dom"

import logo from "../../assets/what-i-spent.png"
import BackButton from "./BackButton"
import ToggleTheme from "../../components/ToggleTheme"

const TopBar = () => (
    <AppBar position="sticky">
        <Container maxWidth="lg">
            <Toolbar
                disableGutters
                sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                }}
            >
                <BackButton />
                <Box
                    display="inline-flex"
                    alignItems="center"
                >
                    <Link to="/">
                        <img
                            src={logo}
                            alt="Logo"
                            style={{
                                height: 40,
                            }}
                        />
                    </Link>
                    <Typography
                        variant="body1"
                        sx={{ letterSpacing: "0.2rem", ml: 1 }}
                    >
                        WHATiSPENT
                    </Typography>
                </Box>
                <Box visibility="hidden"></Box>
                {/* <ToggleTheme /> */}
            </Toolbar>
        </Container>
    </AppBar>
)

export default TopBar
