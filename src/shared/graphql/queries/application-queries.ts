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
export const GET_APPLICATION_BY_COMPANY = gql`
  query GetApplicationsByCompany($companyId: ID!) {
    getApplicationsByCompany(companyId: $companyId) {
      _id
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
export const UPDATE_APPLICATION_STATUS = gql`
  mutation UpdateApplicationStatus($updateApplicationStatusId: ID!, $newStatus: E_ApplicationStatus!) {
  updateApplicationStatus(id: $updateApplicationStatusId, newStatus: $newStatus) {
    status
    isDel
  }
}
`;
