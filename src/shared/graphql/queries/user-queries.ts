import { gql } from '@apollo/client'

export const GET_INFO_USER = gql`
  query GetInfoUser {
  getInfoUser {
    _id
    fullName
    email
    role
    candidateProfile {
      _id
      userId
      resume {
        cvLinks
        skills {
          name
          experience
        }
      }
      applications {
        _id
        jobId
        candidateProfileId
        status
        appliedAt
      }
    }
    company {
      _id
      name
      ownerId
      locationId
      jobs {
        _id
        title
        description
        jobType {
          _id
          type
        }
        location {
          _id
          address
          city
          country
        }
        categoryIds {
          _id
          name
        }
        candidates {
          _id
          userId
        }
      }
    }
  }
}
`
