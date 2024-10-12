import { gql } from '@apollo/client'

export const UPDATE_CANDIDATE_PROFILE = gql`
  mutation UpdateCandidateProfile(
    $updateCandidateProfileId: ID!
    $resume: ResumeInput
  ) {
    updateCandidateProfile(id: $updateCandidateProfileId, resume: $resume) {
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
