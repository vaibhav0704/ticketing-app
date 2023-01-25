import React from 'react';
import buildClient from '../api/build-client';

const LandingPage = ({ currentUser }) => {
  return  currentUser ? (
    <div>LandingPage</div>
    
  ): (
    <div>You are not signed in</div>
  )
};

LandingPage.getInitialProps = async (context) => {
  
  const { data } = await buildClient(context).get('/api/users/currentuser');
  return data;
};

export default LandingPage