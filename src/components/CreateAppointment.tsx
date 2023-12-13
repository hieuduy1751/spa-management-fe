import { notification, Form, Modal, Input, Button } from 'antd'
import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks'
import { AppointmentType } from '../types/appointment'
import { addAppointment } from '../store/slices/appointmentSlice'
import AppointmentDatePicker from './AppointmentDatePicker'
import TextArea from 'antd/es/input/TextArea'
import dayjs from 'dayjs'
import { createCustomer } from '~/services/customer'
import { setUser } from '~/store/slices/userSlice'
import { createAppointment } from '~/services/appointment'
import { useNavigate } from 'react-router-dom'

type NotificationType = 'success' | 'info' | 'warning' | 'error'

export type CreateAppointmentProps = {
  modalOpen: boolean
  setModalOpen: any
  productId: string
}

export default function CreateAppointment({ modalOpen, setModalOpen, productId }: CreateAppointmentProps) {
  const [form] = Form.useForm()
  const [userForm] = Form.useForm()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [loading, setLoading] = useState<boolean>(false)
  const user = useAppSelector((state) => state.user.user)
  const auth = useAppSelector((state) => state.auth.token)
  const [time, setTime] = useState<any | null>()

  const [api, contextHolder] = notification.useNotification()

  const openNotificationWithIcon = (type: NotificationType, title, description) => {
    api[type]({
      message: title,
      description
    })
  }

  const validateMessages = {
    required: '${label} không được để trống!',
    types: {
      email: '${label} không hợp lệ!',
      number: '${label} không hợp lệ!'
    }
  }

  const handleOnCreate = async () => {
    if (form && auth) {
      form.submit()
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if ((await form.validateFields()) && userForm && (await userForm.validateFields()) && !auth) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      userForm.submit()
    }
  }

  const handleOnCancel = () => {
    setModalOpen(false)
    form.resetFields()
  }

  const handleOnFinish = async (values: any) => {
    const newAppointment: AppointmentType = {
      ...values,
      idEmployee: 1,
      idProduct: productId,
      idCustomer: user?.id || '',
      time: dayjs(values.time).add(7, 'hours').format('YYYY-MM-DD HH:mm:ss')
    }
    setLoading(true)
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
        setLoading(false)
      }
      if (auth) {
        navigate('/user/appointment')
      }
    } catch (err: any) {
      openNotificationWithIcon('error', 'Thất bại', err.message)
      setLoading(false)
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
              idEmployee: 1,
              idProduct: productId
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
                setLoading(false)
              }
              if (auth) {
                navigate('/user/appointment')
              }
            } catch (err: any) {
              openNotificationWithIcon('error', 'Thất bại', err.message)
              setLoading(false)
            }
          } else {
            openNotificationWithIcon('error', 'Thất bại', 'Người dùng đã có trong hệ thống')
            setLoading(false)
          }
        } else {
          const bookingValues = form.getFieldsValue()
          const newAppointment: AppointmentType = {
            ...bookingValues,
            time: dayjs(bookingValues.time).add(7, 'hours').format('YYYY-MM-DD HH:mm:ss'),
            idCustomer: user.id,
            idEmployee: 1,
            idProduct: productId
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
              setLoading(false)
            }
            if (auth) {
              navigate('/user/appointment')
            }
          } catch (err: any) {
            openNotificationWithIcon('error', 'Thất bại', err.message)
            setLoading(false)
          }
        }
      } catch (err) {
        openNotificationWithIcon('error', 'Thất bại', 'Người dùng đã có trong hệ thống')
        setLoading(false)
      }
    }
  }

  return (
    <Modal
      title='Tạo cuộc hẹn mới'
      centered
      open={modalOpen}
      onOk={handleOnCreate}
      onCancel={handleOnCancel}
      confirmLoading={loading}
      width={500}
      okText='Tạo cuộc hẹn'
      cancelText='Hủy bỏ'
    >
      {contextHolder}
      <Form
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        layout='horizontal'
        className='overflow-auto px-3'
        form={form}
        onFinish={handleOnFinish}
        validateMessages={validateMessages}
      >
        <Form.Item name='time' rules={[{ required: true }]} label='Thời gian'>
          <AppointmentDatePicker disabled={false} value={time} onChange={setTime} placeholder='Chọn ngày giờ' />
        </Form.Item>
        <Form.Item name='note' label='Ghi chú'>
          <TextArea placeholder='Thêm ghi chú' />
        </Form.Item>
      </Form>
      {!auth && (
        <Form
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          layout='horizontal'
          className='overflow-auto px-3'
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
        </Form>
      )}
    </Modal>
  )
}
