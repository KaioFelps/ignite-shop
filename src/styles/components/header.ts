import { IconButton, SwipeableDrawer } from "@mui/material"
import { styled } from ".."

export const HeaderContainer = styled("header", {
    padding: "2rem",
    width: "100%",
    maxWidth: 1100,
    margin: "0 auto 5rem auto",

    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
})

export const CartChip = styled("span", {
    background: "$green-500",
    borderRadius: 999,
    color: "$gray-300",
    padding: 2,
    fontSize: "small",
    
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: 24,
    paddingInline: 6,
    
    position: "absolute",
    top: 0,
    right: 0,
    
    transform: "translate(50%, -50%)",
    border: "2px solid $gray-900",
    zIndex: 1,
})

export const ShopCartDrawer = styled(SwipeableDrawer, {
    ".MuiPaper-root": {
        background: "$gray-800",
        padding: 48,
        color: "$gray-100",

        width: "100%",
        maxWidth: 480,
    },

    h2: {
        fontSize: "$lg",
        marginBottom: 40,
    },
})

export const CloseShopCartDrawerButton = styled(IconButton, {
    color: "$gray-300",
    padding: 12,
    maxWidth: 48,

    alignSelf: "flex-end",
})