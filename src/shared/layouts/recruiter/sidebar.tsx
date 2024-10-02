import { Layout, Menu } from 'antd'
import Link from 'next/link'
import { PATHS } from './routes'
import { I_SideBarProps } from '#/shared/typescript'

export const SideBar = ({ collapsed, setCollapsed }: I_SideBarProps) => {
  return (
    <Layout.Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
    >
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
