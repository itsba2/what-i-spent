/** @type {import('tailwindcss').Config} */

const clr = require("tailwindcss/colors")

module.exports = {
    darkMode: "class",
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                // light
                primary: clr.emerald["600"],
                primaryVar: clr.emerald["700"],
                onPrimary: clr.stone["100"],
                secondary: clr.lime["200"],
                secondaryVar: clr.lime["300"],
                onSecondary: clr.gray["900"],
                background: clr.stone["100"],
                onBackground: clr.gray["900"],
                surface: clr.stone["200"],
                surfaceVar: clr.stone["300"],
                onSurface: clr.gray["900"],
                error: clr.red["600"],
                errorVar: clr.red["700"],
                // dark
                primaryDark: clr.teal["300"],
                primaryVarDark: clr.teal["400"],
                onPrimaryDark: clr.gray["900"],
                secondaryDark: clr.fuchsia["400"],
                secondaryVarDark: clr.fuchsia["500"],
                onSecondaryDark: clr.gray["900"],
                backgroundDark: clr.slate["700"],
                onBackgroundDark: clr.stone["100"],
                surfaceDark: clr.slate["600"],
                surfaceVarDark: clr.slate["700"],
                onSurfaceDark: clr.stone["100"],
                errorDark: clr.red["400"],
                errorVarDark: clr.red["500"],
            },
            fontFamily: {
                sans: [
                    '"Inter"',
                    "system-ui",
                    "-apple-system",
                    "BlinkMacSystemFont",
                    '"Segoe UI"',
                    "Roboto",
                    '"Helvetica Neue"',
                    "Arial",
                    '"Noto Sans"',
                    "sans-serif",
                    '"Apple Color Emoji"',
                    '"Segoe UI Emoji"',
                    '"Segoe UI Symbol"',
                    '"Noto Color Emoji"',
                ],
            },
        },
    },
    plugins: [require("prettier-plugin-tailwindcss")],
}
