'use client';

import React, { useState } from "react";
import ManageSearchJobs from "./search-job";
import ManageListJobs from "./list-jobs";

const ManageJobs = () => {
  const [searchParams, setSearchParams] = useState({
    jtitle: "",
    Jlocation: "",
    jCategory: "",
    idDel: false,
  });

  const handleSearch = (jtitle: string, Jlocation: string, jCategory: string, idDel: boolean) => {
    setSearchParams({ jtitle, Jlocation, jCategory, idDel });
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Danh sách công việc</h1>
      
      {/* Tích hợp phần tìm kiếm */}
      <ManageSearchJobs onSearch={handleSearch} />

      {/* Render danh sách công việc dựa trên kết quả tìm kiếm */}
      <ManageListJobs searchParams={searchParams} />
    </div>
  );
};

export default ManageJobs;
