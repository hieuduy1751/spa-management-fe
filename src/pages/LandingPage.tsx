import Landing1Image from '~/assets/images/landing_1.jpeg'
import { Card, FloatButton, Typography } from 'antd'
import LandingSectionItem from '~/components/LandingSectionItem'
import ProductItem, { ProductItemProps } from '~/components/ProductItem'
import { comments, goods, reasons, services } from '~/constants/landing'
import ReviewComment, { ReviewCommentProps } from '~/components/ReviewComment'
import { CalendarDays, HelpCircle } from 'lucide-react'

const { Text } = Typography

export default function LandingPage() {
  return (
    <div className='flex flex-col gap-y-24 px-32'>
      <div className='flex'>
        <div className='w-2/5 flex justify-center flex-col'>
          <Text className='block font-bold text-green-500 text-[2.5rem]'>Trung tâm</Text>
          <Text className='block font-bold text-green-500 text-[2.5rem]'>Thẩm mỹ Nature Beauty</Text>
          <Text>
            Với đội ngũ chuyên nghiệp và trang thiết bị hiện đại, Nature Beauty tự hào là trung tâm thẩm mỹ tiên tiến và
            đáng tin cậy, góp phần quan trọng trong việc nâng cao sức đẹp của khách hàng.
          </Text>
        </div>
        <img className='w-3/5 fade-img' src={Landing1Image} alt='landing' />
      </div>
      <div className='flex items-center justify-center'>
        <Text className='font-bold text-[3rem] text-green-500'>Vì sao nên chọn chúng tôi?</Text>
      </div>
      <div className='grid grid-cols-2 gap-4'>
        {reasons.map((reason, index) => (
          <LandingSectionItem key={index} title={reason.title} body={reason.body} icon={reason.icon} />
        ))}
      </div>
      <div className='flex flex-col justify-center items-center gap-y-8 bg-gray-200 p-5'>
        <Text className='font-bold text-[2rem] text-green-500'>Các gói Liệu trình thẩm mỹ</Text>
        <Text className='text-center text-[1rem]'>
          Chúng tôi cung cấp đa dạng gói xét nghiệm đáp ứng đầy đủ nhu cầu kiểm tra và theo dõi sức khoẻ định kỳ của
          bạn. Tất cả được thiết kế nhằm mang đến các giải pháp chẩn đoán, theo dõi và điều trị toàn diện.
        </Text>
      </div>
      <div className='grid grid-cols-3 gap-4'>
        {services.map((service: ProductItemProps, index: number) => {
          return (
            <ProductItem
              key={index}
              productName={service.productName}
              productDescription={service.productDescription}
              productImg={service.productImg}
            />
          )
        })}
      </div>
      <div className='flex items-center gap-8'>
        <div className='w-1/2'>
          <Text className='font-bold text-green-500 text-3xl'>1.000.000+ lượt khách hàng đã tin tưởng lựa chọn</Text>
          <div className='mt-5 grid grid-cols-2 gap-8'>
            {comments.map((comment: ReviewCommentProps, index: number) => (
              <ReviewComment
                key={index}
                comment={comment.comment}
                commentImg={comment.commentImg}
                commentRate={comment.commentRate}
                commentorName={comment.commentorName}
              />
            ))}
          </div>
        </div>
        <div className='w-1/2 grid grid-cols-3 gap-2'>
          {[...Array(9)].map(() => (
            <img src='https://vienthammydiva.vn/wp-content/uploads/2023/05/DSC06025-2.webp' />
          ))}
        </div>
      </div>
      <div className='text-center'>
        <Text className='block font-bold text-3xl text-green-500 mb-3'>Hình ảnh cơ sở vật chất</Text>
        <Text className='mb-3'>
          Đồng bộ trên toàn hệ thống, các chi nhánh Viện thẩm mỹ Nature Beauty đều được thiết kế với không gian rộng
          lớn, kiến trúc sang trọng cùng trang thiết bị hiện đại bậc nhất. Nhằm mang lại sự hài lòng cho khách hàng khi
          đến trải nghiệm các Liệu trình làm đẹp chất lượng tại đây.
        </Text>
        <div className='flex items-center mt-5 gap-2'>
          {goods.map((good: { title: string; img: string }, index: number) => (
            <Card key={index} hoverable cover={<img alt='example' src={good.img} />}>
              <Card.Meta title={good.title} />
            </Card>
          ))}
        </div>
      </div>
      <FloatButton.Group shape='circle' style={{ right: 50 }}>
        <FloatButton icon={<HelpCircle size={20} />} />
        <FloatButton icon={<CalendarDays size={20} />} />
        <FloatButton.BackTop visibilityHeight={0} />
      </FloatButton.Group>
    </div>
  )
}
