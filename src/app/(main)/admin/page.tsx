'use client'

import { GET_USER } from '@/shared/graphql/queries'
import { useQuery } from '@apollo/client'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const Admin = () => {
  const { data, loading } = useQuery(GET_USER)
  const user = data?.getInfoUser
  const router = useRouter()

  useEffect(() => {
    if (!user || user?.role !== 'admin') {
      router.push('/')
    }
  }, [loading, user, router])

  return <div>admin</div>
}

export default Admin
