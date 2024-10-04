import { gql } from '@apollo/client'

export const UPDATE_CANDIDATE_PROFILE = gql`
  mutation UpdateCandidateProfile(
    $updateCandidateProfileId: ID!
    $skills: [String]
    $experience: String
    $cvUrl: [String]
  ) {
    updateCandidateProfile(
      id: $updateCandidateProfileId
      skills: $skills
      experience: $experience
      cvUrl: $cvUrl
    ) {
      _id
      skills
      experience
      cvUrl
    }
  }
`
