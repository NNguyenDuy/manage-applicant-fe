import React, { useState, useEffect } from 'react'
import { Form, Input, Button, notification } from 'antd'
import { useAuth } from '#/shared/hook/use-auth'
import { useMutation } from '@apollo/client'
import {
  UPDATE_USER,
  UPDATE_COMPANY,
} from '#/shared/graphql/queries/user-queries'

const ManageInfoCompanies = () => {
  const { user, refetchUser } = useAuth()
  const [updateUser] = useMutation(UPDATE_USER)
  const [updateCompany] = useMutation(UPDATE_COMPANY)

  const [recruiterInfo, setRecruiterInfo] = useState({
    fullName: '',
    email: '',
  })

  const [companyInfo, setCompanyInfo] = useState({
    name: '',
    description: '',
    size: 0,
    field: '',
    location: {
      address: '',
      city: '',
      country: '',
    },
  })

  useEffect(() => {
    if (user) {
      setRecruiterInfo({
        fullName: user.fullName || '',
        email: user.email || '',
      })

      if (user.company) {
        setCompanyInfo({
          name: user.company.name || '',
          description: user.company.description || '',
          size: user.company.size || 0,
          field: user.company.field || '',
          location: {
            address: user.company.location?.address || '',
            city: user.company.location?.city || '',
            country: user.company.location?.country || '',
          },
        })
      }
    }
  }, [user])

  const handleRecruiterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setRecruiterInfo((prev) => ({ ...prev, [name]: value }))
  }

  const handleCompanyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setCompanyInfo((prev) => ({ ...prev, [name]: value }))
  }

  const handleUpdateUser = async () => {
    if (!recruiterInfo.fullName) {
      notification.error({
        message: 'Vui lòng nhập họ và tên',
      })
      return
    }
    try {
      await updateUser({
        variables: {
          updateUserId: user?._id,
          fullName: recruiterInfo.fullName,
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

  const handleUpdateCompany = async () => {
    try {
      await updateCompany({
        variables: {
          companyId: user?.companyId,
          companyData: {
            ...companyInfo,
          },
        },
      })
      await refetchUser()
      notification.success({
        message: 'Cập nhật thông tin công ty thành công',
      })
    } catch (error) {
      notification.error({
        message: 'Có lỗi xảy ra, vui lòng thử lại',
      })
    }
  }

  return (
    <div className="w-full p-5 bg-white rounded shadow flex gap-10 justify-between">
      <div>
        <h1 className="text-2xl font-bold mb-6">Thông tin nhà tuyển dụng</h1>
        <div>
          <label className="block mb-2">Họ và tên</label>
          <Input
            name="fullName"
            value={recruiterInfo.fullName}
            onChange={handleRecruiterChange}
          />

          <label className="block mb-2 mt-4">Email</label>
          <Input name="email" value={recruiterInfo.email} disabled />
        </div>
        <Button type="primary" className="mt-4" onClick={handleUpdateUser}>
          Cập nhật thông tin nhà tuyển dụng
        </Button>
      </div>

      <div className="w-1/2">
        <h1 className="text-2xl font-bold">Thông tin công ty</h1>
        <div>
          <label className="block mb-2">Tên công ty</label>
          <Input
            name="name"
            value={companyInfo.name}
            onChange={handleCompanyChange}
          />

          <label className="block mb-2 mt-4">Mô tả</label>
          <Input
            name="description"
            value={companyInfo.description}
            onChange={handleCompanyChange}
          />

          <label className="block mb-2 mt-4">Số nhân viên</label>
          <Input
            name="size"
            value={companyInfo.size}
            onChange={handleCompanyChange}
          />

          <label className="block mb-2 mt-4">Lĩnh vực</label>
          <Input
            name="field"
            value={companyInfo.field}
            onChange={handleCompanyChange}
          />

          <label className="block mb-2 mt-4">Địa chỉ</label>
          <Input
            name="location"
            value={companyInfo.location.address}
            onChange={handleCompanyChange}
          />

          <label className="block mb-2 mt-4">Thành phố</label>
          <Input
            name="city"
            value={companyInfo.location.city}
            onChange={handleCompanyChange}
          />
        </div>
        <Button type="primary" className="mt-4" onClick={handleUpdateCompany}>
          Cập nhật thông tin công ty
        </Button>
      </div>
    </div>
  )
}

export default ManageInfoCompanies
