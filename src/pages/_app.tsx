"use client";

import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../theme.js";
import { RecoilRoot } from "recoil";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { getUUIDFromSessionStorage } from "../lib/SessionStorage";

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  const router = useRouter();

  useEffect(() => {
    if (router.pathname !== "/login") {
      const uuid = getUUIDFromSessionStorage();
      if (!uuid) {
        router.push("/login");
      }
    }
  }, [router.pathname]);

  return (
    <RecoilRoot>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </RecoilRoot>
  );
}
