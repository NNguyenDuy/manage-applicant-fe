'use client'

import React, { useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { Table, Button, Modal, Form, Input, message } from 'antd'
import { GET_ALL_COMPANIES } from '#/shared/graphql/queries/company-queries'
import { CREATE_COMPANY, DELETE_COMPANY } from '#/shared/graphql/mutations/company-mutations'
import { useAuth } from '#/shared/hook/use-auth'

const CompanyList = () => {
  const { user } = useAuth()
  console.log(user?.company?.location.address)
  const [form] = Form.useForm()
  const [isModalVisible, setIsModalVisible] = useState(false)
  const { data, loading, refetch } = useQuery(GET_ALL_COMPANIES)
  const [createCompany] = useMutation(CREATE_COMPANY)
  const [deleteCompany] = useMutation(DELETE_COMPANY)

  const columns = [
    {
      title: 'Tên công ty',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Địa điểm',
      dataIndex: ['location', 'address'],
      key: 'location',
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_, record) => (
        <Button onClick={() => handleDelete(record._id)}>Xóa</Button>
      ),
    },
  ]

  const handleAdd = () => {
    setIsModalVisible(true)
  }

  const handleOk = async () => {
    try {
      const values = await form.validateFields()
      await createCompany({
        variables: {
          name: values.name,
          ownerId: "dummy-owner-id", // Replace with actual owner ID
          locationId: values.locationId,
        },
      })
      message.success('Thêm công ty thành công')
      setIsModalVisible(false)
      form.resetFields()
      refetch()
    } catch (error) {
      console.error('Error creating company:', error)
      message.error('Có lỗi xảy ra khi thêm công ty')
    }
  }

  const handleCancel = () => {
    setIsModalVisible(false)
    form.resetFields()
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteCompany({ variables: { id } })
      message.success('Xóa công ty thành công')
      refetch()
    } catch (error) {
      console.error('Error deleting company:', error)
      message.error('Có lỗi xảy ra khi xóa công ty')
    }
  }

  if (loading) return <div>Đang tải...</div>

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Danh sách công ty</h2>
        <Button onClick={handleAdd} type="primary">
          Thêm công ty
        </Button>
      </div>
      <Table columns={columns} dataSource={data?.getAllCompanies} rowKey="_id" />
      <Modal
        title="Thêm công ty mới"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Tên công ty"
            rules={[{ required: true, message: 'Vui lòng nhập tên công ty' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="locationId" label="ID Địa điểm">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default CompanyList