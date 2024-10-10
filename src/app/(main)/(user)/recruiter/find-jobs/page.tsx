'use client'

import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import { GET_JOB_BY_CONDITION } from '#/shared/graphql/queries/jobs-queries'
import SearchForm from './search-jobs'
import JobList from './list-jobs'

const FindJobs: React.FC = () => {
  const [searchParams, setSearchParams] = useState({ title: '', position: '', salary: 0 })

  const { data, loading, error } = useQuery(GET_JOB_BY_CONDITION, {
    variables: {
      title: searchParams.title,
      position: searchParams.position,
      salary: searchParams.salary,
    },
    skip: !searchParams.title && !searchParams.position && !searchParams.salary, // Skip query if no search params
  })

  const handleSearch = (title: string, position: string, salary: number) => {
    setSearchParams({ title, position, salary })
  }

  const jobs = data?.getJobByCondition || []

  return (
    <div>
      <SearchForm onSearch={handleSearch} />
      {loading && <p className="text-center text-gray-500">Đang tìm công việc mà bạn yêu cầu... Vui lòng chờ chút</p>}
      {error && <p className="text-center text-gray-500">Lỗi: {error.message}</p>}
      <JobList jobs={jobs} />
    </div>
  )
}

export default FindJobs