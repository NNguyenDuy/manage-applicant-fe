import { gql } from '@apollo/client'

export const GET_APPLICATION_BY_CANDIDATE = gql`
  query GetApplicationByCandidate($candidateProfileId: ID!) {
    getApplicationByCandidate(candidateProfileId: $candidateProfileId) {
      _id
      jobId
      candidateProfileId
      selectedCvLink
      status
      appliedAt
      isDel
      job {
        id
        title
        description
        salary
        experience
        deadline
        createdAt
        updatedAt
        headcount
        company {
          id
          name
        }
      }
    }
  }
`
