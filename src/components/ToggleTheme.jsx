import { Button } from "@mui/material"
import { useTheme } from "@mui/material/styles"
import { LightModeOutlined, DarkModeOutlined } from "@mui/icons-material"
import { useColorMode } from "../styles/ColorModeProvider"

const ToggleTheme = () => {
    const theme = useTheme()
    const isDark = theme.palette.mode === "dark"
    const colorMode = useColorMode()

    return (
        <Button
            variant="outlined"
            color="primary"
            startIcon={isDark ? <LightModeOutlined /> : <DarkModeOutlined />}
            onClick={colorMode.toggleColorMode}
        >
            {`Switch to ${isDark ? "light" : "dark"} mode`}
        </Button>
    )
}

export default ToggleTheme
