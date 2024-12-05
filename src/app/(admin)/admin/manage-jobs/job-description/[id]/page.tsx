'use client';

import { useQuery, useMutation } from "@apollo/client";
import { GET_JOB_BY_ID, UPDATE_ISDEL } from "#/shared/graphql/queries"; // Mutation UPDATE_ISDEL để cập nhật trạng thái isDel
import React from "react";
import Link from "next/link";

const ManageJobDescription = ({ params }: { params: { id: string } }) => {
  const { data, loading, error, refetch } = useQuery(GET_JOB_BY_ID, {
    variables: { jobId: params.id },
    skip: !params.id,
  });

  const [updateIsDel] = useMutation(UPDATE_ISDEL);

  if (loading) return <p>Đang tải...</p>;
  if (error) return <p>Có lỗi xảy ra: {error.message}</p>;

  const job = data?.getJobById;
  const handleToggleJobStatus = async () => {
    try {
      await updateIsDel({
        variables: {
          jobId: job.id,
          isDel: !job.isDel, 
        },
      });
      refetch();
      alert(`Tin tuyển dụng đã được ${job.isDel ? "mở" : "ẩn"} thành công.`);
    } catch (error) {
      console.error("Lỗi khi cập nhật trạng thái tin tuyển dụng:", error);
    }
  };

  return (
    <div className="bg-gray-100 p-4">
      <div className="text-sm text-green-600 mb-4">
        <Link href={"/"}> Trang chủ</Link> &gt; Quản lý công việc {job?.title} &gt;
        {job?.title}
      </div>
      <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
        <h1 className="text-3xl font-bold mb-2">{job?.title}</h1>
        <div className="flex items-center text-gray-600 mb-4">
          <span className="mr-4">
            Mức lương:{" "}
            <strong>
              {job?.salary ? job.salary.toLocaleString("vi-VN") : "Thỏa thuận"}{" "}
              VND
            </strong>
          </span>
          <span className="mr-4">
            Địa điểm: <strong>{job?.location?.city || "Không rõ"}</strong>
          </span>
          <span>
            Kinh nghiệm: <strong>{job?.experience || "Không yêu cầu"}</strong>{" "}
            {job?.experience ? "Năm" : ""}
          </span>
        </div>
        <div className="text-gray-500 mb-4">
          Hạn nộp hồ sơ:{" "}
          <strong>{new Date(job?.deadline).toLocaleDateString()}</strong>
        </div>
        <div className="flex space-x-4">
          {/* Hiển thị nút dựa trên trạng thái isDel */}
          <button
            className={`py-2 px-6 rounded-full ${
              job?.isDel
                ? "bg-green-600 text-white hover:bg-green-700" // Nút "Mở tin tuyển dụng" khi isDel = true
                : "bg-red-600 text-white hover:bg-red-700" // Nút "Ẩn tin tuyển dụng" khi isDel = false
            }`}
            onClick={handleToggleJobStatus}
          >
            {job?.isDel ? "Mở tin tuyển dụng" : "Ẩn tin tuyển dụng"}
          </button>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Chi tiết tin tuyển dụng</h2>
          <h3 className="text-lg font-semibold mb-2">Mô tả công việc</h3>
          <p className="text-gray-600 mb-4">{job?.description}</p>

          <h3 className="text-lg font-semibold mb-2">Yêu cầu công việc</h3>
          <ul className="list-disc pl-5 text-gray-600">
            {job?.requirements?.length > 0 ? (
              job.requirements.map((req: string, index: number) => (
                <li key={index}>{req}</li>
              ))
            ) : (
              <li>Không có yêu cầu cụ thể.</li>
            )}
          </ul>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="text-center">
            <img
              src={job?.company?.logoUrl || "/default-logo.png"}
              alt="Company Logo"
              className="w-16 h-16 mx-auto mb-4"
            />
            <h3 className="text-lg font-bold">{job?.company?.name}</h3>
          </div>
          <ul className="list-none text-gray-600 mt-4">
            <li>
              <strong>Quy mô:</strong> {job?.company?.size || "Không rõ"}
            </li>
            <li>
              <strong>Lĩnh vực:</strong> {job?.company?.field || "Không rõ"}
            </li>
            <li>
              <strong>Địa điểm:</strong> {job?.location?.address || "Không rõ"}
            </li>
          </ul>
          <a
            href={`/company/${job?.company?._id}`}
            className="text-green-600 hover:underline block mt-4 text-center"
          >
            Xem trang công ty
          </a>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-6 mt-6">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-bold">Thông tin chung</h3>
          <ul className="list-none text-gray-600 mt-4">
            <li>
              <strong>Kinh nghiệm:</strong> {job?.experience || "Không rõ"}{" "}
              <span>{job?.experience ? "Năm" : ""}</span>
            </li>
            <li>
              <strong>Số lượng tuyển:</strong> {job?.headcount || "Không rõ"}{" "}
              <span>{job?.headcount ? "Người" : ""}</span>
            </li>
            <li>
              <strong>Hình thức làm việc:</strong>{" "}
              {job?.jobType?.type || "Không rõ"}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ManageJobDescription;
