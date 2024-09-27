import { AdminLayout } from '#/shared/layouts'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <AdminLayout>{children}</AdminLayout>
}
