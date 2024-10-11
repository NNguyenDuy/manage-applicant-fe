import { gql } from '@apollo/client'

export const GET_JOBS_BY_COMPANY_ID = gql`
  query GetJobsByCompanyId($companyId: ID!) {
    getJobsByCompanyId(companyId: $companyId) {
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
        resume {
          cvLinks
          skills {
            name
            experience
          }
        }
      }
    }
  }
`
export const GET_JOB_BY_CONDITION = gql`
  query GetJobByCondition(
    $title: String!
    $position: String!
    $salary: Float!
  ) {
    getJobByCondition(title: $title, position: $position, salary: $salary) {
      _id
      title
      description
      salary
      position
      recruiterId
      applicants {
        userId
        cvUrl
      }
    }
  }
`
