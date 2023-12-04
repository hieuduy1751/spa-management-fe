import { Col, Row, Image, Typography, Tag, Button, Divider } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import { Send } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import CreateAppointment from '~/components/CreateAppointment'
import Rating from '~/components/Rating'
import ReviewComment from '~/components/ReviewComment'
import PRODUCT_TYPE from '~/constants/product-type'
import { useAppSelector } from '~/hooks/reduxHooks'
import { getProductById } from '~/services/product'
import { getReviewsByProductId, sendReviewByProductId } from '~/services/review'
import { ProductType } from '~/types/product'

export default function ServiceDetailPage() {
  const params = useParams()
  const user = useAppSelector((state) => state.user.user)
  const [service, setService] = useState<ProductType>()
  const [modalOpen, setModalOpen] = useState(false)
  const [reviews, setReviews] = useState<any[]>([])
  const [stars, setStars] = useState(5)
  const [comment, setComment] = useState('')
  const [productId, setProductId] = useState('')
  const navigate = useNavigate()

  const fetchService = async (serviceId: number) => {
    try {
      const res = await getProductById(serviceId.toString())
      if (res.id) {
        setService(res)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const fetchRatings = async (productId: string) => {
    try {
      const res = await getReviewsByProductId(productId)
      if (res) {
        console.log(res)
        setReviews(res)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const handleSendRating = async () => {
    try {
      if (user && user.id && params && params.id) {
        const res = await sendReviewByProductId(params.id, user?.id, {
          comment,
          ratingPoint: stars
        })
        if (res && res.id) {
          setReviews([res, ...reviews])
        }
      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    if (params?.id) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      fetchService(params.id)
      fetchRatings(params.id)
      setProductId(params.id)
    }
  }, [params])

  return (
    <div className='w-full h-full px-32 py-10'>
      <Row>
        <Col span={12} className='p-5'>
          <Image src={service?.imageUrl} />
        </Col>
        <Col span={12} className='p-5'>
          <Typography.Text className='text-3xl font-bold block mb-3'>{service?.name}</Typography.Text>
          <Typography.Text className='text-xl font-bold block text-red-700 mb-3'>
            {service?.price.toLocaleString()} VND
          </Typography.Text>
          <Tag color='orange' className='text-2xl'>
            {PRODUCT_TYPE[service?.productType || 'SERVICE']}
          </Tag>
          {user?.firstName && user?.lastName ? (
            <Button
              onClick={() => setModalOpen(true)}
              className='mt-5 flex items-center bg-orange-400 hover:bg-orange-600'
              type='primary'
              size='large'
            >
              Đặt dịch vụ
            </Button>
          ) : (
            <div className='mt-4'>
              <Typography.Text className='text-red-500 mr-3'>
                Bạn cần cập nhật thông tin trước khi đặt hẹn
              </Typography.Text>
              <Button type='primary' className='mt-3' htmlType='button' onClick={() => navigate('/user/info')}>
                Đi tới trang cập nhật
              </Button>
            </div>
          )}
          <CreateAppointment productId={productId} modalOpen={modalOpen} setModalOpen={setModalOpen} />
        </Col>
      </Row>
      <Row>
        <Col span={24} className='p-5 pb-3'>
          <Typography.Text className='text-2xl font-bold'>Thông tin dịch vụ</Typography.Text>
        </Col>
      </Row>
      <Divider />
      <Row>
        <Col span={24} className='p-5 pt-3'>
          <Typography.Text className='text-xl'>{service?.description}</Typography.Text>
          <Typography.Text className='text-xl'>{service?.description}</Typography.Text>
          <Typography.Text className='text-xl'>{service?.description}</Typography.Text>
          <Typography.Text className='text-xl'>{service?.description}</Typography.Text>
        </Col>
      </Row>
      <Row>
        <Col span={24} className='p-5 pb-3'>
          <Typography.Text className='text-2xl font-bold'>Đánh giá từ khách hàng</Typography.Text>
        </Col>
      </Row>
      <Divider />
      <Row className='px-5 flex flex-col gap-4'>
        {reviews?.map((review, index: number) => (
          <ReviewComment
            key={index}
            comment={review.comment}
            commentRate={review.ratingPoint}
            commentImg={''}
            commentorName={'Khách hàng'}
          />
        ))}
      </Row>
      <Divider />
      <div className='my-3 px-5'>
        <Rating editable stars={stars} setStars={setStars} />
      </div>
      <div className='w-1/2 flex gap-2 px-5'>
        <TextArea placeholder='Đánh giá' value={comment} onChange={(e) => setComment(e.target.value)} />
        <Button onClick={handleSendRating} className='flex items-center' type='primary' icon={<Send />}>
          Gửi đánh giá
        </Button>
      </div>
    </div>
  )
}
