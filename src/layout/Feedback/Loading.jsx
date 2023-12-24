import { Backdrop, CircularProgress } from "@mui/material";

import { useSelector } from "react-redux";

const Loading = () => {
  const loading = useSelector((state) => state.feedback.loading) || false;

  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={loading}
    >
      <CircularProgress color="primary" />
    </Backdrop>
  );
};

export default Loading;
