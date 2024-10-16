import { gql } from '@apollo/client'

export const UPDATE_JOB = gql`
  mutation UpdateJob($jobId: ID!, $jobData: JobInput!) {
  updateJob(jobId: $jobId, jobData: $jobData) {
    id
    title
    description
    salary
    experience
    deadline
    createdAt
    updatedAt
    headcount
    companyId
    jobTypeId
    categoryId
    locationId
    idDel
    company {
      id
      name
      description
      size
      field
      locationId
      idDel
    }
    jobType {
      _id
      type
      idDel
    }
    category {
      _id
      name
      idDel
    }
    location {
      _id
      address
      city
      country
      idDel
    }
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