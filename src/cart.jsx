import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { lineKey } from './menu'

const CartContext = createContext(null)
const STORAGE = 'bk-cart'

export function CartProvider({ children }) {
  const [lines, setLines] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE) || '[]')
      return Array.isArray(saved) ? saved : []
    } catch {
      return []
    }
  })
  const [open, setOpen] = useState(false)

  useEffect(() => {
    localStorage.setItem(STORAGE, JSON.stringify(lines))
  }, [lines])

  const api = useMemo(() => {
    const count = lines.reduce((sum, line) => sum + line.qty, 0)
    const total = lines.reduce((sum, line) => sum + line.price * line.qty, 0)
    return {
      lines,
      open,
      setOpen,
      count,
      total,
      add(item, option) {
        const key = lineKey(item.id, option.id)
        setLines((prev) => {
          const index = prev.findIndex((line) => line.key === key)
          if (index >= 0) {
            const next = [...prev]
            next[index] = { ...next[index], qty: next[index].qty + 1 }
            return next
          }
          return [
            ...prev,
            {
              key,
              id: item.id,
              name: item.name,
              optionId: option.id,
              optionLabel: option.label,
              detail: option.detail,
              price: option.price,
              img: item.img,
              qty: 1,
            },
          ]
        })
        setOpen(true)
      },
      setQty(key, qty) {
        setLines((prev) =>
          qty <= 0 ? prev.filter((line) => line.key !== key) : prev.map((line) => (line.key === key ? { ...line, qty } : line)),
        )
      },
      clear() {
        setLines([])
      },
    }
  }, [lines, open])

  return <CartContext.Provider value={api}>{children}</CartContext.Provider>
}

export function useCart() {
  return useContext(CartContext)
}
