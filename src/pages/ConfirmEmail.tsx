import { Button, Col, Row, Typography } from 'antd'
import SpaLogo from '../assets/spa_logo.png'
import { useNavigate } from 'react-router-dom'

export default function ConfirmEmail() {
  const navigate = useNavigate()

  const handleNavigateSignIn = () => {
    navigate('/auth/login')
  }

  return (
    <div className='w-full h-[100vh] flex justify-center items-center'>
      <div className='w-96'>
        <div className='flex justify-center'>
          <img src={SpaLogo} alt='spa logo' className='w-48' />
        </div>
        <h4 className='text-4xl font-bold mb-4 text-center'>Đăng ký thành công</h4>
        <Typography.Text className='my-5 text-xl block text-center'>
          Vui lòng kiểm kiểm tra email và bấm vào nút xác thực để hoàn tất đăng ký!
        </Typography.Text>
        <Row>
          <Col span={12}>
            <div className='text-center'>
              <Typography.Text className='text-sm block text-center'>Đã xác thực?</Typography.Text>
              <Button className='text-center mt-3' type='primary' onClick={handleNavigateSignIn}>
                Trở về trang đăng nhập
              </Button>
            </div>
          </Col>
          <Col span={12}>
            <div className='text-center'>
              <Typography.Text className='text-sm block text-center'>Chưa nhận được email</Typography.Text>
              <Button className='text-center mt-3' danger>
                Gửi lại email xác thực
              </Button>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  )
}
