'use client'

import React, { useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { GET_APPLICATION_BY_ID } from '#/shared/graphql/queries/application-queries'
import { UPDATE_APPLICATION_STATUS } from '#/shared/graphql/mutations/application-mutations'
import { Modal, Select } from 'antd'
import { E_EvaluationAI } from '#/shared/typescript'
import { PDFViewerWrapper } from '#/app/(main)/(user)/candidate/cv-user/PDFViewerWrapper'

const ListApplicated = ({ params }: { params: { id: string } }) => {
    const [selectedEvaluationAI, setSelectedEvaluationAI] =
        useState<string>('all')
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedPdf, setSelectedPdf] = useState<string | null>(null)

    const { data, loading, error, refetch } = useQuery(GET_APPLICATION_BY_ID, {
        variables: { jobId: params.id },
        skip: !params.id,
    })

    const handlePdfClick = (cv: string) => {
        setSelectedPdf('http://localhost:5000' + cv)
        setIsModalOpen(true)
    }

    const handleClosePdf = () => {
        setIsModalOpen(false)
        setSelectedPdf(null)
    }

    const [updateApplicationStatus] = useMutation(UPDATE_APPLICATION_STATUS)

    const handleStatusUpdate = async (
        applicationId: string,
        newStatus: string
    ) => {
        try {
            await updateApplicationStatus({
                variables: {
                    updateApplicationStatusId: applicationId,
                    newStatus: newStatus,
                },
            })

            refetch()
        } catch (err) {
            console.error('Lỗi cập nhật trạng thái:', err)
        }
    }

    const translateStatus = (status: string) => {
        switch (status) {
            case 'submitted':
                return 'Đã nộp'
            case 'under_review':
                return 'Đang xem xét'
            case 'accepted':
                return 'Được chấp nhận'
            case 'rejected':
                return 'Bị từ chối'
            default:
                return 'Không rõ'
        }
    }

    const translateEvalue = (evalue: string) => {
        switch (evalue) {
            case 'none':
                return 'Chưa đánh giá'
            case 'priority':
                return 'Ưu tiên'
            case 'potential':
                return 'Tiềm năng'
            case 'suitable':
                return 'Phù hợp'
            case 'not_suitable':
                return 'Không phù hợp'
            default:
                return 'Không rõ'
        }
    }

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error: {error.message}</p>

    const evaluationOptions = [
        { label: 'Tất cả', value: 'all' },
        ...Object.values(E_EvaluationAI).map((status) => ({
            label: translateEvalue(status),
            value: status,
        })),
    ]

    const filteredApplications =
        selectedEvaluationAI === 'all'
            ? data?.getApplicationsByJob
            : data?.getApplicationsByJob.filter(
                (application: any) =>
                    application.evaluationAI === selectedEvaluationAI
            )

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between">
                <h1 className="text-3xl font-bold mb-6 text-center">
                    Danh sách ứng tuyển của công việc
                </h1>
                <Select
                    className="w-40"
                    placeholder="Chọn trạng thái"
                    options={evaluationOptions}
                    onChange={(value) => setSelectedEvaluationAI(value)}
                />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredApplications?.map((application: any) => (
                    <div
                        key={application._id}
                        className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer"
                    >
                        <h2 className="text-xl font-semibold mb-2">
                            Công việc: {application.job.title}
                        </h2>
                        <p className="text-gray-600 mb-2">
                            <strong>Mô tả:</strong> {application.job.description}
                        </p>
                        <p className="text-gray-600 mb-2">
                            <strong>Mức lương:</strong>{' '}
                            {application.job.salary?.toLocaleString('vi-VN')} VND
                        </p>
                        <p className="text-gray-600 mb-2">
                            <strong>Trạng thái:</strong> {translateStatus(application.status)}
                        </p>
                        <p className="text-gray-600 mb-2">
                            <strong>Ngày ứng tuyển:</strong>{' '}
                            {new Date(application.appliedAt).toLocaleDateString()}
                        </p>
                        <p className="text-gray-600 mb-2">
                            <strong>Đánh giá của AI: </strong>
                            {translateEvalue(application.evaluationAI)}
                        </p>
                        <p className="text-gray-600 mb-2">
                            <strong>CV:</strong>{' '}
                            <button
                                onClick={() => handlePdfClick(application.selectedCvLink)}
                                className="text-blue-500"
                            >
                                Xem CV
                            </button>
                        </p>

                        <div className="flex space-x-2 mt-4">
                            <button
                                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                                onClick={() => handleStatusUpdate(application._id, 'accepted')}
                            >
                                Chấp nhận
                            </button>
                            <button
                                className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700"
                                onClick={() =>
                                    handleStatusUpdate(application._id, 'under_review')
                                }
                            >
                                Đang xem xét
                            </button>
                            <button
                                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                                onClick={() => handleStatusUpdate(application._id, 'rejected')}
                            >
                                Từ chối
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <Modal
                width="80%"
                open={isModalOpen}
                onCancel={handleClosePdf}
                footer={null}
            >
                {selectedPdf && <PDFViewerWrapper fileUrl={selectedPdf} />}
            </Modal>
        </div>
    )
}

export default ListApplicated
