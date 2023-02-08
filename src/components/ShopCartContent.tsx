import { useCallback, useContext, useEffect, useState } from "react";
import { CartContext } from "../contexts/CartContext";
import { CartFooter, CartMainContainer, FinishPurchaseButton, QuantityRow, ValueRow } from "../styles/components/CartContent";

import axios from "axios";
import { ShopProductCard, ShopProductSkeleton } from "./ShopProductCard";

type ProductDataPropsType = {
    id: string;
    name: string;
    imageUrl: string;
    convertedPrice: string;
    defaultPrice: number;
    defaultPriceId: number;
    description: string;
    quantity: number;
}

export function ShopCartContent() {
    const { productsList, getProductsLength } = useContext(CartContext)
    const [ productsAmount, setProductsAmount ] = useState(0)
    const [ productsData, setProductsData ] = useState<ProductDataPropsType[]>([])
    const [ isFetchingData, setIsFetchingData ] = useState(false)
    const [ isCalculatingPrice, setIsCalculatingPrice ] = useState(false)
    const [ formattedTotalPrice, setFormattedTotalPrice ] = useState("")

    const updateProductsData = useCallback(() => {
        if(productsAmount <= 0) {
            setProductsData([])
        }

        else {
            let newList: ProductDataPropsType[] = []
    
            productsList.map(async (prod) => {
                const response = await axios.get(`/api/getproduct/${prod.id}`)
                const data = await response.data
    
                const productFromInitialList = productsList.find(product => product.id === data.id)
                
                newList.push({
                    ...data,
                    quantity: productFromInitialList!.quantity ?? 0
                })
            })
    
            setProductsData(newList)
        }

    }, [productsList, productsAmount])
    
    useEffect(() => {
        setProductsAmount(getProductsLength())
        setIsFetchingData(true)

        updateProductsData()
        
        setTimeout(() => {
            setIsFetchingData(false)
        }, 1000)
    }, [productsList, updateProductsData, getProductsLength])

    // TODO: sum prices and put it
    // useEffect(() => {
    //     setTimeout(() => {
    //         setIsCalculatingPrice(true)

    //         if(productsAmount === 0) {
    //             setFormattedTotalPrice("R$ 0,00")
    //             console.log("0 itens no carrinho")
    //         }

    //         else {
    //             const summedPrices = productsData.reduce((acc: number, product: ProductDataPropsType) => {
    //                 const price = product.defaultPrice * product.quantity
    //                 return acc += price
    //                 console.log(product)
    //             }, 0)
        

    //             const formattedPrice = summedPrices.toLocaleString("pt-br", {
    //                 currency: "BRL",
    //                 style: "currency",
    //             })
        
    //             setFormattedTotalPrice(formattedPrice)
    //         }
            
        
    //         setIsCalculatingPrice(false)
    //     }, 2000)
    // }, [])

    return (
        <>
            <CartMainContainer>
                {isFetchingData ?
                    <ShopProductSkeleton />
                :
                productsData.length >= 1 ?
                    productsData.map((product, index) => {
                        return (
                            <ShopProductCard
                                key={index}
                                imageUrl={product.imageUrl}
                                price={product.convertedPrice}
                                title={product.name}
                                quantity={product.quantity}
                                id={product.id}
                                fnSetIsLoading={(isLoading: boolean) => setIsFetchingData(isLoading)}
                                fnUpdateList={updateProductsData}
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
                <span>{productsAmount} itens</span>
            </QuantityRow>

            <ValueRow>
                <label>Valor total</label>
                <span>{isCalculatingPrice ? "..." : formattedTotalPrice}</span>
            </ValueRow>

            <FinishPurchaseButton>
                Finalizar compra
            </FinishPurchaseButton>
            </CartFooter>
        </>
    )
}