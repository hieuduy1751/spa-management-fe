import API from '~/constants/api'
import authAxiosInstance from './authAxios'
import authAxiosInstanceCus from './authAxiosCus'

export async function getReviewsByProductId(productId: string) {
  const path = `${API.apiPath}/${API.rating}/product/${productId}`
  const res = await authAxiosInstanceCus.get(path)
  return res.data
}

export async function sendReviewByProductId(productId: string, customerId: string, comment: any) {
  const path = `${API.apiPath}/${API.rating}/customer/${customerId}/product/${productId}`
  const res = await authAxiosInstance.post(path, comment)
  return res.data
}