import { UPDATE_USER } from '#/shared/graphql/queries'
import { useAuth } from '#/shared/hook/use-auth'
import { useMutation } from '@apollo/client'
import { notification } from 'antd'
import { useState } from 'react'

export const InfoCandidate = () => {
  const { user, refetchUser } = useAuth()
  const [fullName, setFullName] = useState<string>(user?.fullName || '')
  const [updateUser] = useMutation(UPDATE_USER)

  const handleUpdateUser = async () => {
    if (!fullName) {
      notification.error({
        message: 'Vui lòng nhập họ và tên',
      })
      return
    }
    try {
      await updateUser({
        variables: {
          updateUserId: user?._id,
          fullName: fullName,
        },
      })
      await refetchUser()
      notification.success({
        message: 'Cập nhật thông tin cá nhân thành công',
      })
    } catch (error) {
      notification.error({
        message: 'Có lỗi xảy ra, vui lòng thử lại',
      })
    }
  }

  return (
    <div className="flex flex-col gap-4 w-full bg-c-white p-5 rounded-md items-start">
      <h1 className="font-bold text-lg">Cài đặt thông tin cá nhân</h1>
      <p>
        <span className="text-c-red">(*)</span> Các thông tin bắt buộc
      </p>

      <div className="flex flex-col gap-1 w-full">
        <label htmlFor="">
          Họ và tên <sub className="text-c-red">*</sub>
        </label>
        <input
          className="w-full rounded-md border-slate-300 border p-2 px-4 focus:outline-none focus:border-c-green"
          type="text"
          placeholder="Nhập họ và tên"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-1 w-full">
        <label htmlFor="">Email</label>
        <input
          className="w-full rounded-md border-slate-300 border p-2 px-4 focus:outline-none focus:border-c-green bg-slate-400 bg-opacity-10 text-slate-500"
          type="text"
          placeholder="Nhập họ và tên"
          disabled
          value={user?.email}
        />
      </div>
      <button
        className="bg-c-green text-white p-2 px-4 rounded-md"
        onClick={handleUpdateUser}
      >
        Lưu
      </button>
    </div>
  )
}
