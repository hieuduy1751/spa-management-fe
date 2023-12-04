import { Col, Form, Image, Input, Modal, Row, Select, Tabs, Typography, Upload, UploadProps, message } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import { useEffect, useState } from 'react'
import { useAppSelector } from '../hooks/reduxHooks'
import { BookImage, CalendarDays } from 'lucide-react'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import TREATMENT_STATUS from '../constants/treatment-status'
import { beforeUploadImg, getBase64, uploadImageService } from '../services/image'
import { RcFile, UploadChangeParam, UploadFile } from 'antd/es/upload'
// import INVOICE_STATUS from '../constants/invoice-status'
// import ProductInInvoiceDetail from './ProductInInvoiceDetail'

export type TreatmentDetailProps = {
  modalOpen: boolean
  setModalOpen: any
}

export default function TreatmentDetail({ modalOpen, setModalOpen }: TreatmentDetailProps) {
  const [form] = Form.useForm()
  // const [invoiceForm] = Form.useForm()
  const treatment = useAppSelector((state) => state.treatments.selectedTreatment)
  const [isDisabled] = useState<boolean>(true)
  const [loadingIMGBefore, setLoadingIMGBefore] = useState(false)
  const [imageBeforeUrl, setImageBeforeUrl] = useState<string>()
  const [loadingIMGCurrent, setLoadingIMGCurrent] = useState(false)
  const [imageCurrentUrl, setImageCurrentUrl] = useState<string>()
  const [loadingIMGAfter, setLoadingIMGAfter] = useState(false)
  const [imageResultUrl, setimageResultUrl] = useState<string>()
  const handleOnCancel = () => {
    setModalOpen(false)
    if (form) {
      form.resetFields()
    }
  }

  const validateMessages = {
    required: '${label} không được để trống!',
    types: {
      email: '${label} không hợp lệ!',
      number: '${label} không hợp lệ!'
    }
  }

  // const handleOnTreatmentEdit = async () => {
  //   const formValues = form.getFieldsValue()
  //   const payload: TreatmentType = {
  //     idCustomer: treatment?.customerResponse?.id || '',
  //     idProduct: treatment?.productResponse?.id || '',
  //     ...treatment,
  //     ...formValues,
  //     note: formValues.note,
  //     status: formValues.status
  //   }
  //   try {
  //     await dispatch(
  //       editTreatment({
  //         treatment: payload
  //       })
  //     )
  //     api.success({
  //       message: 'Thành công',
  //       description: `Cập nhật liệu trình thành công!`
  //     })
  //     setIsDisabled(true)
  //   } catch (err: any) {
  //     console.log(err)
  //     api.error({
  //       message: 'Thất bại',
  //       description: err?.message
  //     })
  //   }
  // }

  const handleChangeBefore: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
    if (info.file.status === 'uploading') {
      setLoadingIMGBefore(true)
      return
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as RcFile, (url) => {
        setLoadingIMGBefore(false)
        setImageBeforeUrl(url)
      })
    }
  }

  const handleChangeCurrent: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
    if (info.file.status === 'uploading') {
      setLoadingIMGCurrent(true)
      return
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as RcFile, (url) => {
        setLoadingIMGCurrent(false)
        setImageCurrentUrl(url)
      })
    }
  }

  const handleChangeAfter: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
    if (info.file.status === 'uploading') {
      setLoadingIMGAfter(true)
      return
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as RcFile, (url) => {
        setLoadingIMGAfter(false)
        setimageResultUrl(url)
      })
    }
  }

  const uploadButtonBefore = (
    <div>
      {loadingIMGBefore ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Tải lên</div>
    </div>
  )

  const uploadButtonCurrent = (
    <div>
      {loadingIMGCurrent ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Tải lên</div>
    </div>
  )

  const uploadButtonAfter = (
    <div>
      {loadingIMGAfter ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Tải lên</div>
    </div>
  )

  const uploadImage = async (options, type) => {
    const { onSuccess, onError, file, onProgress } = options

    const config = {
      headers: { 'content-type': 'multipart/form-data' },
      onUploadProgress: (event) => {
        const percent = Math.floor((event.loaded / event.total) * 100)
        if (type === 'before') {
          setLoadingIMGBefore(true)
        } else if (type === 'current') {
          setLoadingIMGCurrent(true)
        } else if (type === 'after') {
          setLoadingIMGAfter(true)
        }
        if (percent === 100) {
          if (type === 'before') {
            setLoadingIMGBefore(false)
          } else if (type === 'current') {
            setLoadingIMGCurrent(false)
          } else if (type === 'after') {
            setLoadingIMGAfter(false)
          }
        }
        onProgress({ percent: (event.loaded / event.total) * 100 })
      }
    }
    try {
      const res = await uploadImageService(file, config)
      onSuccess('Ok')
      if (type === 'before') {
        setImageBeforeUrl(res)
        form.setFieldValue('imageBefore', res)
      } else if (type === 'current') {
        setImageCurrentUrl(res)
        form.setFieldValue('imageCurrent', res)
      } else if (type === 'after') {
        setimageResultUrl(res)
        form.setFieldValue('imageResult', res)
      }
      // await handleOnTreatmentEdit()
    } catch (err) {
      console.log('Eroor: ', err)
      onError({ err })
    }
  }

  const tabsMenu = [
    {
      key: 'treatment',
      label: (
        <span className='flex items-center'>
          <CalendarDays />
          Thông tin liệu trình
        </span>
      ),
      children: (
        <Row>
          <Col span={12} className='p-5'>
            <Image src={treatment?.productResponse?.imageUrl || ''} />
          </Col>
          <Col span={12} className='p-5'>
            <Typography.Text className='text-3xl block'>{treatment?.productResponse?.name}</Typography.Text>
            <Typography.Text className='text-xl block text-red-400 mt-1 mb-3'>
              {treatment?.productResponse?.price} VND
            </Typography.Text>
            <Typography.Text className='text-md block text-gray-700'>
              {treatment?.productResponse?.description}
            </Typography.Text>
          </Col>
          <Col span={24}>
            <Form
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              labelAlign='left'
              layout='horizontal'
              className='h-[40vh] overflow-auto px-3'
              form={form}
              validateMessages={validateMessages}
            >
              <Form.Item name='imageBefore' hidden>
                <Input />
              </Form.Item>
              <Form.Item name='imageCurrent' hidden>
                <Input />
              </Form.Item>
              <Form.Item hidden name='imageResult'>
                <Input />
              </Form.Item>
              <Form.Item name='product' rules={[{ required: true }]} label='Dịch vụ'>
                <Input disabled />
              </Form.Item>
              <Form.Item name='customer' rules={[{ required: true }]} label='Khách hàng'>
                <Input disabled />
              </Form.Item>
              <Form.Item name='staff' rules={[{ required: true }]} label='Nhân viên'>
                <Input disabled />
              </Form.Item>
              <Form.Item name='note' label='Ghi chú'>
                <TextArea readOnly={isDisabled} placeholder='Thêm ghi chú' />
              </Form.Item>
              <Form.Item rules={[{ required: true }]} name='status' label='Trạng thái'>
                <Select
                  disabled={isDisabled}
                  options={Object.keys(TREATMENT_STATUS).map((k) => ({
                    value: k,
                    label: TREATMENT_STATUS[k]
                  }))}
                />
              </Form.Item>
            </Form>
          </Col>
        </Row>
      )
    },
    {
      key: 'progress',
      label: (
        <span className='flex items-center'>
          <BookImage />
          Xem hình ảnh liệu trình
        </span>
      ),
      children: (
        <Row>
          <Col span={8}>
            <Typography.Text>Trước</Typography.Text>
            <Upload
              accept='image/*'
              listType='picture-card'
              className='avatar-uploader text-center'
              showUploadList={false}
              customRequest={(r) => uploadImage(r, 'before')}
              beforeUpload={(file) => beforeUploadImg(file, message)}
              onChange={handleChangeBefore}
            >
              {imageBeforeUrl ? (
                <img src={imageBeforeUrl} alt='avatar' style={{ width: '150%' }} />
              ) : (
                uploadButtonBefore
              )}
            </Upload>
          </Col>
          <Col span={8}>
            <Typography.Text>Hiện tại</Typography.Text>
            <Upload
              accept='image/*'
              listType='picture-card'
              className='avatar-uploader text-center'
              showUploadList={false}
              customRequest={(r) => uploadImage(r, 'current')}
              beforeUpload={(file) => beforeUploadImg(file, message)}
              onChange={handleChangeCurrent}
            >
              {imageCurrentUrl ? (
                <img src={imageCurrentUrl} alt='avatar' style={{ width: '150%' }} />
              ) : (
                uploadButtonCurrent
              )}
            </Upload>
          </Col>
          <Col span={8}>
            <Typography.Text>Sau</Typography.Text>
            <Upload
              accept='image/*'
              listType='picture-card'
              className='avatar-uploader text-center'
              showUploadList={false}
              customRequest={(r) => uploadImage(r, 'after')}
              beforeUpload={(file) => beforeUploadImg(file, message)}
              onChange={handleChangeAfter}
            >
              {imageResultUrl ? <img src={imageResultUrl} alt='avatar' style={{ width: '150%' }} /> : uploadButtonAfter}
            </Upload>
          </Col>
        </Row>
      )
    }
    // {
    //   key: 'bill',
    //   label: (
    //     <span className='flex items-center'>
    //       <Receipt />
    //       Hóa đơn
    //     </span>
    //   ),
    //   children: (
    //     <Row>
    //       <Col span={12}>
    //         <Form
    //           labelCol={{ span: 8 }}
    //           wrapperCol={{ span: 16 }}
    //           labelAlign='left'
    //           layout='horizontal'
    //           className='h-[40vh] overflow-auto px-3'
    //           form={invoiceForm}
    //           validateMessages={validateMessages}
    //           disabled
    //         >
    //           <Form.Item label='Ngày tạo' name='createdDate'>
    //             <Input />
    //           </Form.Item>
    //           <Form.Item label='Ngày cập nhật' name='updatedDate'>
    //             <Input />
    //           </Form.Item>
    //           <Form.Item label='Hóa đơn số' name='id'>
    //             <Input />
    //           </Form.Item>
    //           <Form.Item name='note' label='Ghi chú'>
    //             <TextArea />
    //           </Form.Item>
    //           <Form.Item name='totalAmount' label='Tổng tiền'>
    //             <Input />
    //           </Form.Item>
    //           <Form.Item rules={[{ required: true }]} name='status' label='Trạng thái'>
    //             <Select
    //               disabled={isDisabled}
    //               options={Object.keys(INVOICE_STATUS).map((k) => ({
    //                 value: k,
    //                 label: INVOICE_STATUS[k]
    //               }))}
    //             />
    //           </Form.Item>
    //         </Form>
    //       </Col>
    //       <Col span={12}>
    //         <Typography.Text className='font-bold px-3'>Dịch vụ đã sử dụng</Typography.Text>
    //         <div className='px-3'>
    //           {treatment?.invoiceResponse?.invoiceDetailResponses?.map((invoiceDetail, index) => (
    //             <ProductInInvoiceDetail
    //               key={index}
    //               product={invoiceDetail.productResponse}
    //               totalPrice={invoiceDetail.totalPrice}
    //               totalQuantity={invoiceDetail.totalQuantity}
    //             />
    //           ))}
    //         </div>
    //       </Col>
    //     </Row>
    //   )
    // }
  ]

  useEffect(() => {
    if (form && modalOpen && treatment) {
      form.setFieldsValue({
        ...treatment,
        customer: treatment.customerResponse?.lastName + ' ' + treatment.customerResponse?.firstName,
        product: treatment.productResponse?.name,
        staff: treatment.employeeResponse?.lastName + ' ' + treatment.employeeResponse?.firstName
      })

      setImageBeforeUrl(treatment.imageBefore)
      setImageCurrentUrl(treatment.imageCurrent)
      setimageResultUrl(treatment.imageResult)
    }
    // if (invoiceForm && modalOpen && treatment) {
    //   invoiceForm.setFieldsValue({
    //     ...treatment.invoiceResponse
    //   })
    // }
    if (!treatment) {
      setModalOpen(false)
    }
  }, [treatment, modalOpen])

  return (
    <Modal
      title={`Thông tin liệu trình`}
      centered
      open={modalOpen}
      onCancel={handleOnCancel}
      width={700}
      cancelText='Đóng'
      footer={<></>}
    >
      <Tabs defaultActiveKey='treatment' items={tabsMenu} />
    </Modal>
  )
}
