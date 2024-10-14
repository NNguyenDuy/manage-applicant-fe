import { useMutation } from '@apollo/client'
import { Icons } from '#/icons'
import { useAuth } from '#/shared/hook/use-auth'
import { UPDATE_CANDIDATE_PROFILE } from '#/shared/graphql/queries'
import { useState } from 'react'
import { Modal, Input, Select, notification } from 'antd'
import { I_Skill } from '#/shared/typescript'

export const ListSkill = () => {
  const { user, refetchUser } = useAuth()

  const [updateCandidateProfile] = useMutation(UPDATE_CANDIDATE_PROFILE)

  const [loading, setLoading] = useState(false)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [newSkill, setNewSkill] = useState('')
  const [newExperience, setNewExperience] = useState(0)
  const [isConfirmVisible, setIsConfirmVisible] = useState(false)
  const [skillToRemove, setSkillToRemove] = useState('')

  const experienceOptions = Array.from({ length: 11 }, (_, i) => ({
    label: `${i} năm`,
    value: i,
  }))

  const handleUpdateProfile = async (skills: I_Skill[]) => {
    setLoading(true)

    try {
      await updateCandidateProfile({
        variables: {
          updateCandidateProfileId: user?.candidateProfile?._id,
          resume: {
            skills,
            cvLinks: user?.candidateProfile?.resume?.cvLinks || '',
          },
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

  console.log(user)

  const handleAddSkill = () => {
    const updatedSkills: I_Skill[] = [
      ...(user?.candidateProfile?.resume?.skills || []),
      { name: newSkill, experience: newExperience },
    ]
    handleUpdateProfile(updatedSkills)

    setIsModalVisible(false)
    setNewSkill('')
    setNewExperience(0)
  }

  const handleRemoveSkill = () => {
    if (!skillToRemove) return

    const updatedSkills: I_Skill[] =
      user?.candidateProfile?.resume?.skills?.filter(
        (skill: I_Skill) => skill?.name !== skillToRemove
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
        <ul className="ml-2 grid grid-cols-3 gap-2">
          {user?.candidate?.resume?.skills?.map((skill: I_Skill) => (
            <li
              className="rounded-3xl group cursor-pointer bg-c-gray p-1 px-4 flex items-center justify-center gap-2"
              key={skill?.name}
              onClick={() => showConfirm(skill?.name || '')}
            >
              <span>
                {skill?.name} - {skill?.experience} năm
              </span>
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
        <Select
          placeholder="Chọn số năm kinh nghiệm"
          options={experienceOptions}
          value={newExperience}
          onChange={(value) => setNewExperience(value)}
          className="mt-3 w-1/2"
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
