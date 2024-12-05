"use client";

import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_ALL_COMPANIES } from '#/shared/graphql/queries/company-queries';
import CompanyList from './list-companies';

const Company = () => {
  const [filters] = useState({
    Jtitle: '',
    Jlocation: '',
    JCategory: '',
  });

  const { data, loading, error } = useQuery(GET_ALL_COMPANIES);

  if (loading) {
    return <p>Đang tải...</p>;
  }

  if (error) {
    return <p>Đã xảy ra lỗi: {error.message}</p>;
  }

  return (
    <div>
      <CompanyList companies={data?.getAllCompanies || []} />
    </div>
  );
};

export default Company;
