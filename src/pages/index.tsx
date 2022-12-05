import "keen-slider/keen-slider.min.css"

import Image from "next/legacy/image"
import { HomeContainer, Product } from "../styles/pages/home"
import { stripe } from "../lib/stripe"
import Stripe from "stripe"
import { GetStaticProps } from "next"

import { useKeenSlider } from "keen-slider/react"
import Head from "next/head"

type HomeProps = {
  products: {
    id: string;
    name: string;
    imageUrl: string;
    price: string;

  }[]
}

export default function Home({products}: HomeProps) {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 2,
      spacing: 48,
      origin: "center",
    },
  })

  return (
    <>
      <Head>
        <title>Ignite Shop</title>
        <meta name="description" content="Compre já sua camiseta de qualquer edição especial da Rocketseat!" />
        <link rel="canonical" href="/" />
      </Head>
      
      <HomeContainer ref={sliderRef} className="keen-slider">
        {products.map(product => {
          return (
            <Product
              key={product.id}
              href={`/product/${product.id}`}
              className="keen-slider__slide"
              prefetch={false}
            >
              <Image
                draggable={false}
                src={product.imageUrl}
                width={520}
                height={480}
                alt=""
              />

              <footer>
                <strong>{product.name}</strong>
                <span>{product.price}</span>
              </footer>
            </Product>
          )
        })}
      </HomeContainer>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ["data.default_price"]
  })
  const products = response.data.map(product => {
    const price = product.default_price as Stripe.Price
    const convertedPrice = (price.unit_amount! / 100).toLocaleString("pt-br", {
      style: "currency",
      currency: "BRL",
  })

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: convertedPrice,
    }
  })

  return {
    props: {
      products,
    },
    revalidate: 60 * 60 * 2, // a cada duas horas
  }
}