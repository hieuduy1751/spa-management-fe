import { useEffect, useState } from 'react'
import Table, { ColumnsType, TablePaginationConfig } from 'antd/es/table'
import { Button, Input, Space } from 'antd'
import { SearchProps } from 'antd/es/input'
import dayjs from 'dayjs'
import { useAppDispatch, useAppSelector } from '~/hooks/reduxHooks'
import { PaginationType } from '~/types/generalTypes'
import { AppointmentType } from '~/types/appointment'
import APPOINTMENT_STATUS from '~/constants/appointment-status'
import { getAppointments, setAppointments, setSelectedAppointment } from '~/store/slices/appointmentSlice'
import AppointmentDetail from '~/components/AppointmentDetail'
import { doRefresh } from '~/store/slices/authSlice'

export default function AppointmentListPage() {
  const [appointmentDetailModalOpen, setAppointmentDetailModalOpen] = useState<boolean>(false)
  const dispatch = useAppDispatch()
  const user = useAppSelector(state => state.user.user)
  const data = useAppSelector((state) => state.appointments.appointments)
  const loading = useAppSelector((state) => state.appointments.loading)
  const tableParams: PaginationType = useAppSelector((state) => state.appointments.pagination)
  const columns: ColumnsType<AppointmentType> = [
    {
      title: 'Thời gian',
      dataIndex: 'time',
      key: 'time',
      render: (text) => dayjs(text).subtract(14, 'hours').format('HH:mm DD/MM/YYYY'),
      sorter: (a, b) => a.time.charCodeAt(0) - b.time.charCodeAt(0)
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (text) => (text ? APPOINTMENT_STATUS[text] : text),
      sorter: (a, b) => a.status.charCodeAt(0) - b.status.charCodeAt(0)
    },
    {
      title: 'Ghi chú ',
      dataIndex: 'note',
      key: 'note',
      render: (text) => (text?.length > 20 ? text?.slice(0, 20) + '...' : text),
      sorter: (a, b) => a.note.charCodeAt(0) - b.note.charCodeAt(0)
    },
    {
      title: 'Dịch vụ',
      dataIndex: 'reference',
      key: 'referenceProduct',
      render: (record) => record.productName,
      sorter: (a, b) =>
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        a.reference?.productName.charCodeAt(0) -
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        b.reference?.productName.charCodeAt(0)
    },
    {
      title: 'Khách hàng',
      dataIndex: 'reference',
      key: 'referenceCustomer',
      render: (record) => record.customerName,
      sorter: (a, b) =>
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        a.reference?.customerName.charCodeAt(0) -
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        b.reference?.customerName.charCodeAt(0)
    },
    {
      title: 'Nhân viên',
      dataIndex: 'reference',
      key: 'referenceEmployee',
      render: (record) => record.employeeName,
      sorter: (a, b) =>
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        a.reference?.employeeName.charCodeAt(0) -
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        b.reference?.employeeName.charCodeAt(0)
    },
    {
      title: 'Tùy chọn',
      key: 'action',
      render: (_, record) => (
        <Space size='middle'>
          <Button onClick={() => handleAppointmentSelected(record)} type='primary'>
            Xem
          </Button>
        </Space>
      )
    }
  ]
  const handleAppointmentSelected = (appointment: AppointmentType) => {
    dispatch(setSelectedAppointment(appointment))
    setAppointmentDetailModalOpen(true)
  }

  const fetchData = (params: PaginationType) => {
    try {
      dispatch(
        getAppointments({
          pagination: params,
          customerId: user?.id || ''
        })
      )
    } catch (err) {
      console.log(err)
    }
  }

  const handleTableChange = (pagination: TablePaginationConfig) => {
    if (
      tableParams.pagination.current !== pagination.current ||
      tableParams.pagination.pageSize !== pagination.pageSize
    ) {
      fetchData({
        pagination: {
          current: pagination.current || 1,
          pageSize: pagination.pageSize || 10,
          total: tableParams.pagination.total
        }
      })
    }

    // `dataSource` is useless since `pageSize` changed
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      dispatch(setAppointments([]))
    }
  }

  const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value)

  useEffect(() => {
    dispatch(doRefresh())
  }, [])

  useEffect(() => {
    if (user?.id) {
      fetchData(tableParams)
    }
  }, [user?.id])

  return (
    <div className='w-full h-full'>
      <div className='flex items-center mb-3'>
        <Input.Search placeholder='Tìm kiếm cuộc hẹn' allowClear onSearch={onSearch} className='w-72' />
      </div>
      <AppointmentDetail modalOpen={appointmentDetailModalOpen} setModalOpen={setAppointmentDetailModalOpen} />
      <Table
        rowKey={(record) => record.id || record.time}
        loading={loading}
        columns={columns}
        dataSource={data}
        pagination={tableParams.pagination}
        onChange={handleTableChange}
      />
    </div>
  )
}
