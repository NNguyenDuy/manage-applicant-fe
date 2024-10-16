import { gql } from '@apollo/client';

export const CREATE_USER = gql`
  mutation CREATE_USER($email: String!, $password: String!, $role: E_Role!, $fullName: String) {
    createUser(email: $email, password: $password, role: $role, fullName: $fullName) {
      message
      data {
        _id
        email
        fullName
        role
        candidateId
        companyId
      }
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UPDATE_USER($id: ID!, $email: String, $fullName: String, $role: E_Role, $candidateId: ID, $companyId: ID) {
  updateUser(id: $id, email: $email, fullName: $fullName, role: $role, candidateId: $candidateId, companyId: $companyId) {
    _id
    email
    fullName
    role
    candidateId
    companyId
  }
}
`;

export const DELETE_USER = gql`
  mutation DELETE_USER($id: ID!) {
    deleteUser(id: $id) {
      _id
      idDel
    }
  }
`;
