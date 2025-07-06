"use client"

import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import React from 'react'

export default function layout({
     children
}: {
     children: React.ReactNode
}) {
     return (
          <div className="flex justify-center w-full">
               <div className="flex flex-col w-full min-h-screen">
                    <Navbar />
                    <main className="flex flex-col flex-grow justify-start items-center">
                         {children}
                    </main>
                    <Footer />
               </div>
          </div>
     )
}
