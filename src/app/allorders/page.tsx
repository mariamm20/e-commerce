import { IUserOrder } from '@/lib/interfaces/IUserOrder';
import { getUserOrder } from '@/lib/services/checkout.service';
import getUserId from '@/utilities/getUserId';

export default async function AllOrders() {

const userId = await getUserId();

const userOrders = await getUserOrder(userId);

  return (
    <main className='w-full md:px-24 px-4 my-8'>
      <h1 className='text-2xl font-bold  mb-4'>
        All Your Orders
      </h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </p>
    <div className="my-6 grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {userOrders.map((order : IUserOrder) => (
        <div key={order._id} className="border rounded-lg p-4 shadow-sm bg-white">
          <p className="font-semibold mb-1">Order ID: {order._id.slice(-6)}</p>
          <p className="text-sm">User: {order.user.name}</p>
          <p className="text-sm">Phone: {order.shippingAddress.phone}</p>
          <p className="text-sm">City: {order.shippingAddress.city}</p>
          <p className="text-sm">Total: ${order.totalOrderPrice}</p>
          <p className="text-sm">Payment: {order.paymentMethodType}</p>
          <p className={`text-sm font-semibold ${order.isPaid ? 'text-green-600' : 'text-red-600'}`}>
            Paid: {order.isPaid ? 'Yes' : 'No'}
          </p>
          <p className={`text-sm font-semibold ${order.isDelivered ? 'text-green-600' : 'text-red-600'}`}>
            Delivered: {order.isDelivered ? 'Yes' : 'No'}
          </p>
          <p className="text-xs text-gray-400">{new Date(order.createdAt).toLocaleString()}</p>
        </div>
      ))}
      {userOrders.length === 0 && <p className="text-gray-500 col-span-full">No orders found.</p>}
    </div>
    </main>
  );
}

