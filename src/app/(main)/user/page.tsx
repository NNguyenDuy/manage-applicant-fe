'use client'

import { GET_USER } from '@/shared/graphql/queries'
import { DetailUser } from './index'
import { useQuery } from '@apollo/client'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const User = () => {
  const { data, loading } = useQuery(GET_USER)
  const user = data?.getInfoUser
  const router = useRouter()

  useEffect(() => {
    if (!loading && (!user || user?.role !== 'candidate')) {
      router.push('/')
    }
  }, [loading, user, router])

  return (
    <div>
      <DetailUser />
    </div>
  )
}

export default User
