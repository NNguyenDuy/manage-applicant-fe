import { icons } from '#/icons'
import { PATHS } from '@/app/routes'
import Link from 'next/link'
export const SideBar = () => {
  return (
    <header className="bg-[#121212] p-5 w-3/12 rounded-lg font-bold">
      <ul className="flex flex-col gap-5 items-start">
        <li>
          <Link
            href={PATHS.BOOK}
            className="flex gap-1 justify-center items-center"
          >
            <icons.FaBookDead size={23} />
            <span className="text-2xl " id="ui">
              Books
            </span>
          </Link>
        </li>
        <li>
          <Link
            href={PATHS.HOME}
            className="flex gap-5 justify-center items-center"
          >
            <icons.IoHomeSharp size={23} />
            <span>Trang chủ</span>
          </Link>
        </li>
        <li className="flex gap-5 justify-center items-center">
          <icons.FaSearch size={23} />
          <span>Tìm kiếm</span>
        </li>
      </ul>
    </header>
  )
}
