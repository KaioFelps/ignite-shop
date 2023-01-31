import "keen-slider/keen-slider.min.css"

import Image from "next/legacy/image"
import { HomeContainer, InfosColumn, Product, ProductWrapper, SliderNavButton, SliderNavContainer } from "../styles/pages/home"
import { stripe } from "../lib/stripe"
import Stripe from "stripe"
import { GetStaticProps } from "next"

import { useKeenSlider, KeenSliderHooks, KeenSliderInstance } from "keen-slider/react"
import Head from "next/head"
import { CaretLeft, CaretRight, Handbag } from "phosphor-react"
import { useContext, useEffect, useState } from "react"
import { Button } from "@mui/material"
import { CartContext } from "../contexts/CartContext"

type HomeProps = {
  products: {
    id: string;
    name: string;
    imageUrl: string;
    price: string;

  }[]
}

export default function Home({products}: HomeProps) {
  const [ currentSlideIndex, setCurrentSlideIndex ] = useState(0)
  const [ isAddingToCart, setIsAddingToCart ] = useState(false)
  const { addProductToCart } = useContext(CartContext)

  const [sliderRef, slideInstance] = useKeenSlider({
    slides: {
      perView: 2,
      spacing: 48,
      origin: "center",
    },
    // created: slide => slidesLength = slide.track.details.slides.length,
    slideChanged: slide => setCurrentSlideIndex(slide.track.details.abs),
  })

  const slidesLength = slideInstance.current?.track.details.slides.length! - 1

  const isFirstButtonVisible = currentSlideIndex !== 0
  const isLastButtonVisible = currentSlideIndex !== slidesLength

  const slidesController = {
    nextSlide() {
      slideInstance.current?.next()
    },
    prevSlide() {
      slideInstance.current?.prev()
    }
  }

  function handleAddToCarT(id: string) {
    setIsAddingToCart(true)
    setTimeout(() => {
      addProductToCart(id)
      setIsAddingToCart(false)
    }, 2000)
  }

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
            <ProductWrapper
              key={product.id}
              className="keen-slider__slide"
            >
              <Product
                href={`/product/${product.id}`}
                prefetch={false}
              >
                <Image
                  draggable={false}
                  src={product.imageUrl}
                  width={520}
                  height={480}
                  alt=""
                />
              </Product>
              <footer>
                  <InfosColumn>
                    <strong>{product.name}</strong>
                    <span>{product.price}</span>
                  </InfosColumn>

                  <Button
                  sx={{
                    color: "white",
                    background: "#00875F",
                    borderRadius: 2,
                    padding: 1.5,
                    minWidth: 0,

                    "&:hover": {
                      background: "#00875F",
                    },
                  }}
                  type="button"
                  disabled={isAddingToCart}
                  onClick={() => handleAddToCarT(product.id)}
                  >
                    <Handbag size={24} weight="bold" />
                  </Button>
                </footer>
            </ProductWrapper>
          )
        })}

        <SliderNavContainer>
          { isFirstButtonVisible &&
            <SliderNavButton onClick={slidesController.prevSlide} style={{justifySelf: "flex-start"}}>
              <CaretLeft size={48} weight="bold" color="white" />
            </SliderNavButton>
          }

          { isLastButtonVisible &&
            <SliderNavButton onClick={slidesController.nextSlide} style={{justifySelf: "flex-end"}}>
              <CaretRight size={48} weight="bold" color="white" />
            </SliderNavButton>
          }
        </SliderNavContainer>
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