import { Button, Form, Typography, notification } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import dayjs from 'dayjs'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AppointmentDatePicker from '~/components/AppointmentDatePicker'
import EmployeeSearchInput from '~/components/SearchInput/EmployeeSearchInput'
import ServiceSearchInput from '~/components/SearchInput/ServiceSearchInput'
import { useAppDispatch, useAppSelector } from '~/hooks/reduxHooks'
import { addAppointment } from '~/store/slices/appointmentSlice'
import { AppointmentType } from '~/types/appointment'

type NotificationType = 'success' | 'info' | 'warning' | 'error'
export default function AppointmentPage() {
  const [form] = Form.useForm()
  const dispatch = useAppDispatch()
  const [loading, setLoading] = useState<boolean>(false)
  const [api, contextHolder] = notification.useNotification()
  const user = useAppSelector((state) => state.user.user)
  const [idEmployee, setIdEmployee] = useState<number | null>()
  const [idProduct, setIdProduct] = useState<number | null>()
  const [time, setTime] = useState<any | null>()
  const navigate = useNavigate()

  const validateMessages = {
    required: '${label} không được để trống!',
    types: {
      email: '${label} không hợp lệ!',
      number: '${label} không hợp lệ!'
    }
  }

  const openNotificationWithIcon = (type: NotificationType, title, description) => {
    api[type]({
      message: title,
      description
    })
  }

  const handleOnFinish = async (values: any) => {
    const newAppointment: AppointmentType = {
      ...values,
      time: dayjs(values.time).add(7, 'hours').format('YYYY-MM-DD HH:mm:ss'),
      idCustomer: user?.id
    }
    setLoading(true)
    try {
      await dispatch(addAppointment(newAppointment))
      setLoading(false)
      openNotificationWithIcon('success', 'Thành công', 'Đặt cuộc hẹn thành công!')
      form.resetFields()
      navigate('/user/appointment')
    } catch (err: any) {
      openNotificationWithIcon('error', 'Thất bại', err.message)
    }
  }

  return (
    <div className='w-full h-full flex flex-col justify-center items-center pt-10'>
      <Typography.Text className='text-3xl mb-5 font-bold'>Đặt lịch hẹn</Typography.Text>
      {contextHolder}
      <Form
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        layout='horizontal'
        className='h-[60vh] w-2/3 overflow-auto px-3'
        form={form}
        onFinish={handleOnFinish}
        validateMessages={validateMessages}
      >
        <Form.Item name='idEmployee' rules={[{ required: true }]} label='Nhân viên'>
          <EmployeeSearchInput value={idEmployee} onChange={setIdEmployee} placeholder='Chọn nhân viên' />
        </Form.Item>
        <Form.Item name='idProduct' rules={[{ required: true }]} label='Dịch vụ'>
          <ServiceSearchInput value={idProduct} onChange={setIdProduct} placeholder='Chọn dịch vụ' />
        </Form.Item>
        <Form.Item name='time' rules={[{ required: true }]} label='Thời gian'>
          <AppointmentDatePicker disabled={false} value={time} onChange={setTime} placeholder='Chọn ngày giờ' />
        </Form.Item>
        <Form.Item name='note' label='Ghi chú'>
          <TextArea placeholder='Thêm ghi chú' />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          {user?.firstName && user?.lastName && user.phoneNumber ? (
            <Button type='primary' htmlType='submit'>
              Đặt hẹn
            </Button>
          ) : (
            <div className='flex items-center'>
              <Typography.Text className='text-red-500 mr-3'>Bạn cần cập nhật thông tin trước khi đặt hẹn</Typography.Text>
              <Button type='primary' htmlType='button' onClick={() => navigate('/user/info')}>Đi tới trang cập nhật</Button>
            </div>
          )}
        </Form.Item>
      </Form>
    </div>
  )
}
