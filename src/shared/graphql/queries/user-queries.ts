import { gql } from '@apollo/client'

export const GET_INFO_USER = gql`
  query GetInfoUser {
    getInfoUser {
      email
      role
      fullName
    }
  }
`
