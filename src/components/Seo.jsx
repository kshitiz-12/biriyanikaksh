import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { applySeo } from '../seo'

export default function Seo() {
  const { pathname } = useLocation()
  useEffect(() => {
    applySeo(pathname)
  }, [pathname])
  return null
}
