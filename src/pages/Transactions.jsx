import { Fab } from "@mui/material"
import { Add } from "@mui/icons-material"
import { Link } from "react-router-dom"

const Transactions = () => {
    return (
        <div>
            Transactions
            <Link to="/transactions/add">
                <Fab
                    color="secondary"
                    sx={{ position: "fixed", bottom: 70, right: 10 }}
                >
                    <Add />
                </Fab>
            </Link>
        </div>
    )
}

export default Transactions
