import {Knew} from 'knex'
import type { int } from 'zod'

declare module 'knew/types/tables'{
  export interface Tables {
    transactions: {
      id: string
      title: string
      amount: number
      created_at: string
      session_id: string
    }
  }
}