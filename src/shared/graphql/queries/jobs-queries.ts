import { gql } from '@apollo/client'

export const GET_ALL_JOBS = gql`
  query GetAllJobs($isDel: Boolean!) {
    getAllJobs(isDel: $isDel) {
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
      isDel
      company {
        id
        name
        description
        size
        field
        locationId
      }
      jobType {
        _id
        type
      }
      category {
        _id
        name
      }
      location {
        _id
        address
        city
        country
      }
    }
  }
`

export const GET_JOB_BY_ID = gql`
  query GetJobById($jobId: ID!) {
    getJobById(jobId: $jobId) {
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
`

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
export const GET_JOB_WITH_FILTERS = gql`
  query GetJobsWithFilters(
    $jtitle: String
    $jlocation: String
    $jCategory: String
    $isDel: Boolean
  ) {
    getJobsWithFilters(
      Jtitle: $jtitle
      Jlocation: $jlocation
      JCategory: $jCategory
      isDel: $isDel
    ) {
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
`
export const GET_MAINTAIN_JOBS_BY_COMPANY = gql`
  query GetMaintainJobsByCompany($companyId: ID!) {
    getMaintainJobsByCompany(companyId: $companyId) {
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
`
