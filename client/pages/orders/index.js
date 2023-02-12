import React from 'react'

const Orders = ({ orders }) => {
  const list = orders?.map((order, i) => {
    return (
      <tr>
      <td className="px-12 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
        {order.status === 'complete' ?
          (
            <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 bg-gray-800">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>

                <h2 className="text-sm font-normal text-emerald-500">Completed</h2>
            </div>

          ) :
          (
            <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 bg-gray-800">
                <span className="h-1.5 w-1.5 rounded-full bg-red-500"></span>

                <h2 className="text-sm font-normal text-red-500">Not Completed</h2>
            </div>

          )
        }
      </td>
      <td className="px-4 py-4 text-sm text-gray-300 whitespace-nowrap">{order?.ticket?.title}</td>
      <td className="px-4 py-4 text-sm text-gray-300 whitespace-nowrap">{order?.ticket?.price}</td>
  </tr>

    )
  })
  return (
    <div>
      <section className="container px-4 mx-auto">
          <div className="flex items-center gap-x-3">
              <h2 className="text-lg font-medium text-white">Your Orders</h2>

              <span className="px-3 py-1 text-xs rounded-full bg-gray-800 text-blue-400">{orders?.length}</span>
          </div>

          <div className="flex flex-col mt-6">
              <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                      <div className="overflow-hidden border border-gray-700 md:rounded-lg">
                          <table className="min-w-full divide-y divide-gray-700">
                              <thead className="bg-gray-800">
                                  <tr>
                                      <th scope="col" className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-400">
                                          <button className="flex items-center gap-x-2">
                                              <span>Status</span>

                                          </button>
                                      </th>

                                      <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-400">
                                          <button className="flex items-center gap-x-2">
                                              <span>Ticket</span>
                                          </button>
                                      </th>
                                      <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-400">
                                          <button className="flex items-center gap-x-2">
                                              <span>Price</span>

                                          </button>
                                      </th>
                                  </tr>
                              </thead>
                              <tbody className="divide-y divide-gray-700 bg-gray-900">
                                {list}
                              </tbody>
                          </table>
                      </div>
                  </div>
              </div>
          </div>

      </section>
    </div>
  )
};

Orders.getInitialProps = async (context, client) => {
  const { data } = await client.get('/api/orders');
  return { orders: data }
}

export default Orders