'use client'

import React, { useState, useEffect } from 'react'
import { Form, Input, Button, message, Select } from 'antd'
import { useAuth } from '#/shared/hook/use-auth'
import { useMutation, useQuery } from '@apollo/client'
import { UPDATE_COMPANY } from '#/shared/graphql/mutations/company-mutations'
import { GET_COMPANY } from '#/shared/graphql/queries/company-queries'
import { GET_LOCATIONS } from '#/shared/graphql/queries/location-queries' // Bạn cần tạo query này

const { Option } = Select

const ManageInfoCompanies = () => {
  const [form] = Form.useForm()
  const { user } = useAuth()

  const { data: companyData, loading: companyLoading } = useQuery(GET_COMPANY, {
    variables: { id: user?.company?._id },
    skip: !user?.company?._id,
  })

  const { data: locationsData } = useQuery(GET_LOCATIONS)

  const [updateCompany, { loading: updateLoading }] = useMutation(UPDATE_COMPANY)

  useEffect(() => {
    if (companyData?.getCompany) {
      form.setFieldsValue(companyData.getCompany)
    }
  }, [companyData, form])

  const onFinish = async (values) => {
    try {
      const { data } = await updateCompany({
        variables: {
          id: user?.company?._id,
          ...values,
        },
      })
      if (data?.updateCompany) {
        message.success('Cập nhật thông tin công ty thành công')
      }
    } catch (error) {
      message.error('Có lỗi xảy ra khi cập nhật thông tin công ty')
    }
  }

  if (companyLoading) return <div>Đang tải...</div>

  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-6">Cập nhật thông tin công ty</h1>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item name="name" label="Tên công ty" rules={[{ required: true, message: 'Vui lòng nhập tên công ty' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="locationId" label="Địa điểm">
          <Select placeholder="Chọn địa điểm">
            {locationsData?.getAllLocations.map((location) => (
              <Option key={location._id} value={location._id}>
                {location.address}, {location.city}, {location.country}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={updateLoading}>
            Cập nhật
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default ManageInfoCompanies