'use client'

import { useQuery, useMutation } from '@apollo/client'
import {
  GET_ALL_USERS,
  GET_CANDIDATE_PROFILE,
  GET_COMPANY,
} from '#/shared/graphql/queries/user-queries'
import {
  CREATE_USER,
  UPDATE_USER,
  DELETE_USER,
} from '#/shared/graphql/mutations/user-mutations'
import React, { useState, useEffect } from 'react'
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Select,
  notification,
  Tooltip,
} from 'antd'
import {
  I_CandidateUserInput,
  I_UserInput,
} from '#/shared/typescript/authenticate'
import { EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons'
import client from '#/shared/graphql/apollo-client'
import { E_Role } from '#/shared/typescript/common'

const { Option } = Select

const ManagedUsers = () => {
  const [userData, setUserData] = useState<I_UserInput>({
    email: '',
    password: '',
    fullName: '',
    role: E_Role.CANDIDATE,
  })
  const [selectedUser, setSelectedUser] = useState<I_CandidateUserInput | null>(
    null
  )
  const [users, setUsers] = useState<I_UserInput[]>([])
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [isViewMode, setIsViewMode] = useState(false)
  const [currentUserId, setCurrentUserId] = useState<string | null>(null)

  const { data, loading, error, refetch } = useQuery(GET_ALL_USERS)

  const [createUser] = useMutation(CREATE_USER)
  const [updateUser] = useMutation(UPDATE_USER)
  const [deleteUser] = useMutation(DELETE_USER)

  useEffect(() => {
    if (data) {
      const filteredUsers = data.getAllUsers.filter(
        (user: I_UserInput) => user.role !== E_Role.ADMIN
      )
      setUsers(filteredUsers)
    }
  }, [data])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUserData({ ...userData, [name]: value })
  }

  const handleRoleChange = (value: E_Role) => {
    setUserData({ ...userData, role: value })
  }

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email)
  }

  const checkEmailExists = (email: string) => {
    return users.some((user) => user.email === email)
  }

  const handleCreate = async () => {
    if (!userData.fullName) {
      notification.error({ message: 'Tên không được để trống' })
      return
    }

    if (!userData.email) {
      notification.error({ message: 'Email không được để trống' })
      return
    }

    if (!userData.password) {
      notification.error({ message: 'Mật khẩu không được để trống' })
      return
    }

    if (!validateEmail(userData.email)) {
      notification.error({ message: 'Email không hợp lệ' })
      return
    }

    if (checkEmailExists(userData.email)) {
      notification.error({ message: 'Email đã tồn tại' })
      return
    }

    try {
      const { data } = await createUser({
        variables: {
          ...userData,
          role: userData.role,
        },
      })
      notification.success({ message: 'Tạo người dùng thành công' })
      setIsModalVisible(false)
      refetch()
    } catch (error: unknown) {
      if (error instanceof Error) {
        notification.error({
          message: 'Lỗi khi tạo người dùng',
          description: error.message || 'Đã có lỗi xảy ra',
        })
      }
    }
  }

  const handleUpdate = async () => {
    if (!userData.fullName) {
      notification.error({ message: 'Tên không được để trống' })
      return
    }

    if (!userData.email) {
      notification.error({ message: 'Email không được để trống' })
      return
    }

    if (!userData.password) {
      notification.error({ message: 'Mật khẩu không được để trống' })
      return
    }

    if (!validateEmail(userData.email)) {
      notification.error({ message: 'Email không hợp lệ' })
      return
    }

    if (checkEmailExists(userData.email)) {
      notification.error({ message: 'Email đã tồn tại' })
      return
    }

    try {
      await updateUser({
        variables: {
          id: currentUserId,
          ...userData,
          role: userData.role,
        },
      })
      notification.success({ message: 'Cập nhật người dùng thành công' })
      setIsModalVisible(false)
      refetch()
    } catch (error: unknown) {
      if (error instanceof Error) {
        notification.error({
          message: 'Cập nhật người dùng thất bại',
          description: error.message || 'Đã có lỗi xảy ra',
        })
      }
    }
  }

  const handleDelete = async (userId: string) => {
    Modal.confirm({
      title: 'Xác nhận xóa',
      content: 'Bạn có chắc chắn muốn xóa người dùng này?',
      onOk: async () => {
        try {
          await deleteUser({
            variables: { id: userId },
          })
          notification.success({ message: 'Xóa người dùng thành công' })
          refetch()
        } catch (error: unknown) {
          if (error instanceof Error) {
            notification.error({
              message: 'Xóa người dùng thất bại',
              description: error.message || 'Đã có lỗi xảy ra',
            })
          }
        }
      },
    })
  }

  const openModal = (user?: I_UserInput) => {
    if (user) {
      setUserData(user)
      setIsEditMode(true)
    } else {
      setUserData({
        email: '',
        password: '',
        fullName: '',
        role: E_Role.CANDIDATE,
      })
      setCurrentUserId(null)
      setIsEditMode(false)
    }
    setIsModalVisible(true)
  }

  const handleViewUser = async (user: I_UserInput) => {
    setSelectedUser(user)
    setIsViewMode(true)

    try {
      let profileData
      if (user.role === E_Role.CANDIDATE) {
        const { data } = await client.query({
          query: GET_CANDIDATE_PROFILE,
          variables: { userId: (user as any)._id },
        })
        profileData = data.getCandidateProfile
      } else if (user.role === E_Role.RECRUITER) {
        const { data } = await client.query({
          query: GET_COMPANY,
          variables: { userId: (user as any)._id },
        })
        profileData = data.getCompany
      }

      if (profileData) {
        setSelectedUser({ ...user, ...profileData })
      } else {
        throw new Error('Không tìm thấy thông tin chi tiết của người dùng')
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        // notification.error({
        //   message: 'Lỗi khi lấy thông tin người dùng',
        //   description: error.message || 'Không thể lấy dữ liệu người dùng',
        // })
      }
    }
  }

  const columns = [
    {
      title: 'Tên',
      dataIndex: 'fullName',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Vai trò',
      dataIndex: 'role',
    },
    {
      title: 'Hành động',
      render: (text: any, record: any) => (
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
          <Tooltip title="Chi tiết">
            <Button
              icon={<EyeOutlined />}
              type="default"
              onClick={() => handleViewUser(record)}
            />
          </Tooltip>
          <Tooltip title="Sửa">
            <Button
              icon={<EditOutlined />}
              type="primary"
              onClick={() => openModal(record)}
            />
          </Tooltip>
          <Tooltip title="Xóa">
            <Button
              icon={<DeleteOutlined />}
              type="primary"
              danger
              onClick={() => handleDelete(record._id)}
            />
          </Tooltip>
        </div>
      ),
    },
  ]

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold text-gray-700 mb-6 text-center">
        Quản lý người dùng
      </h1>
      <Button type="primary" onClick={() => openModal()}>
        Thêm người dùng
      </Button>
      <Table dataSource={users} columns={columns} rowKey="_id" />

      <Modal
        title={isEditMode ? 'Sửa người dùng' : 'Thêm người dùng'}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={isEditMode ? handleUpdate : handleCreate}
      >
        <Form layout="vertical">
          <Form.Item label="Họ và tên">
            <Input
              name="fullName"
              value={userData.fullName}
              onChange={handleInputChange}
            />
          </Form.Item>
          <Form.Item label="Email">
            <Input
              name="email"
              value={userData.email}
              onChange={handleInputChange}
            />
          </Form.Item>
          <Form.Item label="Mật khẩu">
            <Input.Password
              name="password"
              value={userData.password}
              onChange={handleInputChange}
            />
          </Form.Item>
          <Form.Item label="Vai trò">
            <Select value={userData.role} onChange={handleRoleChange}>
              <Option value={E_Role.CANDIDATE}>Ứng viên</Option>
              <Option value={E_Role.RECRUITER}>Nhà tuyển dụng</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>

      {selectedUser && (
        <Modal
          title="Chi tiết người dùng"
          open={isViewMode}
          onCancel={() => setIsViewMode(false)}
          footer={[
            <Button key="close" onClick={() => setIsViewMode(false)}>
              Đóng
            </Button>,
          ]}
        >
          <p>Tên: {selectedUser.fullName || 'Không có thông tin'}</p>
          <p>Email: {selectedUser.email || 'Không có thông tin'}</p>
          <p>Vai trò: {selectedUser.role || 'Không có thông tin'}</p>
          {selectedUser.role === E_Role.CANDIDATE && (
            <>
              <p>
                ID Hồ sơ ứng viên:{' '}
                {selectedUser.candidateId || 'Không có thông tin'}
              </p>
            </>
          )}
          {selectedUser.role === E_Role.RECRUITER && (
            <>
              <p>
                ID Công ty: {selectedUser.companyId || 'Không có thông tin'}
              </p>
            </>
          )}
        </Modal>
      )}
    </div>
  )
}

export default ManagedUsers
