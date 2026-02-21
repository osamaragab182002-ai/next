import userImega from "../../../aassets/User-PNG-Photos.png"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Image from "next/image"
import Link from "next/link"

export function DropdownMenuBasic({Logout}) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Image className="cursor-pointer" alt='user' width={35} height={35} src={userImega}/>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuGroup>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuItem>
                        <Link href={'/profile'}>Profile</Link>
                        </DropdownMenuItem>
                    <DropdownMenuItem>
                        <span className=" cursor-pointer" onClick={Logout}>Logout</span>
                    </DropdownMenuItem>
                    
                </DropdownMenuGroup>
                
                
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
