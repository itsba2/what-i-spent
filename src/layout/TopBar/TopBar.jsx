import { Link } from "react-router-dom"

import logo from "../../assets/what-i-spent.png"
import BackButton from "./BackButton"
import ToggleTheme from "./ToggleTheme"

const TopBar = () => {
    return (
        <nav className="fixed flex w-full justify-between bg-surface p-2 dark:bg-surfaceDark">
            <BackButton />
            <Link
                to="/"
                className="flex gap-2"
            >
                <img
                    src={logo}
                    className="h-10"
                    alt="Logo"
                />
                <span className="hidden self-center whitespace-nowrap text-xl font-bold dark:text-onBackgroundDark sm:block">
                    WHATiSPENT
                </span>
            </Link>
            <ToggleTheme />
        </nav>
    )
}

export default TopBar
