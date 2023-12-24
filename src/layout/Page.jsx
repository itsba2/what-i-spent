import Container from "@mui/material/Container";
import { Outlet } from "react-router-dom";

import Loading from "./Feedback/Loading";
import Feedback from "./Feedback/Feedback";

const Page = () => {
  return (
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
      <Loading />
      <Feedback />
    </Container>
  );
};

export default Page;
