import React, { useState } from 'react'
import { FaSearch, FaMapMarkerAlt, FaBriefcase } from 'react-icons/fa'

interface SearchFormProps {
  onSearch: (title: string, position: string, salary: number) => void
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearch }) => {
  const [title, setTitle] = useState('')
  const [position, setPosition] = useState('Hồ Chí Minh')
  const [salary, setSalary] = useState<number | ''>('')

  const handleSearch = () => {
    onSearch(title, position, salary as number)
  }

  return (
    <div className="bg-green-100 p-4 rounded-lg shadow-lg max-w-9xl mx-auto">
      <div className="text-center text-sm mb-2 text-gray-600">
        Tiếp cận <strong>40,000+</strong> tin tuyển dụng việc làm mỗi ngày từ hàng nghìn doanh nghiệp uy tín tại Việt Nam
      </div>
      <div className="flex items-center bg-white rounded-full shadow-md p-2">
        {/* Search Title Input */}
        <input
          type="text"
          className="flex-grow px-4 py-2 rounded-full focus:outline-none text-gray-700"
          placeholder="Nhập từ khóa công việc..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* Location */}
        <div className="flex items-center px-4 border-l border-gray-300">
          <FaMapMarkerAlt className="text-gray-500 mr-2" />
          <select
            className="bg-transparent focus:outline-none"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
          >
            <option value="Full time">Full-time</option>
            <option value="Part-time">Part-time</option>
          </select>
        </div>

        {/* Salary */}
        <div className="flex items-center px-4 border-l border-gray-300">
          <FaBriefcase className="text-gray-500 mr-2" />
          <select
            className="bg-transparent focus:outline-none"
            value={salary}
            onChange={(e) => setSalary(Number(e.target.value))}
          >
            <option value="">Tất cả mức lương</option>
            <option value="15000000">15,000,000</option>
            <option value="50000">50,000</option>
            <option value="70000">70,000</option>
            <option value="100000">100,000</option>
          </select>
        </div>

        {/* Search Button */}
        <button
          className="bg-green-500 text-white px-6 py-2 rounded-full ml-4 hover:bg-green-600 flex items-center"
          onClick={handleSearch}
        >
          <FaSearch className="mr-2" /> Tìm kiếm
        </button>
      </div>
    </div>
  )
}

export default SearchForm
