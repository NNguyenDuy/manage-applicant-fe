export const ROOTS = {
  ADMIN: '/admin',
}

export const PATHS = {
  HOME: [
    {
      name: 'Quản lý công việc',
      path: `${ROOTS.ADMIN}/manage-jobs`,
    },
    {
      name: 'Quản lý user',
      path: `${ROOTS.ADMIN}/manage-users`,
    },
  ],
}
