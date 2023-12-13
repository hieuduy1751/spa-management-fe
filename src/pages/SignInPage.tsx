import { useState } from 'react'
import { Button, Checkbox, Form, Input, Spin, Typography } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../hooks/reduxHooks'
import { doLogin, setToken } from '../store/slices/authSlice'
import { LoadingOutlined } from '@ant-design/icons'
import SpaLogo from '../assets/spa_logo.png'
import { login } from '~/services/authentication'
import { getUser } from '~/store/slices/userSlice'
import { persistRole, persistToken, persistUsername } from '~/services/localStorage'

type FieldType = {
  username?: string
  password?: string
  remember?: string
}

export default function SignInPage() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const onFinish = async (formValues: any) => {
    setErrorMessage('')
    setLoading(true)
    try {
      const res = await login(formValues.username, formValues.password)
      setLoading(false)
      if (res.status === 200) {
        dispatch(getUser(formValues.username))
        dispatch(setToken(res.data.token))
        persistToken(res.data.token)
        persistRole(res.data.role)
        persistUsername(res.data.username)
        navigate('/')
      } else {
        setErrorMessage(res.data.message)
      }
    } catch (err) {
      setLoading(false)
    }
  }
  const onFinishFailed = (errorInfo: any) => {
    console.log('failed', errorInfo)
  }

  const handleSignUp = () => {
    navigate('/auth/signup')
  }

  const handleGoHome = () => {
    navigate('/')
  }

  return (
    <div className='w-full h-[100vh] flex justify-center items-center'>
      <div className='w-96'>
        <div className='flex justify-center'>
          <img onClick={handleGoHome} src={SpaLogo} alt='spa logo' className='w-48 cursor-pointer' />
        </div>
        <h4 className='text-4xl font-bold mb-4'>Đăng nhập</h4>
        <Form
          name='basic'
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete='off'
        >
          <Form.Item<FieldType>
            label='Tên đăng nhập'
            name='username'
            rules={[
              {
                required: true,
                message: 'Tên đăng nhập không được để trống !'
              }
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label='Mật khẩu'
            name='password'
            rules={[{ required: true, message: 'Mật khẩu không được để trống !' }]}
          >
            <Input.Password />
          </Form.Item>

          {errorMessage !== '' && (
            <Typography.Text className='text-center block' type='danger'>
              {errorMessage}
            </Typography.Text>
          )}

          <Form.Item<FieldType> name='remember' valuePropName='checked' wrapperCol={{ offset: 8, span: 16 }}>
            <Checkbox>Ghi nhớ đăng nhập</Checkbox>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type='primary' htmlType='submit'>
              Xác nhận
              {loading && (
                <Spin indicator={<LoadingOutlined className='ml-2 text-white' style={{ fontSize: 18 }} spin />} />
              )}
            </Button>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button onClick={handleSignUp} type='link' htmlType='button'>
              Đăng ký
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
