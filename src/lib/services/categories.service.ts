import { ICategory } from "../interfaces/ICategory";
import { IApiResponse } from "../interfaces/IApiResponse";

export async function getAllCategories(){
    try {
        const response = await fetch('https://ecommerce.routemisr.com/api/v1/categories')
        if(!response.ok) throw new Error('Failed to fetch data')
        const data : IApiResponse<ICategory[]> = await response.json();
        return data

    } catch (error) {
        throw error;
    }
}

export async function getCategory(id: string){
    try {
        const response = await fetch('https://ecommerce.routemisr.com/api/v1/categories/' + id)
        if(!response.ok) throw new Error('Failed to fetch data')
        const data = await response.json();
        return data.data as ICategory

    } catch (error) {
        throw error;
    }
}