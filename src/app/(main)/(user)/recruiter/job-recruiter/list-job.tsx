import React, { useState } from 'react'
import { useAuth } from '#/shared/hook/use-auth'
import { I_Job, I_CandidateProfile } from '#/shared/typescript/common'
import { useQuery } from '@apollo/client'
import { GET_JOBS_BY_COMPANY_ID } from '#/shared/graphql/queries/jobs-queries'

export const ListJob = () => {
  const { user } = useAuth()

  const { data, loading, error } = useQuery(GET_JOBS_BY_COMPANY_ID, {
    variables: { companyId: user?.company?._id },
    skip: !user?.company?._id,
  })

  const [selectedJobId, setSelectedJobId] = useState<string | null>(null)

  const handleJobClick = (jobId: string) => {
    setSelectedJobId(jobId === selectedJobId ? null : jobId)
  }

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Danh sách công việc</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.getJobsByCompanyId.map((job: I_Job) => (
          <div
            key={job._id}
            className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => handleJobClick(job._id)}
          >
            <h2 className="text-xl font-semibold mb-2">{job.title}</h2>
            <p className="text-gray-600 mb-2">{job.description}</p>

            {/* Hiển thị danh sách ứng viên khi click vào công việc */}
            {selectedJobId === job._id && (
              <div className="mt-4">
                <h3 className="text-lg font-semibold">Danh sách ứng viên:</h3>
                {job.candidates && job.candidates.length ? (
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    {job.candidates.map((candidate: I_CandidateProfile) => (
                      <li key={candidate._id} className="text-blue-500">
                        {/* Hiển thị thông tin ứng viên */}
                        <p>
                          <strong>Tên ứng viên:</strong> {candidate.userId}
                        </p>

                        {/* Kỹ năng của ứng viên */}
                        <p>
                          <strong>Kỹ năng:</strong>
                        </p>
                        <ul className="list-inside space-y-1">
                          {candidate.resume?.skills?.map((skill, index) => (
                            <li key={index} className="text-gray-700">
                              - {skill.name} ({skill.experience} năm kinh
                              nghiệm)
                            </li>
                          ))}
                        </ul>

                        {/* Liên kết CV */}
                        <div className="mt-2">
                          {candidate.resume?.cvLinks?.map((cvLink, index) => (
                            <a
                              key={index}
                              href={cvLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-gray-600 hover:underline ml-2"
                            >
                              [Xem CV {index + 1}]
                            </a>
                          ))}
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500 mt-2">
                    Chưa có ứng viên nào ứng tuyển.
                  </p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
