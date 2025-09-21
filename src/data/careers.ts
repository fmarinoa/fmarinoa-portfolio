import idatLogo from '@/assets/education/idat.webp'
import upcLogo from '@/assets/education/upc.webp'
import type { Career } from '@/types'

export const careers: Career[] = [
  {
    institutionShort: 'UPC',
    location: 'Lima, Perú',
    institutionLong: 'Universidad Peruana de Ciencias Aplicadas',
    title: 'Ingeniería de Sistemas',
    period: '2025 - 2028',
    details: ['Participación en proyectos de desarrollo de software ágiles.'],
    logo: upcLogo,
  },
  {
    institutionShort: 'IDAT',
    location: 'Lima, Perú',
    institutionLong:
      'Instituto de Investigación y Desarrollo de Administración y Tecnología',
    title: 'Computación e Informática',
    period: '2022 - 2023',
    details: [
      'Especialización en pruebas de software y automatización.',
      'Desarrollo de aplicaciones backend, web y móviles.',
      'Implementación de bases de datos y sistemas de gestión.',
    ],
    logo: idatLogo,
  },
]
