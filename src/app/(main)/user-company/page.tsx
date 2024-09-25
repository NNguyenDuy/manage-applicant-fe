'use client'

import { GET_USER } from '#/shared/graphql/queries'
import { DetailUserCompany } from './index'
import { useQuery } from '@apollo/client'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const UserCompany = () => {
  const { data, loading } = useQuery(GET_USER)
  const user = data?.getInfoUser
  const router = useRouter()

  useEffect(() => {
    if (!loading && (!user || user?.role !== 'recruiter')) {
      router.push('/')
    }
  }, [loading, user, router])

  return (
    <div>
      <DetailUserCompany />
    </div>
  )
}

export default UserCompany
