import { gql } from '@apollo/client';

export const CREATE_USER = gql`
  mutation CREATE_USER($email: String!, $password: String!, $role: E_Role!, $fullName: String, $isDel: Boolean) {
    createUser(email: $email, password: $password, role: $role, fullName: $fullName, isDel: $isDel) {
      message
      data {
        _id
        email
        fullName
        role
        candidateId
        companyId
        isDel
      }
    }
  }
`;



export const UPDATE_USER = gql`
  mutation UPDATE_USER($id: ID!, $email: String, $fullName: String, $role: E_Role) {
    updateUser(id: $id, email: $email, fullName: $fullName, role: $role) {
      _id
      email
      fullName
      role
    }
  }
`;


export const DELETE_USER = gql`
  mutation DELETE_USER($id: ID!) {
    deleteUser(id: $id) {
      _id
      isDel
    }
  }
`;
