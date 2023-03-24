import { Fab } from "@mui/material"
import { Add } from "@mui/icons-material"
import { Link } from "react-router-dom"

const Expenses = () => {
    return (
        <div>
            Expenses
            <Link to="/add-expense">
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

export default Expenses
