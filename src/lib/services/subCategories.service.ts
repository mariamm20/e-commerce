import { IApiResponse } from "../interfaces/IApiResponse";
import { ISubCategory } from "../interfaces/ISubCategory";

export async function getAllSubCategoriesOnCategory(id: string) {
    try {
        const response = await fetch(`https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`)
        if(!response.ok) throw new Error('Failed to fetch data')
        const data : IApiResponse<ISubCategory[]> = await response.json();
        return data.data as ISubCategory[]
    } catch (error) {
        throw error;
    }
}

export async function getAllSubCategories(page: number) {
    try {
        const response = await fetch(`https://ecommerce.routemisr.com/api/v1/subcategories?page=${page}&limit=10`)
        if(!response.ok) throw new Error('Failed to fetch data')
        const data : IApiResponse<ISubCategory[]> = await response.json();
        return data
    } catch (error) {
        throw error;
    }
}