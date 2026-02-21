'use client'
import { Button } from '@/components/ui/button'
import { Field, FieldDescription, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'


import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

import { signIn } from 'next-auth/react'
import toast from 'react-hot-toast'
import { payCashOrder } from '@/servises/cart/pay-cash'
import { shipping } from '@/typedata/cart-resonse'




export default function CheckOutForm({cartId }:{cartId:string}) {

 async function paycash(cartId :string ,shippingAddress :shipping){
  const respons=  await payCashOrder(cartId ,shippingAddress )

  console.log(respons);
  if(respons.status=='success'){
toast.success('order will deliver soon...')
window.location.href='/'
  }else{
toast.error('error....')
  }
  
  }
  
  const [isLoadin, setisLoadin] = useState(false)
  const form =useForm({
defaultValues :{
  
 details: '',
        phone: '',
        city: ''
},

  })

 async function submitForm(values :shipping ){
// setisLoadin(true)

// setisLoadin(false)

const shippingAddress={
...values
}
paycash(cartId ,shippingAddress )
console.log(values);

  }

  return <>
  <div className='w-1/2 mx-auto bg-gray-300 mt-3 rounded-2xl p-4'>
  <h2 className='text-2xl font-bold text-green-500'>Login Now</h2>
  <form onSubmit={form.handleSubmit(submitForm)}>

<div className='mt-4'>
  <Controller
  name="details"
  control={form.control}
  render={({ field, fieldState }) => (
    <Field data-invalid={fieldState.invalid}>
      <FieldLabel htmlFor={field.name}>details :</FieldLabel>
      <Input className='bg-white'
        {...field}
        id={field.name}
        aria-invalid={fieldState.invalid}
        placeholder="Enter your details"
        
      />
     
    </Field>
  )}
/>
</div>
<div className='mt-4'>
  <Controller
  name="city"
  control={form.control}
  render={({ field, fieldState }) => (
    <Field data-invalid={fieldState.invalid}>
      <FieldLabel htmlFor={field.name}>city :</FieldLabel>
      <Input type='text' className='bg-white'
        {...field}
        id={field.name}
        aria-invalid={fieldState.invalid}
        placeholder="Enter your city"
        
      />
     
     
    </Field>
  )}
/>
</div>
<div className='mt-4'>
  <Controller
  name="phone"
  control={form.control}
  render={({ field, fieldState }) => (
    <Field data-invalid={fieldState.invalid}>
      <FieldLabel htmlFor={field.name}>phone :</FieldLabel>
      <Input type='text' className='bg-white'
        {...field}
        id={field.name}
        aria-invalid={fieldState.invalid}
        placeholder="Enter your phone"
        
      />
     
     
    </Field>
  )}
/>
</div>


<Button disabled={isLoadin} className='mt-4 w-full bg-green-500' type='submit'>
  {isLoadin? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 animate-spin">
  <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
</svg>
:'Submit'}
</Button>

  </form> 
  </div>
  
  
  </>
}
