import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import buildClient from '../api/build-client';

const LandingPage = ({ currentUser, tickets }) => {
  const cards = tickets?.map((ticket, i) => {
    return (
      <div 
        key={i}
        className="flex max-w-md flex-col items-center justify-center"
      >
        <Link
          className="z-10 w-3/4 h-56 transition ease-in-out delay-150 hover:scale-110"
          href={`/tickets/${ticket.id}`}
        >
          <div className="w-full h-full bg-gray-300 bg-center bg-cover rounded-lg shadow-md" >
            {/* <Image 
              src="https://images.unsplash.com/photo-1521903062400-b80f2cb8cb9d?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1050&q=80"
              fill
            /> */}
          </div>
        </Link>

        <div className="z-40 w-40 -mt-10 overflow-hidden rounded-lg shadow-lg md:w-48 bg-gray-800">
          <h3 className="py-2 font-bold tracking-wide text-center uppercase text-white">{ticket.title}</h3>

          <div className="flex items-center justify-between px-3 py-2 bg-gray-700">
            <span className="font-bold text-gray-200">₹{ticket.price}</span>
            <button className="px-2 py-1 text-xs font-semibold text-white uppercase transition-colors duration-300 transform bg-gray-800 rounded hover:bg-gray-600 focus:bg-gray-600 focus:outline-none">Add to cart</button>
          </div>
        </div>
      </div>      
    )
  })

  return (
    <div className="h-full w-full flex flex-col">
      <p className="pt-8 text-2xl text-center transition-colors duration-300 transform text-gray-200 hover:text-blue-400 md:mx-4 md:my-0">Tickets</p>
      <div className="w-full h-full mt-8 flex justify-center">
        <div className="h-full w-3/4 lg:grid grid-cols-3 gap-4">
          {cards}
        </div>
      </div>

    </div>
  )
};

LandingPage.getInitialProps = async (context, client, currentUser) => {
  try {
    const res = await client.get('/api/tickets');
    return { tickets: res.data };

  } catch (e) {
    // console.log(e)
  }
};

// export async function getServerSideProps(ctx) {
//   const client = buildClient(ctx);
//   const { data } = await client.get('/api/users/currentuser');
//   console.log(data);
//   return {
//     props: {
//       ...data,
//     }
//   }
// }

export default LandingPage