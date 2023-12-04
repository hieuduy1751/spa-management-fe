import { notification, Form, Modal } from 'antd'
import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks'
import { AppointmentType } from '../types/appointment'
import { addAppointment } from '../store/slices/appointmentSlice'
import AppointmentDatePicker from './AppointmentDatePicker'
import TextArea from 'antd/es/input/TextArea'
import dayjs from 'dayjs'

type NotificationType = 'success' | 'info' | 'warning' | 'error'

export type CreateAppointmentProps = {
  modalOpen: boolean
  setModalOpen: any
  productId: string
}

export default function CreateAppointment({ modalOpen, setModalOpen, productId }: CreateAppointmentProps) {
  const [form] = Form.useForm()
  const dispatch = useAppDispatch()
  const [loading, setLoading] = useState<boolean>(false)
  const user = useAppSelector(state => state.user.user)
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

  const handleOnCreate = () => {
    if (form) {
      form.submit()
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
      await dispatch(addAppointment(newAppointment))
      setLoading(false)
      setModalOpen(false)
      openNotificationWithIcon('success', 'Thành công', 'Tạo cuộc hẹn thành công!')
      form.resetFields()
    } catch (err: any) {
      openNotificationWithIcon('error', 'Thất bại', err.message)
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
    </Modal>
  )
}
