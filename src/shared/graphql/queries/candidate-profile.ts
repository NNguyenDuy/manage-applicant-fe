import { gql } from '@apollo/client'

export const UPDATE_CANDIDATE_PROFILE = gql`
  mutation UpdateCandidateProfile(
    $updateCandidateProfileId: ID!
    $resume: ResumeInput!
  ) {
    updateCandidateProfile(id: $updateCandidateProfileId, resume: $resume) {
      id
      resume {
        cvLinks
        skills {
          name
          experience
        }
      }
    }
  }
`
