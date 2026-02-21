'use client'
import { useQuery } from '@tanstack/react-query'
import { category, data } from '@/typedata/categoryinterface' 
import Link from 'next/link'
import React from 'react'

export default function Categories() {
  
  const { data: catData, isLoading, isError } = useQuery<category>({
    queryKey: ['get-categories'],
    queryFn: async () => {
      const resp = await fetch('/api/categories')
      const payload = await resp.json()
      return payload
    }
  })

  if (isLoading) {
    return <div className="h-screen flex justify-center items-center">
      <h2 className="text-2xl font-bold animate-pulse">Loading Categories... 🔃</h2>
    </div>
  }

  if (isError) {
    return <div className="h-screen flex justify-center items-center">
      <h2 className="text-2xl font-bold text-red-500">Error Loading Categories </h2>
    </div>
  }

  return (
    <div className="container mx-auto p-6">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-black text-gray-800 uppercase tracking-tighter">Shop By Category</h1>
        <p className="text-gray-500 mt-2">Explore our wide range of products by category</p>
      </header>

      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {catData?.data?.map((item: data) => (
          <Link href={`/categorydetails/${item._id}`} key={item._id} className="group">
            <div className="relative overflow-hidden rounded-3xl bg-white shadow-sm border border-gray-100 hover:shadow-2xl transition-all duration-500">
              
             
              <div className="aspect-[4/5] overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                />
              </div>

              
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-6 opacity-90 group-hover:opacity-100 transition-opacity">
                <div>
                  <h3 className="text-white text-2xl font-bold transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    {item.name}
                  </h3>
                  <span className="text-green-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">
                    View Products →
                  </span>
                </div>
              </div>

            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}