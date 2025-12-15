'use client'
import { verifyResetPasswordEmail } from "@/lib/services/forgetPassword.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod"



export default function VerifyResetCode() {
  const [loading , setLoading] = useState(false);
  const router = useRouter();
  const schema = z.object({
    code: z.string().nonempty("Reset Code is required"),
  })
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      "code": "",
    },
    resolver: zodResolver(schema),
    mode: "all"
  })

  async function handleSubmitForm(values: { code: string }) {
    setLoading(true);
    const res = await verifyResetPasswordEmail(values.code);
    if (res.statusMsg === "fail") alert(res.message);
    else{
      setLoading(false);
      router.push("/reset-password");
    }
    setLoading(false);
  }


  return (
    <main className="antialiased bg-slate-200 h-screen py-10">
      <div className="max-w-lg mx-auto  bg-white p-8 rounded-xl shadow shadow-slate-300">
        <h1 className="text-4xl font-medium">Email Verfication Code</h1>
        <p className="text-slate-500">Fill up the form to verify the email</p>

        <form action="" className="my-10" onSubmit={handleSubmit(handleSubmitForm)} >
          <div className="flex flex-col space-y-5">
            <label htmlFor="code">
              <p className="font-medium text-slate-700 pb-2">Verification code</p>
              <input id="code" type="code" className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow" placeholder="Enter code address" {...register("code")} />
              {
                errors.code &&
                <p className="text-red-500 text-xs mx-3 my-2">{errors.code?.message}</p>
              }
            </label>

            <button className="w-full py-3 font-medium text-white bg-black rounded-lg hover:shadow inline-flex space-x-2 items-center justify-center">
              <span>
                {
                  loading ? <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg> : <span>Verify</span>
                }
              </span>
            </button>

          </div>
        </form>
      </div>

    </main>
  )
}
