import { useCallback, useContext, useEffect, useState } from "react";
import { CartContext, CartProductPropsType } from "../contexts/CartContext";
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
    const [ isFetchingData, setIsFetchingData ] = useState(false)
    const [ isPurchasing, setIsPurchasing ] = useState(false)
    const [ formattedTotalPrice, setFormattedTotalPrice ] = useState("")
    const [ productsData, setProductsData ] = useState<ProductDataPropsType[]>([])

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

    const getFormattedTotalPrice = useCallback(() => {
        if(productsList.length === 0) {
            return "R$ 0,00";
        }

        const summedPrices = productsList.reduce(
            (acc: number, product: CartProductPropsType) => {
                const price = product.price * product.quantity
                return acc += price
            }, 0
        )

        const formattedPrice = summedPrices.toLocaleString("pt-br", {
            currency: "BRL",
            style: "currency",
        })

        return formattedPrice
    }, [productsList])

    const handlePurchaseProducts = useCallback(async() => {
        try {
            setIsPurchasing(true)
            const newProductsList = productsList.map(({priceId, quantity}) => {
                return {
                    price: priceId,
                    quantity
                }
            })

            const response = await axios.post("/api/checkout", {
                productsList: newProductsList,
            })

            const { checkoutUrl } = response.data
            window.location.href = checkoutUrl
        }
        catch(error) {
            console.log(error)
        }
        finally {
            setIsPurchasing(false)
        }
    }, [productsList])
    
    useEffect(() => {
        setProductsAmount(getProductsLength())
        setIsFetchingData(true)

        updateProductsData()
        setFormattedTotalPrice(getFormattedTotalPrice())
        
        setTimeout(() => {
            setIsFetchingData(false)
        }, 1000)
    }, [productsList, updateProductsData, getProductsLength, getFormattedTotalPrice])

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
                <span>{isFetchingData ? "..." : formattedTotalPrice}</span>
            </ValueRow>

            <FinishPurchaseButton disabled={isPurchasing || productsList.length === 0} onClick={handlePurchaseProducts}>
                Finalizar compra
            </FinishPurchaseButton>
            </CartFooter>
        </>
    )
}