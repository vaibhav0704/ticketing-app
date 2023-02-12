import { useRouter } from 'next/router';
import React from 'react'
import useRequest from '../../hooks/use-request';

const TicketPage = ({ ticket }) => {

  const router = useRouter();

  const { doRequest, errors } = useRequest({
    url: '/api/orders',
    method: 'post',
    body: {
      ticketId: ticket?.id
    },
    onSuccess: (order) => router.push(`/orders/${order.id}`)
  });

  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center">

      <div className="max-w-2xl overflow-hidden rounded-lg shadow-md bg-gray-800">
          {/* <img class="object-cover w-full h-64" src="https://images.unsplash.com/photo-1550439062-609e1531270e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" alt="Article"> */}
        <div className="p-6">
          <div>
            <span className="text-xs font-medium uppercase text-blue-400">Product</span>
            <p className="block mt-2 text-xl font-semibold transition-colors duration-300 transform  text-white hover:text-gray-600 hover:underline">{ticket?.title}</p>
            <p className="mt-2 text-sm text-gray-400">₹{ticket?.price}</p>
          </div>
        </div>
      </div>
      <button url
        className="px-6 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 
          transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 
          focus:ring-opacity-80"
        onClick={doRequest}
      >
        Purchase
      </button>
    </div>
  )
};

TicketPage.getInitialProps = async (context, client) => {
  const { ticketId } = context.query;
  const { data } = await client.get(`/api/tickets/${ticketId}`);
  return { ticket: data };
}

export default TicketPage