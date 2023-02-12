import Router from 'next/router'
import React, { useEffect } from 'react'
import useRequest from '../../hooks/use-request'

const signout = () => {
  const { doRequest } = useRequest({
    url: '/api/users/signout',
    method: 'post',
    body: {},
    onSuccess: () => Router.push('/')
  });

  useEffect(() => {
    doRequest();
  }, [])

  return (
    <div className="w-screen h-full flex justify-center items-center">
      <h1
        className="my-2 transition-colors duration-300 transform text-gray-200 hover:text-blue-400 md:mx-4 md:my-0"
      >Signing you out...</h1>
    </div>
  )
}

export default signout