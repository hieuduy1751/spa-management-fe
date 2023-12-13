import { Menu, Typography, Layout, MenuProps } from 'antd'
import SpaLogo from '~/assets/images/spa_logo.png'
import AuthMenu from './AuthMenu'
import { useNavigate } from 'react-router-dom'
import UserDetail from './UserDetail'

const { Text } = Typography
const { Header: AntdHeader } = Layout

export default function Header() {
  const token = localStorage.getItem('token') || null
  const navigate = useNavigate()

  const listMenu: MenuProps['items'] = [
    {
      key: 've-chung-toi',
      label: 'Về chúng tôi',
      onClick: () => navigate('/')
    },
    {
      key: 'dat-lich',
      label: 'Đặt lịch',
      onClick: () => navigate('/appointment')
    },
    {
      key: 'goi-dich-vu',
      label: 'Liệu trình',
      onClick: () => navigate('/services')
    }
  ]

  return (
    <AntdHeader className='px-32 flex items-center justify-between bg-white h-28'>
      <a href='/'>
        <img src={SpaLogo} alt='logo' className='w-32' />
      </a>
      <div className='flex items-center justify-end gap-1'>
        <Menu
          theme='light'
          mode='horizontal'
          items={listMenu}
          className='h-28 items-center text-green-500 font-semibold w-full justify-end'
        />
        <div className='mx-3 rounded-full bg-green-500 px-3 h-10 flex items-center w-64'>
          <Text className='text-white font-bold'>Hotline: 1900 0000</Text>
        </div>
        {!token ? <AuthMenu /> : <UserDetail />}
      </div>
    </AntdHeader>
  )
}
