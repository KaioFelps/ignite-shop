import logo from "../assets/logo.svg"
import Image from "next/legacy/image"
import Link from 'next/link'
import { Button } from "@mui/material";
import { Handbag, X } from "phosphor-react";
import { CartChip, CloseShopCartDrawerButton, HeaderContainer, ShopCartDrawer } from "../styles/components/header";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../contexts/CartContext";
import { KeyboardEvent, MouseEvent } from "react";
import { ShopCartContent } from "./ShopCartContent";

export function Header() {
    const { getProductsLength, productsList } = useContext(CartContext)
    const [ productsInCart, setProductsInCart ] = useState(0)
    const [ drawerIsOpen, setDrawerIsOpen ] = useState(false)

    useEffect(() => {
      setProductsInCart(getProductsLength())
    }, [productsList.length, getProductsLength])

    const toggleDrawer = (open: boolean) =>
      (event: KeyboardEvent | MouseEvent) => {
        if (
          event &&
          event.type === 'keydown' &&
          ((event as React.KeyboardEvent).key === 'Tab' ||
            (event as React.KeyboardEvent).key === 'Shift')
        ) {
          return;
        }

        setDrawerIsOpen(open);
      };

    function handleOpenShopCart() {
      setDrawerIsOpen(true)
    }

    return (
        <HeaderContainer>
          <Link href="/">
            <Image src={logo} alt="" />
          </Link>

          <Button
          sx={{
            color: "#C4C4CC",
            boxSizing: "border-box",
            padding: 1.5,
            minWidth: 0,
            margin: 0,
            background: "#1C1C1F",

            "&:hover": {
              background: "#202024",
            }
          }}
          onClick={handleOpenShopCart}
          >
            <Handbag size={24} weight="bold" />
            <CartChip>
              {productsInCart}
            </CartChip>
          </Button>
          <ShopCartDrawer
            anchor="right"
            onClose={toggleDrawer(false)}
            onOpen={toggleDrawer(true)}
            open={drawerIsOpen}
          >
            <CloseShopCartDrawerButton
              type="button"
              aria-label="Fechar a sacola de compras"
              onClick={() => setDrawerIsOpen(false)}
            >
              <X size={24} weight="bold" />
            </CloseShopCartDrawerButton>
            
            <h2>Sacola de compras</h2>

            <ShopCartContent />

          </ShopCartDrawer>
        </HeaderContainer>

    )
}