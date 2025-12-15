import { IApiResponse } from "../interfaces/IApiResponse";
import { IProduct } from "../interfaces/IProduct";

export async function getProducts(params: Record<string, unknown>) {
    try {
        console.log(params);

        const search = new URLSearchParams();

        Object.entries(params).forEach(([key, value]) => {
          if (Array.isArray(value)) {
            value.forEach(v => search.append(key, v.toString()));
          } else if (value !== undefined && value !== null) {
            search.append(key, value.toString());
          }
        });
        console.log("search:", search);

        const res = await fetch(
            `https://ecommerce.routemisr.com/api/v1/products?${search}`
        );

        if (!res.ok) throw new Error("Failed to fetch data");

        const data: IApiResponse<IProduct[]> = await res.json();
        // console.log(data);
        return data;

    } catch (error) {
        throw error;
    }
}

export async function getProductDetails(id: string) {
  try {

        const res = await fetch(
            `https://ecommerce.routemisr.com/api/v1/products/${id}`
        );

        if (!res.ok) throw new Error("Failed to fetch data");

        const data: IApiResponse<IProduct> = await res.json();
        return data;

    } catch (error) {
        throw error;
    }
}