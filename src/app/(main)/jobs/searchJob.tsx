import React, { useState, useEffect } from 'react';
import { useQuery } from "@apollo/client";
import { Input, Select, Button, Form } from 'antd';
import { SearchOutlined, EnvironmentOutlined, BankOutlined } from '@ant-design/icons';
import { GET_ALL_JOBCATEGORY } from "#/shared/graphql/queries/category-queries";

const { Option } = Select;

interface SearchJobProps {
    onSearch: (jobTitle: string, location: string, category: string) => void;
}

const SearchJob: React.FC<SearchJobProps> = ({ onSearch }) => {
    const [form] = Form.useForm();
    const [vietnamProvinces, setVietnamProvinces] = useState([]);

    const {
        data: jobCategoryData,
        loading: jobCategoryLoading,
    } = useQuery(GET_ALL_JOBCATEGORY);

    useEffect(() => {
        const fetchProvinces = async () => {
            try {
                const response = await fetch('https://provinces.open-api.vn/api/?depth=1');
                const data = await response.json();
                setVietnamProvinces(data);
            } catch (error) {
                console.error('Error fetching provinces:', error);
            }
        };

        fetchProvinces();
    }, []);

    const handleSearch = (values: any) => {
        const { jobTitle, location, category } = values;
        onSearch(jobTitle || "", location || "", category || "");
    };

    return (
        <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-2xl shadow-xl">
            <Form
                form={form}
                layout="inline"
                onFinish={handleSearch}
                className="flex flex-wrap justify-between items-center gap-4"
            >
                <Form.Item
                    name="jobTitle"
                    className="flex-grow min-w-[250px]"
                >
                    <Input
                        prefix={<SearchOutlined className="text-gray-400" />}
                        placeholder="Nhập tên công việc"
                        size="large"
                        className="rounded-full"
                    />
                </Form.Item>

                <Form.Item
                    name="location"
                    className="flex-grow min-w-[200px]"
                >
                    <Select
                        suffixIcon={<EnvironmentOutlined className="text-gray-400" />}
                        placeholder="Tất cả thành phố"
                        size="large"
                        className="w-full"
                    >
                        <Option value="">Tất cả thành phố</Option>
                        {vietnamProvinces.map((province) => (
                            <Option key={province?.code} value={province?.name}>
                                {province?.name}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item
                    name="category"
                    className="flex-grow min-w-[200px]"
                >
                    <Select
                        suffixIcon={<BankOutlined className="text-gray-400" />}
                        placeholder="Tất cả danh mục"
                        size="large"
                        className="w-full"
                    >
                        <Option value="">Tất cả danh mục</Option>
                        {jobCategoryData?.getAllJobCategories?.map((category: { _id: string; name: string }) => (
                            <Option key={category._id} value={category.name}>
                                {category.name}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        icon={<SearchOutlined />}
                        size="large"
                        className="bg-green-500 hover:bg-green-600"
                    >
                        Tìm kiếm
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default SearchJob;