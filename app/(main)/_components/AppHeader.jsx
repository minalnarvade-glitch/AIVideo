"use client";

import React from 'react';
import { SidebarTrigger } from "@/components/ui/sidebar";
import Image from "next/image";
import { useAuthContext } from "@/app/provider";

function AppHeader() {

    const { user } = useAuthContext();

    return (
        <div className='p-3 flex justify-between items-center'>

            <SidebarTrigger />

            {user?.imageUrl ? (

                <Image
                    src={user.imageUrl}
                    alt="userImage"
                    width={40}
                    height={40}
                    className="rounded-full"
                />

            ) : (

                <div className="w-10 h-10 bg-gray-300 rounded-full" />

            )}

        </div>
    );
}

export default AppHeader;