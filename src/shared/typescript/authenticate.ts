import { E_Role } from './common'

export interface I_LocationInput {
  address: string
  city: string
  country: string
}

export interface I_CompanyInput {
  name: string
  location?: I_LocationInput
}

export interface I_UserInput {
  email: string
  password: string
  fullName: string
  role: E_Role
  company?: I_CompanyInput
}
