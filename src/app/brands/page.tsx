'use client'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { BrandsResponse } from '@/typedata/brandsinterface'
import Link from 'next/link'

export default function BrandsPage() {
  
  
  const { data: brandsData, isLoading, isError } = useQuery<BrandsResponse>({
    queryKey: ['get-brands'],
    queryFn: async () => {
      const resp = await fetch('/api/brands') 
      const payload=await resp.json()
      return payload
    }
  })

  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-green-500"></div>
      </div>
    )
  }

  
  if (isError) {
    return <h2 className="text-center p-20 text-red-500 font-bold">حدث خطأ أثناء تحميل الماركات! </h2>
  }

  return (
    <div className="container mx-auto p-6">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold text-green-600 mb-2">Our Brands</h1>
        
      </header>

     
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
       {brandsData?.data.map((brand) => (
  <Link href={`/brandsdetails/${brand._id}`} key={brand._id}> 
    <div className="group border p-4 rounded-xl hover:shadow-lg transition-all cursor-pointer">
       <img src={brand.image} alt={brand.name} className="h-32 mx-auto object-contain" />
       <p className="mt-4 font-semibold text-center">{brand.name}</p>
    </div>
  </Link>
))}
      </div>
    </div>
  )
}