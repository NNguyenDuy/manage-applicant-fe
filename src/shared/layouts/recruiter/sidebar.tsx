'use client'

import { PATHS, ROOTS } from './routes'
import Link from 'next/link'

export const SideBar = () => {
  return (
    <nav className="bg-gray-800 w-64 h-screen flex flex-col">
      {/* Logo / Header */}
      <div className="text-center text-white py-4">
        <Link href={ROOTS.RECRUITER} className="text-2xl font-bold">
          Dashboard
        </Link>
      </div>

      {/* Navigation Links */}
      <ul className="flex flex-col space-y-4 p-4">
        {PATHS.HOME.map((item, index) => (
          <li key={index}>
            <Link
              href={item.path}
              className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md p-2 block"
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
