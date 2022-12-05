import { globalCss } from ".";

export const globalStyles = globalCss({
    "*": {
        margin: 0,
        padding: 0,
        boxSizing: "border-box",
    },

    body: {
        "-webkit-font-smoothing": "antialiased",
        backgroundColor: "$gray-900",
        color: "$gray-100",
    },

    "body, input, textarea, button": {
        fontFamily: "Roboto",
        fontWeight: 400,
    }
})