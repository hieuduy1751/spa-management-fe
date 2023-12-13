import API from '../constants/api'
import { AppointmentType } from '../types/appointment'
import { PaginationType } from '../types/generalTypes'
import authAxiosInstance from './authAxios'
import qs from 'qs'
import authAxiosInstanceCus from './authAxiosCus'

export async function createAppointment(appointment: AppointmentType) {
  const path = `${API.apiPath}/${API.appointment}`
  const res = await authAxiosInstanceCus.post(path, appointment)
  return res
}

export async function getAppointments(idCustomer: string, pagination?: PaginationType) {
  const paginationPayload = {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    page: pagination?.pagination?.current - 1 || 0,
    size: pagination?.pagination.pageSize || 10
  }
  const path = `${API.apiPath}/${API.appointment}/customer/${idCustomer}${
    pagination ? '?' + qs.stringify(paginationPayload) : ''
  }`
  const res = await authAxiosInstance.get(path)
  return res.data
}

export async function updateAppointment(appointment: AppointmentType, appointmentId: string) {
  const path = `${API.apiPath}/${API.appointment}/${appointmentId}`
  const res = await authAxiosInstance.put(path, appointment)
  return res.data
}

export async function deleteAppointment(appointmentId: string) {
  const path = `${API.apiPath}/${API.appointment}/${appointmentId}`
  const res = await authAxiosInstance.delete(path)
  return res.data
}

export async function searchStaffByName(text: string) {
  const paginationPayload = {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    page: 0,
    size: 10
  }
  const path = `${API.apiPath}/${API.appointment}/search/employee/text?text=${text}&${qs.stringify(paginationPayload)}`
  const res = await authAxiosInstance.get(path)
  return res.data
}
