import { defineAction } from 'astro:actions'
import { createGetCvUrlAction } from './cv'

export const server = {
  getCvUrl: defineAction(createGetCvUrlAction()),
}
