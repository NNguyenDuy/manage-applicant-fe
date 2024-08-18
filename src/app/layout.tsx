import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import clsx from 'clsx'
import './globals.css'
import { SideBar } from '@/shared/components'
import Header from '@/shared/components/header'
import ApolloClientProvider from '@/shared/graphql/ApolloClientProvider'

const roboto = Roboto({ subsets: ['latin'], weight: ['400', '500', '700'] })

export const metadata: Metadata = {
  title: 'Library',
  description: 'Library of books',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={clsx(roboto.className, 'flex p-2 gap-2 items-start')}>
        <ApolloClientProvider>
          <SideBar />
          <div className="flex flex-col flex-grow bg-[#101010] rounded-lg">
            <Header />
            {children}
          </div>
        </ApolloClientProvider>
      </body>
    </html>
  )
}
