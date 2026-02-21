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
import AddBtn from "../addBtn/AddBtn"

export function ProductCard({ prod }: { prod: ProductInterface }) {
    return (
        <Card className="relative mx-auto w-full max-w-sm pt-0">

            <Link href={`/productdetails/${prod._id}`}>
                <Image
                    src={prod.imageCover}
                    alt={prod.title}
                    className='w-full object-cover'
                    width={200}
                    height={300}
                />
                <CardHeader>
                    <CardAction>
                        <Badge variant="secondary">{prod.brand.name}</Badge>
                    </CardAction>
                    <CardTitle>{prod.title.split(' ').slice(0, 2).join('')}</CardTitle>
                    <CardDescription>
                        <div className="flex justify-between">
                            <span className="text-sky-400 ">{prod.price} : EGP</span>
                            <span className="flex justify-between gap-2">{prod.ratingsAverage} <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-yellow-200">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                            </svg>
                            </span>
                        </div>
                    </CardDescription>
                </CardHeader>

            </Link>
            <AddBtn productId={prod._id}/>
        </Card>
    )
}
