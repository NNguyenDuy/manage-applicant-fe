import React, { useState, FormEvent } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_JOB } from "#/shared/graphql/mutations/job-mutations"; // Import mutation từ GraphQL
import { GET_ALL_JOBCATEGORY } from "#/shared/graphql/queries/category-queries"; // Import query để lấy danh mục công việc
import { GET_ALL_JOBTYPES } from "#/shared/graphql/queries/jobtypes-queries"; // Import query để lấy loại công việc

interface I_Job {
  title: string;
  description: string;
  salary: number;
  experience: number;
  deadline: string;
  jobType: string;
  location: string;
  category: string;
  status: boolean;
  headcount: number;
  companyId: string;
  isDel: boolean;
}

interface CreateJobProps {
  onClose: () => void;
  companyId: string;
}

const CreateJob: React.FC<CreateJobProps> = ({ onClose, companyId }) => {
  const [formData, setFormData] = useState<I_Job>({
    title: "",
    description: "",
    salary: 0,
    experience: 0,
    deadline: "",
    jobType: "",
    location: "",
    category: "",
    status: true,
    headcount: 1, // Mặc định là 1
    companyId: companyId, // Gắn companyId vào formData
    isDel: false,
  });

  // Danh sách location trả về từ API (bao gồm _id)
  const vietnamProvinces = [
    {
      _id: "670eb287fc608d8e444a0ffb",
      city: "Hồ Chí Minh",
      address: "123 Đường ABC",
      country: "Việt Nam",
    },
    // Thêm các địa điểm khác vào đây...
  ];

  const [createJob, { loading, error }] = useMutation(CREATE_JOB);

  // Lấy danh sách các category từ API
  const {
    data: categoriesData,
    loading: categoriesLoading,
    error: categoriesError,
  } = useQuery(GET_ALL_JOBCATEGORY);

  // Lấy danh sách các jobType từ API
  const {
    data: jobTypesData,
    loading: jobTypesLoading,
    error: jobTypesError,
  } = useQuery(GET_ALL_JOBTYPES);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    console.log("Dữ liệu gửi lên:", {
      jobData: {
        ...formData,
        deadline: new Date(formData.deadline).toISOString(), // Định dạng deadline thành ISO
      },
    });

    try {
      const { data } = await createJob({
        variables: {
          jobData: {
            title: formData.title,
            description: formData.description,
            salary: formData.salary,
            experience: formData.experience,
            deadline: new Date(formData.deadline).toISOString(), // Định dạng lại deadline
            jobTypeId: formData.jobType,
            categoryId: formData.category,
            locationId: formData.location, // Truyền locationId là ObjectId
            headcount: formData.headcount,
            companyId: formData.companyId, // Truyền companyId
          },
        },
      });

      onClose(); // Đóng form sau khi lưu thay đổi
    } catch (err) {
      alert("Tạo mới thất bại: " + err);
      console.error("Tạo mới thất bại:", err);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]:
        name === "salary" || name === "experience" || name === "headcount"
          ? parseFloat(value)
          : value, // Xử lý lương, kinh nghiệm và headcount thành số
    });
  };

  return (
    <div className="bg-gray-100 p-4 rounded shadow-md">
      <h2 className="text-xl font-bold mb-4">Tạo công việc mới</h2>
      {error && <p className="text-red-500">Error: {error.message}</p>}
      {/* Form tạo công việc mới */}
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
            placeholder="Nhập tiêu đề"
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
            placeholder="Nhập mô tả"
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
            {jobTypesData?.getAllJobTypes?.map(
              (jobType: { _id: string; type: string }) => (
                <option key={jobType._id} value={jobType._id}>
                  {jobType.type}
                </option>
              )
            )}
          </select>
        </div>
        {/* Địa điểm */}
        <div className="mb-4">
          <label className="block text-gray-700">Địa điểm</label>
          <select
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          >
            <option value="">Chọn địa điểm</option>
            {vietnamProvinces.map((province: { _id: string; city: string }) => (
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
            <option value="">Chọn danh mục</option>{" "}
            {/* Đảm bảo không có giá trị rỗng */}
            {categoriesData?.getAllJobCategories?.map((category: any) => (
              <option key={category._id} value={category._id}>
                {" "}
                {/* Sử dụng _id thay vì tên */}
                {category.name}
              </option>
            ))}
          </select>
        </div>
        

        {/* Buttons */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded mr-2"
            disabled={loading}
          >
            {loading ? "Đang lưu..." : "Tạo công việc"}
          </button>
          <button
            type="button"
            className="bg-red-500 text-white px-4 py-2 rounded"
            onClick={onClose}
          >
            Hủy bỏ
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateJob;
