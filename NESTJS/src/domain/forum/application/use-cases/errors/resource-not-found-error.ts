import type { UseCaseError } from 'src/core/errors/use-case-error.js'

export class ResourceNotFoundError extends Error implements UseCaseError {
  constructor() {
    super('Resource not found')
  }
}