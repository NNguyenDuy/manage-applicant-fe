import { gql } from '@apollo/client'
export const UPDATE_APPLICATION_STATUS = gql`
  mutation UpdateApplicationStatus($updateApplicationStatusId: ID!, $newStatus: E_ApplicationStatus!) {
  updateApplicationStatus(id: $updateApplicationStatusId, newStatus: $newStatus) {
    status
    isDel
  }
}
`;