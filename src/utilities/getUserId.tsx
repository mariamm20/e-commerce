import { getMyToken } from '@/utilities/getMyToken'

export default async function getUserId() {
const token = await getMyToken();

  const res = await fetch('https://ecommerce.routemisr.com/api/v1/auth/verifyToken',{
    method: "GET",
    headers: {
      token: token as string
    }
  })
  const data = await res.json();
  return data?.decoded.id



}
