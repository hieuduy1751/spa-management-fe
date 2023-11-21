import { Layout } from 'antd'
import { Outlet } from 'react-router-dom'
import Header from '~/components/Header'
const { Content, Footer } = Layout

export default function FullscreenLayout() {
  return (
    <Layout>
      <Header />
      <Layout>
        <Content>
          <Outlet />
        </Content>
      </Layout>
      <Footer className='text-center'>Spa Management &copy; 2023</Footer>
    </Layout>
  )
}
