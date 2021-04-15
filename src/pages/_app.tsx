import{Header} from '../components/Header';
import {AppProps} from 'next/app';
import { Provider as NextAuthProvider } from 'next-auth/client';
import React from 'react';
import Head from 'next/head'
import '../styles/Global.scss';

function MyApp({ Component, pageProps }: AppProps) {
  return (
   <>
    <NextAuthProvider session={pageProps.session}>
  <Header />
  <Component {...pageProps} />
  </NextAuthProvider>
  </>
  )
}

export default MyApp
