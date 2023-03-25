import Container from "@mui/material/Container"
import { Outlet } from "react-router-dom"
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
        </Container>
    )
}

export default Page
