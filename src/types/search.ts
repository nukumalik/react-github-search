export interface Search<T> {
  total_count: number
  incomplete_results: boolean
  items: T[]
}
