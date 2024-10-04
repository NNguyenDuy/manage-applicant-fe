'use client'

import { useAuth } from '#/shared/hook/use-auth'

const SettingsUser = () => {
  const { handleLogout } = useAuth()

  return (
    <div className="w-4/6">
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="font-semibold text-xl">Cài đặt</h1>
        </div>
        <button
          className="text-white rounded-sm bg-primary px-4 py-2 font-bold"
          onClick={handleLogout}
        >
          Đăng xuất
        </button>
      </div>
    </div>
  )
}

export default SettingsUser
