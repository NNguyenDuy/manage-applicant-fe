import React from 'react'

const JobList: React.FC<{ jobs: any[] }> = ({ jobs }) => {
  return (
    <div className="max-w-6xl mx-auto py-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Kết quả thông tin tìm kiếm</h2>
      {jobs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <div
              key={job._id}
              className="bg-white rounded-lg shadow-lg p-4 border border-gray-200"
            >
              <div className="mb-4">
                <h3 className="text-lg font-bold truncate">{job.title}</h3>
                <p className="text-gray-600 text-sm truncate">{job.company}</p>
              </div>
              <p className="text-gray-800 font-medium mb-2">
                {job.salary} triệu
              </p>
              <p className="text-gray-600 text-sm mb-2">{job.position}</p>
              <p className="text-gray-500 text-sm">{job.location}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">Chưa tìm thấy công việc nào</p>
      )}
    </div>
  )
}

export default JobList
