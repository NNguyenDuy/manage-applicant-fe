import { Icons } from '#/icons'
import { I_PathItem } from '#/shared/typescript'

export const ROOTS = {
  CANDIDATE: '/candidate',
}

export const PATHS: {
  HOME: I_PathItem[]
} = {
  HOME: [
    {
      key: '1',
      label: 'Thông tin',
      icon: <Icons.Dashboard />,
      path: `${ROOTS.CANDIDATE}/profile-user`,
    },
    {
      key: '2',
      label: 'Sơ yếu lý lịch',
      icon: <Icons.CV />,
      path: `${ROOTS.CANDIDATE}/cv-user`,
    },
    {
      key: '3',
      label: 'Cài đặt',
      icon: <Icons.Setting />,
      path: `${ROOTS.CANDIDATE}/settings`,
    },
  ],
}
