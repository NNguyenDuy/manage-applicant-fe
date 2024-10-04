import { Icons } from '#/icons'

export const ROOTS = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
}

export const PATHS = {
  HOME: [
    {
      name: 'Việc làm',
      path: `/jobs`,
      icon: <Icons.Work size={25} className="" />,
    },
    {
      name: 'Công ty',
      path: `/companies`,
      icon: <Icons.Company size={25} className="" />,
    },
    {
      name: 'Liên hệ',
      path: `/contact`,
      icon: <Icons.Contact size={25} className="" />,
    },
    {
      name: 'Cẩm nang nghề nghiệp',
      path: `/`,
      icon: <Icons.Tip size={25} className="" />,
    },
  ],
}
