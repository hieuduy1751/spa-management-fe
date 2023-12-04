import { useState } from 'react'
import { Button, Form, Input, Spin, Typography } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../hooks/reduxHooks'
import { doRegister } from '../store/slices/authSlice'
import { LoadingOutlined } from '@ant-design/icons'
import SpaLogo from '../assets/spa_logo.png'

type FieldType = {
  username?: string
  password?: string
  passwordConfirm?: string
}

export default function SignUpPage() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const onFinish = (formValues: any) => {
    setErrorMessage('')
    setLoading(true)
    dispatch(
      doRegister({
        username: formValues.username,
        password: formValues.password,
        passwordConfirm: formValues.passwordConfirm,
        email: formValues.email
      })
    )
      .unwrap()
      .then(() => {
        navigate('/auth/login')
        setLoading(false)
      })
      .catch((err) => {
        console.log(err.message)
        setErrorMessage(err.message)
        setLoading(false)
      })
  }
  const onFinishFailed = (errorInfo: any) => {
    console.log('failed', errorInfo)
  }

  const handleLogin = () => {
    navigate('/auth/login')
  }

  return (
    <div className='w-full h-[100vh] flex justify-center items-center'>
      <div className='w-96'>
        <div className='flex justify-center'>
          <img src={SpaLogo} alt='spa logo' className='w-48' />
        </div>
        <h4 className='text-4xl font-bold mb-4'>Đăng ký</h4>
        <Form
          name='basic'
          labelCol={{ span: 10 }}
          wrapperCol={{ span: 14 }}
          style={{ maxWidth: 900 }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete='off'
        >
          <Form.Item label='Email' name='email' rules={[{ required: true }, { type: 'email' }]}>
            <Input />
          </Form.Item>
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

          <Form.Item<FieldType>
            label='Xác nhận mật khẩu'
            name='passwordConfirm'
            rules={[{ required: true, message: 'Xác nhận mật khẩu không được để trống !' }]}
          >
            <Input.Password />
          </Form.Item>

          {errorMessage !== '' && (
            <Typography.Text className='text-center block' type='danger'>
              {errorMessage}
            </Typography.Text>
          )}

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type='primary' htmlType='submit'>
              Xác nhận
              {loading && (
                <Spin indicator={<LoadingOutlined className='ml-2 text-white' style={{ fontSize: 18 }} spin />} />
              )}
            </Button>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button onClick={handleLogin} type='link' htmlType='button'>
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
