import { createTheme, ThemeProvider } from "@mui/material/styles"
import { useMemo, useState, createContext, useContext, forwardRef } from "react"
import { Link as RouterLink } from "react-router-dom"
import PropTypes from "prop-types"

const LinkBehavior = forwardRef((props, ref) => {
    const { href, ...other } = props
    return (
        <RouterLink
            ref={ref}
            to={href}
            {...other}
        />
    )
})
LinkBehavior.propTypes = {
    href: PropTypes.oneOfType([
        PropTypes.shape({
            hash: PropTypes.string,
            pathname: PropTypes.string,
            search: PropTypes.string,
        }),
        PropTypes.string,
    ]).isRequired,
}

const ColorModeContext = createContext({ toggleColorMode: () => {} })

export const useColorMode = () => {
    return useContext(ColorModeContext)
}

export const ColorModeProvider = ({ children }) => {
    const [mode, setMode] = useState(localStorage.getItem("color-mode"))
    const colorMode = useMemo(
        () => ({
            toggleColorMode: () => {
                if (localStorage.getItem("color-mode") === "light") {
                    localStorage.setItem("color-mode", "dark")
                } else {
                    localStorage.setItem("color-mode", "light")
                }
                setMode((prevMode) => (prevMode === "light" ? "dark" : "light"))
            },
        }),
        []
    )
    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode,
                    ...(mode === "light"
                        ? {
                              // palette values for light mode
                              primary: {
                                  main: "#43a047",
                              },
                              secondary: {
                                  main: "#6d4c41",
                              },
                              success: {
                                  main: "#388e3c",
                              },
                              info: {
                                  main: "#ffb300",
                              },
                              background: {
                                  default: "#fff",
                                  paper: "#fff",
                              },
                          }
                        : {
                              // palette values for dark mode
                              primary: {
                                  main: "#009688",
                              },
                              secondary: {
                                  main: "#b388ff",
                              },
                              success: {
                                  main: "#2e7d32",
                              },
                              info: {
                                  main: "#fff59d",
                              },
                          }),
                },
                components: {
                    MuiButton: {
                        styleOverrides: {
                            root: {
                                textTransform: "none",
                            },
                        },
                    },
                    MuiLink: {
                        defaultProps: {
                            component: LinkBehavior,
                        },
                    },
                    MuiButtonBase: {
                        defaultProps: {
                            LinkComponent: LinkBehavior,
                        },
                    },
                },
            }),
        [mode]
    )
    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </ColorModeContext.Provider>
    )
}

export default ColorModeProvider
