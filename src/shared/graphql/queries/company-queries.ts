import { gql } from '@apollo/client'

export const GET_COMPANY = gql`
  query GetCompany($id: ID!) {
    getCompany(id: $id) {
      _id
      name
      locationId
    }
  }
`

export const GET_ALL_COMPANIES = gql`
  query GetAllCompanies {
    getAllCompanies {
      _id
      name
      location {
        address
      }
    }
  }
`