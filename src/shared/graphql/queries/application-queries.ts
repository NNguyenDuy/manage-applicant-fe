import { gql } from '@apollo/client'

export const GET_APPLICATION_BY_CANDIDATE = gql`
  query GetApplications(
    $candidateProfileId: ID!
    $status: E_ApplicationStatus
    $page: Int
    $limit: Int
  ) {
    getApplicationByCandidate(
      candidateProfileId: $candidateProfileId
      status: $status
      page: $page
      limit: $limit
    ) {
      items {
        _id
        job {
          title
          salary
          company {
            name
          }
        }
        appliedAt
        selectedCvLink
        status
      }
      totalItems
      totalPages
      currentPage
    }
  }
`
