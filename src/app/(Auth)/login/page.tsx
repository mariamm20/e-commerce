'use client'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ILogin } from "@/lib/interfaces/IAuth";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod"
export default function Login() {

  const [error , setError] = useState<null | string>(null);
  const [loading , setLoading] = useState(false);
  const router = useRouter();

  const schema = z.object({
    email: z.email().nonempty("Email is required"),
    password: z.string().min(6).nonempty("Password is required"),
  });

  const { register, handleSubmit, formState : {errors} } = useForm({
    defaultValues: {
      "email": "",
      "password": "",
    },
    resolver: zodResolver(schema),
    mode: "all"
  })
  async function handleSubmitForm(values : ILogin){
    setLoading(true);
    setError("")
    const res = await signIn("credentials", {
      redirect: false,
      email: values.email,
      password: values.password
    })
    if(res?.ok){
      router.push("/");
    }else{
      setError("Invalid email or password")
    }

    setLoading(false);
  }
  return (
    <main className='w-full md:px-24 px-4 my-8'>
      <h1 className='text-2xl font-bold  mb-4'>
        Login Now
      </h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </p>
      <form className='flex flex-col gap-4 my-8' onSubmit={handleSubmit(handleSubmitForm)}>
        {error && <p className="text-red-700 my-3 bg-red-200 p-3 rounded-xl">{error}</p>}

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
          <Link href="/forget-password" className="text-blue-500 font-semibold">Forgot Password?</Link>
        <Button disabled={loading} type="submit" >
          {loading ? "Loading..." : "Login" }
        </Button>

      </form>
      <p> Do not have an account? <Link href="/register" className="text-blue-500 font-semibold">Create Account</Link></p>
    </main>
  )
}
