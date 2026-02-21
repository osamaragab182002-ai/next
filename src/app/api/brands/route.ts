
import { NextResponse } from "next/server";

export async function GET() {
    
    const rep = await fetch(`${process.env.API}/brands`, {
        headers: {
            
            'Content-type': 'application/json'
        }
    })

    const payload = await rep.json()
    
  
    return NextResponse.json(payload)
}