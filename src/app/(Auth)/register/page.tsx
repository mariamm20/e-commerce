'use client'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IRegister } from "@/lib/interfaces/IAuth";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod"
export default function Register() {

  const [error , setError] = useState<null | string>(null);
  const [loading , setLoading] = useState(false);
  const router = useRouter();

  const schema = z.object({
  name: z.string().nonempty("Name is required"),
  email: z.string().nonempty("Email is required").email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  rePassword: z.string().min(6, "Password must be at least 6 characters"),
  phone: z.string().nonempty("Phone is required"),
}).refine((values)=>{
    return values.password === values.rePassword
  },{
    message: "Passwords do not match",
    path: ["rePassword"],
  })

  const { register, handleSubmit, formState : {errors} } = useForm({
    defaultValues: {
      "name": "",
      "email": "",
      "password": "",
      "rePassword": "",
      "phone": ""
    },
    resolver: zodResolver(schema),
    mode: "all"
  })
  async function handleSubmitForm(values : IRegister){
    setLoading(true);
    setError("")
    const response = await fetch('https://ecommerce.routemisr.com/api/v1/auth/signup' , {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(values)
    })

    const data = await response.json();
    if(data.statusMsg === "fail") setError(data.message);
    else router.push("/login")

    setLoading(false);
  }
  return (
    <main className='w-full md:px-24 px-4 my-8'>
      <h1 className='text-2xl font-bold  mb-4'>
        Register Now
      </h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </p>
      <form className='flex flex-col gap-4 my-8' onSubmit={handleSubmit(handleSubmitForm)}>
        {error && <p className="text-red-700 my-3 bg-red-200 p-3 rounded-xl">{error}</p>}
        <div>
          <Input type="text" placeholder="Enter your name" className="py-5" {...register("name")} />
          {
            errors.name && 
            <p className="text-red-500 text-xs mx-3 my-2">{errors.name?.message}</p>
          }
        </div>
        <div>
          <Input type="email" placeholder="Enter your email" className="py-5" {...register("email")} />
          {
            errors.email && 
            <p className="text-red-500 text-xs mx-3 my-2">{errors.email?.message}</p>
          }
        </div>
        <div>
          <Input type="password" placeholder="Enter your password" className="py-5" {...register("password")} />
          {
            errors.password && 
            <p className="text-red-500 text-xs mx-3 my-2">{errors.password?.message}</p>
          }
        </div>
        <div>
          <Input type="password" placeholder="Enter confirm password" className="py-5" {...register("rePassword")} />
          {
            errors.rePassword && 
            <p className="text-red-500 text-xs mx-3 my-2">{errors.rePassword?.message}</p>
          }
        </div>
        <div>
          <Input type="tel" placeholder="Enter your phone" className="py-5" {...register("phone")} />
          {
            errors.phone && 
            <p className="text-red-500 text-xs mx-3 my-2">{errors.phone?.message}</p>
          }
        </div>

        <Button disabled={loading} type="submit" >
          {loading ? "Loading..." : "Register" }
        </Button>

      </form>
      <p>Already have an account? <Link href="/login" className="text-blue-500 font-semibold">Login</Link></p>
    </main>
  )
}
