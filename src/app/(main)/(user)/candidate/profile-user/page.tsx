'use client'

import { InfoCandidate } from './info-candidate'
import { useAuth } from '#/shared/hook/use-auth'
import { useMutation } from '@apollo/client'
import { notification } from 'antd'
import { APPLY_JOB } from '#/shared/graphql/queries/application-queries'

const ProfileUser = () => {
  const { user } = useAuth()

  const [createApplication] = useMutation(APPLY_JOB)

  const convertCVToText = async () => {
    try {
      const fileName = '/uploads/[candidate@example.com]-cyber.pdf'
      const jobId = '670f4f0c7f313ec55c258006'
      const application = {
        jobId,
        user: user?.candidateId,
        cvUrl: fileName,
      }

      const { data } = await createApplication({ variables: { application } })

      if (data?.createApplication) {
        notification.success({
          message: 'Thành công',
          description: 'Bạn đã nộp đơn thành công!',
        })
      } else {
        notification.error({
          message: 'Thất bại',
          description: 'Bạn đã apply rồi!',
        })
      }
    } catch (error) {
      console.error('Error applying for job:', error)
      notification.error({
        message: 'Thất bại',
        description: 'Có lỗi xảy ra, vui lòng thử lại!',
      })
    }
  }

  return (
    <div className="w-4/6">
      <div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => convertCVToText()}
        >
          Submit
        </button>
      </div>
      <InfoCandidate />
    </div>
  )
}

export default ProfileUser
