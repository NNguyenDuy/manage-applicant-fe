import { gql } from "@apollo/client";

export const GET_ALL_JOBTYPES = gql`
  query GetAllJobTypes {
  getAllJobTypes {
    _id
    type
  }
}
`;