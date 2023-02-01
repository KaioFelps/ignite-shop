import type { AppProps } from 'next/app'
import { globalStyles } from '../styles/global'
import { Container } from '../styles/pages/app'
import { CartContext, CartContextProvider } from '../contexts/CartContext'
import { Header } from '../components/Header'
import { useContext, useEffect } from 'react'

globalStyles()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CartContextProvider>
        <Container>
          <Header />
  
        <Component {...pageProps} />
      </Container>
    </CartContextProvider>
  )
}