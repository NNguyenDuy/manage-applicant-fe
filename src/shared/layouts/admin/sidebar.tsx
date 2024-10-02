import { Layout, Menu } from 'antd'
import Link from 'next/link'
import { PATHS, ROOTS } from './routes'
import { I_SideBarProps } from '#/shared/typescript'
import Image from 'next/image'

export const SideBar = ({ collapsed, setCollapsed }: I_SideBarProps) => {
  return (
    <Layout.Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      theme="light"
    >
      <Link href={'/'} className="flex justify-center items-center p-2">
        <Image
          src="/assets/images/logo.png"
          alt="logo"
          width={100}
          height={100}
          className="rounded-full"
        />
      </Link>
      <Menu
        theme="light"
        className="h-screen"
        defaultSelectedKeys={['1']}
        mode="inline"
        items={PATHS.HOME.map((item) => ({
          key: item.key,
          icon: item.icon,
          label: <Link href={item.path}>{item.label}</Link>,
        }))}
      />
    </Layout.Sider>
  )
}
