import React from "react";
import { useQuery } from "@apollo/client";
import Link from "next/link";
import { GET_JOB_WITH_FILTERS, GET_ALL_JOBS } from "#/shared/graphql/queries";

const ListJobs = ({ name, location, jCategory }: { name: string, location: string, jCategory: string }) => {

    const { data: filteredData, loading: filteredLoading, error: filteredError } = useQuery(GET_JOB_WITH_FILTERS, {
        variables: {
            jtitle: name || "",
            jlocation: location || "",
            jCategory: jCategory || "",
            isDel: false,
        },
        skip: !(name || location || jCategory),
    });

    const { data: allJobsData, loading: allJobsLoading, error: allJobsError } = useQuery(GET_ALL_JOBS, {
        variables: { isDel: false },
    });

    if (filteredLoading || allJobsLoading) return <p>Loading...</p>;
    if (filteredError || allJobsError) {
        console.error('Lỗi', filteredError || allJobsError);
        return <p>Có lỗi xảy ra</p>;
    }

    const jobs = filteredData?.getJobsWithFilters?.length > 0
        ? filteredData.getJobsWithFilters
        : allJobsData?.getAllJobs || [];

    return (
        <div className="mt-8 p-4">
            {jobs.length === 0 ? (
                <p className="text-center text-red-600">Không tìm thấy kết quả phù hợp</p>
            ) : (
                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {jobs.map((job: any) => (
                        <Link href={`/jobs/job-description/${job.id}`} key={job.id}>
                            <li
                                className="border p-4 rounded-lg shadow-md transition duration-300 hover:bg-gray-100 cursor-pointer"
                                style={{ backgroundColor: "#ffffff" }}
                            >
                                <h2 className="font-bold text-lg hover:text-[#00b174] hover:underline transition duration-300">
                                    {job.title}
                                </h2>
                                <p className="text-gray-500">{job.location?.city}, {job.location?.country}</p>
                                <p className="text-gray-500">Công ty: {job.company?.name}</p>
                                <p className="text-gray-500">Danh mục: {job.category?.name}</p>
                                <p className="text-gray-500">Loại hình: {job.jobType?.type}</p>
                            </li>
                        </Link>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ListJobs;
