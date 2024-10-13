"use client";

import { useState } from 'react';
import SearchJob from './searchJob';
import ListJobs from './list-jobs';

const JobPage = () => {
  const [filters, setFilters] = useState({ Jtitle: '', Jlocation: '', JCategory: '' });

  const handleSearch = (Jtitle: string, Jlocation: string, JCategory: string) => {
    setFilters({ Jtitle, Jlocation, JCategory });
  };

  return (
    <>
      <SearchJob onSearch={handleSearch} />
      <ListJobs name={filters.Jtitle} location={filters.Jlocation} jCategory={filters.JCategory} />
    </>
  );
};
export default JobPage;