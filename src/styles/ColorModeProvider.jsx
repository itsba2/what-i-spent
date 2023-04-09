import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useMemo, useState, createContext, useContext } from "react";
import LinkBehavior from "./LinkBehavior";

const ColorModeContext = createContext({ toggleColorMode: () => {} });

export const useColorMode = () => {
  return useContext(ColorModeContext);
};

export const ColorModeProvider = ({ children }) => {
  const [mode, setMode] = useState(localStorage.getItem("color-mode"));
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        if (localStorage.getItem("color-mode") === "light") {
          localStorage.setItem("color-mode", "dark");
        } else {
          localStorage.setItem("color-mode", "light");
        }
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === "light"
            ? {
                // palette values for light mode
                primary: {
                  main: "#00e676",
                },
                secondary: {
                  main: "#ef5350",
                },
                success: {
                  main: "#388e3c",
                },
                info: {
                  main: "#ffb300",
                },
                background: {
                  default: "#eeeeee",
                  paper: "#e0e0e0",
                },
              }
            : {
                // palette values for dark mode
                primary: {
                  main: "#80cbc4",
                },
                secondary: {
                  main: "#ce93d8",
                },
                success: {
                  main: "#2e7d32",
                },
                info: {
                  main: "#fff59d",
                },
                background: {
                  default: "#212121",
                  paper: "#353535",
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
  );
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default ColorModeProvider;
