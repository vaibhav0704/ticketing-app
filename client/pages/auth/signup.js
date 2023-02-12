import Router from 'next/router';
import Link from 'next/link'
import React, { useEffect, useState } from 'react';
import useRequest from '../../hooks/use-request';

const signup = () => {

  const [show, setShow] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { doRequest, errors } = useRequest({
    url: '/api/users/signup',
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
    <div className="w-full min-h-screen flex justify-center items-center">
      <div className="w-full max-w-sm mx-auto overflow-hidden rounded-lg shadow-md bg-gray-800">
        <div className="px-6 py-4">
          <h3 className="mt-3 text-xl font-medium text-cente text-gray-200">Welcome</h3>

          <p className="mt-1 text-center text-gray-400">Sign Up</p>

          <form onSubmit={onSubmit}>
            <div className="w-full mt-4">
              <input 
                className="block w-full px-4 py-2 mt-2 text-gray-300 border 
                rounded-lg bg-gray-800 border-gray-600 placeholder-gray-400 
                focus:border-blue-300 focus:ring-opacity-40 focus:outline-none 
                focus:ring focus:ring-blue-300" 
                type="email" 
                placeholder="Email Address" 
                aria-label="Email Address"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>

            <div className="w-full mt-4">
              <input 
                className="block w-full px-4 py-2 mt-2 text-gray-300 border 
                rounded-lg bg-gray-800 border-gray-600 placeholder-gray-400 
                focus:border-blue-300 focus:ring-opacity-40 focus:outline-none 
                focus:ring focus:ring-blue-300" 
                type="password" 
                placeholder="Password" 
                aria-label="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>

            <div className="flex items-center justify-center mt-4">
              <button 
                className="px-6 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors 
                  duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring 
                  focus:ring-blue-300 focus:ring-opacity-50"
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>

        <div className="flex items-center justify-center py-4 text-center bg-gray-700">
            <span className="text-sm text-gray-200">Already have an account? </span>

            <Link href="/auth/signin" className="mx-2 text-sm font-bold text-blue-500 dark:text-blue-400 hover:underline">Sign In</Link>
        </div>
      </div>
    </div>
  )
}

export default signup