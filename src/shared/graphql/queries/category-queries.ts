import { gql } from '@apollo/client'
export const GET_ALL_JOBCATEGORY = gql`
  query GetAllJobCategories {
  getAllJobCategories {
    _id
    name
  }
}
`