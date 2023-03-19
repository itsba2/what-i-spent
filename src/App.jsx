// library imports
import { Outlet } from "react-router-dom"

// layout imports
import Main from "./layout/Main"
import Container from "./layout/Container"
import BottomNav from "./layout/BottomNav/BottomNav"
import TopBar from "./layout/TopBar/TopBar"

const App = () => {
    return (
        <Main>
            <TopBar />
            <Container>
                <Outlet />
            </Container>
            <BottomNav />
        </Main>
    )
}

export default App
