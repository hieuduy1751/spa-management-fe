import { Button, Form, Input, Typography, notification } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import dayjs from 'dayjs'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AppointmentDatePicker from '~/components/AppointmentDatePicker'
import ServiceSearchInput from '~/components/SearchInput/ServiceSearchInput'
import { useAppDispatch, useAppSelector } from '~/hooks/reduxHooks'
import { createAppointment } from '~/services/appointment'
import { createCustomer } from '~/services/customer'
import { addAppointment } from '~/store/slices/appointmentSlice'
import { setUser } from '~/store/slices/userSlice'
import { AppointmentType } from '~/types/appointment'

type NotificationType = 'success' | 'info' | 'warning' | 'error'
export default function AppointmentPage() {
  const [form, userForm] = Form.useForm()
  const dispatch = useAppDispatch()
  const [loading, setLoading] = useState<boolean>(false)
  const [api, contextHolder] = notification.useNotification()
  const auth = useAppSelector((state) => state.auth.token)
  const user = useAppSelector((state) => state.user.user)
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
      idCustomer: user?.id,
      idEmployee: 1
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

  const handleOnUserFinish = async (values: any) => {
    if (await form.validateFields()) {
      const newCustomer = {
        ...values,
        gender: 'MALE'
      }
      setLoading(true)
      try {
        if (!user) {
          const res = await createCustomer(newCustomer)
          console.log(res)
          if (res.status === 200) {
            dispatch(setUser(res.data))
            const bookingValues = form.getFieldsValue()
            const newAppointment: AppointmentType = {
              ...bookingValues,
              time: dayjs(bookingValues.time).add(7, 'hours').format('YYYY-MM-DD HH:mm:ss'),
              idCustomer: res.data.id,
              idEmployee: 1
            }
            try {
              const res = await createAppointment(newAppointment)
              if (res.status === 200) {
                setLoading(false)
                openNotificationWithIcon('success', 'Thành công', 'Đặt cuộc hẹn thành công!')
                form.resetFields()
                dispatch(setUser(null))
                if (userForm) {
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-ignore
                  userForm.resetFields()
                }
              } else {
                openNotificationWithIcon(
                  'error',
                  'Thất bại',
                  'Khung giờ hiện tại không có đủ nhân viên, bạn vui lòng chọn khung giờ khác'
                )
              }
              if (auth) {
                navigate('/user/appointment')
              }
            } catch (err: any) {
              openNotificationWithIcon('error', 'Thất bại', err.message)
            }
          } else {
            openNotificationWithIcon('error', 'Thất bại', 'Người dùng đã có trong hệ thống')
          }
        } else {
          const bookingValues = form.getFieldsValue()
          const newAppointment: AppointmentType = {
            ...bookingValues,
            time: dayjs(bookingValues.time).add(7, 'hours').format('YYYY-MM-DD HH:mm:ss'),
            idCustomer: user.id,
            idEmployee: 1
          }
          try {
            const res = await createAppointment(newAppointment)
            if (res.status === 200) {
              setLoading(false)
              openNotificationWithIcon('success', 'Thành công', 'Đặt cuộc hẹn thành công!')
              form.resetFields()
              dispatch(setUser(null))
              if (userForm) {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                userForm.resetFields()
              }
            } else {
              openNotificationWithIcon(
                'error',
                'Thất bại',
                'Khung giờ hiện tại không có đủ nhân viên, bạn vui lòng chọn khung giờ khác'
              )
            }
            if (auth) {
              navigate('/user/appointment')
            }
          } catch (err: any) {
            openNotificationWithIcon('error', 'Thất bại', err.message)
          }
        }
      } catch (err) {
        openNotificationWithIcon('error', 'Thất bại', 'Người dùng đã có trong hệ thống')
      }
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
        className='w-2/3 overflow-auto px-3'
        form={form}
        onFinish={handleOnFinish}
        validateMessages={validateMessages}
      >
        <Form.Item name='idProduct' rules={[{ required: true }]} label='Liệu trình'>
          <ServiceSearchInput value={idProduct} onChange={setIdProduct} placeholder='Chọn Liệu trình' />
        </Form.Item>
        <Form.Item name='time' rules={[{ required: true }]} label='Thời gian'>
          <AppointmentDatePicker disabled={false} value={time} onChange={setTime} placeholder='Chọn ngày giờ' />
        </Form.Item>
        <Form.Item name='note' label='Ghi chú'>
          <TextArea placeholder='Thêm ghi chú' />
        </Form.Item>
        {auth && (
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            {user?.firstName && user?.lastName && user.phoneNumber ? (
              <Button type='primary' htmlType='submit'>
                Đặt hẹn
              </Button>
            ) : (
              <div className='flex items-center'>
                <Typography.Text className='text-red-500 mr-3'>
                  Bạn cần cập nhật thông tin trước khi đặt hẹn
                </Typography.Text>
                <Button type='primary' htmlType='button' onClick={() => navigate('/user/info')}>
                  Đi tới trang cập nhật
                </Button>
              </div>
            )}
          </Form.Item>
        )}
      </Form>
      {!auth && (
        <Form
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          layout='horizontal'
          className='w-2/3 overflow-auto px-3'
          form={userForm}
          onFinish={handleOnUserFinish}
          validateMessages={validateMessages}
        >
          <Form.Item name='firstName' rules={[{ required: true }]} label='Họ và tên đệm'>
            <Input disabled={!!user} placeholder='Nguyễn Văn' />
          </Form.Item>
          <Form.Item name='lastName' rules={[{ required: true }]} label='Tên'>
            <Input disabled={!!user} placeholder='A' />
          </Form.Item>
          <Form.Item name='email' rules={[{ required: true }, { type: 'email' }]} label='Email'>
            <Input disabled={!!user} type='email' placeholder='nguyenvana@gmail.com' />
          </Form.Item>
          <Form.Item
            name='phoneNumber'
            rules={[
              { required: true },
              {
                pattern: /^(03|05|07|08|09)[0-9]{8}$/,
                message: 'Số điện thoại không hợp lệ'
              }
            ]}
            label='Số điện thoại'
          >
            <Input disabled={!!user} placeholder='0912312312' />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type='primary' htmlType='submit'>
              Đặt hẹn
            </Button>
          </Form.Item>
        </Form>
      )}
    </div>
  )
}
