'use client'
import { Button } from '@/components/ui/button'
import { CardFooter } from '@/components/ui/card'
import { addToCart } from '@/servises/cart/add-prod-cart'
import { addToWishlist } from '@/servises/cart/addwishlist'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import toast from 'react-hot-toast'

export default function AddBtn({ productId }: { productId: string }) {
  const queryClient = useQueryClient();
  const { data, isPending, error, isError, mutate: addProductToCart } = useMutation({
    mutationFn: addToCart,
    onSuccess: (data) => {
      toast.success(data?.message)
      queryClient.invalidateQueries({ queryKey: ['get-cart'] })
    },
    onError: () => {
      toast.error('Login First')
    },
  })

  const { mutate: addProductToWishlist, isPending: isWishlisting } = useMutation({
    mutationFn: () => addToWishlist(productId),
    onSuccess: (data) => {
      toast.success(data?.message || 'Added to Wishlist ❤️')
      // تحديث البيانات عشان لو فيه عداد أو صفحة الويش ليست مفتوحة
      queryClient.invalidateQueries({ queryKey: ['get-wishlist'] })
    },
    onError: () => {
      toast.error('Failed to add to wishlist')
    },
  })
  return <>
    <CardFooter className='flex justify-between'>
      
        <Button onClick={() => { addProductToCart(productId) }} className=" cursor-pointer">add to Cart</Button>
        {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
        </svg> */}
        <svg 
        onClick={() => addProductToWishlist()} 
        xmlns="http://www.w3.org/2000/svg" 
        fill="none" 
        viewBox="0 0 24 24" 
        strokeWidth={1.5} 
        stroke="currentColor" 
        className={`size-6 cursor-pointer transition-all hover:text-red-500 ${isWishlisting ? 'opacity-50 scale-90' : ''}`}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
      </svg>
      

    </CardFooter>

  </>
}
