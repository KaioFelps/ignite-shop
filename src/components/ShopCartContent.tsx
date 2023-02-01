import { useCallback, useContext, useEffect, useState } from "react";
import { CartContext } from "../contexts/CartContext";
import { CartFooter, CartMainContainer, FinishPurchaseButton, QuantityRow, ValueRow } from "../styles/components/CartContent";

import type {CartProductPropsType} from "../contexts/CartContext"
import axios from "axios";
import { Skeleton } from "@mui/material";
import { ShopProductCard } from "./ShopProductCard";

type ProductDataPropsType = {
    id: string;
    name: string;
    imageUrl: string;
    price: string;
    defaultPriceId: number;
    description: string;
    quantity: number;
}

export function ShopCartContent() {
    const { productsList } = useContext(CartContext)
    const [ productsData, setProductsData ] = useState<ProductDataPropsType[]>([])
    const [ isFetchingData, setIsFetchingData ] = useState(false)

    // useEffect(() => {
    //     if (productsList.length <= 0) {
    //         return;
    //     }

    //     setIsFetchingData(true)

    //     productsList.forEach(async (product) => {
    //         if(product.id === "") {
    //             return;
    //         }

    //         const response = await axios.get(`/api/getproduct/${product.id}`)
    //         const data = await response.data

    //         setProductsData(prevState => {
    //             const quantity = productsList.find(listedProduct => listedProduct.id === product.id)?.quantity

    //             if(prevState.find(product => product.id === data.id)) {
    //                 return [...prevState, {...data, quantity}]
    //             }

    //             return [...prevState, {}]
    //         })
    //     })

    //     setIsFetchingData(false)
    // }, [productsList])

    return (
        <>
            <CartMainContainer>
                {isFetchingData ?
                <Skeleton />
                :
                productsData.length >= 1 ?
                    productsData.map((product, index) => {
                        return (
                            <ShopProductCard
                                key={index}
                                imageUrl={product.imageUrl}
                                price={product.price}
                                title={product.name}
                                quantity={product.quantity}
                            />
                        )
                    })
                :
                <p>Não há nada aqui, tente adicionar algo no seu carrinho.</p>
                }
            </CartMainContainer>

            <CartFooter>
            <QuantityRow>
                <label>Quantidade</label>
                <span>3 itens</span>
            </QuantityRow>

            <ValueRow>
                <label>Valor total</label>
                <span>R$ 270,00</span>
            </ValueRow>

            <FinishPurchaseButton>
                Finalizar compra
            </FinishPurchaseButton>
            </CartFooter>
        </>
    )
}