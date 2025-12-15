import { IMetadata } from "./IMetadata"

export interface IApiResponse<T> {
  results: number
  metadata: IMetadata
  data: T
}