import { Avatar, Divider, Typography } from 'antd'
import { Facebook, Mail, MapPin, PhoneCall, Twitter, Youtube } from 'lucide-react'
import SpaLogo from '~/assets/images/spa_logo.png'

const { Text } = Typography

export default function Footer() {
  return (
    <div className='w-full grid grid-cols-3 gap-8 px-32 bg-red-100 py-16'>
      <div className='flex flex-col'>
        <img className='w-32' src={SpaLogo} alt='spa logo' />
        <Text className='font-bold text-lg'>CÔNG TY CP TẬP ĐOÀN NATURE BEAUTY</Text>
        <Text>Viện thẩm mỹ DIVA luôn nỗ lực không ngừng nhằm mang đến Liệu trình hoàn hảo nhất cho khách hàng.</Text>
      </div>
      <div>
        <Text className='font-semibold text-lg'>Thông tin liên hệ</Text>
        <Divider className='my-2' />
        <div className='flex items-center'>
          <div className='w-1/6'>
            <PhoneCall />
          </div>
          <div className='w-5/6'>
            <Text>Hotline: 1900 0000</Text>
          </div>
        </div>
        <div className='flex items-center'>
          <div className='w-1/6'>
            <MapPin />
          </div>
          <div className='w-5/6'>
            <Text>Địa chỉ chi nhánh</Text>
          </div>
        </div>
        <div className='flex items-center mb-5'>
          <div className='w-1/6'>
            <Mail />
          </div>
          <div className='w-5/6'>
            <Text>Email: hieuduy1751@gmail.com</Text>
          </div>
        </div>
        <Text className='font-semibold text-lg'>Theo dõi chúng tôi</Text>
        <Divider className='my-2' />
        <div className='flex items-center gap-4'>
          <Avatar size={32} icon={<Facebook size={32} />} />
          <Avatar size={32} icon={<Youtube size={32} />} />
          <Avatar size={32} icon={<Twitter size={32} />} />
        </div>
      </div>
      <div>
        <Text className='font-semibold text-lg'>Chính sách</Text>
        <Divider className='my-2' />
        <Text className='block'>Chính sách bảo mật thông tin</Text>
        <Text className='block'>Chính sách đổi trả hàng</Text>
        <Text className='block'>Tuyển Dụng</Text>
        <Text className='block'>Hướng dẫn mua hàng</Text>

      </div>
    </div>
  )
}
