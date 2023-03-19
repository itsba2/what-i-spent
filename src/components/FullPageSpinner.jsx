// layout imports
import Main from "../layout/Main"
import Container from "../layout/Container"
import Spinner from "./Spinner"

const FullPageSpinner = () => {
    return (
        <Main>
            <Container>
                <div className="absolute top-1/2 left-1/2">
                    <Spinner />
                </div>
            </Container>
        </Main>
    )
}

export default FullPageSpinner
