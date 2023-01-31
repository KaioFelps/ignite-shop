import logo from "../assets/logo.svg"
import Image from "next/legacy/image"
import Link from 'next/link'
import { Button } from "@mui/material";
import { Handbag } from "phosphor-react";
import { CartChip, HeaderContainer } from "../styles/components/header";
import { useContext } from "react";
import { CartContext } from "../contexts/CartContext";

export function Header() {
    const { getProductsLength } = useContext(CartContext)
    const productsLength = getProductsLength()
  
    return (
        <HeaderContainer>
          <Link href="/">
            <Image src={logo} alt="" />
          </Link>

          <Button sx={{
            color: "#C4C4CC",
            boxSizing: "border-box",
            padding: 1.5,
            minWidth: 0,
            margin: 0,
            background: "#1C1C1F",

            "&:hover": {
              background: "#202024",
            }
          }}>
            <Handbag size={24} weight="bold" />
            <CartChip>
              {productsLength}
            </CartChip>
          </Button>
        </HeaderContainer>

    )
}