'use client'
import React, { useState } from 'react'
import { useAuth } from '#/shared/hook/use-auth'
import { useQuery } from '@apollo/client'
import { GET_MAINTAIN_JOBS_BY_COMPANY } from '#/shared/graphql/queries/jobs-queries'
import UpdateJob from './update'
import CreateJob from './create' // Import component CreateJob
import Link from 'next/link'

export const ListJob: React.FC = () => {
    const { user } = useAuth()
    const { data, loading, error, refetch } = useQuery(
        GET_MAINTAIN_JOBS_BY_COMPANY,
        {
            variables: { companyId: user?.companyId },
            skip: !user?.companyId,
        }
    )

    const [selectedJobId, setSelectedJobId] = useState<string | null>(null)
    const [isCreateJobOpen, setIsCreateJobOpen] = useState(false) // State để quản lý việc hiển thị form tạo công việc

    const handleJobClick = (jobId: string) => {
        setSelectedJobId(jobId === selectedJobId ? null : jobId)
    }

    const handleCloseUpdate = () => {
        refetch()
        setSelectedJobId(null)
    }

    const handleCreateJobOpen = () => {
        setIsCreateJobOpen(true)
    }

    const handleCreateJobClose = () => {
        refetch()
        setIsCreateJobOpen(false)
    }

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error: {error.message}</p>

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6 text-center">
                Danh sách công việc
            </h1>

            {/* Nút tạo mới công việc */}
            <button
                onClick={handleCreateJobOpen}
                className="bg-blue-500 text-white px-4 py-2 rounded mb-6"
            >
                Tạo mới
            </button>

            {/* Danh sách công việc */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {data?.getMaintainJobsByCompany.map((job: any) => (
                    <div
                        key={job.id}
                        className={`bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer ${selectedJobId === job.id ? 'ring-2 ring-green-500' : ''
                            }`}
                        onClick={() => handleJobClick(job.id)}
                    >
                        <Link
                            className="hover:text-red-500"
                            href={`job-recruiter/job-description/${job.id}`}
                            onClick={(e) => {
                                e.stopPropagation()
                            }}
                        >
                            <h2 className="text-2xl font-semibold mb-2">{job.title}</h2>
                        </Link>
                        <div className="mt-4"
                            dangerouslySetInnerHTML={{ __html: job.description }}
                        >
                        </div>
                        <div className="text-gray-500">
                            <p>
                                <strong>Lương:</strong>{' '}
                                {job?.salary
                                    ? job.salary.toLocaleString('vi-VN') + ' VND'
                                    : 'Thỏa thuận'}
                            </p>
                            <p>
                                <strong>Kinh nghiệm:</strong>{' '}
                                {job?.experience || 'Không yêu cầu'} năm
                            </p>
                            <p>
                                <strong>Hạn nộp hồ sơ:</strong>{' '}
                                {job?.deadline
                                    ? new Date(job.deadline).toLocaleDateString()
                                    : 'Không rõ'}
                            </p>
                            <p>
                                <strong>Loại công việc:</strong>{' '}
                                {job?.jobType?.type || 'Không rõ'}
                            </p>
                            <p>
                                <strong>Địa điểm:</strong> {job.location?.city || 'Không rõ'},{' '}
                                {job?.location?.country || 'Không rõ'}
                            </p>
                            <p>
                                <strong>Danh mục:</strong> {job?.category?.name || 'Không rõ'}
                            </p>
                            <p>
                                <strong>Trạng thái:</strong>{' '}
                                {job?.isDel ? 'Đã ẩn' : 'Đang hiển thị'}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Hiển thị modal cho form tạo mới công việc */}
            {isCreateJobOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white rounded-lg p-6 border border-blue-500 max-h-[40rem] overflow-y-auto w-full md:w-2/3 lg:w-1/2">
                        {' '}
                        {/* Tăng chiều cao lên gấp đôi và thêm viền */}
                        <CreateJob
                            onClose={handleCreateJobClose}
                            companyId={user?.companyId || ''} // Truyền companyId, đảm bảo không undefined
                        />
                    </div>
                </div>
            )}

            {/* Hiển thị modal cho form cập nhật công việc */}
            {selectedJobId && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white rounded-lg p-6 border border-blue-500 max-h-[40rem] overflow-y-auto w-full md:w-2/3 lg:w-1/2">
                        {' '}
                        {/* Tăng chiều cao lên gấp đôi và thêm viền */}
                        <UpdateJob
                            job={data?.getMaintainJobsByCompany.find(
                                (job: any) => job.id === selectedJobId
                            )}
                            onClose={handleCloseUpdate}
                        />
                    </div>
                </div>
            )}
        </div>
    )
}

export default ListJob
