import React from 'react';
import '../styles/globals.css';
import buildClient from '../api/build-client';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Header from '../components/Header';

const App = ({ Component, pageProps, currentUser }) => {
  return (
    <div className="max-w-screen min-h-screen flex flex-col bg-[#1a202c]">
      <Header currentUser={currentUser} />
      <ToastContainer />
      <div className="w-full min-h-screen flex flex-col">
        <Component currentUser={currentUser} {...pageProps} />
      </div>
    </div>
  )
};


App.getInitialProps = async (appContext) => {

  const client = buildClient(appContext.ctx);
  const { data } = await client.get('api/users/currentuser');
  
  let pageProps = {};
  if (appContext.Component.getInitialProps) 
    pageProps = await appContext.Component.getInitialProps(appContext.ctx, client, data.currentUser);

  return {
    pageProps,
    ...data
  };

};

export default App