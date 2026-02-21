'use client'
import { Button } from '@/components/ui/button'
import { Field, FieldDescription, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { schema } from '@/schema/registerSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from "zod"
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { LogineSchema } from '@/schema/loginSchema'
import { signIn } from 'next-auth/react'
import toast from 'react-hot-toast'
import { useSearchParams } from 'next/navigation'



export default function Login() {
  const searchParems= useSearchParams()
  const callbackurl=searchParems.get('callback-url')
  const [isLoadin, setisLoadin] = useState(false)
  const form =useForm({
defaultValues :{
  
  email : '',
  password : '',
  
},
 resolver:zodResolver(LogineSchema) ,
mode :'onBlur'
  })

 async function submitForm(values : zod.infer<typeof LogineSchema> ){
setisLoadin(true)
 const response=await  signIn('credentials',{
  email :values.email ,
  password : values.password ,
  callbackUrl : callbackurl ?? '/' ,
  redirect : false
})
console.log(response);
if(response?.ok){
  window.location.href=response.url || '/'
  toast.success('succes login')
  
}else{
   toast.error('invalid email or password')
}
setisLoadin(false)
  }
  return <>
  <div className='w-1/2 mx-auto bg-gray-300 mt-3 rounded-2xl p-4'>
  <h2 className='text-2xl font-bold text-green-500'>Login Now</h2>
  <form onSubmit={form.handleSubmit(submitForm)}>

<div className='mt-4'>
  <Controller
  name="email"
  control={form.control}
  render={({ field, fieldState }) => (
    <Field data-invalid={fieldState.invalid}>
      <FieldLabel htmlFor={field.name}>Email :</FieldLabel>
      <Input className='bg-white'
        {...field}
        id={field.name}
        aria-invalid={fieldState.invalid}
        placeholder="Enter your Email"
        
      />
     
      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
    </Field>
  )}
/>
</div>
<div className='mt-4'>
  <Controller
  name="password"
  control={form.control}
  render={({ field, fieldState }) => (
    <Field data-invalid={fieldState.invalid}>
      <FieldLabel htmlFor={field.name}>Password :</FieldLabel>
      <Input type='password' className='bg-white'
        {...field}
        id={field.name}
        aria-invalid={fieldState.invalid}
        placeholder="Enter your Password"
        
      />
     
      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
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
