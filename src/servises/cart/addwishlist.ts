
'use server'

import { getAccessToken } from "@/schema/access-token"


export async function addToWishlist(productId :string){
   const token=await getAccessToken()

   if(!token){
    throw new Error('unauthorized....')
   }
const response =await fetch(`${process.env.API}/wishlist`,{
    cache : 'no-store',
    method : 'POST',
    headers:{
        token:token as string,
        'Content-type':'application/json'
    },
    body:JSON.stringify({
        productId
    })

})
const payload= await response.json()
return payload
}