import { Layout } from 'antd'
import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '~/components/Footer'
import Header from '~/components/Header'
import { useAppDispatch } from '~/hooks/reduxHooks'
import { doRefresh } from '~/store/slices/authSlice'
const { Content } = Layout

export default function FullscreenLayout() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(doRefresh())
  }, [])

  return (
    <Layout>
      <Header />
      <Layout>
        <Content>
          <Outlet />
        </Content>
      </Layout>
      <Footer />
    </Layout>
  )
}
