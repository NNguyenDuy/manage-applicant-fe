import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_ALL_JOBCATEGORY } from "#/shared/graphql/queries/category-queries"; // Import GET_ALL_JOBCATEGORY
import { FaSearch, FaMapMarkerAlt, FaBriefcase } from "react-icons/fa";

const SearchJob = ({
  onSearch,
}: {
  onSearch: (jtitle: string, Jlocation: string, jCategory: string) => void;
}) => {
  const [jtitle, setJtitle] = useState("");
  const [Jlocation, setJlocation] = useState("");
  const [jCategory, setJCategory] = useState("");
  const [vietnamProvinces, setVietnamProvinces] = useState([]);
  
  const {
    data: jobCategoryData,
    loading: jobCategoryLoading,
    error: jobCategoryError,
  } = useQuery(GET_ALL_JOBCATEGORY);

  // Fetch provinces from Vietnam API
  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await fetch('https://provinces.open-api.vn/api/?depth=1');
        const data = await response.json();
        setVietnamProvinces(data); // Set provinces data
      } catch (error) {
        console.error('Error fetching provinces:', error);
      }
    };

    fetchProvinces();
  }, []); // Only fetch once when the component is mounted

  const handleSearch = () => {
    onSearch(jtitle, Jlocation, jCategory); 
  };

  return (
    <div className="bg-green-100 p-4 rounded-lg shadow-lg max-w-9xl mx-auto">
      <div className="flex items-center bg-white rounded-full shadow-md p-2">
        <input
          type="text"
          value={jtitle}
          onChange={(e) => setJtitle(e.target.value)}
          placeholder="Nhập tên công việc"
          className="flex-grow px-4 py-2 rounded-full focus:outline-none text-gray-700"
        />
        <div className="flex items-center px-4 border-l border-gray-300">
          <div className="relative w-full">
            <div className="flex items-center pl-3 absolute inset-y-0 pointer-events-none">
              <FaMapMarkerAlt className="text-gray-500" />
            </div>
            <select
              value={Jlocation}
              onChange={(e) => setJlocation(e.target.value)}
              className="appearance-none p-3 pl-10 border border-gray-300 rounded-full w-full pr-8 text-gray-700"
            >
              <option value="">Tất cả thành phố</option>
              {vietnamProvinces.length > 0 &&
                vietnamProvinces.map(
                  (province: { code: string; name: string }) => (
                    <option key={province.code} value={province.name}>
                      {province.name}
                    </option>
                  )
                )}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="flex items-center px-4 border-l border-gray-300">
          <div className="relative w-full">
            <div className="flex items-center pl-3 absolute inset-y-0 pointer-events-none">
              <FaBriefcase className="text-gray-500" />
            </div>
            <select
              value={jCategory}
              onChange={(e) => setJCategory(e.target.value)} 
              className="appearance-none p-3 pl-10 border border-gray-300 rounded-full w-full pr-8 text-gray-700"
            >
              <option value="">Tất cả danh mục</option>
              {jobCategoryData?.getAllJobCategories?.length > 0 ? (
                jobCategoryData.getAllJobCategories.map(
                  (category: { _id: string; name: string }) => (
                    <option key={category._id} value={category.name}>
                      {category.name}
                    </option>
                  )
                )
              ) : (
                <option value="">Không có dữ liệu</option>
              )}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                />
              </svg>
            </div>
          </div>
        </div>

        <button
          className="bg-green-500 text-white px-6 py-2 rounded-full ml-4 hover:bg-green-600 flex items-center"
          onClick={handleSearch}
        >
          <FaSearch className="mr-2" /> Tìm kiếm
        </button>
      </div>
    </div>
  );
};

export default SearchJob;
