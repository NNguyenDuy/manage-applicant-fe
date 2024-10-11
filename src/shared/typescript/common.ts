import { ReactNode } from 'react'

export interface I_Children {
  children: React.ReactNode | JSX.Element
}

export enum E_Role {
  ADMIN = 'admin',
  RECRUITER = 'recruiter',
  CANDIDATE = 'candidate',
}

export interface I_User {
  fullName?: string
  email: string
  password: string
  role?: E_Role
  candidateProfile?: I_CandidateProfile
  company?: I_Company
}

export interface I_Company {
  _id: string;
  name?: string;
  ownerId?: string;
  locationId?: string;
  jobs?: I_Job[];
}

export interface I_CandidateProfile {
  _id: string;
  userId?: string;
  resume?: {
    cvLinks?: string[];
    skills?: {
      name?: string;
      experience?: number;
    }[];
  };
  applications?: string[];
}

export interface I_Job {
  _id: string;
  title?: string;
  description?: string;
  companyId?: string;
  jobTypeId?: string;
  categoryIds?: string[];
  locationId?: string;
  candidates?: I_CandidateProfile[];
}

export interface I_JobType {
  _id: string;
  type: string;
}

export interface I_JobCategory {
  _id: string;
  name: string;
}

export interface I_Location {
  _id: string;
  address: string;
  city: string;
  country: string;
}

export enum E_ApplicationStatus {
  SUBMITTED = 'submitted',
  UNDER_REVIEW = 'under_review',
  ACCEPTED = 'accepted',
  REJECTED = 'rejected',
}

export interface I_Application {
  _id: string;
  jobId?: string;
  candidateProfileId?: string;
  status?: E_ApplicationStatus;
  appliedAt?: string;
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


