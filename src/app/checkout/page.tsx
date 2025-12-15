'use client'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ICheckout } from "@/lib/interfaces/ICheckout";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { cashCheckout, onlineCheckout } from "@/lib/services/checkout.service";
import { CartContext } from "@/context/CartContext";
export default function Checkout() {

  const [error, setError] = useState<null | string>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const {cartID, refreshCart}=useContext(CartContext);

  const schema = z.object({
    paymentMethod: z.enum(["cash", "online"]),
    details: z.string().nonempty("Details is required"),
    phone: z.string().nonempty("Phone is required"),
    city: z.string().nonempty("City is required"),
  })

  const { control, register, handleSubmit, formState: { errors } } = useForm<ICheckout>({
    defaultValues: {
      "paymentMethod": "cash",
      "details": "",
      "phone": "",
      "city": "",
    },
    resolver: zodResolver(schema),
    mode: "all"
  })
  async function handleSubmitForm(values: ICheckout) {
    setLoading(true);
    setError("")
    console.log(values)
    if (values.paymentMethod === "cash") {
      const data = await cashCheckout(cartID, values)
      if (data.statusMsg === "fail") setError(data.message);
      else{
        await refreshCart();
        router.push("/successCheckout");
      } 
    }
    else{
      const data = await onlineCheckout(cartID, values)
      if(data.status=== "success") window.location.href = data.session.url;
    }

    setLoading(false);
  }
  return (
    <main className='w-full md:px-24 px-4 my-8'>
      <h1 className='text-2xl font-bold  mb-4'>
        Checkout Now
      </h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </p>
      <form className='flex flex-col gap-4 my-8' onSubmit={handleSubmit(handleSubmitForm)}>
        {error && <p className="text-red-700 my-3 bg-red-200 p-3 rounded-xl">{error}</p>}
        <p className="text-base font-medium">
          Payment Method
        </p>

        <Controller
          control={control}
          name="paymentMethod"
          render={({ field }) => (
            <RadioGroup className="flex gap-6"
              value={field.value}
              onValueChange={field.onChange}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="cash" id="cash" />
                <Label htmlFor="cash">Cash</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="online" id="online" />
                <Label htmlFor="online">Online</Label>
              </div>
            </RadioGroup>
          )}
        />
        <p className="text-base font-medium mt-4">
          More Information
        </p>
        <div>
          <Input type="text" placeholder="Enter your details" className="py-5" {...register("details")} />
          {
            errors.details &&
            <p className="text-red-500 text-xs mx-3 my-2">{errors.details?.message}</p>
          }
        </div>
        <div>
          <Input type="city" placeholder="Enter your city" className="py-5" {...register("city")} />
          {
            errors.city &&
            <p className="text-red-500 text-xs mx-3 my-2">{errors.city?.message}</p>
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
          {loading ? "Loading..." : "Checkout"}
        </Button>

      </form>

    </main>
  )
}
