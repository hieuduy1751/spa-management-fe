import API from '../constants/api'
import { TreatmentType } from '../types/treatment'
import authAxiosInstance from './authAxios'
import qs from 'qs'

export async function createTreatment(treatment: TreatmentType) {
  const params = {
    customerId: treatment.idCustomer,
    productId: treatment.idProduct
  }
  const path = `${API.apiPath}/${API.treatment}?${qs.stringify(params)}`
  const res = await authAxiosInstance.post(path, treatment)
  return res.data
}

export async function getTreatments(customerId: number) {
  const path = `${API.apiPath}/${API.treatment}/customer/${customerId}`
  const res = await authAxiosInstance.get(path)
  return res.data
}

export async function updateTreatment(treatment: TreatmentType) {
  const params = {
    customerId: treatment.idCustomer,
    productId: treatment.idProduct
  }
  const path = `${API.apiPath}/${API.treatment}?${qs.stringify(params)}`
  const res = await authAxiosInstance.put(path, treatment)
  return res.data
}

export async function deleteTreatment(treatmentId: string) {
  const path = `${API.apiPath}/${API.treatment}/${treatmentId}`
  const res = await authAxiosInstance.delete(path)
  return res.data
}

export async function getTreatmentByCustomer(customerId: string) {
  const path = `${API.apiPath}/${API.treatment}/customer/${customerId}`
  const res = await authAxiosInstance.get(path)
  return res.data
}
