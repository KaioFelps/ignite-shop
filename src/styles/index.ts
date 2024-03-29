import { createStitches } from "@stitches/react"

export const {
    config,
    styled,
    css,
    globalCss,
    keyframes,
    getCssText,
    theme,
    createTheme
} = createStitches({
    theme: {
        colors: {
            "white": "#ffffff",
            
            "gray-900": "#121214",
            "gray-800": "#202024",
            "gray-300": "#C4C4CC",
            "gray-100": "#E1E1E6",

            "green-500": "#00875F",
            "green-300": "#00B37E",
        },

        fontSizes: {
            xs: "0.875rem",
            sm: "1rem",
            md: "1.125rem",
            lg: "1.25rem",
            xl: "1.5rem",
            "2xl": "2rem",
        }
    }
})