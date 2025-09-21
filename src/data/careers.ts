import idat from '@/assets/education/idat.webp'
import upc from '@/assets/education/upc.webp'
import type { Career } from '@/types'

import { careersData } from './careersData'

export const careers: Career[] = [
  { ...careersData[0], logo: upc },
  { ...careersData[1], logo: idat },
]
