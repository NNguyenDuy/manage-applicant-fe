import { gql } from '@apollo/client';

export const UPDATE_JOB = gql`
    mutation UpdateJob($jobId: ID!, $jobData: JobInput!) {
        updateJob(jobId: $jobId, jobData: $jobData) {
            id
        }
    }
`;

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
`;
