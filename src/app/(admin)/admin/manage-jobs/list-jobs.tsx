'use client';

import React from "react";
import { useQuery } from "@apollo/client";
import Link from "next/link";
import { GET_ALL_JOBS } from "#/shared/graphql/queries";

const ManageListJobs = ({ searchParams }: { searchParams: { jtitle: string; Jlocation: string; jCategory: string; idDel: boolean } }) => {
  const { data, loading, error } = useQuery(GET_ALL_JOBS, {
    variables: {
      jtitle: searchParams.jtitle || "",
      Jlocation: searchParams.Jlocation || "",
      jCategory: searchParams.jCategory || "",
      idDel: searchParams.idDel,
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) {
    console.error("Lỗi", error);
    return <p>Có lỗi xảy ra</p>;
  }

  const jobs = data?.getAllJobs || [];

  return (
    <div className="mt-8 p-4">
      {jobs.length === 0 ? (
        <p className="text-center text-red-600">Không tìm thấy công việc nào</p>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {jobs.map((job: any) => (
            <Link href={`manage-jobs/job-description/${job.id}`} key={job.id}>
              <li
                className="border p-4 rounded-lg shadow-md transition duration-300 hover:bg-gray-100 cursor-pointer"
                style={{ backgroundColor: "#ffffff" }}
              >
                <h2 className="font-bold text-lg hover:text-[#00b174] hover:underline transition duration-300">
                  {job.title}
                </h2>
                <p className="text-gray-600">{job.description}</p>
                <p className="text-gray-500">{job.location?.city}, {job.location?.country}</p>
                <p className="text-gray-500">Công ty: {job.company?.name}</p>
                <p className="text-gray-500">Danh mục: {job.category?.name}</p>
                <p className="text-gray-500">Loại hình: {job.jobType?.type}</p>
                <p className={`text-sm ${job.idDel ? "text-red-600" : "text-green-600"}`}>
                  {job.idDel ? "Đã hết hạn" : "Đang hiển thị"}
                </p>
              </li>
            </Link>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ManageListJobs;
