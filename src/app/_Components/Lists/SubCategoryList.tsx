'use client'
import { IApiResponse } from "@/lib/interfaces/IApiResponse";
import { IMetadata } from "@/lib/interfaces/IMetadata";
import { ISubCategory } from "@/lib/interfaces/ISubCategory"
import { getAllSubCategories } from "@/lib/services/subCategories.service"
import Link from "next/link";
import { useEffect, useState } from "react";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

export default function SubCategoryList() {

    const [data, setData] = useState<ISubCategory[]>([])
    const [meta, setMeta] = useState<IMetadata>({ currentPage: 1, limit: 10, numberOfPages: 1, nextPage: 1 })

    const fetchPage = async (page: number) => {
        const res: IApiResponse<ISubCategory[]> = await getAllSubCategories(page);
        setData(res.data);
        setMeta(res.metadata);
    }

    useEffect(() => {
        fetchPage(1)
    }, [])


    return (
        <>

            <div className="flex flex-wrap gap-14 mb-8">
                {
                    data &&
                    data.map((subCategory) => (
                        <div key={subCategory._id} className="bg-gray-100 w-48 h-48 p-4 flex justify-center items-center text-center mb-2 shadow-md rounded-full">
                            <Link href={`/products?subcategory[in]=${subCategory._id}`} className="text-md font-semibold">
                                {subCategory.name}
                            </Link>
                        </div>
                    ))
                }

            </div>

            <Pagination>
                <PaginationContent>
                    {/* Previous Button */}
                    {
                        meta.currentPage > 1 &&
                        <PaginationItem>
                            <PaginationPrevious href="#" onClick={(e)=>{
                                e.preventDefault();
                                fetchPage(meta.currentPage - 1);
                            }} />
                        </PaginationItem>
                    }
                    {/* All Pages Number */}
                    {
                        Array.from({length: meta.numberOfPages}).map((_,i)=>(
                            <PaginationItem key={i}>
                                <PaginationLink 
                                    href="#" 
                                    onClick={(e)=>{
                                        e.preventDefault();
                                        fetchPage(i+1)
                                    }}
                                    isActive={meta.currentPage === i+1}
                                >
                                    {i + 1}
                                </PaginationLink>
                            </PaginationItem>
                        ))
                    }
                    {/* Nex Button */}
                    {
                        meta.currentPage < meta.numberOfPages &&
                        <PaginationItem>
                            <PaginationNext href="#" onClick={(e)=>{
                                e.preventDefault();
                                fetchPage(meta.currentPage + 1);
                            }} />
                        </PaginationItem>
                    }
                </PaginationContent>
            </Pagination>


        </>
    )
}
