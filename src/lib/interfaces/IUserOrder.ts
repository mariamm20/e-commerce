export interface IUserOrder {
  _id: string;
  shippingAddress: { details: string; phone: string; city: string };
  totalOrderPrice: number;
  paymentMethodType: string;
  isPaid: boolean;
  isDelivered: boolean;
  createdAt: string;
  user: { name: string; email: string; phone: string };
}