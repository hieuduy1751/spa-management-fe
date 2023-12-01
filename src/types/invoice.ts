export type InvoiceDetail = {
  totalQuantity: number
  idProduct: number
}

export type InvoiceType = {
  invoiceDetailRequests: InvoiceDetail[]
  employeeId: string
  customerId: string
  treatmentId: string
  paymentMethod: string
  note: string
  dueDate: string
  key?: string
  id?: string
}