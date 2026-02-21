
'use server'

import { getAccessToken } from "@/schema/access-token"


export async function updateCartIteam({productId , count}:{productId :string ,count :number}){
   const token=await getAccessToken()

   if(!token){
    throw new Error('unauthorized....')
   }
const response =await fetch(`${process.env.API}/cart/${productId}`,{
    
    method : 'PUT',
    headers:{
        token:token as string,
        'Content-type':'application/json'
    },
    body:JSON.stringify({
        count:count
    })

})
const payload= await response.json()
return payload
}