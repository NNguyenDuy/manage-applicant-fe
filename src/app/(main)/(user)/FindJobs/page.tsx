'use client';
import { useEffect, useState } from 'react';

const FindJobs = () => {
  const [jobs, setJobs] = useState<any[]>([]); // Sử dụng any[] thay vì Job[]
  const [search, setSearch] = useState(''); // Biến lưu trữ từ khóa tìm kiếm

  const fetchJobs = async (title = '') => {
    try {
      const response = await fetch(`http://localhost:3000/api/jobs?title=${title}`); // Gọi API với từ khóa tìm kiếm
      const data = await response.json();
      setJobs(data);
    } catch (error) {
      console.error('Lỗi khi tải công việc', error);
    }
  };

  useEffect(() => {
    fetchJobs(); // Gọi API lấy tất cả công việc ban đầu
  }, []);

  const handleSearch = () => {
    fetchJobs(search); // Gọi API với từ khóa tìm kiếm
  };

  return (
    <div>
      <h1>Tìm kiếm công việc</h1>
      <input
        type="text"
        placeholder="Nhập tên công việc"
        value={search}
        onChange={(e) => setSearch(e.target.value)} // Cập nhật từ khóa tìm kiếm
      />
      <button onClick={handleSearch}>Tìm kiếm</button>

      <ul>
        {jobs.map((job) => (
          <li key={job._id}>
            <h2>{job.title}</h2>
            <p>{job.description}</p>
            <p>Salary: {job.salary}</p>
            <p>Position: {job.position}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FindJobs;
