import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/legacy/image";
import Link from "next/link";
import Stripe from "stripe";
import { stripe } from "../lib/stripe";
import { ImageContainer, ProductImagesWrapper, SuccessContainer } from "../styles/pages/success";

type SuccessPageProps = {
    customerName: string;
    products: Array<{
        name: string;
        imageUrl: string;
    }>,
}

export default function Success({customerName, products}: SuccessPageProps) {

    console.log(products)
    return (
        <>
        <Head>
            <title>Ignite Shop: Compra realizada!</title>
            <meta name="description" content={`Parabéns, você acaba de adquirir o produto ${name}!`} />
            <link rel="canonical" href={`/success`} />
            <meta name="robots" content="noindex" />
        </Head>

        <SuccessContainer>
            <ProductImagesWrapper>
                {products.map((product, index) => {
                    return (
                        <ImageContainer key={product.imageUrl+index}>
                            <Image src={product.imageUrl} width={120} height={110} alt="" />
                        </ImageContainer>
                    )
                })}
            </ProductImagesWrapper>

            <h1>Compra efetuada com sucesso!</h1>

            <p>
                Uhuul <strong>{customerName}</strong>, sua compra de <strong>{products.length}</strong> {products.length === 1 ? "camiseta" : "camisetas"} já está a caminho da sua casa!
            </p>

            <Link href="/">
                Voltar ao catálogo.
            </Link>
        </SuccessContainer>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async ({query}) => {
    if(!query.session_id) {
        return {
            redirect: {
                destination: "/",
                permanent: false,
                // é false pois não serão todas as vezes que um usuário entrar que esse redirecionamento deverá acontecer.
            }
        }
    }

    const sessionId = String(query.session_id)
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
        expand: ["line_items", "line_items.data.price.product"],
    })

    const customerName = session.customer_details!.name
    // const product = session.line_items!.data[0].price!.product as Stripe.Product
    const products = session.line_items?.data.map((data) => {
        const product: Stripe.Product = data.price!.product as Stripe.Product
        return {
            name: product.name,
            imageUrl: product.images[0]
        }
    })
    console.log(products)
    return {
        props: {
            customerName,
            products,
        }
    }
}