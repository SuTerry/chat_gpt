

export enum Method {
  'GET' = 'GET',
  'POST' = 'POST',
  'PUT' = 'PUT',
  'DELETE' = 'DELETE',
}

export enum ResponseType {
  'arraybuffer' = 'arraybuffer',
  'blob' = 'blob',
  'document' = 'document',
  'json' = 'json',
  'text' = 'text',
  'stream' = 'stream',
}

export type FetchHeaders = Record<string, string>
export interface ApiFetchRequest {
  baseURL?: string
  url: string
  headers?: Record<string, string>
  method?: Method
  // body?: BodyInit | null
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body?: any
  signal?: AbortSignal
}

export interface FetchRequest extends RequestInit {
  url: string
  timeout?: number
}
export interface FetchResponse {
  url: string
  headers: FetchHeaders
  status: number
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any
}

export interface CustomResponse<T> {
  code: number // 返回状态码
  data: T // 返回数据
  message: string // 返回提示信息
}

export type DataType = {
  [key: string]: unknown
}

export type InterceptorsRequestResolve = (request: RequestInit) => RequestInit | Promise<RequestInit>

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type InterceptorsRequestReject = (error: any) => any

export type InterceptorsRequest = {
  interceptorsRequestResolve: InterceptorsRequestResolve
  interceptorsRequestReject?: InterceptorsRequestReject
}

export type InterceptorsResponseResolve = (response: FetchResponse) => FetchResponse

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type InterceptorsResponseReject = (error: any) => any

export type InterceptorsResponse = {
  interceptorsResponseResolve: InterceptorsResponseResolve
  interceptorsResponseReject?: InterceptorsResponseReject
}

export type Interceptors = {
  request: {
    use: (interceptorsRequestResolve: InterceptorsRequestResolve, interceptorsRequestReject?: InterceptorsRequestReject) => void
  },
  response: {
    use: (interceptorsResponseResolve: InterceptorsResponseResolve, interceptorsResponseReject?: InterceptorsResponseReject) => void
  },
}

export interface CpccFetch {
  (req: FetchRequest): Promise<FetchResponse>
  interceptors: Interceptors
}

export type TimeoutInit = (init: RequestInit, req: FetchRequest) => ({
  url: string,
  timeout: number,
  controller: AbortController | undefined
})

export type Timeout = (init: RequestInit, req: FetchRequest) => Promise<Response>

export type Overtime = (timeout: number, controller: AbortController | undefined) => Promise<Response>
