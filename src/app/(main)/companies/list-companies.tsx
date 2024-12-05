// CompanyList.tsx
import React from 'react';
import { FaBuilding, FaMapMarkerAlt, FaUsers, FaBriefcase } from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image';

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

interface CompanyListProps {
  companies: Company[];
}

const CompanyList: React.FC<CompanyListProps> = ({ companies }) => {
  if (!companies || companies.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] bg-gray-50 rounded-lg">
        <FaBuilding className="text-gray-400 text-6xl mb-4" />
        <p className="text-gray-600 text-xl font-medium">Không tìm thấy công ty nào phù hợp</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-gray-800">
          Khám phá công ty
        </h2>
        <span className="bg-gray-100 text-gray-600 px-4 py-1 rounded-full text-lg">
          {companies.length} công ty
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {companies.map((company) => (
          <div
            key={company.id}
            className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
          >
            <div className="relative h-48 bg-gray-100">
              {company.imageUrl ? (
                <Image
                  src={company.imageUrl}
                  alt={company.name}
                  layout="fill"
                  objectFit="cover"
                  className="group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <FaBuilding className="text-gray-400 text-5xl" />
                </div>
              )}
            </div>
            
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-3 group-hover:text-green-600 transition-colors">
                {company.name}
              </h3>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-gray-600">
                  <FaMapMarkerAlt className="w-4 h-4 mr-2 text-green-500 flex-shrink-0" />
                  <span className="line-clamp-1">{company.location?.address || "Chưa cập nhật địa chỉ"}</span>
                </div>
                
                <div className="flex items-center text-gray-600">
                  <FaUsers className="w-4 h-4 mr-2 text-blue-500 flex-shrink-0" />
                  <span>{company.size || "Chưa cập nhật quy mô"}</span>
                </div>

                <div className="flex items-center text-gray-600">
                  <FaBriefcase className="w-4 h-4 mr-2 text-purple-500 flex-shrink-0" />
                  <span className="line-clamp-1">{company.field || "Chưa cập nhật lĩnh vực"}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <Link
                  href={`/companies/${company.id}`} key={company.id}
                  className="flex-1 bg-green-50 text-green-600 py-2 px-4 rounded-lg hover:bg-green-100 transition-colors text-center font-medium"
                >
                  Xem chi tiết
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompanyList;