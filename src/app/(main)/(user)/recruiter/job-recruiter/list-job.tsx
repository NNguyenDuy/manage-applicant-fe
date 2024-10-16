'use client';
import React, { useState } from 'react';
import { useAuth } from '#/shared/hook/use-auth';
import { useQuery } from '@apollo/client';
import { GET_MAINTAIN_JOBS_BY_COMPANY } from '#/shared/graphql/queries/jobs-queries';
import Link from 'next/link';
export const ListJob = () => {
  const { user } = useAuth();

  const { data, loading, error } = useQuery(GET_MAINTAIN_JOBS_BY_COMPANY, {
    variables: { companyId: user?.companyId },
    skip: !user?.companyId,
  });
  console.log(user?.companyId);
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);

  const handleJobClick = (jobId: string) => {
    setSelectedJobId(jobId === selectedJobId ? null : jobId);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Danh sách công việc</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {data?.getMaintainJobsByCompany.map((job: any) => (
          <div
            key={job.id}
            className={`bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer ${selectedJobId === job.id ? 'ring-2 ring-green-500' : ''}`}
            onClick={() => handleJobClick(job.id)}
          >
            <h2 className="text-2xl font-semibold mb-2">{job.title}</h2>
            <p className="text-gray-600 mb-4">{job.description}</p>
            
            <div className="text-gray-500">
              <p><strong>Lương:</strong> {job.salary ? job.salary.toLocaleString('vi-VN') + ' VND' : 'Thỏa thuận'}</p>
              <p><strong>Kinh nghiệm:</strong> {job.experience || 'Không yêu cầu'} năm</p>
              <p><strong>Hạn nộp hồ sơ:</strong> {job.deadline ? new Date(job.deadline).toLocaleDateString() : 'Không rõ'}</p>
              <p><strong>Loại công việc:</strong> {job.jobType?.type || 'Không rõ'}</p>
              <p><strong>Địa điểm:</strong> {job.location?.city || 'Không rõ'}, {job.location?.country || 'Không rõ'}</p>
              <p><strong>Danh mục:</strong> {job.category?.name || 'Không rõ'}</p>
              <p><strong>Trạng thái:</strong> {job.idDel ? 'Đã ẩn' : 'Đang hiển thị'}</p>
            </div>

            {/* Hiển thị thông tin chi tiết khi nhấp vào công việc */}
            {selectedJobId === job.id && (
              <div className="mt-4">
                <h3 className="text-lg font-semibold">Thông tin công ty:</h3>
                <p><strong>Công ty:</strong> {job.company?.name || 'Không rõ'}</p>
                <p><strong>Mô tả:</strong> {job.company?.description || 'Không rõ'}</p>
                <p><strong>Quy mô:</strong> {job.company?.size || 'Không rõ'}</p>
                <p><strong>Lĩnh vực:</strong> {job.company?.field || 'Không rõ'}</p>

                {/* Địa chỉ công ty */}
                <div className="mt-2">
                  <h4 className="text-md font-semibold">Địa chỉ công ty:</h4>
                  <p>{job.location?.address || 'Không rõ'}, {job.location?.city || 'Không rõ'}, {job.location?.country || 'Không rõ'}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
