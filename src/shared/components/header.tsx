'use client'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { PATHS, ROOTS } from './routes'
import { useQuery } from '@apollo/client'
import { GET_USER } from '../graphql/queries'
import { useEffect } from 'react'

export const Header = () => {
  const pathname = usePathname()
  const { data, error, refetch } = useQuery(GET_USER)
  const user = data?.getInfoUser

  const handleLogout = () => {
    window.localStorage.removeItem('auth')
    refetch()
  }

  useEffect(() => {
    refetch()
  })

  return (
    <header className="flex justify-between h-20 items-center px-8">
      <Link href={ROOTS.HOME}>
        <Image
          src="/assets/images/logo.png"
          alt="logo"
          width={100}
          height={100}
          className="rounded-full"
        />
      </Link>
      <nav className="flex gap-10 font-semibold text-secondary">
        {PATHS.HOME.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className={pathname === item.path ? 'text-primary' : ''}
          >
            {item.name}
          </Link>
        ))}
      </nav>
      {error ? (
        <div className="flex gap-10">
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
        <div className="flex gap-10 justify-center items-center">
          <div className="border text-primary rounded-sm border-primary px-4 py-2 font-bold flex justify-center items-center">
            <Link
              href={
                user?.role === 'recruiter'
                  ? '/user-company'
                  : user?.role === 'candidate'
                  ? '/user'
                  : user?.role === 'admin'
                  ? '/admin'
                  : '/'
              }
            >
              Hello {user?.fullName}
            </Link>
          </div>
          <button
            className="text-white rounded-sm bg-primary px-4 py-2 font-bold"
            onClick={handleLogout}
          >
            Đăng xuất
          </button>
        </div>
      )}
    </header>
  )
}
