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
    const token = localStorage.getItem('auth')

    if (!loading && !token && !user) {
      router.push('/login')
      return
    }

    if (!loading && user && !token) {
      refetchUser()
    }

    if (token && !user) {
      refetchUser()
    }
  }, [loading, user, refetchUser, router])

  useEffect(() => {
    if (!loading && user) {
      if (user.role !== 'admin' && pathname.startsWith(adminRoute)) {
        router.push('/')
      } else if (
        user.role !== 'candidate' &&
        pathname.startsWith(candidateRoute)
      ) {
        router.push('/')
      } else if (
        user.role !== 'recruiter' &&
        pathname.startsWith(recruiterRoute)
      ) {
        router.push('/')
      }
    }
  }, [pathname, user, loading, router])

  useEffect(() => {
    const token = localStorage.getItem('auth')
    if (user && !token) {
      refetchUser()
    }
  }, [pathname, user, refetchUser])

  if (loading) {
    return <HashLoader className="text-primary" loading={loading} size={50} />
  }

  return <>{children}</>
}
