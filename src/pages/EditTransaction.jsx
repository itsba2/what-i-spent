import { useParams } from "react-router-dom"

const EditTransaction = () => {
    const { id } = useParams()
    return <div>Editting {id}</div>
}

export default EditTransaction
