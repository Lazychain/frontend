import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Slot } from '../components/slot/slot';
import { ContainerSlot } from "../components/container-slot/container-slot";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ContainerSlot>
        <Slot />
        <Component {...pageProps} />
      </ContainerSlot>
    </>
  )

}
