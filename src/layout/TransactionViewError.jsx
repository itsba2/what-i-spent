// library imports
import { Box, Container, Typography, Button } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { useRouteError } from "react-router-dom";

// layout imports
import BottomNav from "./BottomNav/BottomNav";
import TopBar from "./TopBar/TopBar";

const TransactionViewError = () => {
  const error = useRouteError();
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
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            flexGrow: 1,
          }}
        >
          <Typography variant="h1">{error.status}</Typography>
          <Typography variant="h2">{error.statusText}</Typography>
          <Typography variant="h5" align="center">
            This transaction is no longer available.
          </Typography>
          <Button
            variant="outlined"
            color="error"
            sx={{ mt: 2 }}
            href="/transactions"
          >
            Back to Transaction
          </Button>
        </Container>
        <BottomNav />
      </Box>
    </>
  );
};

export default TransactionViewError;
