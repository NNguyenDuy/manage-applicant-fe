// pages/companies/[id]/index.tsx
import React from 'react';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import { FaMapMarkerAlt, FaUsers, FaBriefcase, FaGlobe, FaBuilding } from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';
import { GET_COMPANY_BY_ID } from '#/shared/graphql/queries/company-queries';

interface Location {
  _id: string;
  address: string;
  city: string;
  country: string;
  isDel: boolean;
}

interface Company {
  id: string;
  name: string;
  description: string;
  size: string;
  field: string;
  locationId: string;
  isDel: boolean;
  location: Location;
  imageUrl?: string;
}

const CompanyDetail: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  if (!id) {
    return <div>Đang tải...</div>;
  }

  const { loading, error, data } = useQuery(GET_COMPANY_BY_ID, {
    variables: { companyId: id },
    skip: !id,
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-500 border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">Đã có lỗi xảy ra khi tải thông tin công ty</p>
      </div>
    );
  }

  const company = data?.getCompanyById;

  if (!company) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Không tìm thấy thông tin công ty</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <Link
          href="/companies"
          className="text-green-600 hover:text-green-700 mb-4 inline-block"
        >
          ← Quay lại danh sách công ty
        </Link>
      </div>

      <div className="relative h-96 rounded-xl overflow-hidden mb-8 bg-gray-100">
        {company.imageUrl ? (
          <Image
            src={company.imageUrl}
            alt={company.name}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <FaBuilding className="text-gray-400 text-7xl" />
          </div>
        )}
      </div>

      <div className="bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">{company.name}</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="space-y-6">
              <div className="flex items-start">
                <FaMapMarkerAlt className="w-5 h-5 text-green-500 mt-1 mr-3" />
                <div>
                  <h3 className="font-medium text-gray-700 mb-1">Địa chỉ</h3>
                  <p className="text-gray-600">
                    {company.location?.address}
                    {company.location?.city && (
                      <>
                        <br />
                        {company.location.city}, {company.location.country}
                      </>
                    )}
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <FaUsers className="w-5 h-5 text-blue-500 mt-1 mr-3" />
                <div>
                  <h3 className="font-medium text-gray-700 mb-1">Quy mô công ty</h3>
                  <p className="text-gray-600">{company.size || "Chưa cập nhật"}</p>
                </div>
              </div>

              <div className="flex items-start">
                <FaBriefcase className="w-5 h-5 text-purple-500 mt-1 mr-3" />
                <div>
                  <h3 className="font-medium text-gray-700 mb-1">Lĩnh vực hoạt động</h3>
                  <p className="text-gray-600">{company.field || "Chưa cập nhật"}</p>
                </div>
              </div>

              <Link
                href={`/companies/${company.id}/jobs`}
                className="block w-full bg-green-600 text-white text-center py-3 rounded-lg hover:bg-green-700 transition-colors mt-6"
              >
                Xem việc làm tại {company.name}
              </Link>
            </div>
          </div>

          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Giới thiệu công ty</h2>
            <div className="prose max-w-none">
              {company.description ? (
                <div className="whitespace-pre-line text-gray-600">
                  {company.description}
                </div>
              ) : (
                <p className="text-gray-500 italic">
                  Chưa có thông tin giới thiệu về công ty
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyDetail;