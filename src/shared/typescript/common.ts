import { ReactNode } from 'react'

export interface I_Children {
  children: React.ReactNode | JSX.Element
}

export interface I_User {
  fullName: string
  email: string
  role: string
}

export interface I_SideBarProps {
  collapsed: boolean
  setCollapsed: (value: boolean) => void
}

export interface I_PathItem {
  key: string
  label: string
  icon: ReactNode
  path: string
}
