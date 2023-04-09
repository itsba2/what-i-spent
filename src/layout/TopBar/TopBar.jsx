import { AppBar, Container, Box, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";

import logo from "../../assets/what-i-spent.png";
import BackButton from "./BackButton";

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
              width: 40,
            }}
          />
        </Link>
        <Box component="div" visibility="hidden" width={40}>
          asd
        </Box>
      </Toolbar>
    </Container>
  </AppBar>
);

export default TopBar;
