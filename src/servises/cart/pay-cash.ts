
'use server'

import { getAccessToken } from "@/schema/access-token"
import { shipping } from "@/typedata/cart-resonse"


export async function payCashOrder(carttId :string , shippingAddress :shipping){
   const token=await getAccessToken()

   if(!token){
    throw new Error('unauthorized....')
   }
const response =await fetch(`${process.env.API}/orders/${carttId}`,{
    
    method : 'POST',
    headers:{
        token:token as string,
        'Content-type':'application/json'
    },
    body:JSON.stringify({
        shippingAddress
    })

})
const payload= await response.json()
return payload
}