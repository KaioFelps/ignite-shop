import Image from "next/legacy/image";
import { styled } from "..";

export const SuccessContainer = styled("main", {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto",
    height: 656,

    h1: {
        fontSize: "2xl",
        color: "$gray-100",
    },

    p: {
        fontSize: "$xl",
        color: "$gray-300",
        maxWidth: 656,
        textAlign: "center",
        lineHeight: 1.4,

        strong: {
            fontWeight: "bold",
        }
    },

    a: {
        display: "block",
        marginTop: "5rem",
        fontSize: "$lg",
        color: "$green-300",
        fontWeight: "bold",
        textDecoration: "none",
        borderRadius: 1,

        "&:hover": {
            color: "$green-500",
        },

        "&:focus": {
            color: "$green-300",
            textDecoration: "underline",
            outline: "2px solid $green-300",
            outlineOffset: "8px",
            transition: "outline 50ms",
        }
    }
})

export const ImageContainer = styled("div", {
    width: "100%",
    maxWidth: 130,
    minHeight: "145px",
    maxHeight: "145px",
    background: "linear-gradient(100deg, #1ea483 0%, #7465d4 100%)",
    borderRadius: 8,
    padding: "0.25erm",
    
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "4rem 0 2rem 0",

    img: {
        objectFit: "none",
    }
})