import { gql } from '@apollo/client'

export const GET_JOBS = gql`
  query GetAllJobs {
  getAllJobs {
    _id
    title
    description
    location {
      _id
      address
      city
      country
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
      }
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
      applications {
        _id
        jobId
        candidateProfileId
        status
        appliedAt
      }
    }
    jobType {
      type
      _id
    }
  }
}
`
export const GET_JOB_BY_CONDITION = gql`
query GetJobByCondition($title: String!, $position: String!, $salary: Float!) {
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
