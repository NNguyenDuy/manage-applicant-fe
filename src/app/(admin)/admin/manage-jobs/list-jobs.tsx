'use client';

import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import Link from "next/link";
import { GET_ALL_JOBS } from "#/shared/graphql/queries";
import { Card, Tag, Typography, Empty, Tooltip } from 'antd';
import {
    EnvironmentOutlined,
    BankOutlined,
    ClockCircleOutlined,
    FileTextOutlined
} from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const ManageListJobs = ({ searchParams }: { searchParams: { jtitle: string; Jlocation: string; jCategory: string; isDel: boolean } }) => {
    const [expandedJob, setExpandedJob] = useState<string | null>(null);

    const { data, loading, error } = useQuery(GET_ALL_JOBS, {
        variables: {
            jtitle: searchParams.jtitle || "",
            Jlocation: searchParams.Jlocation || "",
            jCategory: searchParams.jCategory || "",
            isDel: searchParams.isDel,
        },
    });

    if (loading) return <div className="text-center p-8">Đang tải...</div>;
    if (error) return <div className="text-center text-red-500 p-8">Có lỗi xảy ra</div>;

    const jobs = data?.getAllJobs || [];

    return (
        <div className="p-6 bg-gray-50">
            {jobs.length === 0 ? (
                <Empty description="Không tìm thấy công việc" className="mt-12" />
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {jobs.map((job: any) => (
                        <Card
                            key={job.id}
                            hoverable
                            className={`
                transition-all duration-300 
                ${expandedJob === job.id ? 'shadow-xl scale-105' : 'shadow-md'}`}
                            actions={[
                                <Link href={`manage-jobs/job-description/${job.id}`} key="view">
                                    <Tooltip title="Chi tiết công việc">
                                        <FileTextOutlined key="view" />
                                    </Tooltip>
                                </Link>
                            ]}
                        >
                            <div
                                onClick={() => setExpandedJob(expandedJob === job.id ? null : job.id)}
                                className="cursor-pointer"
                            >
                                <Title level={4} className="mb-2 text-green-600 hover:text-green-700">
                                    {job.title}
                                </Title>

                                <div className="space-y-2 mb-4">
                                    <div className="flex items-center text-gray-600">
                                        <BankOutlined className="mr-2 text-green-500" />
                                        <span>{job.company?.name}</span>
                                    </div>
                                    <div className="flex items-center text-gray-600">
                                        <EnvironmentOutlined className="mr-2 text-blue-500" />
                                        <span>{job.location?.city}, {job.location?.country}</span>
                                    </div>
                                    <div className="flex items-center text-gray-600">
                                        <ClockCircleOutlined className="mr-2 text-purple-500" />
                                        <span>{job.jobType?.type}</span>
                                    </div>
                                </div>

                                {expandedJob === job.id && (
                                    <div className="mt-4"
                                        dangerouslySetInnerHTML={{ __html: job.description }}
                                    >
                                    </div>
                                )}

                                <div className="mt-4 flex justify-between items-center">
                                    <Tag color={job.isDel ? "red" : "green"}>
                                        {job.isDel ? "Đã hết hạn" : "Đang hiển thị"}
                                    </Tag>
                                    <Tag color="blue">{job.category?.name}</Tag>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ManageListJobs;