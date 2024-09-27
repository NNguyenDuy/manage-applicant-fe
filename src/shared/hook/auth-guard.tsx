'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'
import HashLoader from 'react-spinners/HashLoader'

import { useAuth } from './use-auth'

const candidateRoute = '/candidate'
const recruiterRoute = '/recruiter'
const adminRoute = '/admin'

export const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const { loading, user, refetchUser } = useAuth()
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    if (!loading) {
      const token = localStorage.getItem('auth')
      if (!token && user) {
        refetchUser()
      } else if (token && !user) {
        refetchUser()
      }
    }
  }, [loading, user, refetchUser])

  useEffect(() => {
    if (!loading) {
      if (user?.role !== 'admin' && pathname.startsWith(adminRoute)) {
        router.push('/')
      } else if (
        user?.role !== 'candidate' &&
        pathname.startsWith(candidateRoute)
      ) {
        router.push('/')
      } else if (
        user?.role !== 'recruiter' &&
        pathname.startsWith(recruiterRoute)
      ) {
        router.push('/')
      }
    }
  }, [pathname, user, loading, router])

  if (loading) {
    return <HashLoader className="text-primary" loading={loading} size={50} />
  }

  return <>{children}</>
}
