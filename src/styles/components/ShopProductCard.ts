import { Button } from "@mui/material";
import Image from "next/image";
import { styled } from "..";

export const ProductCardContainer = styled("div", {
    display: "flex",
    gap: 20,
})

export const ProductImage = styled(Image, {
    width: 100,
    height: 100,
    objectFit: "contain",
    objectPosition: "center",
    borderRadius: 8,
    background: "linear-gradient(180deg, #1EA483 0%, #7465D4 100%)",
})

export const ProductInfos = styled("div", {
    flex: 1,
    display: "flex",
    flexDirection: "column",

    p: {
        fontSize: "$lg",
        color: "$gray-300",
    },

    strong: {
        color: "$gray-100",
        fontSize: "lg",
        marginTop: 2,
    }
})

export const ProductCardFooter = styled("footer", {
    marginTop: 8,
    display: "flex",
    alignItems: "center",
    gap: 8,

    span: {
        fontSize: "sm",
        fontWeight: "bold",
        color: "$gray-300",
    }
})

export const RemoveProductButton = styled(Button, {
    color: "$green-500",
    alignSelf: "flex-start",
})