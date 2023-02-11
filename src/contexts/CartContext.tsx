import { createContext, ReactNode, useState } from "react";

export type CartProductPropsType = {
    id: string;
    price: number;
    priceId: string;
    quantity: number;
}

type CartContextPropsType = {
    productsList: CartProductPropsType[],
    getProductQuantity: (id: string) => number,
    addProductToCart: (id: string, price: number, priceId: string) => void,
    removeProductFromCart: (id: string) => void,
    getProductsLength: () => number,
}

export const CartContext = createContext({} as CartContextPropsType)

export function CartContextProvider({children}: {children: ReactNode}) {
        const [cartProducts, setCartProducts] = useState<CartProductPropsType[]>([])

    function getProductQuantity(id: string) {
        const quantity = cartProducts.find(product => product.id === id)?.quantity

        if (quantity === undefined) return 0
        return quantity
    }

    function addProductToCart(id: string, price: number, priceId: string) {
        const quantity = getProductQuantity(id)
        
        if(quantity === 0) {
            setCartProducts(prevState => [...prevState, {
                id,
                price,
                priceId,
                quantity: 1,
            }])
        }
        else {
            setCartProducts(
                cartProducts.map(product => {
                    if(product.id !== id) {
                        return product
                    }
                    else {
                        return {
                            id: product.id,
                            price: product.price,
                            priceId: product.priceId,
                            quantity: product.quantity + 1
                        }
                    }
                })
            )
        }
    }

    function removeProductFromCart(id: string) {
        const quantity = getProductQuantity(id)

        if(quantity == 1) {
            setCartProducts(prevState => prevState.filter(product => product.id !== id))
        }
        else {
            setCartProducts(
                cartProducts.map(product => {
                    if(product.id !== id) {
                        return product
                    }

                    const newProduct = {
                        id: product.id,
                        price: product.price,
                        priceId: product.priceId,
                        quantity: product.quantity -1
                    }

                    return newProduct
                })
            )
        }
    }

    function getProductsLength() {
        if(cartProducts.length <= 0) {
            return 0;
        }

        const productsInCart = cartProducts.reduce((accumulator: number, product: CartProductPropsType) => {
            accumulator += product.quantity
            return accumulator
        }, 0)

        return productsInCart
    }

    const contextValue = {
        productsList: cartProducts,
        getProductQuantity,
        addProductToCart,
        removeProductFromCart,
        getProductsLength,
        // getTotalCost: () => {},
    } as CartContextPropsType

    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    )
}

// cart, addtocart, removecart, finish shopping