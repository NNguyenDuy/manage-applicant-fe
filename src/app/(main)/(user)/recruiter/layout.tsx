import { RecruiterLayout } from '#/shared/layouts'

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <RecruiterLayout>{children}</RecruiterLayout>
}
