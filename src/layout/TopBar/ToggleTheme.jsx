import { IconButton } from "@mui/material"
import { useTheme } from "@mui/material/styles"
import { LightModeOutlined, DarkModeOutlined } from "@mui/icons-material"
import { useColorMode } from "../../styles/ColorModeProvider"

const ToggleTheme = () => {
    const theme = useTheme()
    const colorMode = useColorMode()

    return (
        <IconButton color="inherit" onClick={colorMode.toggleColorMode}>
            {theme.palette.mode === "dark" ? (
                <LightModeOutlined />
            ) : (
                <DarkModeOutlined />
            )}
        </IconButton>
    )
}

export default ToggleTheme
