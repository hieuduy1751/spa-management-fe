import { Layout } from 'antd'
import { Content } from 'antd/es/layout/layout'
import { Outlet } from 'react-router-dom'
import Footer from '~/components/Footer'
import Header from '~/components/Header'
import Sidebar from '~/components/Sidebar'

export default function MainLayout() {
  return (
    <Layout>
      <Header />
      <Layout>
        <Content className='w-full flex h-full'>
          <div className='w-[20%] 2xl:w-[10%] h-full bg-gray-200'>
            <Sidebar />
          </div>
          <div className='w-[80%] 2xl:w-[90%] h-[100vh] p-5'>
            <Outlet />
          </div>
        </Content>
      </Layout>
      <Footer />
    </Layout>
  )
}
