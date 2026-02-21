
import { Button } from "@/components/ui/button";
import { ProductInterface } from "@/typedata/productInterface";
import Image from "next/image";
import { ProductCard } from "./_component/productCard/ProductCard";

export default async function Home() {
  let response=await fetch('https://ecommerce.routemisr.com/api/v1/products')
let {data : allProduct} : {data :ProductInterface[]}=await response.json()
  console.log(allProduct);
  
  return <>
  
  <div className="bg-gray-300 p-3 grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
{allProduct.map((prod)=>{ return <ProductCard key={prod._id} prod={prod}/>})}
  </div>
  </>
}
