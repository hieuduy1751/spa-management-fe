import { CustomerType } from "./customer"
import { ProductType } from "./product"
import { StaffType } from "./staff"

export type TreatmentType = {
  id?: string
  key?: string
  idCustomer: string
  idProduct: string
  idEmployee: string
  note?: string
  imageBefore?: string
  imageCurrent?: string
  imageResult?: string
  customerResponse?: CustomerType
  productResponse?: ProductType
  employeeResponse?: StaffType
  status?: string
}