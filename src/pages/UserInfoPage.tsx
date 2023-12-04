import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Radio,
  Row,
  Spin,
  Tabs,
  Upload,
  UploadProps,
  message,
  notification
} from 'antd'
import TextArea from 'antd/es/input/TextArea'
import { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import { Pencil, User } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { RcFile, UploadChangeParam, UploadFile } from 'antd/es/upload'
import { beforeUploadImg, getBase64, uploadImageService } from '../services/image'
import { updateUser } from '~/store/slices/userSlice'
import { doRefresh } from '~/store/slices/authSlice'
import CustomerClass from '~/components/CustomerClass'

export default function UserInfoPage() {
  const [form] = Form.useForm()
  const [isDisabled, setIsDisabled] = useState<boolean>(true)
  const [loading, setLoading] = useState<boolean>(false)
  const [loadingIMG, setLoadingIMG] = useState(false)
  const [imageUrl, setImageUrl] = useState<string>()
  const dispatch = useAppDispatch()
  const user = useAppSelector((state) => state.user.user)
  const [api, contextHolder] = notification.useNotification()

  const validateMessages = {
    required: '${label} không được để trống!',
    types: {
      email: '${label} không hợp lệ!',
      number: '${label} không hợp lệ!'
    }
  }

  const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
    if (info.file.status === 'uploading') {
      setLoadingIMG(true)
      return
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as RcFile, (url) => {
        setLoadingIMG(false)
        setImageUrl(url)
      })
    }
  }

  const handleOnUserEdit = async () => {
    const formValues = form.getFieldsValue()
    if (!user?.customerClass) {
      formValues.customerClass = 'NEW'
    }
    try {
      await dispatch(
        updateUser({
          user: formValues,
          userId: user?.id || ''
        })
      )
      api.success({
        message: 'Thành công',
        description: 'Cập nhật thông tin thành công!'
      })
      setIsDisabled(true)
    } catch (err: any) {
      console.log(err)
      api.error({
        message: 'Thất bại',
        description: err?.message
      })
    }
  }

  const handleOnCancelEdit = () => {
    setIsDisabled(true)
    form.setFieldsValue({
      ...user,
      birthDay: user?.birthDay ? dayjs(user?.birthDay) : dayjs()
    })
    setImageUrl(user?.avatarUrl || '')
  }

  const uploadButton = (
    <div>
      {loadingIMG ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Tải lên</div>
    </div>
  )

  const uploadImage = async (options) => {
    const { onSuccess, onError, file, onProgress } = options

    const config = {
      headers: { 'content-type': 'multipart/form-data' },
      onUploadProgress: (event) => {
        const percent = Math.floor((event.loaded / event.total) * 100)
        setLoadingIMG(true)
        if (percent === 100) {
          setLoadingIMG(false)
        }
        onProgress({ percent: (event.loaded / event.total) * 100 })
      }
    }
    try {
      const res = await uploadImageService(file, config)
      onSuccess('Ok')
      setImageUrl(res)
      form.setFieldValue('avatarUrl', res)
    } catch (err) {
      console.log('Eroor: ', err)
      onError({ err })
    }
  }

  const tabsMenu = [
    {
      key: 'user',
      label: (
        <span className='flex items-center'>
          <User />
          Thông tin cá nhân
        </span>
      ),
      children: (
        <Row>
          <Col span={8} className='gap-4 flex flex-col items-center'>
            <Upload
              accept='image/*'
              listType='picture-card'
              className='avatar-uploader text-center'
              showUploadList={false}
              customRequest={uploadImage}
              beforeUpload={(file) => beforeUploadImg(file, message)}
              onChange={handleChange}
              disabled={isDisabled}
            >
              {imageUrl ? <img src={imageUrl} alt='avatar' style={{ width: '150%' }} /> : uploadButton}
            </Upload>
            <CustomerClass customerClass={user?.customerClass || 'NEW'} />
          </Col>
          <Col span={16}>
            <Form
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              labelAlign='left'
              layout='horizontal'
              className='h-[60vh] overflow-auto px-3'
              form={form}
              validateMessages={validateMessages}
            >
              {isDisabled && (
                <Button
                  onClick={() => setIsDisabled(false)}
                  icon={<Pencil size={16} />}
                  className='flex items-center mb-2'
                >
                  Chỉnh sửa
                </Button>
              )}
              {/* <Form.Item
                  label="Ảnh"
                  valuePropName="fileList"
                  getValueFromEvent={normFile}
                  name="avatar"
                >
                  <Upload action="/upload.do" listType="picture-card">
                    <div>
                      <PlusOutlined />
                      <div style={{ marginTop: 8 }}>Tải lên</div>
                    </div>
                  </Upload>
                </Form.Item> */}
              <Form.Item name='avatarUrl' hidden>
                <Input />
              </Form.Item>
              <Form.Item name='lastName' rules={[{ required: true }]} label='Họ'>
                <Input readOnly={isDisabled} />
              </Form.Item>
              <Form.Item name='firstName' rules={[{ required: true }]} label='Tên'>
                <Input readOnly={isDisabled} />
              </Form.Item>
              <Form.Item name='email' rules={[{ required: true }, { type: 'email' }]} label='Email'>
                <Input type='email' disabled />
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
                <Input readOnly={isDisabled} />
              </Form.Item>
              <Form.Item name='gender' label='Giới tính'>
                <Radio.Group disabled={isDisabled}>
                  <Radio value='MALE'> Nam </Radio>
                  <Radio value='FEMALE'> Nữ </Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item name='address' rules={[{ required: true }]} label='Địa chỉ'>
                <Input readOnly={isDisabled} />
              </Form.Item>
              <Form.Item name='birthDay' rules={[{ required: true }]} label='Ngày sinh'>
                <DatePicker disabled={isDisabled} format='DD/MM/YYYY' />
              </Form.Item>
              <Form.Item label='Ghi chú'>
                <TextArea readOnly={isDisabled} rows={4} />
              </Form.Item>
              {!isDisabled && (
                <div className='flex gap-2 justify-end items-center w-full'>
                  <Button onClick={handleOnCancelEdit} danger>
                    Hủy
                  </Button>
                  <Button type='primary' onClick={handleOnUserEdit}>
                    Cập nhật
                    {loading && (
                      <Spin indicator={<LoadingOutlined className='ml-2 text-white' style={{ fontSize: 18 }} spin />} />
                    )}
                  </Button>
                </div>
              )}
            </Form>
          </Col>
        </Row>
      )
    }
  ]

  useEffect(() => {
    if (form && user) {
      console.log(user)
      form.setFieldsValue({
        ...user,
        birthDay: user?.birthDay ? dayjs(user?.birthDay) : dayjs()
      })
      setImageUrl(user?.avatarUrl || '')
    }
  }, [user])

  useEffect(() => {
    dispatch(doRefresh())
  }, [])

  return (
    <>
      {contextHolder}
      <Tabs defaultActiveKey='user' items={tabsMenu} />
    </>
  )
}
