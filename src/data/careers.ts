import idatLogo from '@/assets/education/idat.webp'
import upcLogo from '@/assets/education/upc.webp'
import type { Career } from '@/types'
import { careersData } from './careersData'

export const careers: Career[] = [
  {
    ...careersData[0],

    logo: upcLogo,
  },
  {
    ...careersData[1],

    logo: idatLogo,
  },
]
