import { gql } from "@apollo/client";

export const GET_ALL_JOBS = gql`
  query GetAllJobs($idDel: Boolean!) {
    getAllJobs(idDel: $idDel) {
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
`;

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
`;

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
`;
export const GET_JOB_WITH_FILTERS = gql`
  query GetJobsWithFilters(
    $jtitle: String
    $jlocation: String
    $jCategory: String
    $idDel: Boolean
  ) {
    getJobsWithFilters(
      Jtitle: $jtitle
      Jlocation: $jlocation
      JCategory: $jCategory
      idDel: $idDel
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
`;

export const UPDATE_ISDEL = gql`
  mutation UpdateIsDel($jobId: ID!, $isDel: Boolean) {
    updateIsDel(jobId: $jobId, isDel: $isDel) {
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
`;
