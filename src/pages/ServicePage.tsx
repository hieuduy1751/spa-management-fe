import { Col, Input, Row } from 'antd'
import { useEffect } from 'react'
import ProductItem from '~/components/ProductItem'
import { useAppDispatch, useAppSelector } from '~/hooks/reduxHooks'
import { getServices } from '~/store/slices/serviceSlice'
import { PaginationType } from '~/types/generalTypes'

export default function ServicePage() {
  const data = useAppSelector((state) => state.services.services)
  const loading = useAppSelector((state) => state.services.loading)
  const tableParams: PaginationType = useAppSelector((state) => state.services.pagination)
  const dispatch = useAppDispatch()

  const fetchData = (params: PaginationType) => {
    try {
      dispatch(
        getServices({
          pagination: params
        })
      )
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchData(tableParams)
  }, [])

  return (
    <div className='w-full h-full flex'>
      <div className='w-[20%] p-5'>
        <Input.Search placeholder='Tìm kiếm dịch vụ' />
      </div>
      <div className='w-[80%] p-5'>
        <Row>
          {data?.map((service, index) => (
            <Col key={index} span={6}>
              <ProductItem
                productName={service.name}
                productDescription={service.description}
                productImg={service.imageUrl || ''}
              />
            </Col>
          ))}
        </Row>
      </div>
    </div>
  )
}
