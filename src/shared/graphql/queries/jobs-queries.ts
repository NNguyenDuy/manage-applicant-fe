import { gql } from '@apollo/client'

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
// export const GET_JOB_BY_CONDITION = gql`
//   query GetJobByCondition(
//     $title: String!
//     $position: String!
//     $salary: Float!
//   ) {
//     getJobByCondition(title: $title, position: $position, salary: $salary) {
//       _id
//       title
//       description
//       salary
//       position
//       recruiterId
//       applicants {
//         userId
//         cvUrl
//       }
//     }
//   }
// `
export const GET_JOB_WITH_FILTERS = gql`
query GetJobsWithFilters($jtitle: String, $jlocation: String, $jCategory: String) {
  getJobsWithFilters(Jtitle: $jtitle, Jlocation: $jlocation, JCategory: $jCategory) {
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
    company {
      _id
      name
      ownerId
      locationId
      jobs {
        _id
        title
        description
        companyId
      }
    }
    categoryIds {
      _id
      name
    }
  }
}
`

export const GET_ALL_JOBS = gql`
  query GetAllJobs {
  getAllJobs {
    _id
    title
    description
    location {
      _id
      address
      city
      country
    }
    jobType {
      _id
      type
    }
    company {
      _id
      name
      ownerId
      locationId
      jobs {
        _id
        title
        description
        jobType {
          _id
          type
        }
        companyId
        company {
          _id
          name
          ownerId
          locationId
        }
        categoryIds {
          _id
          name
        }
      }
      location {
        _id
        address
        city
        country
      }
    }
    categoryIds {
      name
      _id
    }
  }

}
`

export const GET_JOB = gql`
  query GetJob($id: ID!) {
    getJob(id: $id) {
      _id
      title
      description
      jobType {
        type
      }
      location {
        city
        country
      }
      company {
        name
      }
      categoryIds {
        name
      }
    }
  }
`;


export const GET_JOBS_WITH_FILTERS = gql`
query GetJobsWithFilters($name: String!, $location: String!, $jobType: String!) {
  getJobsWithFilters(name: $name, location: $location, jobType: $jobType) {
    _id
    title
    description
    location {
      _id
      city
      country
    }
    jobType {
      _id
      type
    }
    company {
      _id
      name
    }
  }
}

`