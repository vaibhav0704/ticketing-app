import { Heading, Text } from '@chakra-ui/react'
import Link from 'next/link'
import React from 'react'

const Header = ({ currentUser }) => {

  const links = [
    !currentUser && { label: 'Sign Up', href: '/auth/signup' },
    !currentUser && { label: 'Sign In', href: '/auth/signin' },
    currentUser && { label: 'Sign Out', href: '/auth/signout' }
  ].filter(linkConfig => linkConfig).map(({ label, href }) => {
    return <Link href={href}>
      <Text 
        fontSize='2xl'
        color='white'
      >{label}</Text>
    </Link>
  })

  return (
    <nav className="w-screen h-20 flex justify-around items-center">
      <Link href='/'>
        <div>
          <Heading color="white">GetTix</Heading>
        </div>
      </Link>
      <div className="flex w-80 justify-between">
        {links}
      </div>
    </nav>
  )
}

export default Header