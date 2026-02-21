
import AddBtn from "@/app/_component/addBtn/AddBtn"
import ProductImega from "@/app/_component/productImega/ProductImega"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardAction,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { ProductInterface } from "@/typedata/productInterface"
import Image from "next/image"
import Link from "next/link"
import React from 'react'
type myprops={
    params : {
      id :string
    }
  }
export default async function productdetails(props : myprops) {
  
   let {id}= await props.params
  
    let response=await fetch(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
    let {data :singelproduct} :{data:ProductInterface}=await response.json()
    console.log(singelproduct);
    

  
  return<>
  
  <div className=' grid gap-4 items-center md:grid-cols-3 mt-3'>
    <div className='md:col-span-1'>
       
       <ProductImega image={singelproduct.images}></ProductImega>

    </div>
    <div className="md:col-span-2">


<Card className="relative  w-full  p-10">

                <CardHeader>
                    <CardAction>
                        <Badge variant="secondary">{singelproduct.brand.name}</Badge>
                    </CardAction>
                    <CardTitle>{singelproduct.title.split(' ').slice(0, 2).join('')}</CardTitle>
                    <CardDescription className="my-5">
                        <div className="flex justify-between py-2 ">
                            {singelproduct.description}
                            
                        </div>
                        {singelproduct.brand.name}
                    </CardDescription>
                    <CardDescription>
                        <div className="flex justify-between">
                            <span>{singelproduct.price} : EGP</span>
                            <span className="flex justify-between gap-2">{singelproduct.ratingsAverage} <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-yellow-200">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                            </svg>
                            </span>
                        </div>
                    </CardDescription>
                    
                </CardHeader>

            <AddBtn productId={singelproduct._id}/>
            
        </Card>
    </div>



  </div>
  
  
  
  
  </>
}
