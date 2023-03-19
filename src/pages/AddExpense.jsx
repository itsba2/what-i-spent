import { useNavigate } from "react-router-dom"
import Button from "../components/Button"

const AddExpense = () => {
    const navigate = useNavigate()
    return (
        <div>
            <Button
                text="Cancel"
                secondary={true}
                onClick={() => navigate(-1)}
                type="button"
            />
        </div>
    )
}

export default AddExpense
