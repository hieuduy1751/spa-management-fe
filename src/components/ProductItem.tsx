import { Card } from 'antd'

export type ProductItemProps = {
  productImg: string
  productName: string
  productDescription: string
}

const { Meta } = Card

export default function ProductItem(props: ProductItemProps) {
  return (
    <Card
      hoverable
      cover={
        <img
          alt={props.productName}
          src={
            props.productImg ||
            'https://bluejaypos.vn/Uploads/images/trai-nghiem-khach-hang-spa-la-gi-tam-quan-trong-va-cach-cai-thien-2.jpeg'
          }
        />
      }
    >
      <Meta title={props.productName} description={props.productDescription} />
    </Card>
  )
}
