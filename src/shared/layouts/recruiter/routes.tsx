import { Icons } from '#/icons'
import { I_PathItem } from '#/shared/typescript'

export const ROOTS = {
  RECRUITER: '/recruiter',
}

export const PATHS: {
  HOME: I_PathItem[]
} = {
  HOME: [
    {
      key: '1',
      label: 'Bảng tin',
      icon: <Icons.Dashboard />,
      path: `${ROOTS.RECRUITER}`,
    },
    {
      key: '2',
      label: 'Thông tin CTY',
      icon: <Icons.CompanyUser />,
      path: `${ROOTS.RECRUITER}/profile-company`,
    },
    {
      key: '3',
      label: 'Cài đặt',
      icon: <Icons.Setting />,
      path: `${ROOTS.RECRUITER}/settings`,
    },
    {
      key: '4',
      label: 'Tìm kiếm công việc',
      icon: <Icons.Setting />,
      path: `${ROOTS.RECRUITER}/find-jobs`,
    },
  ],
}
