'use client'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { usePathname } from "next/navigation";
import { Fragment, useEffect, useState } from "react";

export default function Breadcrump() {
    const pathname = usePathname();
    const segments = pathname.split("/").filter(Boolean);

    const [label , setLabel] = useState("");

    useEffect(()=>{
        const last = segments[segments.length -1];

        if(/^[0-9a-fA-F]{24}$/.test(last)){
            fetch(`https://ecommerce.routemisr.com/api/v1/${segments[segments.length - 2]}/${last}`)
            .then(res => res.json())
            .then(data => {
                if(data.data.name)
                setLabel(data.data.name);
                else
                setLabel(data.data.title);
            })
            .catch(err => console.log(err));
        }else{
            setLabel(last);
        }
    },[segments])
    console.log(segments)

    let path = "";
    return (
        <Breadcrumb className="mb-8">
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                {
                    segments.map((segment, i) => {
                        
                        path += "/" + segment;
                        const isLast = i === segments.length - 1;

                        return (
                            <Fragment key={segment}>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    {
                                        isLast ? (
                                            <BreadcrumbPage className="text-foreground capitalize">{label}</BreadcrumbPage>
                                        ) :
                                            (
                                                <BreadcrumbLink href={path} className="capitalize">{segment}</BreadcrumbLink>
                                            )
                                    }
                                </BreadcrumbItem>
                            </Fragment>
                        )
                    })
                }

            </BreadcrumbList>
        </Breadcrumb>
    )
}
