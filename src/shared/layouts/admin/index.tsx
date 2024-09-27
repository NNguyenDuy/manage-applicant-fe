import { SideBar } from './sidebar'

export const AdminLayout = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className="flex">
      <SideBar />

      <div className="flex-1 bg-gray-100 min-h-screen">
        <main className="p-8">{children}</main>
      </div>
    </div>
  )
}
