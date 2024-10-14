'use client'

import { GET_APPLICATION_BY_CANDIDATE } from '#/shared/graphql/queries/application-queries'
import { useAuth } from '#/shared/hook/use-auth'
import { E_ApplicationStatus, I_Application } from '#/shared/typescript'
import { upperFirstAndReplaceChar } from '#/shared/utils'
import { useQuery } from '@apollo/client'
import { Image, Select, Spin } from 'antd'
import dayjs from 'dayjs'

const ApplicationUser = () => {
  const { user } = useAuth()
  const { data, loading } = useQuery(GET_APPLICATION_BY_CANDIDATE, {
    variables: {
      candidateProfileId: user?.candidateId,
    },
  })

  return (
    <div className="w-4/6 bg-white p-4 rounded-md">
      <div className="flex justify-between">
        <h1 className="font-bold text-lg">Việc làm đã ứng tuyển</h1>
        <Select
          className="w-1/3"
          placeholder="Chọn trạng thái"
          options={Object.keys(E_ApplicationStatus).map((key) => ({
            label: upperFirstAndReplaceChar(
              E_ApplicationStatus[key as keyof typeof E_ApplicationStatus]
            ),
            value: key,
          }))}
        />
      </div>
      <div>
        {loading ? (
          <Spin />
        ) : (
          <div>
            {data?.getApplicationByCandidate.map(
              (application: I_Application) => (
                <div
                  key={application._id}
                  className="border-b border-gray-200 p-4 flex items-center justify-start gap-5"
                >
                  <Image
                    src={application?.job?.company?.name}
                    width={80}
                    height={80}
                    fallback={`https://ui-avatars.com/api/?name=${application?.job?.company?.name}`}
                    alt="Company Logo"
                    preview={false}
                    className="border-2 border-gray-200 shadow-sm object-cover"
                  />
                  <div className="flex flex-col gap-1">
                    <p className="font-bold">{application?.job?.title}</p>
                    <p className="text-c-grayPlus text-sm">
                      {application?.job?.company?.name}
                    </p>
                    <p className="">
                      Thời gian ứng tuyển:{' '}
                      {dayjs(application?.appliedAt).format('DD/MM/YYYY HH:mm')}
                    </p>
                  </div>
                </div>
              )
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default ApplicationUser
