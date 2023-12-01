import {
  BadgePlus,
  CalendarDays,
  Receipt,
  User2} from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Menu, type MenuProps } from 'antd'

type MenuItem = Required<MenuProps>['items'][number]

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group'
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type
  } as MenuItem
}

export default function Sidebar() {
  const navigate = useNavigate()

  const items: MenuItem[] = [
    getItem('Thông tin cá nhân', 'info', <User2 />),
    getItem('Theo dõi liệu trình', 'treatment-detail', <BadgePlus />),
    getItem('Cuộc hẹn', 'calendar', <CalendarDays />),
    getItem('Hóa đơn', 'invoice', <Receipt />),
  ]

  const handleNavigate = ({ key }) => {
    switch (key) {
      case 'treatment-detail':
        navigate('/user/treatments')
        break
      case 'calendar':
        navigate('/user/appointment')
        break
      case 'invoice':
        navigate('/user/invoice')
        break

      default:
        break
    }
  }

  return (
    <div className='w-full h-[100vh] flex flex-col justify-between px-3'>
      <div className='flex flex-col gap-4 mt-4 overflow-auto'>
        <Menu
          mode='inline'
          items={items}
          onClick={handleNavigate}
          className='rounded-xl'
          defaultSelectedKeys={['dashboard']}
        />
      </div>
      <div>
        <div className='gap-4 p-2 mb-3 rounded-md text-center cursor-pointer hover:bg-gray-300'></div>
      </div>
    </div>
  )
}
