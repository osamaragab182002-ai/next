'use client'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import toast from 'react-hot-toast'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
 
import ImageEmpty from '../../aassets/download.png' 
import { addToWishlist } from '@/servises/cart/addwishlist'
import AddBtn from '../_component/addBtn/AddBtn'
import { deletWishListItem } from '@/servises/cart/delet-wishlist-item'

export default function WishlistPage() {
  const queryClient = useQueryClient();

 
  const { data: wishlistData, isLoading, isError } = useQuery({
    queryKey: ['get-wishlist'],
    queryFn: async () => {
      const resp = await fetch('/api/wishlist')
      const payload = await resp.json()
      return payload
    }
  })

  
  const { mutate: addItemToCart, isPending: isAdding } = useMutation({
    mutationFn: addToWishlist,
    onSuccess: (res) => {
      if (res.status === 'success') {
        toast.success('Product added to cart ')
      
        queryClient.invalidateQueries({ queryKey: ['get-cart'] })
      }
    },
    onError: () => {
      toast.error('Error adding product to cart')
    }
  })

  //remove

  const { mutate: removeItem, isPending: isDeleting } = useMutation({
    mutationFn: deletWishListItem,
    onSuccess: (res) => {
      if (res.status === 'success') {
        toast.success('Removed from wishlist ')
      
        queryClient.invalidateQueries({ queryKey: ['get-wishlist'] })
      }
    },
    onError: () => {
      toast.error('Failed to remove item')
    }
  })

  if (isLoading) return <h2 className="p-5 text-center font-bold text-xl">Loading Wishlist... </h2>
  if (isError) return <h2 className="p-5 text-center text-red-500 font-bold">Error loading data!</h2>

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-heading border-b pb-4">My Wishlist </h1>

      {wishlistData?.data?.length > 0 ? (
        <div className="relative overflow-x-auto shadow-sm rounded-lg border border-default">
          <table className="w-full text-sm text-left text-body bg-neutral-primary-soft">
            <thead className="text-xs uppercase bg-neutral-secondary-medium border-b border-default-medium">
              <tr>
                <th className="px-16 py-3">Image</th>
                <th className="px-6 py-3">Product Name</th>
                <th className="px-6 py-3">Price</th>
                <th className="px-6 py-3 text-center">Action</th>
                <th className="px-6 py-3 text-center">Remove</th>
              </tr>
            </thead>
            <tbody>
              {wishlistData.data.map((product: any) => (
                <tr key={product._id} className="border-b border-default hover:bg-neutral-secondary-medium transition">
                  <td className="p-4 flex justify-center">
                    <img 
                      src={product.imageCover} 
                      className="w-20 md:w-28 object-contain" 
                      alt={product.title} 
                    />
                  </td>
                  <td className="px-6 py-4 font-semibold text-heading max-w-xs">
                    {product.title}
                  </td>
                  <td className="px-6 py-4 font-bold text-green-600">
                    {product.price} EGP
                  </td>
                  <td className="px-6 py-4 text-center">
                    
                    <AddBtn productId={product._id} />

                    
                  </td>

                  <td className="px-6 py-4 text-center">
                    
                     <button 
                       
                        onClick={() => removeItem(product._id)}
                        className="text-red-600  transition-colors p-2"
                        
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-1.801a1.245 1.245 0 0 0-1.245-1.245H10.23a1.245 1.245 0 0 0-1.245 1.245v1.801m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                        </svg>
                      </button>

                    
                  </td>
                 
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center p-20 bg-gray-50 rounded-2xl">
           <Image src={ImageEmpty} alt='empty wishlist' width={300} height={300}/>
           <p className="mt-6 text-gray-500 text-2xl font-medium">Your wishlist is currently empty!</p>
        </div>
      )}
    </div>
  )
}