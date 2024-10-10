import { gql } from '@apollo/client'

export const GET_JOBS = gql`
query GetAllJobs {
  getAllJobs {
    _id
    title
    description
    salary
    position
    recruiterId
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
