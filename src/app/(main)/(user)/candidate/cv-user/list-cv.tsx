import { Worker, Viewer } from '@react-pdf-viewer/core'
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'
import { useMutation } from '@apollo/client'
import { Icons } from '#/icons'
import { UPDATE_CANDIDATE_PROFILE } from '#/shared/graphql/queries'
import { useAuth } from '#/shared/hook/use-auth'
import { useState } from 'react'
import { Modal, Input, notification, Upload, Button } from 'antd'
import { ListSkill } from './list-skill'

export const ListCV: React.FC = () => {
  const defaultLayoutPluginInstance = defaultLayoutPlugin()
  const { user, refetchUser } = useAuth()

  return (
    <div className="flex flex-col gap-5">
      <ListSkill />
      <div className="flex flex-col gap-4 w-full bg-c-white p-5 rounded-md">
        <div className="flex justify-between">
          <h1 className="font-semibold text-xl">CV đã upload trên JobCV</h1>
          <Upload>
            <Button
              className="select-none cursor-pointer text-sm items-center gap-1 rounded-3xl p-2 px-3 bg-c-green text-white"
              icon={<Icons.Upload />}
            >
              Upload
            </Button>
          </Upload>
        </div>
        <div className="flex flex-col gap-3">
          <h1 className="font-medium text-slate-700 opacity-90">
            Danh sách CV
          </h1>
          <ul className="ml-2 grid grid-cols-2 gap-2">
            {user?.candidateProfile?.cvUrl?.map((cv) => (
              <li
                className="rounded-3xl group cursor-pointer bg-c-gray p-1 px-2 flex items-center justify-center gap-2"
                key={cv}
              >
                <div className="border rounded-lg shadow-md p-2 w-40 h-56 overflow-hidden flex items-center justify-center">
                  <Worker
                    workerUrl={`https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js`}
                  >
                    <Viewer
                      fileUrl={cv.replace('/view', '/uc')}
                      plugins={[defaultLayoutPluginInstance]}
                    />
                  </Worker>
                </div>
                <Icons.Close
                  className="bg-[#e4e4e4] rounded-full text-slate-700 group-hover:bg-c-red group-hover:text-white duration-300"
                  size={22}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
