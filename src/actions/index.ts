import { defineAction } from 'astro:actions'
import { getCvUrl } from '@/services/getCvUrl'
import { ActionError } from 'astro/actions/runtime/virtual/shared.js'

export const server = {
  getCvUrl: defineAction({
    async handler() {
      const { success, error, cvUrl } = await getCvUrl()
      if (error) {
        throw new ActionError({
          code: 'INTERNAL_SERVER_ERROR',
          message: error,
        })
      }

      if (!success || !cvUrl) {
        throw new ActionError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to retrieve CV URL',
        })
      }

      return cvUrl
    },
  }),
}
