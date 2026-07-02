import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import type { Product } from '../data/products'
import { loadCart, saveCart } from '../utils/cartStorage'
import { getUserIdFromToken } from '../utils/token'

export type CartItem = {
  // Just the shape of one item in the cart.
  id: string
  name: string
  price: number
  quantity: number
}

type CartContextType = {
  // a TypeScript contract: “anything reading cart context gets these fields.”
  items: CartItem[]
  addToCart: (product: Product) => void
  removeFromCart: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  cartCount: number
  cartTotal: number
}

const CartContext = createContext<CartContextType | null>(null) // createContext creates a “channel” components can subscribe to. It starts as null because the real value comes from the Provider. The pipe that carries the cart data to the components that need it.

type CartProviderProps = {
  children: ReactNode
}

// the Provider component that wraps the app and provides the cart data to the components that need it. Wraps the app. <App /> is children.
export function CartProvider({ children }: CartProviderProps) {
  const userId = getUserIdFromToken()
  const skipSaveRef = useRef(false)
  const [items, setItems] = useState<CartItem[]>(() => loadCart(getUserIdFromToken()))

  // When a different user logs in, load that user's saved cart
  useEffect(() => {
    skipSaveRef.current = true
    setItems(loadCart(userId))
  }, [userId])

  // Persist cart changes for the current user
  useEffect(() => {
    if (skipSaveRef.current) {
      skipSaveRef.current = false
      return
    }

    saveCart(userId, items)
  }, [items, userId])

  const addToCart = useCallback((product: Product) => {
    setItems((currentItems) => {
      // currentItems is the current cart array (just a parameter name, not the state itself)
      const existing = currentItems.find((item) => item.id === product.id) // find if the product is already in the cart

      if (existing) {
        return currentItems.map(
          (
            item, // if the product is already in the cart, update the quantity
          ) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 } // copy the item and update the quantity
              : item, // leave other items unchanged
        )
      }

      return [
        // if the product is not in the cart, add it to the cart
        ...currentItems,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
        },
      ]
    })
  }, [])

  const removeFromCart = useCallback((productId: string) => {
    setItems((currentItems) =>
      currentItems.filter((item) => item.id !== productId),
    )
  }, [])

  const updateQuantity = useCallback(
    (productId: string, quantity: number) => {
      if (quantity <= 0) {
        setItems((currentItems) =>
          currentItems.filter((item) => item.id !== productId),
        ) // if the quantity is 0 or less, remove the product from the cart
        return
      }

      setItems((currentItems) =>
        // update the quantity of the product in the cart
        currentItems.map((item) =>
          item.id === productId ? { ...item, quantity } : item,
        ),
      )
    },
    [],
  )

  const clearCart = useCallback(() => {
    setItems([])
  }, [])

  const cartCount = items.reduce((total, item) => total + item.quantity, 0) // count the total number of items in the cart
  const cartTotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0, // start with 0
  ) // multiply the price of the item by the quantity and add it to the total

  // useMemo keeps the context value stable so consumers don't re-render unnecessarily
  const value = useMemo(  //  useMemo caches the context value object so CartProvider only publishes a new context snapshot when cart state or its handlers actually change, not on every render.
    () => ({
      items,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      cartCount,
      cartTotal,
    }),
    [
      items,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      cartCount,
      cartTotal,
    ],
  )

  return ( // // The component that supplies cart data to the tree. Anything inside it (children) can read that data with useCart().  Shares the cart sate and functions via value={...}.
    // CartProvider publishes everything to the rest of the app.
    <CartContext.Provider value={value}> 
      {children}
    </CartContext.Provider>
  )
}

// useCart() is a hook that reads the cart data from the CartContext. It's a custom hook that uses the useContext hook to read the cart data from the CartContext.
// Any component that calls useCart() gets { items, addToCart, removeFromCart, updateQuantity, cartCount, cartTotal } (but they don't have to use all of them)
export function useCart() {
  const context = useContext(CartContext) // reads whatever CartProvider put in value={...}

  if (!context) {
    throw new Error('useCart must be used within CartProvider') // if the component (App) is not wrapped in CartProvider, throw an error
  }

  return context // gives you the cart object so you can destructure: const {items, addToCart, removeFromCart, updateQuantity, cartCount, cartTotal} = useCart()
}
// Think of Context like a TV broadcast — the Provider is the tower transmitting a signal,
// and any component that calls useContext() is a TV tuned to that channel.
// Components in between don't need to relay the signal; they just ignore it.
