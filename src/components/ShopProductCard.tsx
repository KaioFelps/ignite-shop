import Skeleton from "@mui/material/Skeleton";
import { useContext } from "react";
import { CartContext } from "../contexts/CartContext";
import { ProductCardContainer, ProductCardFooter, ProductImage, ProductInfos, ProductQuantities, RemoveProductButton, SkeletonInfos } from "../styles/components/ShopProductCard";

type ShopProductCardProps = {
    title: string;
    price: string;
    imageUrl: string;
    quantity: number;
    id: string;
    fnSetIsLoading: (isLoading: boolean) => void;
    fnUpdateList: () => void;
}

export function ShopProductCard({imageUrl = "", price = "R$ 0,00", quantity = 0, title = "", id, fnSetIsLoading, fnUpdateList }: ShopProductCardProps) {
    const { removeProductFromCart } = useContext(CartContext)

    function handleDeleteProduct() {
        fnSetIsLoading(true)

        removeProductFromCart(id)
        fnUpdateList()

        setTimeout(() => {
            fnSetIsLoading(false)
        }, 1000)
    }

    return (
        <ProductCardContainer>
            <ProductImage src={imageUrl} alt="" width={100} height={100} />

            <ProductInfos>
                <p>{title}</p>
                <strong>{price}</strong>

                <ProductCardFooter>
                    <ProductQuantities>{quantity}</ProductQuantities>
                    <RemoveProductButton
                        variant="text"
                        color="success"
                        onClick={handleDeleteProduct}
                    >
                        Remover unidade
                    </RemoveProductButton>
                </ProductCardFooter>
            </ProductInfos>
        </ProductCardContainer>
    )
}

export function ShopProductSkeleton() {
    return (
        <>
            {Array.from({length: 2}).map((_, index) => {
                return (
                    <ProductCardContainer key={index}>
                        <Skeleton variant="rectangular" width={100} height={100}  />

                        <SkeletonInfos>
                            <Skeleton variant="text" width="100%" />
                            <Skeleton variant="text" width={70} />
                        </SkeletonInfos>
                    </ProductCardContainer>
                )
            })}
        </>
    )
}