import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { DefaultSeo } from "next-seo";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DefaultSeo
        titleTemplate="%s | UFC Wordle"
        defaultTitle="UFC Wordle - Daily UFC Fighter Guessing Game"
        description="Test your UFC knowledge with UFC Wordle, the ultimate guessing game for MMA enthusiasts. New fighter to guess daily!"
        canonical="https://www.ufcwordle.com"
        openGraph={{
          type: "website",
          locale: "en_US",
          url: "https://www.ufcwordle.com",
          siteName: "UFC Wordle",
          title: "UFC Wordle - Daily UFC Fighter Guessing Game",
          description: "Test your UFC knowledge with UFC Wordle. Guess the mystery UFC fighter in limited tries!",
          images: [
            {
              url: "https://www.ufcwordle.com/wordle.png",
              width: 1200,
              height: 630,
              alt: "UFC Wordle",
            },
          ],
        }}
        twitter={{
          handle: "@ufcwordle",
          site: "@ufcwordle",
          cardType: "summary_large_image",
        }}
        additionalMetaTags={[
          {
            name: "keywords",
            content: "UFC, Wordle, MMA, fighter, guessing game, daily puzzle, UFC fighters, UFC game",
          },
        ]}
        additionalLinkTags={[
          {
            rel: "apple-touch-icon",
            href: "/apple-touch-icon.png",
            sizes: "180x180",
          },
          {
            rel: "manifest",
            href: "/manifest.json",
          },
        ]}
      />
      <Component {...pageProps} />
    </>
  );
}
