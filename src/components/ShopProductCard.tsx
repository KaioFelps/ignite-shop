import Skeleton from "@mui/material/Skeleton";
import { ProductCardContainer, ProductCardFooter, ProductImage, ProductInfos, RemoveProductButton, SkeletonInfos } from "../styles/components/ShopProductCard";

type ShopProductCardProps = {
    title: string;
    price: string;
    imageUrl: string;
    quantity: number;
}

export function ShopProductCard({imageUrl = "", price = "R$ 0,00", quantity = 0, title = "" }: ShopProductCardProps) {
    return (
        <ProductCardContainer>
            <ProductImage src={imageUrl} alt="" width={100} height={100} />

            <ProductInfos>
                <p>{title}</p>
                <strong>{price}</strong>

                <ProductCardFooter>
                    <span>{quantity}</span>
                    <RemoveProductButton variant="text">
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