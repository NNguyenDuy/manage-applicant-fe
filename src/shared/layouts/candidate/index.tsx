'use client'

import { useState } from 'react'
import { Button, Avatar } from 'antd'
import Image from 'next/image'

import { SideBar } from './sidebar'
import { Icons } from '#/icons'
import { useAuth } from '#/shared/hook/use-auth'
import { I_Children } from '#/shared/typescript'

export const CandidateLayout = ({ children }: I_Children) => {
  const [collapsed, setCollapsed] = useState(false)
  const { user } = useAuth()

  return (
    <div className="flex">
      <SideBar collapsed={collapsed} setCollapsed={setCollapsed} />

      <div className="flex-1 p-1 bg-gray-100 min-h-screen">
        <Button
          className="border-none ml-1"
          icon={
            collapsed ? (
              <Icons.ArrowLeft className="rotate-180" size={25} />
            ) : (
              <Icons.ArrowLeft size={25} />
            )
          }
          onClick={() => setCollapsed(!collapsed)}
        />
        <main className="p-4 flex gap-10">
          {children}

          <div className="flex flex-col flex-1 gap-4 bg-c-white p-3 rounded-md">
            <div className="flex gap-4 m-4">
              <div className="relative">
                <Avatar size={80} />
                <Icons.Camera
                  className="absolute bottom-0 right-0 text-c-green bg-slate-100 cursor-pointer rounded-full"
                  size={25}
                />
              </div>
              <div className="flex flex-col ">
                <div>
                  <h3 className="text-sm">Chào bạn trở lại,</h3>
                  <span className="font-semibold">{user?.fullName}</span>
                </div>
                <span className="bg-[#808080] text-white text-xs p-1 px-2 rounded-sm">
                  Tài khoản: {user?.role}
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-3 ml-3">
              <h2 className="text-c-green font-semibold">Thông báo</h2>
              <div className="flex flex-col gap-2 text-sm">
                <p>
                  Khi có cơ hội việc làm phù hợp, NTD sẽ liên hệ và trao đổi với
                  bạn qua:
                </p>
                <ul>
                  <li className="flex gap-2 items-center">
                    <Icons.Check className="text-c-green" size={18} />{' '}
                    <p>Gửi thông báo qua hệ thống JobCV</p>
                  </li>
                  <li className="flex gap-2 items-center">
                    <Icons.Check className="text-c-green" size={18} />
                    <p>Email và Số điện thoại của bạn</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
