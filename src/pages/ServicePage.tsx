import { Col, Divider, Input, Row, Slider } from 'antd'
import { useEffect } from 'react'
import ProductItem from '~/components/ProductItem'
import { useAppDispatch, useAppSelector } from '~/hooks/reduxHooks'
import { getServices } from '~/store/slices/serviceSlice'
import { PaginationType } from '~/types/generalTypes'

export default function ServicePage() {
  const data = useAppSelector((state) => state.services.services)
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
        <Divider />
        Khoảng giá
        <Slider range defaultValue={[200000, 500000]} min={200000} max={2000000} />
      </div>
      <div className='w-[80%] p-5'>
        <Row className='gap-4'>
          {data?.map((service, index) => (
            <Col key={index} span={7}>
              <ProductItem service={service} />
            </Col>
          ))}
        </Row>
      </div>
    </div>
  )
}
