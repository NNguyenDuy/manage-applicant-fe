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
