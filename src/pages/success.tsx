import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/legacy/image";
import Link from "next/link";
import Stripe from "stripe";
import { stripe } from "../lib/stripe";
import { ImageContainer, SuccessContainer } from "../styles/pages/success";

type SuccessPageProps = {
    customerName: string;
    product: {
        name: string;
        imageUrl: string;
    },
}

export default function Success({customerName, product: {imageUrl, name}}: SuccessPageProps) {

    console.log(imageUrl)
    return (
        <>
        <Head>
            <title>Ignite Shop: Compra realizada!</title>
            <meta name="description" content={`Parabéns, você acaba de adquirir o produto ${name}!`} />
            <link rel="canonical" href={`/success`} />
            <meta name="robots" content="noindex" />
        </Head>

        <SuccessContainer>
            <h1>Compra efetuada com sucesso!</h1>

            <ImageContainer>
                <Image src={imageUrl[0]} width={120} height={110} alt="" />
            </ImageContainer>

            <p>
                Uhuul <strong>{customerName}</strong>, sua <strong>{name}</strong> já está a caminho da sua casa!
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
    const product = session.line_items!.data[0].price!.product as Stripe.Product

    return {
        props: {
            customerName,
            product: {
                name: product.name,
                imageUrl: product.images
            },
        }
    }
}