import { gql } from '@apollo/client'

export const GET_COMPANY = gql`
  query GetCompanyById($companyId: ID!) {
    getCompanyById(companyId: $companyId) {
      id
      name
      location {
        address
      }
    }
  }
`;


export const GET_ALL_COMPANIES = gql`
  query GetAllCompanies {
    getAllCompanies {
      id
      name
      description
      size
      field
      locationId
      isDel
        location {
      _id
      address
      city
      country
      isDel
    }
    }
  }
`;

export const GET_COMPANY_BY_ID  = gql`
query GetCompanyById($companyId: ID!) {
  getCompanyById(companyId: $companyId) {
    id
    name
    description
    size
    field
    locationId
    isDel
    location {
      _id
      address
      city
      country
      isDel
    }
  }
}
`;
