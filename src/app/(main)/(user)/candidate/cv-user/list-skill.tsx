import { useMutation } from '@apollo/client'
import { Icons } from '#/icons'
import { useAuth } from '#/shared/hook/use-auth'
import { UPDATE_CANDIDATE_PROFILE } from '#/shared/graphql/queries'
import { useState } from 'react'
import { Modal, Input, notification } from 'antd'

export const ListSkill = () => {
  const { user, refetchUser } = useAuth()

  const [updateCandidateProfile] = useMutation(UPDATE_CANDIDATE_PROFILE)

  const [loading, setLoading] = useState(false)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [newSkill, setNewSkill] = useState('')
  const [isConfirmVisible, setIsConfirmVisible] = useState(false)
  const [skillToRemove, setSkillToRemove] = useState('')

  const handleUpdateProfile = async (skills: string[]) => {
    setLoading(true)
    try {
      await updateCandidateProfile({
        variables: {
          updateCandidateProfileId: user?.profileId,
          skills,
        },
      })

      await refetchUser()

      notification.success({
        message: 'Cập nhật thành công',
        description: 'Kỹ năng đã được cập nhật thành công!',
      })
    } catch (error) {
      console.error('Error updating profile:', error)
      notification.error({
        message: 'Cập nhật thất bại',
        description: 'Đã có lỗi xảy ra khi cập nhật kỹ năng!',
      })
    } finally {
      setLoading(false)
    }
  }

  const handleAddSkill = () => {
    const updatedSkills = [...(user?.candidateProfile?.skills || []), newSkill]
    handleUpdateProfile(updatedSkills)

    setIsModalVisible(false)
    setNewSkill('')
  }

  const handleRemoveSkill = () => {
    if (!skillToRemove) return

    const updatedSkills =
      user?.candidateProfile?.skills?.filter(
        (skill) => skill !== skillToRemove
      ) || []
    handleUpdateProfile(updatedSkills)

    setIsConfirmVisible(false)
  }

  const showConfirm = (skill: string) => {
    setSkillToRemove(skill)
    setIsConfirmVisible(true)
  }

  return (
    <div className="flex flex-col gap-2 w-full bg-c-white p-5 rounded-md">
      <div className="flex justify-between">
        <h1 className="font-semibold text-xl">Kĩ năng</h1>
        <button
          className="flex text-sm items-center gap-1 rounded-3xl p-2 px-3 bg-c-green text-white"
          onClick={() => setIsModalVisible(true)}
        >
          <Icons.Plus />
          <span>Thêm kĩ năng</span>
        </button>
      </div>
      <div className="flex flex-col gap-3">
        <h1 className="font-medium text-slate-700 opacity-90">
          Danh sách kĩ năng
        </h1>
        <ul className="ml-2 grid grid-cols-4 gap-2">
          {user?.candidateProfile?.skills?.map((skill) => (
            <li
              className="rounded-3xl group cursor-pointer bg-c-gray p-1 px-4 flex items-center justify-center gap-2"
              key={skill}
              onClick={() => showConfirm(skill)}
            >
              <span>{skill}</span>
              <Icons.Close
                className="bg-[#e4e4e4] rounded-full text-slate-700 group-hover:bg-c-red group-hover:text-white duration-300 cursor-pointer"
                size={22}
              />
            </li>
          ))}
        </ul>
      </div>
      <Modal
        title="Thêm Kỹ Năng Mới"
        visible={isModalVisible}
        onOk={handleAddSkill}
        onCancel={() => setIsModalVisible(false)}
        confirmLoading={loading}
      >
        <Input
          placeholder="Nhập kỹ năng mới"
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
        />
      </Modal>

      <Modal
        title="Xác Nhận Xóa"
        visible={isConfirmVisible}
        onOk={handleRemoveSkill}
        onCancel={() => setIsConfirmVisible(false)}
        okText="Xóa"
        cancelText="Hủy"
      >
        <p>{`Bạn có chắc chắn muốn xóa kỹ năng "${skillToRemove}" không?`}</p>
      </Modal>
    </div>
  )
}
