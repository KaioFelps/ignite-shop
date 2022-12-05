import type { AppProps } from 'next/app'
import logo from "../assets/logo.svg"
import { globalStyles } from '../styles/global'
import { Container, Header } from '../styles/pages/app'
import Image from "next/legacy/image"
import Link from 'next/link'

globalStyles()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Container>
      <Header>
        <Link href="/">
          <Image src={logo} alt="" />
        </Link>
      </Header>

      <Component {...pageProps} />
    </Container>
  )
}