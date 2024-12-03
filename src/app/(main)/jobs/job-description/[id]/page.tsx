'use client'

import { useQuery } from '@apollo/client'
import { GET_JOB_BY_ID } from '#/shared/graphql/queries'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useAuth } from '#/shared/hook/use-auth'
import { APPLY_JOB } from '#/shared/graphql/queries/application-queries'
import { useMutation } from '@apollo/client'
import { notification, Modal, Upload, Button } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
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
            notification.success({ message: 'Ứng tuyển thành công.' })
        } else {
            notification.error({ message: 'Bạn đã ứng tuyển rồi.' })
        }

        setIsModalOpen(false)
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

    return (
        <div className="bg-gray-100 p-4">
            <div className="text-sm text-green-600 mb-4">
                <Link href={'/'}> Trang chủ</Link> &gt; Tìm việc làm {job?.title} &gt;
                Tuyển {job?.title}

            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
                <h1 className="text-3xl font-bold mb-2">{job?.title}</h1>
                <div className="flex items-center text-gray-600 mb-4">
                    <span className="mr-4">
                        Mức lương:{' '}
                        <strong>
                            {job?.salary ? job.salary.toLocaleString('vi-VN') : 'Thỏa thuận'}{' '}
                            VND
                        </strong>
                    </span>
                    <span className="mr-4">
                        Địa điểm: <strong>{job?.location?.city || 'Không rõ'}</strong>
                    </span>
                    <span>
                        Kinh nghiệm: <strong>{job?.experience || 'Không yêu cầu'}</strong>{' '}
                        {job?.experience ? 'Năm' : ''}
                    </span>
                </div>
                <div className="text-gray-500 mb-4">
                    Hạn nộp hồ sơ:{' '}
                    <strong>{new Date(job?.deadline).toLocaleDateString()}</strong>
                </div>
                <div className="flex space-x-4">
                    <Button
                        type="primary"
                        onClick={() => setIsModalOpen(true)}
                        className="bg-green-600 text-white py-2 px-6 rounded-full hover:bg-green-700"
                    >
                        Ứng tuyển ngay
                    </Button>
                    <button className="border border-green-600 text-green-600 py-2 px-6 rounded-full hover:bg-gray-200">
                        Lưu tin
                    </button>
                </div>
            </div>
            <div className="grid grid-cols-3 gap-6">
                <div className="col-span-2 bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold mb-4">Chi tiết tin tuyển dụng</h2>
                    <div className="text-gray-600 mb-4" dangerouslySetInnerHTML={{ __html: job?.description }} />
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <div className="text-center">
                        <Image
                            src={job?.company?.logoUrl || '/default-logo.png'}
                            alt="Company Logo"
                            className="w-16 h-16 mx-auto mb-4"
                            width={64}
                            height={64}
                        />
                        <h3 className="text-lg font-bold">{job?.company?.name}</h3>
                    </div>
                    <ul className="list-none text-gray-600 mt-4">
                        <li>
                            <strong>Quy mô:</strong> {job?.company?.size || 'Không rõ'}
                        </li>
                        <li>
                            <strong>Lĩnh vực:</strong> {job?.company?.field || 'Không rõ'}
                        </li>
                        <li>
                            <strong>Địa điểm:</strong> {job?.location?.address || 'Không rõ'}
                        </li>
                    </ul>
                    <a
                        href={`/company/${job?.company?._id}`}
                        className="text-green-600 hover:underline block mt-4 text-center"
                    >
                        Xem trang công ty
                    </a>
                </div>
            </div>
            <div className="grid grid-cols-3 gap-6 mt-6">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h3 className="text-xl font-bold">Thông tin chung</h3>
                    <ul className="list-none text-gray-600 mt-4">
                        <li>
                            <strong>Kinh nghiệm:</strong> {job?.experience || 'Không rõ'}{' '}
                            <span>{job?.experience ? 'Năm' : ''}</span>
                        </li>
                        <li>
                            <strong>Số lượng tuyển:</strong> {job?.headcount || 'Không rõ'}{' '}
                            <span>{job?.headcount ? 'Người' : ''}</span>
                        </li>
                        <li>
                            <strong>Hình thức làm việc:</strong>{' '}
                            {job?.jobType?.type || 'Không rõ'}
                        </li>
                    </ul>
                </div>
            </div>
            <Modal
                title="Ứng tuyển"
                open={isModalOpen}
                onOk={handleApply}
                onCancel={() => setIsModalOpen(false)}
                width="80%"
                bodyStyle={{ padding: '20px' }}
            >
                {cvList.length === 0 ? (
                    <p className="text-gray-500 italic">Không có CV nào để hiển thị.</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
                        {cvList.map((cv) => (
                            <div
                                key={cv}
                                className={`relative group cursor-pointer ${selectedCvLink === cv ? 'border-4 border-green-600' : 'border'
                                    } rounded-lg overflow-hidden transition duration-300 hover:shadow-lg`}
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
                    <p className="mt-4 text-green-600 text-lg">
                        Đã chọn:{' '}
                        {selectedCvLink.substring(selectedCvLink.indexOf('/uploads'))}
                    </p>
                )}
            </Modal>
        </div>
    )
}

export default JobDescription
