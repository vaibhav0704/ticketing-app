import Link from 'next/link'
import React from 'react'

const Header = ({ currentUser }) => {

  const links = [
    !currentUser && { label: 'Sign Up', href: '/auth/signup' },
    !currentUser && { label: 'Sign In', href: '/auth/signin' },
    currentUser && { label: 'Create Ticket', href: '/tickets/new' },
    currentUser && { label: 'Show Orders', href: '/orders' },
    currentUser && { label: 'Sign Out', href: '/auth/signout' }
  ].filter(linkConfig => linkConfig).map(({ label, href }) => {
    return <Link 
        href={href}
        className="my-2 transition-colors duration-300 transform text-gray-200 hover:text-blue-400 md:mx-4 md:my-0"
      >{label}
    </Link>
  })

  return (
    <nav x-data="{ isOpen: false }" className="relative shadow bg-gray-800">
      <div className="container px-6 py-4 mx-auto md:flex md:justify-between md:items-center">
        <div className="flex items-center justify-between">
          <Link
            href="/"
          >
            <h1
              className="my-2 text-2xl transition-colors duration-300 transform text-gray-200 hover:text-blue-400 md:mx-4 md:my-0"
            >GetTix
            </h1>
          </Link>
        </div>

        <div className="flex flex-col md:flex-row md:mx-6">
          {links}
        </div>
      </div>
    </nav>
  )
}

export default Header