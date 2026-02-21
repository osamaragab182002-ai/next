import { Badge } from "@/components/ui/badge"
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Root } from "@/typedata/brandsallinterface"
import React from 'react'


type myprops = {
    params: {
        id: string
    }
}

export default async function BrandDetails(props: myprops) {
    
    const { id } = await props.params

   
    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/brands/${id}`)
    
   
    const { data: brand }: Root = await response.json()

    return (
        <div className='grid gap-4 items-center md:grid-cols-3 mt-3'>
            
            
            <div className='md:col-span-1 border rounded-3xl p-10 bg-white flex justify-center items-center shadow-sm hover:shadow-md transition-shadow'>
                <img 
                    src={brand.image} 
                    alt={brand.name} 
                    className="w-full h-auto object-contain max-h-[300px]"
                />
            </div>

            
            <div className="md:col-span-2 p-4 border-2 ms-10">
                <Card className="border-none shadow-none bg-transparent p-0">
                    <CardHeader className="p-0 space-y-4">
                        <CardTitle className="text-5xl font-black text-gray-900 tracking-tight">
                            {brand.name}
                        </CardTitle>
                        <div className="flex items-center justify-end gap-3">
                            <Badge variant="secondary" className="bg-green-100 text-green-700 hover:bg-green-100 border-none px-3 py-1">
                                Brand Profile
                            </Badge>
                        </div>
                        
                        
                        
                        <CardDescription className="text-xl text-green-600 font-semibold lowercase tracking-widest">
                            {brand.slug}
                        </CardDescription>

                        

                        <CardDescription className="text-gray-500 max-w-lg">
                            <span className="font-bold text-black">{brand.name}</span><br /> <br />
                            data :<span className="text-gray-700 ">{new Date(brand.createdAt).toLocaleDateString()}</span>.
                        </CardDescription>
                    </CardHeader>
                    
                    
                </Card>
            </div>
        </div>
    )
}