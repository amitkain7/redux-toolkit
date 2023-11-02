import React from 'react'
import CartItem from './CartItem'
import { useSelector, useDispatch } from 'react-redux'
import { openModal } from '../features/modal/modalSlice'

const CartContainer = () => {
    const { cartItem, amount, total } = useSelector((store) => store.cart)
    const dispatch = useDispatch()

    if (amount < 1) {
        return (
            <div className='cart'>
                <div>
                    <h2>your bag</h2>
                    <h4 className='empty-cart'>is currently empty</h4>
                </div>
            </div>
        )
    }
    return (
        <div className='cart'>
            <div>
                <h2>your bag</h2>
            </div>
            <div>

                {
                    cartItem.map((item) => {
                        return <CartItem key={item.id} {...item} />
                    })
                }
            </div>
            <footer>
                <div className='cart-total'>
                    <hr />
                    <h4>total <span>${total}</span></h4>
                </div>
                <button className='btn clear-btn' onClick={() => dispatch(openModal())}>clear cart</button>
            </footer>
        </div>
    )
}

export default CartContainer