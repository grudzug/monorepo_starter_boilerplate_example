export class ApiError extends Error {
  status: number
  code?: string

  constructor(message: string, status: number, code?: string) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.code = code
  }
}

export class ApiContractError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'ApiContractError'
  }
}
