import { Button, Input, Space, Table } from 'antd'
import { SearchProps } from 'antd/es/input'
import { ColumnsType, TablePaginationConfig } from 'antd/es/table'
import { useEffect, useState } from 'react'
import { PaginationType } from '../types/generalTypes'
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks'
import { InvoiceType } from '../types/invoice'
import { getInvoices, setInvoices, setSelectedInvoice } from '../store/slices/invoicesSlice'
import InvoiceDetail from '../components/InvoiceDetail'
import dayjs from 'dayjs'
import INVOICE_STATUS from '~/constants/invoice-status'
import { getUser } from '~/store/slices/userSlice'

export default function InvoicePage() {
  const [invoiceDetailModalOpen, setInvoiceDetailModalOpen] = useState<boolean>(false)
  const dispatch = useAppDispatch()
  const username = useAppSelector((state) => state.auth.username)
  const user = useAppSelector((state) => state.user.user)
  const data = useAppSelector((state) => state.invoices.invoices)
  const loading = useAppSelector((state) => state.invoices.loading)
  const tableParams: PaginationType = useAppSelector((state) => state.invoices.pagination)
  const columns: ColumnsType<InvoiceType> = [
    {
      title: 'Hóa đơn số',
      dataIndex: 'id',
      key: 'id',
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      sorter: (a, b) => a.id - b.id
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdDate',
      key: 'createdDate',
      render: (text) => dayjs(text).format('HH:mm DD/MM/YYYY'),
      sorter: (a, b) =>
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        a.createdDate.charCodeAt(0) - b.createdDate.charCodeAt(0)
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (text) => INVOICE_STATUS[text],
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      sorter: (a, b) => a.status.charCodeAt(0) - b.status.charCodeAt(0)
    },
    {
      title: 'Ngày thanh toán',
      dataIndex: 'updatedDate',
      key: 'updatedDate',
      render: (text, record) => (record.status === 'PAID' ? dayjs(text).format('HH:mm DD/MM/YYYY') : ''),
      sorter: (a, b) =>
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        a.updatedDate.charCodeAt(0) - b.updatedDate.charCodeAt(0)
    },
    {
      title: 'Tùy chọn',
      key: 'action',
      render: (_, record) => (
        <Space size='middle'>
          <Button onClick={() => handleInvoiceSelected(record)} type='primary'>
            Xem
          </Button>
        </Space>
      )
    }
  ]

  const handleInvoiceSelected = (invoice: InvoiceType) => {
    dispatch(setSelectedInvoice(invoice))
    setInvoiceDetailModalOpen(true)
  }

  const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value)

  const fetchData = () => {
    try {
      dispatch(getInvoices())
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
      dispatch(setInvoices([]))
    }
  }

  useEffect(() => {
    if (username) {
      dispatch(getUser(username))
    }
  }, [username])

  useEffect(() => {
    if (user && user?.id) {
      fetchData()
    }
  }, [user?.id])

  return (
    <div className='w-full h-full'>
      <div className='flex items-center mb-3'>
        <Input.Search placeholder='Tìm kiếm hóa đơn' allowClear onSearch={onSearch} className='w-72' />
      </div>
      <InvoiceDetail modalOpen={invoiceDetailModalOpen} setModalOpen={setInvoiceDetailModalOpen} />
      <Table
        rowKey={(record) => record.id || record.dueDate}
        loading={loading}
        columns={columns}
        dataSource={data}
        pagination={tableParams.pagination}
        onChange={handleTableChange}
      />
    </div>
  )
}
