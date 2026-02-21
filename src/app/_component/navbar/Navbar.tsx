'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import React, { useState } from 'react'
import imeglogo from '../../../aassets/freshcart-logo.svg'
import { signOut, useSession } from 'next-auth/react'
import { Badge } from 'lucide-react'
import { DropdownMenuBasic } from '../dropDown/DropDown'
import { cartResponse } from '@/typedata/cart-resonse'
import { useQuery } from '@tanstack/react-query'

export default function Navbar() {

    const { data: cartData, isLoading, isError } = useQuery<cartResponse>({
        queryKey: ['get-cart'],
        queryFn: async () => {
            const resp = await fetch('/api/cart')
            const payload = await resp.json()
            return payload
        }
    })
    const { data: wishlistData } = useQuery({
        queryKey: ['get-wishlist'],
        queryFn: async () => {
            const resp = await fetch('/api/wishlist')
            const payload = await resp.json()
            return payload
        }
    })

    const { status, data: session } = useSession()
    console.log(status);
    function Logout() {
        signOut({
            callbackUrl: "/login"
        })
    }
    const [isopen, setisopen] = useState(false)
    const Path = usePathname();
    function toggelNav() {
        setisopen(!isopen)
    }

    const path = [
        { href: '/', content: 'Home' },
        { href: '/categories', content: 'categories' },
        { href: '/brands', content: 'Brands' },


    ]
    const authPath = [
        { href: '/login', cont: 'Login' },
        { href: '/register', cont: 'Register' }
    ]

    return <>

        <nav className="bg-gray-400 py-2">
            <div className="max-w-screen-xl  flex flex-wrap md:flex-nowrap items-center md:gap-32 justify-between mx-auto p-4">
                <a href="https://flowbite.com/" className="flex items-center space-x-3 rtl:space-x-reverse">

                    <Image quality={50} width={150} height={100} src={imeglogo} alt='logo' />
                </a>

                <button onClick={toggelNav} data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-body rounded-base md:hidden hover:bg-neutral-secondary-soft hover:text-heading focus:outline-none focus:ring-2 focus:ring-neutral-tertiary" aria-controls="navbar-default" aria-expanded="false">
                    <span className="sr-only">Open main menu</span>
                    <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeWidth={2} d="M5 7h14M5 12h14M5 17h14" /></svg>
                </button>
                <div className={`${!isopen && 'hidden'} w-full justify-between md:flex `} id="navbar-default">

                    <ul className="font-medium  flex flex-col p-4 md:p-0 mt-4 gap-3  rounded-base bg-neutral-secondary-soft md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-neutral-primary">
                        {path.map((elem) => {
                            return <li key={elem.content}>
                                <Link href={elem.href} className={`${Path === elem.href ? 'active' : ''} hover:text-white `} onClick={() => {
                                    setisopen(false)
                                }}>{elem.content}</Link>
                            </li>
                        })}
                    </ul>

                    <ul className="font-medium items-center justify-center flex flex-col p-4 md:p-0 mt-4 gap-3  rounded-base bg-neutral-secondary-soft md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-neutral-primary">
                        {status == 'authenticated' ? <>
                            <li>HI {session?.user.name}</li>
                            <li className='relative'>
                                {cartData?.numOfCartItems??0> 0 ? <span className='absolute bottom-6 -right-0 bg-green-400 text-white text-[15px] w-6 h-6 flex items-center justify-center rounded-full font-bold'>{cartData?.numOfCartItems}</span> : ''}
                                <Link href={'/cart'}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                                    </svg>
                                </Link>
                            </li>
                            {/*fivurte  */}
                            <li className='relative'>
                                {/* هنا بنشوف لو الـ data موجودة وليها طول أكبر من صفر */}
                                {wishlistData?.data?.length > 0 ? (
                                    <span className='absolute bottom-6 -right-0 bg-green-400 text-white text-[15px] w-6 h-6 flex items-center justify-center rounded-full font-bold'>
                                        {wishlistData.data.length}
                                    </span>
                                ) : null}

                                <Link href={'/wishList'}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                                    </svg>
                                </Link>
                            </li>
                            {/* <li onClick={Logout} className='cursor-pointer hover:text-white'>Log out</li> */}
                            <DropdownMenuBasic Logout={Logout} />
                        </> : authPath.map((elm) => {
                            return <li key={elm.cont}>
                                <Link href={elm.href} className={`${Path === elm.href ? 'active' : ''} hover hover:text-white`} onClick={() => {
                                    setisopen(false)
                                }}>{elm.cont}</Link>
                            </li>
                        })}
                    </ul>

                </div>
            </div>
        </nav>



    </>
}
