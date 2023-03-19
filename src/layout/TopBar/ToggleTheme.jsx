import { useState } from "react"
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md"

const ToggleTheme = () => {
    const [isDark, setIsDark] = useState(
        localStorage.getItem("color-theme") === "dark" ? true : false
    )

    const handleToggleSwitch = () => {
        setIsDark(!isDark)
        if (localStorage.getItem("color-theme")) {
            if (localStorage.getItem("color-theme") === "light") {
                document.documentElement.classList.add("dark")
                localStorage.setItem("color-theme", "dark")
            } else {
                document.documentElement.classList.remove("dark")
                localStorage.setItem("color-theme", "light")
            }
        } else {
            if (document.documentElement.classList.contains("dark")) {
                document.documentElement.classList.remove("dark")
                localStorage.setItem("color-theme", "light")
            } else {
                document.documentElement.classList.add("dark")
                localStorage.setItem("color-theme", "dark")
            }
        }
    }
    return (
        <button onClick={handleToggleSwitch} className='p-2 cursor-pointer rounded-full hover:bg-surfaceVar text-2xl dark:hover:bg-surfaceVarDark'>
            {!isDark ? (
                <span className="text-onSurface">
                    <MdOutlineLightMode />
                </span>
            ) : (
                <span className="dark:text-onSurfaceDark">
                    <MdOutlineDarkMode />
                </span>
            )}
        </button>
    )
}

export default ToggleTheme
