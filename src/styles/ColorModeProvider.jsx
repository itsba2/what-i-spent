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
                  main: "#00897b",
                },
                secondary: {
                  main: "#f4511e",
                },
                background: {
                  default: "#e0f2f1",
                },
              }
            : {
                // palette values for dark mode
                primary: {
                  main: "#80cbc4",
                },
                secondary: {
                  main: "#ffab91",
                },
                background: {
                  paper: "#212121",
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
