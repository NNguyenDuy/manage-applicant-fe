import { gql } from '@apollo/client'

export const UPDATE_COMPANY = gql`
  mutation UpdateCompany($id: ID!, $name: String, $locationId: ID) {
    updateCompany(id: $id, name: $name, locationId: $locationId) {
      _id
      name
      locationId
    }
  }
`

export const CREATE_COMPANY = gql`
  mutation CreateCompany($name: String!, $ownerId: ID!, $locationId: ID) {
    createCompany(name: $name, ownerId: $ownerId, locationId: $locationId) {
      message
      data {
        _id
        name
        locationId
      }
    }
  }
`

export const DELETE_COMPANY = gql`
  mutation DeleteCompany($id: ID!) {
    deleteCompany(id: $id) {
      _id
      name
    }
  }
`

// Keep the existing UPDATE_COMPANY mutation