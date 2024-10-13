"use client";

import { useState } from 'react';
import SearchJob from './searchJob';
import ListJobs from './list-jobs';

const JobPage = () => {
  const [filters, setFilters] = useState({ name: '', location: '', JCategory: '' });

  const handleSearch = (name: string, location: string, JCategory: string) => {
    setFilters({ name, location, JCategory });
  };

  return (
    <>
      <SearchJob onSearch={handleSearch} />
      <ListJobs name={filters.name} location={filters.location} jCategory={filters.JCategory} />
    </>
  );
};
export default JobPage;