'use client'

import {
  createContext,
  useEffect,
  useState,
  useContext,
  useCallback,
} from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { usePathname, useRouter } from 'next/navigation'
import { notification } from 'antd'
import { I_UserInput } from '#/shared/typescript/authenticate'
import { GET_INFO_USER, LOGIN, REGISTER } from '#/shared/graphql/queries'
import { I_User } from '../typescript'

interface AuthContextType {
  user: I_User | null
  loading: boolean
  handleLogin: (infoLogin: any) => Promise<any>
  handleRegister: (infoRegister: I_UserInput) => Promise<I_UserInput>
  handleLogout: () => void
  refetchUser: () => Promise<void>
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<I_User | null>(null)
  const [login] = useMutation(LOGIN)
  const [register] = useMutation(REGISTER)
  const { refetch, loading: queryLoading } = useQuery(GET_INFO_USER)
  const pathname = usePathname()
  const router = useRouter()

  const refetchUser = useCallback(async () => {
    try {
      const { data } = await refetch()
      setUser(data?.getInfoUser || null)
    } catch (error) {
      setUser(null)
    }
  }, [refetch])

  useEffect(() => {
    refetchUser()
  }, [refetchUser, pathname])

  const handleRegister = async (infoRegister: I_UserInput) => {
    try {
      const res = await register({
        variables: {
          email: infoRegister.email,
          password: infoRegister.password,
          fullName: infoRegister.fullName,
          role: infoRegister.role,
          company: infoRegister.company,
        },
      })
      if (res.data.register) {
        localStorage.setItem('auth', res.data.register.token)
        await refetchUser()
      }
      res.data.register
        ? notification.success({
            message: 'Thành công',
            description: 'Đăng ký thành công',
          })
        : notification.error({
            message: 'Thất bại',
            description: 'Đăng ký thất bại',
          })
      return res.data.register
    } catch (error) {
      return null
    }
  }

  const handleLogin = async (infoLogin: any) => {
    try {
      const res = await login({
        variables: {
          email: infoLogin.email,
          password: infoLogin.password,
        },
      })
      if (res.data.login) {
        localStorage.setItem('auth', res.data.login.token)
        await refetchUser()
      }
      res.data.login
        ? notification.success({
            message: 'Thành công',
            description: 'Đăng nhập thành công',
          })
        : notification.error({
            message: 'Thất bại',
            description: 'Đăng nhập thất bại',
          })
      return res.data.login
    } catch (error) {
      return null
    }
  }

  const handleLogout = useCallback(() => {
    localStorage.removeItem('auth')
    setUser(null)
    router.push('/')
  }, [router])

  return (
    <AuthContext.Provider
      value={{
        user,
        loading: queryLoading,
        handleLogin,
        handleRegister,
        handleLogout,
        refetchUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthProvider')
  }
  return context
}
