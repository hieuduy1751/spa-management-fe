import { Avatar, Button } from 'antd'
import { User2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '~/hooks/reduxHooks'
import { doLogout } from '~/store/slices/authSlice'

export default function UserDetail() {
  const user = useAppSelector((state) => state.user.user)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(doLogout())
      .then(() => navigate('/auth/login'))
      .catch((err) => console.log(err))
  }

  const handleUser = () => {
    navigate('/user/info')
  }

  return (
    <div className='flex items-center justify-center w-[200px]'>
      {user?.avatarUrl ? (
        <Avatar onClick={handleUser} src={user?.avatarUrl} size={48} className='cursor-pointer' />
      ) : (
        <Avatar
          onClick={handleUser}
          size={48}
          className='flex items-center justify-center cursor-pointer'
          icon={<User2 />}
        />
      )}
      <span onClick={handleLogout} className='text-red-500 ml-1 font-bold cursor-pointer'>
        Đăng xuất
      </span>
    </div>
  )
}
