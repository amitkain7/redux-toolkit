import React from 'react'
import {ChevronDown, ChevronUp} from '../icons'
import { removeItem ,increaseItem, decreaseItem } from '../features/cart/cartSlice'
import { useDispatch } from 'react-redux'
const CartItem = (props) => {  
   const {id, price, img, amount,title} = props
   const dispatch = useDispatch()
  return (
    <div className='cart-item'>
      <img src={img} alt={title} />
      <div>
      <h4>{title}</h4>
      <h4 className='item-price'>${price}</h4>
      <button className='remove-btn' onClick={() => dispatch(removeItem(id))}>remove</button>
      </div>
      <div>
        <button className='amount-btn' onClick={() => dispatch(increaseItem(id))}>
          <ChevronUp/>
        </button>
        <p className='amount'>{amount}</p>
        <button className='amount-btn' onClick={() => {
           if(amount === 1){
            dispatch(removeItem(id))
           }
           dispatch(decreaseItem(id))
          }}>
          <ChevronDown/>
        </button>
      </div>
    </div>
  )
}

export default CartItem