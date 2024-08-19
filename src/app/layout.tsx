import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import clsx from 'clsx'
import './globals.css'
import ApolloClientProvider from '@/shared/graphql/ApolloClientProvider'
import { Footer, Header } from '@/shared/components'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const roboto = Roboto({ subsets: ['latin'], weight: ['400', '500', '700'] })

export const metadata: Metadata = {
  title: 'JobCV',
  description: 'Job for Applicant',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={clsx(roboto.className)}>
        <ApolloClientProvider>
          <Header />
          {children}
          <Footer />
          <ToastContainer />
        </ApolloClientProvider>
      </body>
    </html>
  )
}
