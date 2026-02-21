'use client'
import React from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Image from 'next/image'
import Autoplay from 'embla-carousel-autoplay'

export default function ProductImega({image} :{image:string[]}) {
  return <>
  
  <Carousel
    opts={{
    
    loop: true,
  }}
   plugins={[
        Autoplay({
          delay: 2000,
        }),
      ]}>
  <CarouselContent>
    {image.map((src)=>{return<CarouselItem>
        <Image className='w-full'
               width={300}
               height={400}
                src={src}
                 alt={src} />
    </CarouselItem>})}
   
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>
  
  
  
  </>
}
