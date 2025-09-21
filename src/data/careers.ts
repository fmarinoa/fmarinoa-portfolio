import idat from '@/assets/education/idat.webp'
import upc from '@/assets/education/upc.webp'
import { Career } from '@/types'

import { careersData } from './careersData'

export const careers: Career[] = [
  { ...careersData[0], logo: upc },
  { ...careersData[1], logo: idat },
]
