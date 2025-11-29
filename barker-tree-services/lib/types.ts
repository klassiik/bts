export interface Service {
  id: string
  title: string
  description: string
  features: string[]
}

export interface ServiceArea {
  city: string
  state: string
}

export interface BusinessInfo {
  name: string
  phone: string
  phoneRaw: string
  email: string
  address: string
  city: string
  state: string
  zip: string
  hours: string
  cslb: string
  url: string
}

export interface Testimonial {
  name: string
  text: string
  rating: number
}
