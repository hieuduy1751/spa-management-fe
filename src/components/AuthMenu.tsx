import { Button, Popover } from 'antd'
import { User2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function AuthMenu() {
  const navigate = useNavigate()
  const MemberContent = (
    <div className='flex p-3 flex-col gap-2'>
      <Button type='primary' onClick={() => navigate('/auth/login')}>
        Đăng nhập
      </Button>
      <Button danger onClick={() => navigate('/auth/signup')}>
        Đăng ký
      </Button>
    </div>
  )

  return (
    <Popover content={MemberContent} title='Đăng nhập hoặc đăng ký' trigger='click'>
      <Button
        type='text'
        shape='round'
        icon={<User2 />}
        size='large'
        className='font-semibold flex items-center bg-orange-400 text-white'
      >
        Thành viên
      </Button>
    </Popover>
  )
}
