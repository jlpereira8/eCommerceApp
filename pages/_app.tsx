import '../globals.css'
import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'
import Head from "next/head";

export default function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Tenor+Sans&display=swap"
          rel="stylesheet"
        />
        <meta name="color-scheme" content="light dark" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#000000" media="(prefers-color-scheme: dark)" />
        <meta name="theme-color" content="#F8F0E7" media="(prefers-color-scheme: light)" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="eCommerceApp" />
        <link rel="apple-touch-icon" href="/icons/icon-180.png" />
        <script
          dangerouslySetInnerHTML={{
            __html: `(() => {
              try {
                const ls = localStorage.getItem('theme');
                const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
                const dark = ls ? ls === 'dark' : prefersDark;
                const c = document.documentElement.classList;
                dark ? c.add('dark') : c.remove('dark');
              } catch (e) {}
            })();`,
          }}
        />
      </Head>
      <div className="min-h-screen bg-[var(--background)] text-[var(--body)] dark:bg-[var(--title-active)] dark:text-[var(--off-white)]">
        <div className="ios-top-blur-overlay" />
        <Component {...pageProps} />
      </div>
    </QueryClientProvider>
  )
}
