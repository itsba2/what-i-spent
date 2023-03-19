import { MdAdd } from "react-icons/md"
import { Link } from "react-router-dom"

const FloatingActionButton = () => {
    return (
        <div className="fixed right-0 bottom-20 z-50 mr-2 flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-primary text-onPrimary hover:bg-primaryVar">
            <Link to="/add-expense">
                <MdAdd className="text-4xl font-extrabold" />
            </Link>
        </div>
    )
}

export default FloatingActionButton
