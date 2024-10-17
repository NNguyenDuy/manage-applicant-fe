import { gql } from '@apollo/client'

export const UPDATE_JOB = gql`
  mutation UpdateJob($jobId: ID!, $jobData: JobInput!) {
    updateJob(jobId: $jobId, jobData: $jobData) {
      id
    }
  }
`

export const CREATE_JOB = gql`
  mutation CreateJob($jobData: JobInput!) {
    createJob(jobData: $jobData) {
      id
      title
      description
      salary
      experience
      deadline
      headcount
      jobTypeId
      categoryId
      locationId
    }
  }
`
