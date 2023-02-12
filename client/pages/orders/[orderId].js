import React, { useEffect, useState } from 'react'
import useRequest from '../../hooks/use-request';

const orderShow = ({ order }) => {

  const [timeLeft, setTimeLeft] = useState('');

  const { doRequest, errors } = useRequest({
    url: '/api/payments',
    method: 'post',
    body: {
      orderId: order.id
    },
    onSuccess: ({ url }) => window.location.assign(url)
  })

  useEffect(() => {
    const findTimeLeft = () => {
      const msLeft = new Date(order.expiresAt) - new Date();
      setTimeLeft(Math.round(msLeft / 1000));
    };

    findTimeLeft();
    const timerId = setInterval(findTimeLeft, 1000);

    return () => {
      clearInterval(timerId);
    }
  }, []);

  if (timeLeft < 0) {
    return (
      <div className="min-h-screen w-full flex flex-col justify-center items-center">
        <div className="max-w-2xl overflow-hidden rounded-lg shadow-md bg-gray-800">
          <div className="p-6">
            <div>
              <span className="text-xs font-medium uppercase text-blue-400">Oops! the order has expired</span>
              <p className="block mt-2 text-xl font-semibold transition-colors duration-300 transform 
                text-white hover:text-gray-600 hover:underline">{order?.price}</p>
            </div>
          </div>
        </div>
      </div>  
    )

  }

  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center">
      <div className="max-w-2xl overflow-hidden rounded-lg shadow-md bg-gray-800">
        <div className="p-6">
          <div>
            <span className="text-xs font-medium uppercase text-blue-400">
              Time left to play {timeLeft} seconds
            </span>
            <p className="block mt-2 text-xl font-semibold transition-colors duration-300 transform  
              text-white hover:text-gray-600 hover:underline">{order?.price}</p>
          </div>
        </div>
      </div>
      <button url
        className="px-6 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 
          transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 
          focus:ring-opacity-80"
        onClick={doRequest}
      >
        Proceed to pay
      </button>
    </div>
  )
};

orderShow.getInitialProps = async (context, client) => {
  const { orderId } = context.query;
  const { data } = await client.get(`/api/orders/${orderId}`);
  return { order: data };
}

export default orderShow