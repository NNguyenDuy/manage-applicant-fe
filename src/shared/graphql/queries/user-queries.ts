import { gql } from '@apollo/client'

export const GET_INFO_USER = gql`
  query GetInfoUser {
    getInfoUser {
      _id
      fullName
      email
      role
      candidateId
      companyId
      idDel
      candidate {
        id
        resume {
          cvLinks
          skills {
            name
            experience
          }
        }
        idDel
      }
      company {
        id
        name
        description
        size
        field
        locationId
        idDel
        location {
          _id
          address
          city
          country
          idDel
        }
      }
    }
  }
`

export const UPDATE_USER = gql`
  mutation UpdateUser($updateUserId: ID!, $fullName: String) {
    updateUser(id: $updateUserId, fullName: $fullName) {
      fullName
    }
  }
`
export const UPDATE_COMPANY = gql`
  mutation UpdateCompany($companyId: ID!, $companyData: CompanyInput!) {
    updateCompany(companyId: $companyId, companyData: $companyData) {
      id
    }
  }
`
export const GET_ALL_USERS = gql`
  query GetAllUsers {
    getAllUsers {
      _id
      fullName
      email
      role
      candidateId
      companyId
      idDel
    }
  }
`

export const GET_CANDIDATE_PROFILE = gql`
  query GetCandidateProfile($userId: ID!) {
    getCandidateProfile(userId: $userId) {
      _id
      fullName
      email
      skills {
        name
        experience
      }
      resume {
        cvLinks
        skills {
          name
          experience
        }
      }
    }
  }
`

export const GET_COMPANY = gql`
  query GetCompany($userId: ID!) {
    getCompany(userId: $userId) {
      _id
      name
      location {
        address
        city
        country
      }
    }
  }
`
