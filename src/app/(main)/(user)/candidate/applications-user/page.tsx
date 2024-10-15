'use client'

import { GET_APPLICATION_BY_CANDIDATE } from '#/shared/graphql/queries/application-queries'
import { useAuth } from '#/shared/hook/use-auth'
import { E_ApplicationStatus, I_Application } from '#/shared/typescript'
import { capitalizeFirstLetter, statusApply } from '#/shared/utils'
import { useQuery } from '@apollo/client'
import { Image, Modal, Select, Spin, Pagination } from 'antd'
import dayjs from 'dayjs'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { PDFViewerWrapper } from '../cv-user/PDFViewerWrapper'
import { Icons } from '#/icons'

const ApplicationUser = () => {
  const { user } = useAuth()
  const [selectedPdf, setSelectedPdf] = useState<string | null>(null)
  const [status, setStatus] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  const handlePdfClick = (cv: string) => {
    setSelectedPdf(cv)
    setIsModalOpen(true)
  }

  const handleClosePdf = () => {
    setIsModalOpen(false)
    setSelectedPdf(null)
  }

  const { data, loading, refetch } = useQuery(GET_APPLICATION_BY_CANDIDATE, {
    variables: {
      candidateProfileId: user?.candidateId,
      status: status || undefined,
      page: currentPage,
      limit: pageSize,
    },
    skip: !user?.candidateId,
  })

  useEffect(() => {
    refetch()
  }, [status, currentPage, pageSize, refetch])

  const handlePageChange = (page: number, pageSize?: number) => {
    setCurrentPage(page)
    if (pageSize) setPageSize(pageSize)
  }

  return (
    <div className="w-4/6 bg-white p-4 rounded-md">
      <div className="flex justify-between">
        <h1 className="font-bold text-xl">Việc làm đã ứng tuyển</h1>
        <Select
          className="w-1/3"
          placeholder="Chọn trạng thái"
          onChange={(value) =>
            setStatus(
              value === 'all'
                ? null
                : E_ApplicationStatus[value as keyof typeof E_ApplicationStatus]
            )
          }
          options={[
            { label: 'Tất cả', value: 'all' },
            ...Object.keys(E_ApplicationStatus).map((key) => ({
              label: capitalizeFirstLetter(
                statusApply.find(
                  (status) =>
                    status.value ===
                    E_ApplicationStatus[key as keyof typeof E_ApplicationStatus]
                )?.label || ''
              ),
              value: key,
            })),
          ]}
        />
      </div>

      <div className="mt-3">
        {loading ? (
          <Spin />
        ) : (
          <div>
            {data?.getApplicationByCandidate.items.map(
              (application: I_Application) => (
                <div
                  key={application._id}
                  className="border-b border-gray-200 p-4"
                >
                  <div className="flex items-center justify-start gap-5">
                    <Image
                      src={application?.job?.company?.name}
                      width={80}
                      height={80}
                      fallback={`https://ui-avatars.com/api/?name=${application?.job?.company?.name}`}
                      alt="Company Logo"
                      preview={false}
                      className="border-2 border-gray-200 shadow-sm object-cover"
                    />
                    <div className="flex flex-col w-full">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center justify-between">
                          <Link
                            href={''}
                            className="font-bold text-lg hover:underline"
                          >
                            {application?.job?.title}
                          </Link>
                          <p className="text-c-green font-bold text-sm flex gap-1">
                            <Icons.Money size={20} fill="green" />{' '}
                            {new Intl.NumberFormat('vi-VN', {
                              style: 'currency',
                              currency: 'VND',
                            }).format(application?.job?.salary || 0)}
                          </p>
                        </div>
                        <p className="text-c-grayPlus">
                          {application?.job?.company?.name}
                        </p>
                        <p className="text-slate-600 text-sm">
                          Thời gian ứng tuyển:{' '}
                          {dayjs(application?.appliedAt).format(
                            'DD/MM/YYYY HH:mm'
                          )}
                        </p>
                        <div className="flex justify-between">
                          <p className="text-c-grayPlus">
                            CV đã ứng tuyển:{' '}
                            <span
                              className="text-c-green underline cursor-pointer"
                              onClick={() =>
                                handlePdfClick(
                                  application?.selectedCvLink || ''
                                )
                              }
                            >
                              CV của bạn
                            </span>
                          </p>
                          <div
                            onClick={() =>
                              handlePdfClick(application?.selectedCvLink || '')
                            }
                            className="flex text-c-green bg-green-200 gap-2 items-center p-3 rounded-2xl py-1 cursor-pointer"
                          >
                            <Icons.Eye size={23} />
                            <span>Xem CV</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-c-orange text-sm mt-2">
                        <span>NTD </span>
                        {statusApply.map((status) => {
                          if (status.value === application.status) {
                            return (
                              <span key={status.value} className={``}>
                                {status.label}
                              </span>
                            )
                          }
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        )}
      </div>

      <div className="w-full flex justify-center">
        <Pagination
          className="mt-4"
          current={currentPage}
          pageSize={pageSize}
          total={data?.getApplicationByCandidate.totalItems || 0}
          onChange={handlePageChange}
        />
      </div>

      <Modal
        open={isModalOpen}
        onCancel={handleClosePdf}
        footer={null}
        width="80%"
      >
        {selectedPdf && <PDFViewerWrapper fileUrl={selectedPdf} />}
      </Modal>
    </div>
  )
}

export default ApplicationUser
