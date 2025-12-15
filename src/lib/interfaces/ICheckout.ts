export interface ICheckout{
    paymentMethod: "cash" | "online",
    details: string,
    phone: string,
    city: string
}   