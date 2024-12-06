'use client';

import { useQuery, useMutation } from "@apollo/client";
import { GET_JOB_BY_ID, UPDATE_ISDEL } from "#/shared/graphql/queries";
import React from "react";
import Link from "next/link";
import { Card, Button, Typography, Row, Col, Divider, Tag } from "antd";
import Image from "next/image";

const { Title, Text } = Typography;

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
        <div style={{ backgroundColor: "#f5f5f5", padding: "20px" }}>
            <Card style={{ marginBottom: "20px" }}>
                <Link href="/">
                    <Text style={{ color: "#52c41a", cursor: "pointer" }}>Trang chủ</Text>
                </Link>{" "}
                &gt;{" "}
                <Text strong>
                    Quản lý công việc / {job?.title || "Chi tiết công việc"}
                </Text>
            </Card>

            <Row gutter={16}>
                {/* Chi tiết công việc */}
                <Col span={16}>
                    <Card title={<Title level={3}>{job?.title}</Title>} bordered={false}>
                        <Row gutter={[16, 16]}>
                            <Col span={12}>
                                <Text strong>Mức lương:</Text>{" "}
                                <Text style={{ color: "#1890ff" }}>
                                    {job?.salary
                                        ? job.salary.toLocaleString("vi-VN")
                                        : "Thỏa thuận"}{" "}
                                    VND
                                </Text>
                            </Col>
                            <Col span={12}>
                                <Text strong>Địa điểm:</Text>{" "}
                                <Text>{job?.location?.city || "Không rõ"}</Text>
                            </Col>
                            <Col span={12}>
                                <Text strong>Kinh nghiệm:</Text>{" "}
                                <Text>{job?.experience || "Không yêu cầu"}</Text>
                            </Col>
                            <Col span={12}>
                                <Text strong>Hạn nộp hồ sơ:</Text>{" "}
                                <Text style={{ color: "#faad14" }}>
                                    {job?.deadline
                                        ? new Date(job.deadline).toLocaleDateString()
                                        : "Không rõ"}
                                </Text>
                            </Col>
                        </Row>

                        <Divider />

                        <Title level={4}>Mô tả công việc</Title>
                        <div className="mt-4"
                            dangerouslySetInnerHTML={{ __html: job.description }}
                        >
                        </div>

                        <Divider />

                        <Title level={4}>Yêu cầu công việc</Title>
                        <ul style={{ paddingLeft: "20px" }}>
                            {job?.requirements?.length > 0 ? (
                                job.requirements.map((req: string, index: number) => (
                                    <li key={index}>
                                        <Text>{req}</Text>
                                    </li>
                                ))
                            ) : (
                                <li>
                                    <Text>Không có yêu cầu cụ thể.</Text>
                                </li>
                            )}
                        </ul>
                    </Card>
                </Col>

                {/* Thông tin công ty */}
                <Col span={8}>
                    <Card bordered={false}>
                        <div style={{ textAlign: "center" }}>
                            <Image
                                src={job?.company?.logoUrl || "/default-logo.png"}
                                alt="Company Logo"
                                style={{
                                    width: "80px",
                                    height: "80px",
                                    borderRadius: "50%",
                                    objectFit: "cover",
                                }}
                                width={80}
                                height={80}
                            />
                            <Title level={4} style={{ marginTop: "10px" }}>
                                {job?.company?.name || "Tên công ty"}
                            </Title>
                        </div>
                        <Divider />
                        <ul style={{ listStyle: "none", padding: 0 }}>
                            <li>
                                <Text strong>Quy mô:</Text>{" "}
                                {job?.company?.size || "Không rõ"}
                            </li>
                            <li>
                                <Text strong>Lĩnh vực:</Text>{" "}
                                {job?.company?.field || "Không rõ"}
                            </li>
                            <li>
                                <Text strong>Địa điểm:</Text>{" "}
                                {job?.location?.address || "Không rõ"}
                            </li>
                        </ul>
                        <Divider />
                        <Link href={`/company/${job?.company?._id}`}>
                            <Button type="primary" block>
                                Xem trang công ty
                            </Button>
                        </Link>
                    </Card>
                </Col>
            </Row>

            {/* Thao tác trạng thái */}
            <Card
                style={{
                    marginTop: "20px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <Tag color={job?.isDel ? "red" : "green"}>
                    {job?.isDel ? "Tin tuyển dụng đã ẩn" : "Tin tuyển dụng đang hiển thị"}
                </Tag>
                <Button
                    type="primary"
                    danger={job?.isDel}
                    onClick={handleToggleJobStatus}
                >
                    {job?.isDel ? "Mở tin tuyển dụng" : "Ẩn tin tuyển dụng"}
                </Button>
            </Card>
        </div>
    );
};

export default ManageJobDescription;
