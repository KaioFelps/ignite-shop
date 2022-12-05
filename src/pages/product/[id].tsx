import axios from "axios"
import { GetStaticPaths, GetStaticProps } from "next"
import Image from "next/legacy/image"
import { useRouter } from "next/router"
import Stripe from "stripe"
import { stripe } from "../../lib/stripe"
import { ImageContainer, ProductContainer, ProductDetails } from "../../styles/pages/product"
import { useState } from "react"

import CircularProgress from '@mui/material/CircularProgress';
import Head from "next/head"

type ProductProps = {
    product: {
        id: string;
        name: string;
        imageUrl: string;
        price: string;
        defaultPriceId: string;
        description: string;
    }
}

export default function Product({product}: ProductProps) {
    const { isFallback } = useRouter()
    const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false)

    if(isFallback) {
        return <h1>Carregando página</h1>
    }

    async function handlePurchaseProduct() {

        try {
            setTimeout(() => {console.log("load")}, 5000)
            setIsCreatingCheckoutSession(true)
            const response = await axios.post("/api/checkout", {
                priceId: product.defaultPriceId
            })

            const { checkoutUrl } = response.data

            /*
            PARA REDIRECIONAR INTERNAMENTE USAMOS:
            const router = useRouter()

            router.push("/path")
            */
           window.location.href = checkoutUrl
        } catch(err) {
            // deve conectar com uma ferramenta de observabilidade (Datadog / Sentry)

            setIsCreatingCheckoutSession(false)
            alert("Falha ao redirecionar ao checkout.")
        }
    }

    return (
        <>
        <Head>
            <title>{product.name} • Ignite Shop</title>
            <meta name="description" content={product.description} />
            <link rel="canonical" href={`/product/${product.id}`} />
        </Head>

        <ProductContainer>
            <ImageContainer>
                <Image src={product.imageUrl} width={520} height={480} alt="" />
            </ImageContainer>

            <ProductDetails>
                <h1>{product.name}</h1>
                <span>{product.price}</span>

                <p>{product.description}</p>
                <button type="button" disabled={isCreatingCheckoutSession} onClick={handlePurchaseProduct}>
                    {isCreatingCheckoutSession ?
                        <CircularProgress color="primary" size={21} variant="indeterminate" />
                    : 
                        "Comprar agora"
                    }
                </button>
            </ProductDetails>
        </ProductContainer>
        </>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [
            { params: { id: "prod_MuBUSj1e9O9w6n" } }
        ],
        fallback: true,
    }
}

export const getStaticProps: GetStaticProps<any, { id: string; }> = async ({params}) => {
    // primeiro parâmetro dentro do <> é o retorno das nossas props, deixamos any porque não precisamos tipar
    // o segundo é a tipagem / formato do params
    const productId = params!.id;

    const product = await stripe.products.retrieve(productId, {
        expand: ["default_price"]
    })

    const price = product.default_price as Stripe.Price
    const convertedPrice = (price.unit_amount! / 100).toLocaleString("pt-br", {
        style: "currency",
        currency: "BRL",
    })

    return {
        props: {
            product: {
                id: product.id,
                name: product.name,
                imageUrl: product.images[0],
                price: convertedPrice,
                defaultPriceId: price.id,
                description: product.description,
            }
        },
        revalidate: 60 * 60 * 1, // 1 hora
    }
}