'use client'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { PATHS, ROOTS } from './routes'
export const Header = () => {
  const pathname = usePathname()

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
    </header>
  )
}
