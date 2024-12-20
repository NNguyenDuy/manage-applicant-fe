import { useMutation } from '@apollo/client'
import { Icons } from '#/icons'
import { UPDATE_CANDIDATE_PROFILE } from '#/shared/graphql/queries'
import { useAuth } from '#/shared/hook/use-auth'
import { useState, useEffect } from 'react'
import { Modal, notification, Upload, Button } from 'antd'
import { ListSkill } from './list-skill'
import axios from 'axios'
import { PDFViewerWrapper } from './PDFViewerWrapper'
import type { RcFile } from 'antd/lib/upload/interface'

export const ListCV: React.FC = () => {
    const { user, refetchUser } = useAuth()
    const [updateCandidateProfile] = useMutation(UPDATE_CANDIDATE_PROFILE)
    const [loading, setLoading] = useState(false)
    const [cvList, setCvList] = useState<string[]>([])
    const [selectedPdf, setSelectedPdf] = useState<string | null>(null)

    useEffect(() => {
        if (user?.email) {
            fetchCvList()
        }
    }, [user?.email])

    const fetchCvList = async () => {
        try {
            const response = await axios.get(
                `http://localhost:5000/rest/cv-list?email=${user?.email}`
            )
            setCvList(response.data.cvFiles || [])
        } catch (error) {
            console.error('Lỗi khi lấy danh sách CV:', error)
            notification.error({
                message: 'Lấy danh sách CV thất bại',
                description: 'Đã có lỗi xảy ra khi lấy danh sách CV!',
            })
        }
    }

    const handlePdfClick = (cv: string) => {
        setSelectedPdf(cv)
    }

    const handleClosePdf = () => {
        setSelectedPdf(null)
    }

    const handleUpdateProfile = async (cvUrl: string[]) => {
        const filteredCvList = cvUrl
            .filter((cv) => cv.includes('/uploads'))
            .map((cv) => cv.substring(cv.indexOf('/uploads')))
        try {
            await updateCandidateProfile({
                variables: {
                    updateCandidateProfileId: user?.candidateId,
                    resume: {
                        cvLinks: filteredCvList,
                        skills: user?.candidate?.resume?.skills,
                    },
                },
            })

            await refetchUser()
            await fetchCvList()

            notification.success({
                message: 'Cập nhật thành công',
                description: 'CV đã được cập nhật thành công!',
            })
        } catch (error) {
            console.error('Error updating profile:', error)
            notification.error({
                message: 'Cập nhật thất bại',
                description: 'Đã có lỗi xảy ra khi cập nhật CV!',
            })
        } finally {
            setLoading(false)
        }
    }

    const handleDeleteCV = async (cv: string) => {
        Modal.confirm({
            title: 'Xác nhận xóa CV',
            content: 'Bạn có chắc chắn muốn xóa CV này không?',
            okText: 'Xóa',
            cancelText: 'Hủy',
            onOk: async () => {
                try {
                    await axios.delete(`http://localhost:5000/rest?file=${cv}`)
                    await handleUpdateProfile(cvList.filter((item) => item !== cv))
                } catch (error) {
                    console.error('Error deleting CV:', error)
                    notification.error({
                        message: 'Xóa thất bại',
                        description: 'Đã có lỗi xảy ra khi xóa CV!',
                    })
                }
            },
        })
    }

    const handleUploadCV = async (file: RcFile) => {
        if (file.type !== 'application/pdf') {
            notification.error({
                message: 'Upload thất bại',
                description: 'Chỉ cho phép tải lên file PDF!',
            })
            return false
        }

        setLoading(true)
        try {
            const formData = new FormData()
            formData.append('file', file)
            const response = await axios.post(
                `http://localhost:5000/rest/?userEmail=${encodeURIComponent(
                    user?.email || ''
                )}`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            )

            const newCvUrl = response.data.cvUrl
            await handleUpdateProfile([...cvList, newCvUrl])

            notification.success({
                message: 'Upload thành công',
                description: 'CV đã được tải lên thành công!',
            })
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error(
                    'Error uploading CV:',
                    error.response?.data || error.message
                )
                notification.error({
                    message: 'Upload thất bại',
                    description:
                        error.response?.data?.error || 'Đã có lỗi xảy ra khi upload CV!',
                })
            } else {
                console.error('Unexpected error:', error)
                notification.error({
                    message: 'Upload thất bại',
                    description: 'Đã có lỗi không xác định xảy ra!',
                })
            }
        } finally {
            setLoading(false)
        }

        return false
    }

    return (
        <div className="flex flex-col gap-5">
            <ListSkill />
            <div className="flex flex-col gap-4 w-full bg-c-white p-5 rounded-md">
                <div className="flex justify-between">
                    <h1 className="font-semibold text-xl">CV đã upload trên JobCV</h1>
                    <Upload
                        accept=".pdf"
                        beforeUpload={handleUploadCV}
                        showUploadList={false}
                    >
                        <Button
                            className="select-none cursor-pointer text-sm items-center gap-1 rounded-3xl p-2 px-3 bg-c-green text-white"
                            icon={<Icons.Upload />}
                            loading={loading}
                        >
                            Upload
                        </Button>
                    </Upload>
                </div>
                <div className="flex flex-col gap-3">
                    <h2 className="font-medium text-gray-700">Danh sách CV</h2>
                    {cvList.length === 0 ? (
                        <p className="text-gray-500 italic">Không có CV nào để hiển thị.</p>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {cvList.map((cv) => (
                                <div key={cv} className="relative group">
                                    <div
                                        className="border rounded-lg shadow-md z-10 p-2 w-full h-72 overflow-hidden cursor-pointer transition duration-300 hover:shadow-lg relative"
                                        onClick={() => handlePdfClick(cv)}
                                    >
                                        <PDFViewerWrapper fileUrl={cv} />
                                        <div className="absolute inset-0 z-10 bg-c-gray opacity-0 group-hover:opacity-70 transition-opacity duration-300"></div>
                                        <Icons.FiEye
                                            className="absolute top-1/2 left-1/2 z-20 opacity-0 group-hover:opacity-70 transform -translate-x-1/2 -translate-y-1/2 text-black duration-300"
                                            size={30}
                                        />
                                        <Icons.FileDelete
                                            className="absolute top-0 hover:scale-110 right-3 z-20 opacity-0 group-hover:opacity-70 transform text-black duration-300"
                                            size={30}
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                handleDeleteCV(cv)
                                            }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <Modal
                    visible={!!selectedPdf}
                    onCancel={handleClosePdf}
                    footer={null}
                    width="80%"
                >
                    {selectedPdf && <PDFViewerWrapper fileUrl={selectedPdf} />}
                </Modal>
            </div>
        </div>
    )
}
