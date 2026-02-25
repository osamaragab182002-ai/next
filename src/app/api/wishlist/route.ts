import { error } from "console";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req :NextRequest){
    
const token= await getToken({req})
if(!token){
    return NextResponse.json({error:'Unauthorized' , status :401})
}console.log("TOKEN 👉", token)
const rep = await fetch(`${process.env.API}/wishlist`,{
    headers:{
        
        
         token: (token.token||token) as string,
        'Content-type':'application/json'
    }
})
const payload=await rep.json()
return NextResponse.json(payload)
}