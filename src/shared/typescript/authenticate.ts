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
  id?: string;
  email: string
  password: string
  fullName: string
  role: E_Role
  company?: I_CompanyInput
  isDel?: boolean; 
}

export interface I_CandidateUserInput extends I_UserInput {
  candidateId?: string; 
  companyId?: string; 
  company?: I_CompanyInput;
  name?: string;
  location?: I_LocationInput
  resume?: {
    skills: Array<{
      name: string;
      experience: number;
    }>;
  };
}
