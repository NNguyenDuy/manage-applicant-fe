import { gql } from '@apollo/client'

export const GET_APPLICATION_BY_CANDIDATE = gql`
  query GetApplications(
    $candidateProfileId: ID!
    $status: E_ApplicationStatus
    $page: Int
    $limit: Int
  ) {
    getApplicationByCandidate(
      candidateProfileId: $candidateProfileId
      status: $status
      page: $page
      limit: $limit
    ) {
      items {
        _id
        job {
          title
          salary
          company {
            name
          }
        }
        appliedAt
        selectedCvLink
        status
      }
      totalItems
      totalPages
      currentPage
    }
  }
`

export const APPLY_JOB = gql`
  mutation CreateApplication($application: ApplicationInput!) {
    createApplication(application: $application) {
      _id
      jobId
    }
  }
`
export const GET_APPLICATION_BY_ID = gql`
  query GetApplicationsByJob($jobId: ID!) {
    getApplicationsByJob(jobId: $jobId) {
      _id
      jobId
      candidateProfileId
      selectedCvLink
      status
      appliedAt
      evaluationAI
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
        isDel
        company {
          id
          name
          description
          size
          field
          locationId
          isDel
        }
        jobType {
          _id
          type
          isDel
        }
        category {
          _id
          name
          isDel
        }
        location {
          _id
          address
          city
          country
          isDel
        }
      }
    }
  }
`
