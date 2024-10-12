'use client'

import { Icons } from '#/icons'
import { useState, useRef, useEffect } from 'react'
import {
  I_UserInput,
  I_CompanyInput,
  I_LocationInput,
} from '#/shared/typescript/authenticate'
import { useAuth } from '#/shared/hook/use-auth'
import { useRouter } from 'next/navigation'
import { E_Role } from '#/shared/typescript'
import { Select } from 'antd'
import Image from 'next/image'
import { notification } from 'antd'

const { Option } = Select

const Register = () => {
  const [registerValue, setRegisterValue] = useState<I_UserInput>({
    email: '',
    fullName: '',
    password: '',
    role: E_Role.CANDIDATE,
    company: {
      name: '',
      location: {
        address: '',
        city: '',
        country: 'Việt Nam',
      },
    },
  })

  const [togglePassword, setTogglePassword] = useState(false)
  const [cities, setCities] = useState<string[]>([])
  const passwordRef = useRef<HTMLInputElement>(null)

  const { handleRegister, user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (user) router.push('/')
  }, [user, router])

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await fetch(
          'https://provinces.open-api.vn/api/?depth=1'
        )
        const data = await response.json()
        setCities(data.map((city: any) => city.name))
      } catch (error) {
        console.error('Lỗi khi lấy danh sách thành phố:', error)
      }
    }
    registerValue.role === E_Role.RECRUITER && fetchCities()
  }, [registerValue.role])

  const handleInputChange = (field: keyof I_UserInput, value: any) => {
    setRegisterValue((prev) => ({ ...prev, [field]: value }))
  }

  const handleCompanyChange = (field: keyof I_CompanyInput, value: any) => {
    setRegisterValue((prev) => ({
      ...prev,
      company: {
        ...(prev.company as I_CompanyInput),
        [field]: value,
      },
    }))
  }

  const handleLocationChange = (field: keyof I_LocationInput, value: any) => {
    setRegisterValue((prev) => ({
      ...prev,
      company: {
        ...(prev.company as I_CompanyInput),
        location: {
          ...(prev.company?.location as I_LocationInput),
          [field]: value,
        },
      },
    }))
  }

  const handleFocus = () => {
    if (passwordRef.current) {
      passwordRef.current.focus()
      const length = passwordRef.current?.value.length || 0
      passwordRef.current?.setSelectionRange(length, length)
    }
  }
  const notify = (message: string, description: string) => {
    notification.error({
      message,
      description,
      placement: 'topRight',
      duration: 2,
    })
  }

  const validateInputs = () => {
    const { email, fullName, password, role, company } = registerValue

    if (!fullName.trim()) {
      notify('Validation Error', 'Họ và tên là bắt buộc')
      return false
    }

    if (!email.trim()) {
      notify('Validation Error', 'Email là bắt buộc')
      return false
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      notify('Validation Error', 'Email không hợp lệ')
      return false
    }

    if (!password.trim()) {
      notify('Validation Error', 'Mật khẩu là bắt buộc')
      return false
    } else if (password.length < 6) {
      notify('Validation Error', 'Mật khẩu phải có ít nhất 6 ký tự')
      return false
    }

    if (role === E_Role.RECRUITER) {
      if (!company?.name?.trim()) {
        notify('Validation Error', 'Tên công ty là bắt buộc')
        return false
      }
      if (!company?.location?.address?.trim()) {
        notify('Validation Error', 'Địa chỉ là bắt buộc')
        return false
      }
      if (!company?.location?.city) {
        notify('Validation Error', 'Thành phố là bắt buộc')
        return false
      }
    }
    return true
  }

  const handleSubmit = () => {
    validateInputs() && handleRegister(registerValue)
  }

  return (
    <div className="flex flex-col mt-5 justify-around lg:items-start items-center">
      <div className="flex gap-10 lg:ml-32">
        <div>
          <h1 className="text-primary font-bold text-2xl">
            Chào mừng bạn đến với JobCV
          </h1>
          <p className="text-gray-500 leading-10">
            Cùng xây dựng một hồ sơ nổi bật
          </p>
        </div>
      </div>
      <div className="flex lg:flex-row flex-col-reverse w-full items-center lg:items-start justify-center lg:gap-24 gap-5">
        <div className="lg:mt-5 flex gap-3 flex-col lg:w-2/5">
          <div className="relative">
            <Icons.User className="absolute text-primary w-5 h-5 left-3 top-3/4 transform -translate-y-3 " />
            <label className="font-medium text-gray-800">Họ và tên</label>
            <input
              type="text"
              onChange={(e) => handleInputChange('fullName', e.target.value)}
              placeholder="Nhập họ và tên của bạn"
              className="border-[1px] focus:outline-none focus:border-gray-400 border-gray-300 rounded-md p-2 px-10 w-full mt-2"
            />
          </div>

          <div className="relative">
            <Icons.MdEmail className="absolute text-primary w-5 h-5 left-3 top-3/4 transform -translate-y-3 " />
            <label className="font-medium text-gray-800">Email</label>
            <input
              type="email"
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="Nhập email của bạn"
              className="border-[1px] focus:outline-none focus:border-gray-400 border-gray-300 rounded-md p-2 px-10 w-full mt-2"
            />
          </div>

          <div className="relative">
            <Icons.RiLockPasswordFill className="absolute text-primary w-5 h-5 left-3 top-3/4 transform -translate-y-3 " />
            <label className="font-medium text-gray-800">Password</label>
            <input
              ref={passwordRef}
              type={togglePassword ? 'text' : 'password'}
              onChange={(e) => handleInputChange('password', e.target.value)}
              placeholder="Nhập mật khẩu của bạn"
              className="border-[1px] focus:outline-none focus:border-gray-400 border-gray-300 rounded-md p-2 px-10 w-full mt-2"
            />
            <button
              className="absolute border right-5 top-3/4 transform -translate-y-3/4"
              onClick={() => {
                setTogglePassword(!togglePassword)
                handleFocus()
              }}
            >
              {togglePassword ? <Icons.FiEye /> : <Icons.FiEyeOff />}
            </button>
          </div>

          <div
            className={`fade-in ${
              registerValue.role === E_Role.RECRUITER ? 'show' : ''
            }`}
          >
            <div className="relative">
              <Icons.Company className="absolute text-primary w-5 h-5 left-3 top-3/4 transform -translate-y-3 " />
              <label className="font-medium text-gray-800">Tên công ty</label>
              <input
                type="text"
                onChange={(e) => handleCompanyChange('name', e.target.value)}
                placeholder="Nhập tên công ty của bạn"
                className="border-[1px] focus:outline-none focus:border-gray-400 border-gray-300 rounded-md p-2 px-10 w-full mt-2"
              />
            </div>
            <div className="flex gap-4 items-center">
              <div className="relative">
                <Icons.Location className="absolute text-primary w-5 h-5 left-3 top-3/4 transform -translate-y-3 " />
                <label className="font-medium text-gray-800">Địa chỉ</label>
                <input
                  type="text"
                  onChange={(e) =>
                    handleLocationChange('address', e.target.value)
                  }
                  placeholder="Nhập địa chỉ"
                  className="border-[1px] focus:outline-none focus:border-gray-400 border-gray-300 rounded-md p-2 px-10 w-full mt-2"
                />
              </div>
              <div className="relative flex-grow">
                <label className="font-medium text-gray-800">Thành phố</label>
                <Select
                  placeholder="Chọn thành phố"
                  onChange={(value) => handleLocationChange('city', value)}
                  className="w-full mt-2"
                >
                  {cities.length > 0 ? (
                    cities.map((city) => (
                      <Option key={city} value={city}>
                        {city}
                      </Option>
                    ))
                  ) : (
                    <Option disabled>Không có dữ liệu thành phố</Option>
                  )}
                </Select>
              </div>
            </div>
          </div>
          <div className="flex items-center flex-col gap-3 mt-3">
            <button
              className="bg-primary text-white w-full rounded-md p-2 mt-2"
              onClick={() => handleSubmit()}
            >
              Đăng ký
            </button>
            <div className="flex gap-2 flex-col justify-center items-center">
              <span className="text-gray-500">Hoặc đăng nhập bằng</span>
              <button className="bg-[#e73b2f] flex justify-center items-center text-white w-32 gap-3 font-bold rounded-md p-2 mt-2">
                <Icons.FaGoogle />
                Google
              </button>
            </div>
          </div>
        </div>
        <div className="lg:mt-14 flex flex-col gap-5 justify-center items-center">
          <div className="flex items-center gap-2 mt-4">
            <label
              htmlFor="filter"
              className="switch"
              aria-label="Toggle Filter"
            >
              <input
                type="checkbox"
                id="filter"
                onChange={(e) =>
                  handleInputChange(
                    'role',
                    e.target.checked ? E_Role.RECRUITER : E_Role.CANDIDATE
                  )
                }
              />
              <span
                className={`${
                  registerValue.role === E_Role.RECRUITER ? 'text-gray-700' : ''
                }`}
              >
                Ứng viên
              </span>
              <span
                className={`${
                  registerValue.role === E_Role.CANDIDATE ? 'text-gray-700' : ''
                }`}
              >
                Nhà tuyển dụng
              </span>
            </label>
          </div>
          <Image
            src="/assets/images/register.webp"
            alt="Register"
            width={600}
            height={600}
            className="w-full max-w-md h-auto object-contain"
          />
        </div>
      </div>
    </div>
  )
}

export default Register
