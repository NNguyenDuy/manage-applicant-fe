import React, { useState, FormEvent } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { UPDATE_JOB } from '#/shared/graphql/mutations/job-mutations'; // Import mutation từ GraphQL
import { GET_ALL_JOBCATEGORY } from '#/shared/graphql/queries/category-queries'; // Import query để lấy danh mục công việc
import { GET_ALL_JOBTYPES } from '#/shared/graphql/queries/jobtypes-queries'; // Import query để lấy loại công việc

interface I_Job {
  id: string;
  title: string;
  description: string;
  salary: number;
  experience: number;
  deadline: string;
  jobType: string;
  location: string;
  category: string;
  headcount: number;
  companyId: string;
}

interface UpdateJobProps {
  job: I_Job;
  onClose: () => void;
}

const UpdateJob: React.FC<UpdateJobProps> = ({ job, onClose }) => {
  // Dùng useState để lưu dữ liệu form
  const [formData, setFormData] = useState({
    ...job,
    deadline: job.deadline ? new Date(job.deadline).toISOString().split('T')[0] : "", // Chuyển đổi deadline thành định dạng yyyy-MM-dd
  });

  const vietnamProvinces = [
    {
      _id: "670eb287fc608d8e444a0ffb",
      address: "123 Đường ABC",
      city: "Hồ Chí Minh",
      country: "Việt Nam",
      idDel: false,
      __v: 0,
    },
    // Thêm các địa điểm khác vào đây nếu cần...
  ]; 

  // Lấy danh sách các category từ API
  const { data: categoriesData, loading: categoriesLoading } = useQuery(GET_ALL_JOBCATEGORY);
  
  // Lấy danh sách các jobType từ API
  const { data: jobTypesData, loading: jobTypesLoading } = useQuery(GET_ALL_JOBTYPES);
  
  // Mutation để cập nhật công việc
  const [updateJob, { loading, error }] = useMutation(UPDATE_JOB);

  // Hàm xử lý submit form
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      const { data } = await updateJob({
        variables: {
          jobId: formData.id,
          jobData: {
            title: formData.title || null,
            salary: formData.salary || null,
            locationId: formData.location || null, // Đảm bảo lấy location từ formData
            jobTypeId: formData.jobType || null,
            headcount: formData.headcount || null,
            experience: formData.experience || null,
            description: formData.description || null,
            deadline: formData.deadline || null,
            companyId: formData.companyId || null,
            categoryId: formData.category || null,
          },
        },
      });

      console.log('Job updated successfully:', data);
      onClose(); // Đóng form sau khi cập nhật thành công
    } catch (err) {
      alert('Cập nhật thất bại: ' + err);
      console.error('Cập nhật thất bại:', err);
    }
  };

  // Hàm xử lý thay đổi dữ liệu trong form
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'salary' || name === 'experience' || name === 'headcount' ? parseFloat(value) : value, // Xử lý lương, kinh nghiệm và headcount thành số
    });
  };

  return (
    <div className="bg-gray-100 p-4 rounded shadow-md">
      <h2 className="text-xl font-bold mb-4">Cập nhật Job ID: {job.id}</h2>
      {error && <p className="text-red-500">Error: {error.message}</p>}
      <form onSubmit={handleSubmit}>
        {/* Tiêu đề công việc */}
        <div className="mb-4">
          <label className="block text-gray-700">Tiêu đề công việc</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            placeholder="Nhập tiêu đề mới"
          />
        </div>
        {/* Mô tả công việc */}
        <div className="mb-4">
          <label className="block text-gray-700">Mô tả công việc</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            placeholder="Nhập mô tả mới"
          />
        </div>
        {/* Lương */}
        <div className="mb-4">
          <label className="block text-gray-700">Lương</label>
          <input
            type="number"
            name="salary"
            value={formData.salary}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            placeholder="Nhập lương"
          />
        </div>
        {/* Kinh nghiệm */}
        <div className="mb-4">
          <label className="block text-gray-700">Kinh nghiệm (năm)</label>
          <input
            type="number"
            name="experience"
            value={formData.experience}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            placeholder="Nhập số năm kinh nghiệm"
          />
        </div>
        {/* Hạn nộp hồ sơ */}
        <div className="mb-4">
          <label className="block text-gray-700">Hạn nộp hồ sơ</label>
          <input
            type="date"
            name="deadline"
            value={formData.deadline}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </div>
        {/* Loại công việc */}
        <div className="mb-4">
          <label className="block text-gray-700">Loại công việc</label>
          <select
            name="jobType"
            value={formData.jobType}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            disabled={jobTypesLoading} // Disable nếu đang load danh sách loại công việc
          >
            {jobTypesData?.getAllJobTypes?.map((jobType: { _id: string; type: string }) => (
              <option key={jobType._id} value={jobType._id}>
                {jobType.type}
              </option>
            ))}
          </select>
        </div>
        {/* Địa điểm */}
        <div className="mb-4">
          <label className="block text-gray-700">Địa điểm</label>
          <select
            name="location" // Tên phải khớp với key trong formData
            value={formData.location} // Lấy value từ formData
            onChange={handleInputChange} // Gọi handleInputChange khi thay đổi
            className="w-full p-2 border rounded"
          >
            <option value="">Chọn địa điểm</option>
            {vietnamProvinces.map((province) => (
              <option key={province._id} value={province._id}>
                {province.city}
              </option>
            ))}
          </select>
        </div>
        {/* Danh mục */}
        <div className="mb-4">
          <label className="block text-gray-700">Danh mục</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          >
            {categoriesData?.getAllJobCategories?.map((category: any) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        {/* Headcount */}
        <div className="mb-4">
          <label className="block text-gray-700">Số lượng tuyển</label>
          <input
            type="number"
            name="headcount"
            value={formData.headcount}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            placeholder="Nhập số lượng tuyển"
          />
        </div>
        {/* Company ID (ẩn) */}
        <input type="hidden" name="companyId" value={formData.companyId} />

        {/* Buttons */}
        <div className="flex justify-end">
          <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded mr-2" disabled={loading}>
            {loading ? 'Đang lưu...' : 'Cập nhật'}
          </button>
          <button type="button" className="bg-red-500 text-white px-4 py-2 rounded" onClick={onClose}>
            Hủy bỏ
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateJob;
