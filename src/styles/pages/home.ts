import Link from "next/link";
import { styled } from "..";

export const HomeContainer = styled("main", {
    // display: "flex",
    // gap: "3rem", ATRAPALHA O KEEN-SLIDER

    width: "calc(100% - 40px)",
    maxWidth: "100%",
    minHeight: 656,
    // maxWidth: "calc(100vw - ((100vw - 1168px) / 2))",
    // marginLeft: "auto",
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

    img: {
        objectFit: "cover",
    },

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