import { AppBar, Container, Toolbar } from "@mui/material"
import { Link } from "react-router-dom"

import logo from "../../assets/what-i-spent.png"
import BackButton from "./BackButton"
import ToggleTheme from "./ToggleTheme"

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
                <Link to="/">
                    <img
                        src={logo}
                        alt="Logo"
                        style={{
                            height: 40,
                        }}
                    />
                </Link>
                <ToggleTheme />
            </Toolbar>
        </Container>
    </AppBar>
)

export default TopBar
