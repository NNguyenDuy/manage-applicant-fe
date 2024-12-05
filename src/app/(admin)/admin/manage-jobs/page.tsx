'use client';

import React, { useState } from "react";
import ManageSearchJobs from "./search-job";
import ManageListJobs from "./list-jobs";

const ManageJobs = () => {
    const [searchParams, setSearchParams] = useState({
        jtitle: "",
        Jlocation: "",
        jCategory: "",
        isDel: false,
    });

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Danh sách công việc</h1>

            <ManageListJobs searchParams={searchParams} />
        </div>
    );
};

export default ManageJobs;
