import Link from "next/link";
import { styled } from "..";

export const HomeContainer = styled("main", {
    // display: "flex",
    // gap: "3rem", ATRAPALHA O KEEN-SLIDER

    position: "relative",
    width: "calc(100% - 40px)",
    maxWidth: "100%",
    minHeight: 656,
    // maxWidth: "calc(100vw - ((100vw - 1168px) / 2))",
    // marginLeft: "auto",
})

export const ProductWrapper = styled("div", {
    position: "relative",

    footer: {
        position: "absolute",
        bottom: "0.25rem",
        left: "0.25rem",
        right: "0.25rem",

        transform: "translateY(110%)",
        opacity: 0,
        transition: "all 0.2s ease-in-out",

        borderRadius: 6,
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        padding: "2rem",

        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",

        strong: {
            fontSize: "$lg",
            color: "$gray-100",
        },

        span: {
            fontSize: "$xl",
            fontWeight: "bold",
            color: "$green-300",
        },
    },

    "&:hover": {
        footer: {
            transform: "translateY(0)",
            opacity: 1,
        },
    }
})

export const Product = styled(Link, {
    background: "linear-gradient(100deg, #1ea483 0%, #7465d4 100%)",
    borderRadius: 8,
    // padding: "0.25rem", ATRAPALHA O KEEN-SLIDER
    cursor: "pointer",
    position: "relative",
    overflow: "hidden",

    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    height: "100%",

    img: {
        objectFit: "cover",
    },
})

export const SliderNavContainer = styled("div", {
    width: "calc(100vw - 32px)",
    height: "100%",
    display: "grid",
    gridAutoFlow: "column",
    alignItems: "center",
    pointerEvents: "none",

    position: "absolute",
    marginInline: 16,
})

export const SliderNavButton = styled("button", {
    display: "block",
    alignSelf: "center",
    border: 0,
    boxSizing: "content-box",
    padding: 8,
    borderRadius: 999,
    background: "rgba(0, 0, 0, 0)",
    transition: "all 150ms",
    outlineColor: "rgba(255, 255, 255, 0.25)",
    pointerEvents: "auto",

    "&:hover": {
        background: "rgba(0, 0, 0, 0.05)",
        

        "@supports(backdrop-filter: blur(10px))": {
            backdropFilter: "blur(10px)"
        },
    },

    "&:focus": {
        outline: "solid 2px rgba(255, 255, 255, 0.25)",
        
        "@supports(backdrop-filter: blur(10px))": {
            backdropFilter: "blur(10px)"
        },
    }
})

export const InfosColumn = styled("div", {
    display: "flex",
    flexDirection: "column",
    gap: 4,
})