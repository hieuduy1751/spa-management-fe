import API from '../constants/api'
import { InvoiceType } from '../types/invoice'
import authAxiosInstance from './authAxios'

export async function createInvoice(invoice: InvoiceType) {
  const path = `${API.apiPath}/${API.invoice}`
  const res = await authAxiosInstance.post(path, invoice)
  return res.data
}

export async function getInvoices(customerId: string) {
  const path = `${API.apiPath}/${API.invoice}/customer?customerId=${customerId}`
  const res = await authAxiosInstance.get(path)
  return res.data
}

export async function updateInvoice(invoice: any, invoiceId: string) {
  const path = `${API.apiPath}/${API.invoice}/${invoiceId}`
  const res = await authAxiosInstance.put(path, invoice)
  return res.data
}

export async function deleteInvoice(invoiceId: string) {
  const path = `${API.apiPath}/${API.invoice}/${invoiceId}`
  const res = await authAxiosInstance.delete(path)
  return res.data
}