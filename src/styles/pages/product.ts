import { styled } from "..";

export const ProductContainer = styled("main", {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    alignItems: "stretch",
    gap: "4rem",

    width: "calc(100% - 40px)",
    maxWidth: 1180,
    margin: "0 auto",
})

export const ImageContainer = styled("div", {
    width: "100%",
    maxWidth: 576,
    height: 656,
    background: "linear-gradient(100deg, #1ea483 0%, #7465d4 100%)",
    borderRadius: 8,
    padding: "0.25rem",

    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    img: {
        objectFit: "none",
    }
})

export const ProductDetails = styled("div", {
    display: "flex",
    flexDirection: "column",

    h1: {
        fontSize: "$2xl",
        color: "$gray-300",
    },

    span: {
        marginTop: "1rem",
        display: "block",
        fontSize: "$2xl",
        color: "$green-300",
    },

    p: {
        marginTop: "2.5rem",
        fontSize: "$md",
        lineHeight: 1.6,
        color: "$gray-300",
    },

    button: {
        marginTop: "auto",
        backgroundColor: "$green-300",
        border: 0,
        borderRadius: 8,
        padding: "1.25rem",
        cursor: "default",
        
        fontSize: "$md",
        fontWeight: "regular",
        color: "$white",

        display: "flex",
        alignItems: "center",
        justifyContent: "center",

        "&:hover": {
            backgroundColor: "$green-500",
        },

        "&:active": {
            filter: "brightness(0.9)",
        },

        "&:focus": {
            outline: "3px solid rgb(0 179 126 / 25%)",
        },

        "&:disabled": {
            filter: "saturate(0)",
        },

        span: {
            color: "$gray-100",
            lineHeight: 0,
            margin: 0,
            padding: 0,
            boxSizing: "border-box",
        }
    }
})