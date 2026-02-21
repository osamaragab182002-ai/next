
'use server'

import { getAccessToken } from "@/schema/access-token"


export async function deletCartItem(productId :string){
   const token=await getAccessToken()

   if(!token){
    throw new Error('unauthorized....')
   }
const response =await fetch(`${process.env.API}/cart/${productId}`,{
    
    method : 'DELETE',
    headers:{
        token:token as string,
        'Content-type':'application/json'
    },
    

})
const payload= await response.json()
return payload
}