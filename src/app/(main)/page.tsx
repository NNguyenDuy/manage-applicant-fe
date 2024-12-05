'use client'
import React from 'react'
import { Carousel, Typography, Button } from 'antd'
import Image from 'next/image'
import { SearchOutlined, RocketOutlined, UserAddOutlined } from '@ant-design/icons'
import Link from 'next/link'

const { Title, Paragraph } = Typography

const Home = () => {
    const carouselItems = [
        {
            image: "/assets/images/banner1.jpg",
            title: "Khám Phá Cơ Hội Nghề Nghiệp Mới",
            description: "Kết nối nhà tuyển dụng hàng đầu với các tài năng tiềm năng",
            buttonText: "Tìm Việc Ngay",
            buttonIcon: <SearchOutlined />,
            textColor: "text-black",
            overlay: "bg-black/40"
        },
        {
            image: "/assets/images/banner2.jpg",
            title: "Nâng Cao Sự Nghiệp của Bạn",
            description: "Chúng tôi kết nối bạn với những cơ hội việc làm phù hợp nhất",
            buttonText: "Ứng Tuyển Ngay",
            buttonIcon: <UserAddOutlined />,
            textColor: "text-black",
            overlay: "bg-green-900/50"
        },
        {
            image: "/assets/images/banner3.jpg",
            title: "Khởi Động Sự Nghiệp",
            description: "Chúng tôi giúp bạn bứt phá và chinh phục mục tiêu nghề nghiệp",
            buttonText: "Khám Phá Ngay",
            buttonIcon: <RocketOutlined />,
            textColor: "text-black",
            overlay: "bg-blue-900/40"
        }
    ]

    return (
        <div>
            <Carousel
                autoplay
                dots={{ className: "custom-carousel-dots" }}
                className="relative"
            >
                {carouselItems.map((item, index) => (
                    <div key={index} className="relative h-[600px] w-full">
                        <div className={`absolute inset-0 ${item.overlay}`}></div>
                        <Image
                            src={item.image}
                            alt={`Carousel slide ${index + 1}`}
                            fill
                            priority
                            style={{ objectFit: 'cover' }}
                            className="z-0"
                        />
                        <div className="absolute inset-0 flex flex-col justify-center items-center text-center z-10 px-4">
                            <Title
                                level={2}
                                className={`text-5xl font-bold mb-4 ${item.textColor}`}
                            >
                                {item.title}
                            </Title>
                            <Paragraph
                                className={`text-2xl font-semibold mb-6 max-w-2xl ${item.textColor}`}
                            >
                                {item.description}
                            </Paragraph>
                            <Link
                                href={'/jobs'}
                            >
                                <Button
                                    type="primary"
                                    size="large"
                                    icon={item.buttonIcon}
                                    className="bg-green-500 hover:bg-green-600"
                                >
                                    {item.buttonText}
                                </Button>
                            </Link>
                        </div>
                    </div>
                ))
                }
            </Carousel >

            {/* Quick Features Section */}
            < div className="container mx-auto px-4 py-16 grid md:grid-cols-3 gap-8 text-center" >
                <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition">
                    <SearchOutlined className="text-6xl text-green-500 mb-4" />
                    <Title level={4}>Tìm Kiếm Việc Làm</Title>
                    <Paragraph>Dễ dàng tìm kiếm việc làm phù hợp với kỹ năng và nguyện vọng</Paragraph>
                </div>
                <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition">
                    <UserAddOutlined className="text-6xl text-blue-500 mb-4" />
                    <Title level={4}>Ứng Tuyển Nhanh Chóng</Title>
                    <Paragraph>Ứng tuyển trực tuyến dễ dàng với hồ sơ chuyên nghiệp</Paragraph>
                </div>
                <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition">
                    <RocketOutlined className="text-6xl text-purple-500 mb-4" />
                    <Title level={4}>Phát Triển Sự Nghiệp</Title>
                    <Paragraph>Nhận tư vấn và hỗ trợ phát triển năng lực chuyên môn</Paragraph>
                </div>
            </div >
        </div >
    )
}

export default Home