import { useEffect } from 'react'

export function useScrollToSection(hash: string) {
  useEffect(() => {
    document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' })
  }, [hash])
}
