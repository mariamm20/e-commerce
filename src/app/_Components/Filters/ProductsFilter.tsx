// 'use client'

// import { IBrand } from "@/lib/interfaces/IBrand";
// import { getAllBrands } from "@/lib/services/brands.service";
// import { useEffect, useState } from "react";
// import { Checkbox } from "@/components/ui/checkbox";
// import { useRouter } from "next/navigation";

// export default function ProductsFilter({ searchParams }: { searchParams?: Record<string, unknown> }) {
//   const [brands, setBrands] = useState<IBrand[]>([]);
//   const router = useRouter();

//   // Fetch brands once
//   useEffect(() => {
//     const fetchBrands = async () => {
//       const data = await getAllBrands({ limit: "9999" });
//       setBrands(data.data as IBrand[]);
//     };
//     fetchBrands();
//   }, []);

//   // When checkbox clicked, move to URL with ?subcategory[in]=value
// //   const handleCheck = (id: string) => {
// //     const url = new URL(window.location.href);
// //     url.searchParams.set("brand", id);
// //     router.push(url.pathname + "?" + url.searchParams.toString(), { shallow: true });
// //   };

// const handleCheck = (id: string) => {
//   const url = new URL(window.location.href);

//   // Get all current brand params
//   const selected = url.searchParams.getAll("brand");

//   if (selected.includes(id)) {
//     // Remove if already selected
//     const newSelected = selected.filter(s => s !== id);
//     url.searchParams.delete("brand"); // remove all
//     newSelected.forEach(b => url.searchParams.append("brand", b));
//   } else {
//     // Add new
//     url.searchParams.append("brand", id);
//   }

//   router.push(url.pathname + "?" + url.searchParams.toString());
// };


//   return (
//     <div className="border p-3 rounded-2xl">
//       <h2 className="text-lg font-bold mb-4">Filters</h2>
//       <div className="flex flex-col gap-2">
//         {brands.map((brand) => (
//           <div key={brand._id} className="flex items-center gap-2">
//             <Checkbox id={brand._id} onCheckedChange={() => handleCheck(brand._id)} />
//             <label htmlFor={brand._id}>{brand.name}</label>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }


// 'use client'

// import { IBrand } from "@/lib/interfaces/IBrand";
// import { getAllBrands } from "@/lib/services/brands.service";
// import { useEffect, useState } from "react";
// import { Checkbox } from "@/components/ui/checkbox";
// import { useRouter, usePathname, useSearchParams } from "next/navigation";

// export default function ProductsFilter({ searchParams }: { searchParams?: Record<string, unknown> }) {
//   const [brands, setBrands] = useState<IBrand[]>([]);
//   const router = useRouter();
//   const pathname = usePathname();
//   const params = useSearchParams();

//   // Fetch brands once
//   useEffect(() => {
//     const fetchBrands = async () => {
//       const data = await getAllBrands({ limit: "9999" });
//       setBrands(data.data as IBrand[]);
//     };
//     fetchBrands();
//   }, []);

//   // Get all selected brands from URL
//   const selectedBrands = params?.getAll("brand") || [];

//   const handleCheck = (id: string) => {
//     const url = new URL(window.location.href);
//     const selected = url.searchParams.getAll("brand");

//     if (selected.includes(id)) {
//       // Remove if already selected
//       const newSelected = selected.filter(s => s !== id);
//       url.searchParams.delete("brand"); // remove all
//       newSelected.forEach(b => url.searchParams.append("brand", b));
//     } else {
//       // Add new
//       url.searchParams.append("brand", id);
//     }

//     router.push(url.pathname + "?" + url.searchParams.toString());
//   };

//   return (
//     <div className="border p-3 rounded-2xl">
//       <h2 className="text-lg font-bold mb-4">Filters</h2>
//       <div className="flex flex-col gap-2">
//         {brands.map((brand) => (
//           <div key={brand._id} className="flex items-center gap-2">
//             <Checkbox
//               id={brand._id}
//               checked={selectedBrands.includes(brand._id)}
//               onCheckedChange={() => handleCheck(brand._id)}
//             />
//             <label htmlFor={brand._id}>{brand.name}</label>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }



'use client'

import { IBrand } from "@/lib/interfaces/IBrand";
import { getAllBrands } from "@/lib/services/brands.service";
import { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

export default function ProductsFilter() {
  const [brands, setBrands] = useState<IBrand[]>([]);
  const params = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const fetchBrands = async () => {
      const data = await getAllBrands({ limit: "9999" });
      setBrands(data.data as IBrand[]);
    };
    fetchBrands();
  }, []);

  const selectedBrands = params?.getAll("brand") || [];

  const handleCheck = (id: string) => {
    const current = new Set(selectedBrands);

    if (current.has(id)) current.delete(id);
    else current.add(id);

    const query = new URLSearchParams();
    current.forEach((b) => query.append("brand", b));

    // ⚡ This will trigger server component fetch
    router.push(pathname + "?" + query.toString());
  };

  return (
    <div className="border p-3 rounded-2xl">
      <h2 className="text-lg font-bold mb-4">Filters</h2>
      <div className="flex flex-col gap-2 h-64 overflow-y-auto scrollbar-thin">
        {brands.map((brand) => (
          <div key={brand._id} className="flex items-center gap-2">
            <Checkbox
              id={brand._id}
              checked={selectedBrands.includes(brand._id)}
              onCheckedChange={() => handleCheck(brand._id)}
            />
            <label htmlFor={brand._id}>{brand.name}</label>
          </div>
        ))}
      </div>
    </div>
  );
}
