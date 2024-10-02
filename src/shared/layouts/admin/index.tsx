'use client'

import { useState } from 'react'
import { Button } from 'antd'

import { SideBar } from './sidebar'
import { Icons } from '#/icons'
import { I_Children } from '#/shared/typescript'

export const AdminLayout = ({ children }: I_Children) => {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className="flex">
      <SideBar collapsed={collapsed} setCollapsed={setCollapsed} />

      <div className="flex-1 bg-gray-100 min-h-screen">
        <Button
          className="border-none ml-2"
          icon={
            collapsed ? (
              <Icons.ArrowLeft className="rotate-180" size={25} />
            ) : (
              <Icons.ArrowLeft size={25} />
            )
          }
          onClick={() => setCollapsed(!collapsed)}
        />
        <main className="p-8">{children}</main>
      </div>
    </div>
  )
}
