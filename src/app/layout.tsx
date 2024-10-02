import { ConfigProvider } from 'antd'
import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import clsx from 'clsx'
import './globals.css'
import ApolloClientProvider from '#/shared/graphql/ApolloClientProvider'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { AuthProvider } from '#/shared/hook/use-auth'
import { AuthGuard } from '#/shared/hook/auth-guard'

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
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: '#00b14f',
              colorSuccess: '#28a745',
              colorWarning: '#ffc107',
              colorError: '#da4538',
              colorInfo: '#17a2b8',
              colorBgLayout: '#f8f9fa',
              colorText: '#343a40',
            },
          }}
        >
          <ApolloClientProvider>
            <AuthProvider>
              <AuthGuard>
                <ToastContainer />
                {children}
              </AuthGuard>
            </AuthProvider>
          </ApolloClientProvider>
        </ConfigProvider>
      </body>
    </html>
  )
}
