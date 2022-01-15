import { User } from './user';

export interface Review {
  id: number
  rate: string
  product: number
  created_by: User
  created_at: Date
}
