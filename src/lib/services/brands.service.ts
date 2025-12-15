import { IApiResponse } from "../interfaces/IApiResponse";
import { IBrand } from "../interfaces/IBrand";

export async function getAllBrands(params : Record<string, unknown>) {
    try {
        const cleanParams: Record<string, string> = {};
        if (typeof params === "object" && params !== null) {
            Object.entries(params).forEach(([key, value]) => {
                if (typeof key === "string" && typeof value === "string") {
                    cleanParams[key] = value;
                }
            });

        }

        const search = new URLSearchParams(cleanParams).toString();
        // console.log("search:", search);

        const response = await fetch(`https://ecommerce.routemisr.com/api/v1/brands?${search}`)
        if(!response.ok) throw new Error('Failed to fetch data')
        const data : IApiResponse<IBrand[]> = await response.json();
        return data
    } catch (error) {
        throw error;
    }
}