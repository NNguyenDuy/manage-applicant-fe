'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect, ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import { Avatar } from 'antd'

import { PATHS, ROOTS } from './routes'
import { useAuth } from '#/shared/hook/use-auth'

interface NavMobileProps {
  icon: ReactNode
  label: string
  link: string
}

export const Header = () => {
  const pathname = usePathname()
  const { user } = useAuth()
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      window.scrollY > 60 ? setIsScrolled(true) : setIsScrolled(false)
    }
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const NavMobile: React.FC<NavMobileProps> = ({ icon, label, link }) => (
    <div className="group relative px-4 cursor-pointer">
      <Link
        href={link}
        className={`flex h-10 w-10 items-center justify-center rounded-full hover:text-c-green opacity-70 ${
          pathname.startsWith(link) ? 'text-primary' : ''
        }`}
      >
        {icon}
      </Link>
      <span className="absolute -top-8 left-[50%] -translate-x-[50%] z-20 origin-left scale-0 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium shadow-md transition-all duration-300 ease-in-out group-hover:scale-100 inline-block whitespace-nowrap min-w-max">
        {label}
      </span>
    </div>
  )

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 flex justify-between h-20 items-center px-8 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-lg h-16' : 'bg-transparent'
      }`}
    >
      <Link href={ROOTS.HOME}>
        <Image
          src="/assets/images/logo.png"
          alt="logo"
          width={100}
          height={100}
          className="rounded-full"
        />
      </Link>
      <nav className="lg:flex gap-10 font-semibold hidden">
        {PATHS.HOME.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className={pathname.startsWith(item.path) ? 'text-primary' : ''}
          >
            {item.name}
          </Link>
        ))}
      </nav>
      <div className="lg:hidden">
        <div className="fixed bottom-0 left-0 right-0 border-t border-gray-300 bg-white py-2 flex justify-around shadow-xl">
          {PATHS.HOME.map((item) => (
            <NavMobile
              key={item.path}
              icon={item.icon}
              label={item.name}
              link={item.path}
            />
          ))}
        </div>
      </div>
      {!user ? (
        <div className="hidden lg:flex gap-10">
          <Link
            href={ROOTS.LOGIN}
            className="border text-primary rounded-sm border-primary px-4 py-2 font-bold"
          >
            Đăng nhập
          </Link>
          <Link
            href={ROOTS.REGISTER}
            className="text-white rounded-sm bg-primary px-4 py-2 font-bold"
          >
            Đăng ký
          </Link>
        </div>
      ) : (
        <Link
          href={
            user?.role === 'recruiter'
              ? '/recruiter'
              : user?.role === 'candidate'
              ? '/candidate'
              : user?.role === 'admin'
              ? '/admin'
              : '/'
          }
        >
          <div className="group relative">
            <button className="hover:scale-125 duration-200 hover:stroke-blue-500">
              <Avatar size={50} className="relative">
                <span className="absolute text-black font-semibold inset-0 flex items-center justify-center">
                  {user?.fullName?.split(' ').pop()}
                </span>
              </Avatar>
            </button>
            <span className="absolute -left-[150%] -translate-x-[50%] z-20 origin-left scale-0 rounded-lg border border-gray-300 bg-white py-2 text-sm font-bold shadow-md transition-all duration-300 ease-in-out px-3 group-hover:scale-100 inline-block whitespace-nowrap min-w-max">
              Hello {user?.fullName} 👋!
            </span>
          </div>
        </Link>
      )}
    </header>
  )
}
