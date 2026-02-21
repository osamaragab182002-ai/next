'use client'
import { Button } from '@/components/ui/button'
import { Field, FieldDescription, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { schema } from '@/schema/registerSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from "zod"
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'


export default function Register() {
const router=  useRouter()
  const form =useForm({
defaultValues :{
  name :'',
  email : '',
  password : '',
  rePassword : '',
  phone : '',
},
 resolver:zodResolver(schema) ,
mode :'onBlur'
  })

 async function submitForm(values : zod.infer<typeof schema> ){
const response= await fetch(`https://ecommerce.routemisr.com/api/v1/auth/signup`,{
  method : 'POST',
  body : JSON.stringify(values),
  headers : {'content-type':'application/json'}
})
const payload=await response.json()
console.log(payload);

if(payload.message==='success'){
  router.push('/login')
}else{
  'erreo'
}

  }
  return <>
  <div className='w-1/2 mx-auto bg-gray-300 mt-3 rounded-2xl p-4'>
  <h2 className='text-2xl font-bold text-green-500'>Register Now</h2>
  <form onSubmit={form.handleSubmit(submitForm)}>
<div className='mt-4'>
  <Controller
  name="name"
  control={form.control}
  render={({ field, fieldState }) => (
    <Field data-invalid={fieldState.invalid}>
      <FieldLabel htmlFor={field.name}>Name :</FieldLabel>
      <Input className='bg-white'
        {...field}
        id={field.name}
        aria-invalid={fieldState.invalid}
        placeholder="Enter your Name"
        
      />
     
      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
    </Field>
  )}
/>
</div>
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
<div className='mt-4'>
  <Controller
  name="rePassword"
  control={form.control}
  render={({ field, fieldState }) => (
    <Field data-invalid={fieldState.invalid}>
      <FieldLabel htmlFor={field.name}>rePassword :</FieldLabel>
      <Input type='password' className='bg-white'
        {...field}
        id={field.name}
        aria-invalid={fieldState.invalid}
        placeholder="Enter your rePassword"
        
      />
     
      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
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
      <FieldLabel htmlFor={field.name}>Phone :</FieldLabel>
      <Input className='bg-white'
        {...field}
        id={field.name}
        aria-invalid={fieldState.invalid}
        placeholder="Enter your Phone"
        
      />
     
      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
    </Field>
  )}
/>
</div>
<Button className='mt-4 w-full bg-green-500' type='submit'>Submit</Button>





  </form>
  
  
  </div>
  
  
  </>
}
