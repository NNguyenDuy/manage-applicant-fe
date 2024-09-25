'use client'
import { Icons } from '#/icons'
import { useRouter } from 'next/navigation'
import { useState, useRef } from 'react'
import Image from 'next/image'
import { LOGIN } from '#/shared/graphql/queries'
import { useMutation } from '@apollo/client'
import { toast } from 'react-toastify'

const Login = () => {
  const [togglePassword, setTogglePassword] = useState(false)
  const passwordRef = useRef<HTMLInputElement>(null)
  const [login] = useMutation(LOGIN)
  const router = useRouter()
  const [infoLogin, setInfoLogin] = useState({
    email: '',
    password: '',
  })

  const handleFocus = () => {
    if (passwordRef.current) {
      passwordRef.current.focus()
      setTimeout(() => {
        const length = passwordRef.current?.value.length || 0
        passwordRef.current?.setSelectionRange(length, length)
      }, 0)
    }
  }

  const handleStoreToken = (token: string) => {
    localStorage.setItem('auth', token)
  }

  const handleLogin = () => {
    login({
      variables: {
        email: infoLogin.email,
        password: infoLogin.password,
      },
    })
      .then((res) => {
        if (res.data?.login) {
          handleStoreToken(res.data.login.token)
          toast.success('Đăng nhập thành công!')
          router.push('/')
        } else {
          toast.error('Tài khoản hoặc mật khẩu không chính xác!')
        }
      })
      .catch((err) => {
        toast.error('Đăng nhập thất bại!')
      })
  }

  return (
    <div className="container mx-36 mt-10 flex">
      <div className="w-1/2">
        <h1 className="text-primary font-bold text-2xl">
          Chào mừng bạn đã quay trở lại
        </h1>
        <p className="text-gray-500 leading-10">
          Cùng xây dựng một hồ sơ nổi bật và nhận được các cơ hội sự nghiệp lý
          tưởng
        </p>
        <div className="mt-10 flex gap-5 flex-col">
          <div className="relative">
            <Icons.MdEmail className="absolute text-primary w-5 h-5 left-3 top-3/4 transform -translate-y-3 " />
            <label className="font-medium text-gray-800">Email</label>
            <input
              type="email"
              onChange={(e) =>
                setInfoLogin({ ...infoLogin, email: e.target.value })
              }
              placeholder="Nhập email của bạn"
              className="border-[1px] focus:outline-none focus:border-gray-400 border-gray-300 rounded-md p-2 px-10 w-full mt-2"
            />
          </div>
          <div className="relative ">
            <Icons.RiLockPasswordFill className="absolute text-primary w-5 h-5 left-3 top-3/4 transform -translate-y-3 " />
            <label className="font-medium text-gray-800">Password</label>
            <input
              ref={passwordRef}
              onChange={(e) =>
                setInfoLogin({ ...infoLogin, password: e.target.value })
              }
              type={`${!togglePassword ? 'password' : 'text'}`}
              placeholder="Nhập mật khẩu của bạn"
              className="border-[1px] focus:border-gray-400  focus:outline-none border-gray-300 rounded-md p-2 px-10 w-full mt-2"
            />
            <button
              className="absolute  border right-5 top-3/4 transform -translate-y-3/4 "
              onClick={() => {
                setTogglePassword(!togglePassword)
                handleFocus()
              }}
            >
              {togglePassword ? <Icons.FiEye /> : <Icons.FiEyeOff />}
            </button>
          </div>
          <div className="flex items-end flex-col gap-3 mt-3">
            <button className="text-primary">Quên mật khẩu?</button>
            <button
              className="bg-primary text-white w-full rounded-md p-2 mt-2"
              onClick={handleLogin}
            >
              Đăng nhập
            </button>
          </div>
          <div className="flex gap-2 flex-col justify-center items-center">
            <span className="text-gray-500">Hoặc đăng nhập bằng</span>
            <button className="bg-[#e73b2f] flex justify-center items-center text-white w-32 gap-3 font-bold rounded-md p-2 mt-2">
              <Icons.FaGoogle />
              Google
            </button>
          </div>
        </div>
      </div>
      <div className="w-1/2 flex items-center justify-center">
        <Image
          src="/assets/images/banner-login.jpg"
          alt="banner"
          className="object-contain w-auto h-auto"
          layout="intrinsic"
          width={350}
          height={350}
        />
      </div>
    </div>
  )
}

export default Login
