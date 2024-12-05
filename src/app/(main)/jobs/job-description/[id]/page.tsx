'use client'

import { useQuery } from '@apollo/client'
import { GET_JOB_BY_ID } from '#/shared/graphql/queries'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useAuth } from '#/shared/hook/use-auth'
import { APPLY_JOB } from '#/shared/graphql/queries/application-queries'
import { useMutation } from '@apollo/client'
import {
    notification,
    Modal,
    Button,
    Descriptions,
    Tag,
    Tooltip,
    Spin
} from 'antd'
import {
    CalendarOutlined,
    EnvironmentOutlined,
    DollarOutlined,
    ExperimentOutlined,
    SaveOutlined,
    SendOutlined
} from '@ant-design/icons'
import axios from 'axios'
import { PDFViewerWrapper } from '#/app/(main)/(user)/candidate/cv-user/PDFViewerWrapper'
import Image from 'next/image'

const JobDescription = ({ params }: { params: { id: string } }) => {
    const { user } = useAuth()
    const [cvList, setCvList] = useState<string[]>([])
    const { data, loading, error } = useQuery(GET_JOB_BY_ID, {
        variables: { jobId: params.id },
        skip: !params.id,
    })

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedCvLink, setSelectedCvLink] = useState<string | null>(null)

    const [createApplication] = useMutation(APPLY_JOB)

    const job = data?.getJobById

    const handleApply = async () => {
        if (!user) {
            notification.error({
                message: 'Vui lòng đăng nhập ứng viên để ứng tuyển.',
            })
            return
        }
        if (!selectedCvLink) {
            notification.error({ message: 'Vui lòng chọn file CV.' })
            return
        }

        try {
            const { data: apply } = await createApplication({
                variables: {
                    application: {
                        candidateProfileId: user?.candidateId,
                        jobId: job?.id,
                        selectedCvLink: selectedCvLink.substring(
                            selectedCvLink.indexOf('/uploads')
                        ),
                    },
                },
            })
            if (apply?.createApplication) {
                notification.success({
                    message: 'Ứng tuyển thành công.',
                    description: 'Hồ sơ của bạn đã được gửi đi.'
                })
                setIsModalOpen(false)
            } else {
                notification.warning({
                    message: 'Ứng tuyển không thành công',
                    description: 'Bạn có thể đã ứng tuyển công việc này trước đó.'
                })
            }
        } catch (error) {
            notification.error({
                message: 'Lỗi',
                description: 'Đã có lỗi xảy ra trong quá trình ứng tuyển.'
            })
        }
    }

    useEffect(() => {
        if (user?.email) {
            fetchCvList()
        }
    }, [user?.email])

    const fetchCvList = async () => {
        try {
            const response = await axios.get(
                `http://localhost:5000/rest/cv-list?email=${user?.email}`
            )
            setCvList(response.data.cvFiles || [])
        } catch (error) {
            console.error('Lỗi khi lấy danh sách CV:', error)
            notification.error({
                message: 'Lấy danh sách CV thất bại',
                description: 'Đã có lỗi xảy ra khi lấy danh sách CV!',
            })
        }
    }

    if (loading) return (
        <div className="flex justify-center items-center min-h-screen">
            <Spin size="large" />
        </div>
    )

    if (error) return (
        <div className="text-center text-red-500 p-8">
            Đã có lỗi xảy ra khi tải thông tin công việc
        </div>
    )

    return (
        <div className="bg-gray-50 min-h-screen p-6">
            <div className="container mx-auto">
                {/* Breadcrumb */}
                <div className="text-sm text-gray-500 mb-4">
                    <Link href="/" className="hover:text-green-600 transition">
                        Trang chủ
                    </Link>{' '}
                    / Tìm việc làm{' '}
                    <span className="text-green-600">{job?.title}</span>
                </div>

                {/* Job Header */}
                <div className="bg-white rounded-xl shadow-md p-6 mb-6">
                    <div className="flex justify-between items-start">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-800 mb-3">
                                {job?.title}
                            </h1>
                            <div className="flex items-center space-x-4 text-gray-600 mb-4">
                                <Tooltip title="Mức lương">
                                    <div className="flex items-center">
                                        <DollarOutlined className="mr-2 text-green-600" />
                                        <span>
                                            {job?.salary
                                                ? `${job.salary.toLocaleString('vi-VN')} VND`
                                                : 'Thỏa thuận'}
                                        </span>
                                    </div>
                                </Tooltip>
                                <Tooltip title="Địa điểm">
                                    <div className="flex items-center">
                                        <EnvironmentOutlined className="mr-2 text-blue-600" />
                                        <span>{job?.location?.city || 'Không rõ'}</span>
                                    </div>
                                </Tooltip>
                                <Tooltip title="Kinh nghiệm">
                                    <div className="flex items-center">
                                        <ExperimentOutlined className="mr-2 text-purple-600" />
                                        <span>
                                            {job?.experience ? `${job.experience} Năm` : 'Không yêu cầu'}
                                        </span>
                                    </div>
                                </Tooltip>
                            </div>
                        </div>
                        <div className="flex space-x-3">
                            <Button
                                type="primary"
                                icon={<SendOutlined />}
                                onClick={() => setIsModalOpen(true)}
                                className="bg-green-600 hover:bg-green-700"
                            >
                                Ứng tuyển ngay
                            </Button>
                        </div>
                    </div>
                    <div className="mt-4">
                        <Tooltip title="Hạn nộp hồ sơ">
                            <Tag icon={<CalendarOutlined />} color="volcano">
                                Hạn nộp: {new Date(job?.deadline).toLocaleDateString()}
                            </Tag>
                        </Tooltip>
                    </div>
                </div>

                {/* Job Details Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Job Description Column */}
                    <div className="lg:col-span-2 bg-white rounded-xl shadow-md p-6">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                            Chi tiết tin tuyển dụng
                        </h2>
                        <div
                            className="text-gray-600 leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: job?.description }}
                        />
                    </div>

                    {/* Company Information Column */}
                    <div className="bg-white rounded-xl shadow-md p-6">
                        <div className="text-center mb-6">
                            <Image
                                src={job?.company?.logoUrl || '/default-logo.png'}
                                alt="Company Logo"
                                className="w-24 h-24 mx-auto mb-4 object-contain rounded-full"
                                width={96}
                                height={96}
                            />
                            <h3 className="text-xl font-bold text-gray-800">
                                {job?.company?.name}
                            </h3>
                        </div>

                        <Descriptions column={1} size="small">
                            <Descriptions.Item label="Quy mô">
                                {job?.company?.size || 'Không rõ'}
                            </Descriptions.Item>
                            <Descriptions.Item label="Lĩnh vực">
                                {job?.company?.field || 'Không rõ'}
                            </Descriptions.Item>
                            <Descriptions.Item label="Địa điểm">
                                {job?.location?.address || 'Không rõ'}
                            </Descriptions.Item>
                        </Descriptions>

                        <Link
                            href={`/companies/${job?.companyId}`}
                            className="block text-center mt-4 text-green-600 hover:underline"
                        >
                            Xem trang công ty
                        </Link>
                    </div>
                </div>

                {/* Additional Job Information */}
                <div className="bg-white rounded-xl shadow-md p-6 mt-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">
                        Thông tin chung
                    </h3>
                    <Descriptions column={3} size="small">
                        <Descriptions.Item label="Kinh nghiệm">
                            {job?.experience ? `${job.experience} Năm` : 'Không rõ'}
                        </Descriptions.Item>
                        <Descriptions.Item label="Số lượng tuyển">
                            {job?.headcount ? `${job.headcount} Người` : 'Không rõ'}
                        </Descriptions.Item>
                        <Descriptions.Item label="Hình thức làm việc">
                            {job?.jobType?.type || 'Không rõ'}
                        </Descriptions.Item>
                    </Descriptions>
                </div>

                {/* CV Selection Modal */}
                <Modal
                    title="Chọn CV để ứng tuyển"
                    open={isModalOpen}
                    onOk={handleApply}
                    onCancel={() => setIsModalOpen(false)}
                    width="80%"
                    okText="Ứng tuyển"
                    cancelText="Hủy"
                >
                    {cvList.length === 0 ? (
                        <div className="text-center text-gray-500 p-8">
                            Bạn chưa tải lên CV nào. Vui lòng tải CV trước khi ứng tuyển.
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
                            {cvList.map((cv) => (
                                <div
                                    key={cv}
                                    className={`
                                        relative group cursor-pointer 
                                        ${selectedCvLink === cv
                                            ? 'border-4 border-green-600'
                                            : 'border border-gray-300'}
                                        rounded-lg overflow-hidden 
                                        transition duration-300 
                                        hover:shadow-lg
                                    `}
                                    onClick={() => setSelectedCvLink(cv)}
                                >
                                    <div className="w-full h-96">
                                        <PDFViewerWrapper fileUrl={cv} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                    {selectedCvLink && (
                        <div className="mt-4 text-center">
                            <Tag color="green">
                                Đã chọn: {selectedCvLink.substring(selectedCvLink.indexOf('/uploads'))}
                            </Tag>
                        </div>
                    )}
                </Modal>
            </div>
        </div>
    )
}

export default JobDescription