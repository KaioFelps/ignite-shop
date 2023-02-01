import { Button } from "@mui/material"
import { styled } from ".."

export const CartFooter = styled("footer", {
    display: "flex",
    flexDirection: "column",
    gap: 0,
})

export const QuantityRow = styled("div", {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",

    fontSize: "$md",
    
    label: {
        color: "$gray-100",
    },

    span: {
        color: "$gray-300",
    }
})

export const ValueRow = styled("div", {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontWeight: "bold",
    marginBottom: 55,

    label: {
        fontSize: "$lg",
    },

    span: {
        fontSize: "$xl",
    }
})

export const FinishPurchaseButton = styled(Button, {
    marginTop: "auto",
    backgroundColor: "$green-500",
    border: 0,
    borderRadius: 8,
    padding: "1.25rem",
    cursor: "default",
    textTransform: "none",
    lineHeight: "initial",
    
    fontSize: "$md",
    fontWeight: "regular",
    color: "$white",

    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    "&:hover": {
        backgroundColor: "$green-500",
        filter: "brightness(0.95)",
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
})

export const CartMainContainer = styled("main", {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",

    overflow: "overlay",

    "@supports(not(overflow: overlay))": {
        overflow: "auto",
    },
})