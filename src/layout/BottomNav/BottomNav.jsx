import { Link, useLocation } from "react-router-dom"
import { MdHome, MdMoney, MdQueryStats, MdAccountBox } from "react-icons/md"

import { classNames } from "../../helpers/helpers"

// navbar
const navLinks = [
    { title: "Home", route: "/", icon: <MdHome /> },
    { title: "Expenses", route: "/expenses", icon: <MdMoney /> },
    { title: "Stats", route: "/stats", icon: <MdQueryStats /> },
    { title: "Account", route: "/account", icon: <MdAccountBox /> }
]

const BottomNav = () => {
    const { pathname } = useLocation()

    return (
        <section id="bottomNav" className="block fixed w-full bottom-0 z-10 bg-surface dark:bg-surfaceDark shadow-inner">
            <div className="grid grid-cols-4 py-2">
                {navLinks.map((link, index) => (
                    <Link
                    key={`navlink${index}`}
                        to={link.route ?? "#"}
                        className={classNames(
                            pathname === link.route &&
                            "font-bold text-primary dark:text-primaryDark",
                            " text-onSurface rounded sm:hover:bg-transparent hover:text-primary sm:p-0 dark:hover:text-primaryDark dark:text-onSurfaceDark sm:dark:hover:bg-transparent"
                        )}
                    >
                        <div className="flex flex-col justify-center items-center">
                            <span className="text-3xl">{link.icon}</span>
                            <span className="text-base">{link.title}</span>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    )
}

export default BottomNav