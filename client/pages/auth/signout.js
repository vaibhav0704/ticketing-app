import { Text } from '@chakra-ui/react'
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
      <Text
        fontSize="2xl"
        color="white"
      >Signing you out...</Text>
    </div>
  )
}

export default signout