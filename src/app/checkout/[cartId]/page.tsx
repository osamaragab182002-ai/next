import CheckOutForm from '@/app/_component/CheckOutForm/CheckOutForm'

import React from 'react'


export default async function Checkout({params}:{params:{cartId:string}}) {

  const {cartId} = await params
console.log(cartId);

  return (
    <div>
      <CheckOutForm cartId={cartId}></CheckOutForm>
    </div>
  )
}
