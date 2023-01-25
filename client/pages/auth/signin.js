import { 
  Button,
  FormLabel, 
  Heading, 
  Input, 
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import Router from 'next/router';
import React, { useEffect, useState } from 'react';
import useRequest from '../../hooks/use-request';

const signin = () => {

  const [show, setShow] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { doRequest, errors } = useRequest({
    url: '/api/users/signin',
    method: 'post',
    body: {
      email, password
    },
    onSuccess: () => Router.push('/')
  });
  const handleClick = () => setShow(!show);

  const onSubmit = async (e) => {
    e.preventDefault();

    await doRequest()
  };

  return (
    <div className='flex flex-col items-center'>
      <div>
        <Heading color="white" size='xl'>Sign In</Heading>
      </div>      
      <div className="w-1/4 mt-8">
        <form onSubmit={onSubmit}>
          <FormLabel color="white" >Email address</FormLabel>
          <Input 
            color="white" 
            value={email}
            onChange={e => setEmail(e.target.value)}
            // type='email'
            />
          <FormLabel color="white" className="mt-8">Password</FormLabel>
          <InputGroup 
            width='auto'
            size='md'
          >
            <Input
              color="white" 
              pr='4.5rem'
              value={password}
              onChange={e => setPassword(e.target.value)}
              type={show ? 'text' : 'password'}
              placeholder='Enter password'
            />
            <InputRightElement width='4.5rem'>
              <Button h='1.75rem' size='sm' onClick={handleClick}>
                {show ? 'Hide' : 'Show'}
              </Button>
            </InputRightElement>
          </InputGroup>
          <Button type='submit' className='mt-8' colorScheme='teal'>Sign In</Button>
        </form>
      </div>

    </div>
  )
}

export default signin;