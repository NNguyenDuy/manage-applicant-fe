import { ReactNode } from 'react'

export interface I_Children {
  children: React.ReactNode | JSX.Element
}

export enum ExperienceLevel {
  Under1Year = 'Under 1 Year',
  OneToTwoYears = '1-2 Years',
  TwoToThreeYears = '2-3 Years',
  ThreeToFourYears = '3-4 Years',
  Over5Years = 'Over 5 years',
}

export interface I_CandidateProfile {
  skills: string[]
  experience: ExperienceLevel
  cvUrl?: string[]
}

export interface I_Company {
  name: string
  address?: string
  description?: string
}

export interface I_User {
  fullName: string
  email: string
  role: string
  companyId?: string
  profileId?: string
  company?: I_Company
  candidateProfile?: I_CandidateProfile
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
