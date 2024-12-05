import React from "react";
import { useQuery } from "@apollo/client";
import Link from "next/link";
import { Card, Typography, Tag, Empty, Spin } from "antd";
import {
    EnvironmentOutlined,
    BankOutlined,
    AppstoreOutlined,
    ClockCircleOutlined
} from "@ant-design/icons";
import { GET_JOB_WITH_FILTERS, GET_ALL_JOBS } from "#/shared/graphql/queries";

const { Title, Text } = Typography;

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

    if (filteredLoading || allJobsLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Spin size="large" />
            </div>
        );
    }

    if (filteredError || allJobsError) {
        return (
            <div className="text-center p-6">
                <Title level={4} className="text-red-500">
                    Có lỗi xảy ra, vui lòng thử lại sau!
                </Title>
            </div>
        );
    }

    const jobs = filteredData?.getJobsWithFilters?.length > 0
        ? filteredData.getJobsWithFilters
        : allJobsData?.getAllJobs || [];

    if (jobs.length === 0) {
        return (
            <div className="flex justify-center items-center h-64">
                <Empty
                    description={
                        <Text type="secondary">
                            Không tìm thấy công việc phù hợp
                        </Text>
                    }
                />
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {jobs.map((job: any) => (
                    <Link
                        href={`/jobs/job-description/${job.id}`}
                        key={job.id}
                        className="block"
                    >
                        <Card
                            hoverable
                            className="h-full transform transition-all duration-300 hover:-translate-y-2 hover:shadow-lg"
                            cover={
                                <div className="p-4 bg-gradient-to-r from-green-50 to-green-100">
                                    <Title
                                        level={4}
                                        className="text-green-800 mb-2 truncate"
                                    >
                                        {job.title}
                                    </Title>
                                </div>
                            }
                        >
                            <div className="space-y-2">
                                <div className="flex items-center text-gray-600">
                                    <EnvironmentOutlined className="mr-2 text-green-600" />
                                    <Text>
                                        {job.location?.city}, {job.location?.country}
                                    </Text>
                                </div>
                                <div className="flex items-center text-gray-600">
                                    <BankOutlined className="mr-2 text-blue-600" />
                                    <Text strong>
                                        {job.company?.name}
                                    </Text>
                                </div>
                                <div className="flex items-center text-gray-600">
                                    <AppstoreOutlined className="mr-2 text-purple-600" />
                                    <Text>
                                        {job.category?.name}
                                    </Text>
                                </div>
                                <div className="flex items-center text-gray-600">
                                    <ClockCircleOutlined className="mr-2 text-orange-600" />
                                    <Tag color="green">
                                        {job.jobType?.type}
                                    </Tag>
                                </div>
                            </div>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default ListJobs;