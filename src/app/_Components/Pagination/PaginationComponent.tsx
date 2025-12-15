// import {
//   Pagination,
//   PaginationContent,
//   PaginationItem,
//   PaginationLink,
//   PaginationNext,
//   PaginationPrevious,
// } from "@/components/ui/pagination"
// import { IMetadata } from "@/lib/interfaces/IMetadata"

// export default function PaginationComponent({ meta }: { meta: IMetadata }) {
//   return (
//     <Pagination>
//         <PaginationContent>
//           {
//             meta.currentPage> 1 && 
//             <PaginationItem>
//               <PaginationPrevious href={`?page=${meta.currentPage - 1}`} />
//             </PaginationItem>
//           }
//           {
//             Array.from({length: meta.numberOfPages}).map((_, i)=>(
//               <PaginationItem key={i}>
//                 <PaginationLink href={`?page=${i+1}`} isActive={meta.currentPage === i+1}>{i+1}</PaginationLink>
//               </PaginationItem>
//             ))
//           }
//           {
//             meta.currentPage <meta.numberOfPages &&
//             <PaginationItem>
//               <PaginationNext href={`?page=${meta.currentPage + 1 }`} />
//             </PaginationItem>
//           }
//         </PaginationContent>
//       </Pagination>

//   )
// }

'use client'

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { IMetadata } from "@/lib/interfaces/IMetadata"
import { useRouter, useSearchParams } from "next/navigation"

export default function PaginationComponent({ meta }: { meta: IMetadata }) {
  const searchParams = useSearchParams()

  const router = useRouter()
  const createPageHref = (page: number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("page", String(page))
    // return `?${params.toString()}`
    router.push(`?${params.toString()}`)
  }

  return (
    <Pagination>
      <PaginationContent>
        {meta.currentPage > 1 && (
          <PaginationItem>
            <PaginationPrevious onClick={(e)=>{e.preventDefault(); createPageHref(meta.currentPage - 1)} } />
          </PaginationItem>
        )}

        {Array.from({ length: meta.numberOfPages }).map((_, i) => (
          <PaginationItem key={i}>
            <PaginationLink
              onClick={(e) => { e.preventDefault(); createPageHref(i + 1) }}
              isActive={meta.currentPage === i + 1}
            >
              {i + 1}
            </PaginationLink>
          </PaginationItem>
        ))}

        {meta.currentPage < meta.numberOfPages && (
          <PaginationItem>
            <PaginationNext onClick={(e) => { e.preventDefault(); createPageHref(meta.currentPage + 1) }} />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  )
}


// 'use client'

// import {
//   Pagination,
//   PaginationContent,
//   PaginationItem,
//   PaginationLink,
//   PaginationNext,
//   PaginationPrevious,
// } from "@/components/ui/pagination"
// import { IMetadata } from "@/lib/interfaces/IMetadata"
// import { useRouter, useSearchParams } from "next/navigation"

// export default function PaginationComponent({ meta }: { meta: IMetadata }) {
//   const searchParams = useSearchParams()
//   const router = useRouter()

//   const goToPage = (page: number) => {
//     const params = new URLSearchParams(searchParams.toString())
//     params.set("page", String(page))
//     router.push(`?${params.toString()}`) // ✅ client-side navigation
//   }

//   return (
//     <Pagination>
//       <PaginationContent>
//         {meta.currentPage > 1 && (
//           <PaginationItem>
//             <PaginationPrevious
//               onClick={(e) => {
//                 e.preventDefault()
//                 goToPage(meta.currentPage - 1)
//               }}
//             />
//           </PaginationItem>
//         )}

//         {Array.from({ length: meta.numberOfPages }).map((_, i) => {
//           const page = i + 1
//           return (
//             <PaginationItem key={i}>
//               <PaginationLink
//                 isActive={meta.currentPage === page}
//                 onClick={(e) => {
//                   e.preventDefault()
//                   goToPage(page)
//                 }}
//               >
//                 {page}
//               </PaginationLink>
//             </PaginationItem>
//           )
//         })}

//         {meta.currentPage < meta.numberOfPages && (
//           <PaginationItem>
//             <PaginationNext
//               onClick={(e) => {
//                 e.preventDefault()
//                 goToPage(meta.currentPage + 1)
//               }}
//             />
//           </PaginationItem>
//         )}
//       </PaginationContent>
//     </Pagination>
//   )
// }
