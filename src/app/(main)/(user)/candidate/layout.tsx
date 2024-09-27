import { CandidateLayout } from '#/shared/layouts'

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <CandidateLayout>{children}</CandidateLayout>
}
