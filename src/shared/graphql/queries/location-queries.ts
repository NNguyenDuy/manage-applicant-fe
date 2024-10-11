import { gql } from '@apollo/client'

export const GET_LOCATIONS = gql`
  query GetAllLocations {
    getAllLocations {
      _id
      address
      city
      country
    }
  }
`