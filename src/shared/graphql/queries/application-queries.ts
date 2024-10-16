import { gql } from "@apollo/client";

export const GET_APPLICATION_BY_CANDIDATE = gql`
  query GetApplicationByCandidate($candidateProfileId: ID!) {
    getApplicationByCandidate(candidateProfileId: $candidateProfileId) {
      _id
      jobId
      candidateProfileId
      selectedCvLink
      status
      appliedAt
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
        company {
          id
          name
        }
      }
    }
  }
`;
export const GET_APPLICATION_BY_ID = gql`
query GetApplicationsByJob($jobId: ID!) {
  getApplicationsByJob(jobId: $jobId) {
    _id
    jobId
    candidateProfileId
    selectedCvLink
    status
    appliedAt
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
}
`;