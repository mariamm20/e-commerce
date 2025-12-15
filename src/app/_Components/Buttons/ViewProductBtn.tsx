'use client'
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import Link from "next/link";

export default function ViewProductBtn({productId}: {productId: string}) {
    return (
        <Button variant="secondary" size={"icon"} asChild
            className="cursor-pointer absolute top-2 right-2 rounded-full translate-x-full transition-all duration-300 ease-in-out opacity-0 group-hover:translate-x-0 group-hover:opacity-100
                     hover:[&>svg]:stroke-blue-500">
            <Link href={`/products/${productId}`}>
            <Eye size={16} />
            </Link>
        </Button>
    )
}
