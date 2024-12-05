'use client'

import {
    Layout,
    Typography,
    Card,
    Row,
    Col,
    Statistic
} from 'antd'
import {
    UserOutlined,
    TeamOutlined,
    FileTextOutlined,
    UserAddOutlined,
} from '@ant-design/icons'

const { Content } = Layout

const AdminDashboard = () => {

    const statsData = [
        {
            title: "Tổng Người Dùng",
            value: 5234,
            icon: <UserOutlined className="text-blue-500" />,
            color: "blue"
        },
        {
            title: "Việc Làm Mới",
            value: 342,
            icon: <UserAddOutlined className="text-green-500" />,
            color: "green"
        },
        {
            title: "Ứng Viên",
            value: 1245,
            icon: <TeamOutlined className="text-purple-500" />,
            color: "purple"
        },
        {
            title: "Hồ Sơ",
            value: 876,
            icon: <FileTextOutlined className="text-orange-500" />,
            color: "orange"
        }
    ]

    return (
        <Layout className="min-h-screen">
            <Content className="p-6 bg-gray-50">
                <Row gutter={16}>
                    {statsData.map((stat, index) => (
                        <Col key={index} xs={24} sm={12} md={6}>
                            <Card
                                hoverable
                                className={`mb-4 border-l-4 border-${stat.color}-500`}
                            >
                                <Statistic
                                    title={stat.title}
                                    value={stat.value}
                                    prefix={stat.icon}
                                    valueStyle={{ color: `var(--ant-${stat.color}-color)` }}
                                />
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Content>
        </Layout>
    )
}

export default AdminDashboard