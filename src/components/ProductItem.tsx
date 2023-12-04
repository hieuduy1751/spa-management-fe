import { Card, Typography } from 'antd'
import { useNavigate } from 'react-router-dom'
import { ProductType } from '~/types/product'

export type ProductItemProps = {
  service: ProductType
}

const { Meta } = Card

export default function ProductItem({ service }: ProductItemProps) {
  const navigate = useNavigate()

  return (
    <Card
      onClick={() => navigate('/services/' + service?.id)}
      hoverable
      cover={
        <img
          alt={service?.name}
          src={
            service?.imageUrl ||
            'https://bluejaypos.vn/Uploads/images/trai-nghiem-khach-hang-spa-la-gi-tam-quan-trong-va-cach-cai-thien-2.jpeg'
          }
        />
      }
    >
      <Meta
        title={<Typography.Text className='text-xl font-bold'>{service?.name}</Typography.Text>}
        description={
          <div>
            <Typography.Text className='block text-red-700 font-semibold'>
              {service?.price.toLocaleString()} VND
            </Typography.Text>
            <Typography.Text>{service?.description}</Typography.Text>
          </div>
        }
      />
    </Card>
  )
}
