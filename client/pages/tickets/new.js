import { useRouter } from 'next/router';
import React, { useState } from 'react'
import useRequest from '../../hooks/use-request';

const NewTicket = () => {

  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const { doRequest, errors } = useRequest({
    url: '/api/tickets',
    method: 'post',
    body: {
      title, price
    },
    onSuccess: (ticket) => router.push('/'),
  });

  const router = useRouter();

  const onBlur = () => {
    const value = parseFloat(price);

    if (isNaN(value)) return;

    setPrice(value.toFixed(2));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await doRequest();
  }

  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      <section className="max-w-4xl p-6 mx-auto rounded-md shadow-md bg-gray-800">
        <h2 className="text-lg font-semibold capitalize text-white">New Ticket</h2>
        <form onSubmit={onSubmit}>
          <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div>
              <label className="text-gray-200">Title</label>
              <input 
                id="title" 
                type="text" 
                className="block w-full px-4 py-2 mt-2 border rounded-md 
                  bg-gray-800 text-gray-300 border-gray-600 focus:ring-blue-300 
                  focus:ring-opacity-40 focus:border-blue-300 focus:outline-none focus:ring" 
                vlaue={title}
                onChange={e => setTitle(e.target.value)}
              />
            </div>

            <div>
              <label className="text-gray-200">Price</label>
              <input 
                id="price" 
                type="number" 
                className="block w-full px-4 py-2 mt-2 border rounded-md bg-gray-800 
                  text-gray-300 border-gray-600 focus:ring-blue-300 focus:ring-opacity-40 
                  focus:border-blue-300 focus:outline-none focus:ring" 
                value={price}
                onBlur={onBlur}
                onChange={e => setPrice(e.target.value)}
              />
            </div>

          </div>

          <div className="flex justify-end mt-6">
              <button className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md 
                hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
                type='submit'
              >Create</button>
          </div>
        </form>
      </section>
    </div>
)
}

export default NewTicket