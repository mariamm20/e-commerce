'use server'
import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function getMyToken(){
   const session =  (await cookies()).get("next-auth.session-token")?.value
   const x  = await decode({
    secret: process.env.NEXTAUTH_SECRET!,
    token: session
   })
   return x?.token
}