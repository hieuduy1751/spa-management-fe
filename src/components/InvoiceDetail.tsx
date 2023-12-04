import { Button, Col, Form, Input, Modal, Row, Select, Spin, Tabs, Typography, notification } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import { useEffect, useState } from 'react'
import INVOICE_STATUS from '~/constants/invoice-status'
import ProductInInvoiceDetail from './ProductInInvoiceDetail'
import { Receipt } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks'
import { updateInvoice } from '../services/invoice'
import dayjs from 'dayjs'
import { getInvoices } from '../store/slices/invoicesSlice'
import { generateInvoice } from '~/services/generate'
import { LoadingOutlined } from '@ant-design/icons'

type InvoiceDetailProps = {
  modalOpen: boolean
  setModalOpen: any
}

export default function InvoiceDetail({ modalOpen, setModalOpen }: InvoiceDetailProps) {
  const [api, contextHolder] = notification.useNotification()
  const [invoiceForm] = Form.useForm()
  const [isPaid, setIsPaid] = useState<boolean>(false)
  const [loading, setLoading] = useState(false)
  const [downloadLink, setDownloadLink] = useState('')
  const invoice = useAppSelector((state) => state.invoices.selectedInvoice)
  const validateMessages = {
    required: '${label} không được để trống!',
    types: {
      email: '${label} không hợp lệ!',
      number: '${label} không hợp lệ!'
    }
  }
  const handleDownloadInvoice = async () => {
    if (invoice && invoice.id) {
      setLoading(true)
      const res = await generateInvoice(invoice?.id)
      if (!res.message) {
        setDownloadLink(res)
      }
      setLoading(false)
    }
  }
  const tabsMenu = [
    {
      key: 'bill',
      label: (
        <span className='flex items-center'>
          <Receipt />
          Hóa đơn
        </span>
      ),
      children: (
        <Row>
          <Col span={12}>
            <Form
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              labelAlign='left'
              layout='horizontal'
              className='h-[50vh] overflow-auto px-3'
              form={invoiceForm}
              validateMessages={validateMessages}
            >
              <Form.Item label='Ngày tạo' name='createdDate'>
                <Input disabled />
              </Form.Item>
              <Form.Item label='Ngày cập nhật' name='updatedDate'>
                <Input disabled />
              </Form.Item>
              <Form.Item label='Hóa đơn số' name='id'>
                <Input disabled />
              </Form.Item>
              <Form.Item name='note' label='Ghi chú'>
                <TextArea disabled />
              </Form.Item>
              <Form.Item name='totalAmount' label='Tổng tiền'>
                <Input disabled />
              </Form.Item>
              <Form.Item rules={[{ required: true }]} name='status' label='Trạng thái'>
                <Select
                  disabled
                  options={Object.keys(INVOICE_STATUS).map((k) => ({
                    value: k,
                    label: INVOICE_STATUS[k]
                  }))}
                />
              </Form.Item>
            </Form>
          </Col>
          <Col span={12} className='flex flex-col justify-between'>
            <Typography.Text className='font-bold px-3'>Dịch vụ đã sử dụng</Typography.Text>
            <div className='px-3 grow'>
              {invoice?.invoiceDetailResponses?.map((invoiceDetail, index) => (
                <ProductInInvoiceDetail
                  key={index}
                  product={invoiceDetail.productResponse}
                  totalPrice={invoiceDetail.totalPrice}
                  totalQuantity={invoiceDetail.totalQuantity}
                />
              ))}
            </div>
            {isPaid && (
              <Button className='flex items-center justify-center' onClick={handleDownloadInvoice}>
                Tải hóa đơn
                {loading && <Spin indicator={<LoadingOutlined className='ml-2' style={{ fontSize: 18 }} spin />} />}
              </Button>
            )}
            {downloadLink && <div className='text-green-500 text-center'>Tải hoàn tất</div>}
          </Col>
        </Row>
      )
    }
  ]

  const handleOnCancel = () => {
    setModalOpen(false)
    if (invoiceForm) {
      invoiceForm.resetFields()
    }
  }

  useEffect(() => {
    if (invoiceForm && modalOpen) {
      invoiceForm.setFieldsValue({
        ...invoice,
        createdDate: dayjs(invoice?.createdAt).format('HH:mm DD/MM/YYYY'),
        updatedDate: dayjs(invoice?.createdAt).format('HH:mm DD/MM/YYYY'),
        totalAmount: invoice?.totalAmount?.toLocaleString() + 'VND'
      })
      if (invoice?.status === 'PAID') {
        setIsPaid(true)
      }
    }
    if (!invoice) {
      setModalOpen(false)
    }
  }, [invoice, modalOpen])

  return (
    <Modal
      title={`Thông tin hóa đơn`}
      centered
      open={modalOpen}
      onCancel={handleOnCancel}
      width={700}
      cancelText='Đóng'
      footer={<></>}
    >
      {contextHolder}
      <Tabs defaultActiveKey='invoice' items={tabsMenu} />
    </Modal>
  )
}
