import { gql } from '@apollo/client'

export const LOGIN = gql`
  mutation LoginUser($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`
export const REGISTER = gql`
  mutation Register(
    $email: String!
    $password: String!
    $fullName: String
    $role: String!
    $company: CompanyInput
  ) {
    register(
      email: $email
      password: $password
      fullName: $fullName
      role: $role
      company: $company
    ) {
      token
    }
  }
`
