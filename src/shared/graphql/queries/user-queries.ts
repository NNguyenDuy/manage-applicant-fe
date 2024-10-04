import { gql } from '@apollo/client'

export const GET_INFO_USER = gql`
  query GetInfoUser {
    getInfoUser {
      _id
      fullName
      email
      role
      companyId
      profileId
      company {
        _id
        name
        address
        description
      }
      candidateProfile {
        _id
        skills
        experience
        cvUrl
      }
    }
  }
`
