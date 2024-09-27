import { MainLayout } from '#/shared/layouts'

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <MainLayout>{children}</MainLayout>
}
