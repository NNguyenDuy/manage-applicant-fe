import { Icons } from '#/icons'
import { I_PathItem } from '#/shared/typescript'

export const ROOTS = {
  ADMIN: '/admin',
}

export const PATHS: {
  HOME: I_PathItem[]
} = {
  HOME: [
    {
      key: '1',
      label: 'Bảng tin',
      icon: <Icons.Dashboard />,
      path: `${ROOTS.ADMIN}`,
    },
    {
      key: '2',
      label: 'Quản lý công việc',
      path: `${ROOTS.ADMIN}/manage-jobs`,
      icon: <Icons.Dashboard />,
    },
    {
      key: '3',
      label: 'Quản lý user',
      path: `${ROOTS.ADMIN}/manage-users`,
      icon: <Icons.Setting />,
    },
  ],
}
