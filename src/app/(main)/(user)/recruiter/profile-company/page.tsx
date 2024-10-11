'use client'

import React from 'react'
import ManageInfoCompanies from './manage-infor-companies'
import CompanyList from './company-list'

const ProfileCompany = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Quản lý công ty</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <CompanyList />
        <ManageInfoCompanies />
      </div>
    </div>
  )
}

export default ProfileCompany