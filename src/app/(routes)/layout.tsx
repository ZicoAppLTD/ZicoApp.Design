"use client"

import ModalProvider from "@/components/providers/ModalProvider"
import React from "react"

export default function layout({
     children
}: {
     children: React.ReactNode
}) {
     return (
          <div className="w-full h-full">
               <ModalProvider />
               {children}
          </div>
     )
}
