import { ProductCardContainer, ProductCardFooter, ProductImage, ProductInfos, RemoveProductButton } from "../styles/components/ShopProductCard";

type ShopProductCardProps = {
    title: string;
    price: string;
    imageUrl: string;
    quantity: number;
}

export function ShopProductCard({imageUrl = "", price = "R$ 0,00", quantity = 0, title = "" }: ShopProductCardProps) {
    return (
        <ProductCardContainer>
            <ProductImage src={imageUrl} alt="" width={100} height={90} />

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