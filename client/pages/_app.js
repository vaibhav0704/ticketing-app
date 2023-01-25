import React from 'react';
import '../styles/globals.css';
import { ChakraProvider } from '@chakra-ui/react';
import buildClient from '../api/build-client';
import customTheme from '../customTheme';
import Header from '../components/Header';

const AppComponent = ({ Component, pageProps, currentUser }) => {
  return (
    <ChakraProvider theme={customTheme}>
      <div className="w-screen h-screen flex flex-col bg-[#1a202c]">
        <Header currentUser={currentUser} />
        <Component {...pageProps} />
      </div>
    </ChakraProvider>
  )
}

AppComponent.getInitialProps = async (appContext) => {

  const client = buildClient(appContext.ctx);
  const { data } = await client.get('api/users/currentuser');
  
  let pageProps = {};
  if (appContext.Component.getInitialProps) 
    pageProps = await appContext.Component.getInitialProps(appContext.ctx);

  return {
    pageProps,
    ...data
  };

};

export default AppComponent