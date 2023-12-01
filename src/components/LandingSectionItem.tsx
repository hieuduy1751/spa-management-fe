import { Typography } from 'antd'
import { ReactNode } from 'react'

const { Text } = Typography

export type LandingSectionItemProps = {
  title: string
  body: string
  icon: ReactNode
}

export default function LandingSectionItem({ title, body, icon }: LandingSectionItemProps) {
  return (
    <div className='flex items-center'>
      {icon}
      <div className='ml-5 flex flex-col justify-center'>
        <Text className='font-bold text-[1.5rem] text-green-600'>{title}</Text>
        <Text className='text-[1rem]'>{body}</Text>
      </div>
    </div>
  )
}
