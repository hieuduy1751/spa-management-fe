import { Button, Input, Space, Table } from 'antd'
import { SearchProps } from 'antd/es/input'
import { ColumnsType, TablePaginationConfig } from 'antd/es/table'
import { useEffect, useState } from 'react'
import { PaginationType } from '../types/generalTypes'
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks'
import { TreatmentType } from '../types/treatment'
import { getTreatments, setSelectedTreatment, setTreatments } from '../store/slices/treatmentSlice'
import TreatmentDetail from '../components/TreatmentDetail'
import TREATMENT_STATUS from '../constants/treatment-status'
import dayjs from 'dayjs'
import { getUser } from '~/store/slices/userSlice'

export default function TreatmentListPage() {
  const [treatmentDetailModalOpen, setTreatmentDetailModalOpen] = useState<boolean>(false)
  const dispatch = useAppDispatch()
  const username = useAppSelector((state) => state.auth.username)
  const data = useAppSelector((state) => state.treatments.treatments)
  const user = useAppSelector((state) => state.user.user)
  const loading = useAppSelector((state) => state.treatments.loading)
  const tableParams: PaginationType = useAppSelector((state) => state.treatments.pagination)
  const columns: ColumnsType<TreatmentType> = [
    {
      title: 'Ngày tiếp nhận',
      dataIndex: 'createdDate',
      key: 'createdDate',
      render: (record) => dayjs(record.createdDate).format('HH:mm DD/MM/YY'),
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      sorter: (a, b) => a.customerResponse?.firstName.charCodeAt(0) - b.customerResponse?.firstName.charCodeAt(0)
    },
    {
      title: 'Liệu trình',
      dataIndex: 'productResponse',
      key: 'productResponse',
      render: (record) => record.name,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      sorter: (a, b) => a.productResponse?.name.charCodeAt(0) - b.productResponse?.name.charCodeAt(0)
    },
    {
      title: 'Nhân viên',
      dataIndex: 'employeeResponse',
      key: 'employeeResponse',
      render: (record) => record.lastName + ' ' + record.firstName,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      sorter: (a, b) => a.employeeResponse?.firstName.charCodeAt(0) - b.employeeResponse?.firstName.charCodeAt(0)
    },
    {
      title: 'Ghi chú',
      dataIndex: 'note',
      key: 'note',
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      sorter: (a, b) => a.note?.charCodeAt(0) - b.note?.charCodeAt(0)
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (text) => TREATMENT_STATUS[text],
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      sorter: (a, b) => a.status?.charCodeAt(0) - b.status?.charCodeAt(0)
    },
    {
      title: 'Tùy chọn',
      key: 'action',
      render: (_, record) => (
        <Space size='middle'>
          <Button onClick={() => handleTreatmentSelected(record)} type='primary'>
            Xem
          </Button>
        </Space>
      )
    }
  ]

  const handleTreatmentSelected = (treatment: TreatmentType) => {
    dispatch(setSelectedTreatment(treatment))
    setTreatmentDetailModalOpen(true)
  }

  const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value)

  const fetchData = () => {
    try {
      dispatch(getTreatments())
    } catch (err) {
      console.log(err)
    }
  }

  const handleTableChange = (pagination: TablePaginationConfig) => {
    if (
      tableParams.pagination.current !== pagination.current ||
      tableParams.pagination.pageSize !== pagination.pageSize
    ) {
      fetchData()
    }

    // `dataSource` is useless since `pageSize` changed
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      dispatch(setTreatments([]))
    }
  }

  useEffect(() => {
    if (username) {
      dispatch(getUser(username))
    }
  }, [username])

  useEffect(() => {
    fetchData()
  }, [user?.id])

  return (
    <div className='w-full h-full'>
      <div className='flex items-center mb-3'>
        <Input.Search placeholder='Tìm kiếm liệu trình' allowClear onSearch={onSearch} className='w-72' />
      </div>
      <TreatmentDetail modalOpen={treatmentDetailModalOpen} setModalOpen={setTreatmentDetailModalOpen} />
      <Table
        rowKey={(record) => record.id || ''}
        loading={loading}
        columns={columns}
        dataSource={data}
        pagination={tableParams.pagination}
        onChange={handleTableChange}
      />
    </div>
  )
}
