import { Header } from './header'
import { Footer } from './footer'

export const MainLayout = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return (
    <>
      <Header />
      <main className="p-2 mt-16">{children}</main>
      <Footer />
    </>
  )
}
