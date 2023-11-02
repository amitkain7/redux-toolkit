import React, { useEffect } from 'react'
import Navbar from './components/Navbar'
import CartContainer from './components/CartContainer'
import Modal from './components/Modal'
import { useDispatch, useSelector } from 'react-redux'
import { calculateTotal, getCartItems } from './features/cart/cartSlice'

const App = () => {
  const { cartItem, isLoading } = useSelector((state) => state.cart)
  const { isOpen } = useSelector((state) => state.modal)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(calculateTotal())
  }, [cartItem])

  useEffect(() => {
    dispatch(getCartItems('random'))

  }, [])

  if (isLoading) {
  
    return <h2 style={{textAlign : 'center' , lineHeight: '100vh'}}>Loading...</h2>
  }

  return (
    <div>
      {isOpen && <Modal />}
      <Navbar />
      <CartContainer />
    </div>
  )
}

export default App