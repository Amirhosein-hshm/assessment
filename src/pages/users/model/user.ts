interface Geo {
  lat: string
  lng: string
}

interface Address {
  street: string
  suite: string
  city: string
  zipcode: string
  geo: Geo
}

interface Company {
  name: string
  catchPhrase: string
}

interface User {
  id: number
  name: string
  username: string
  email: string
  address: Address
  phone: string
  website: string
  company: Company
}

type SortField = "name" | "email"
type SortOrder = "asc" | "desc"

interface UrlParams {
  name: string
  email: string
  sortBy: SortField
  sortOrder: SortOrder
}

export type { User, Address, Company, Geo, SortField, SortOrder, UrlParams }
