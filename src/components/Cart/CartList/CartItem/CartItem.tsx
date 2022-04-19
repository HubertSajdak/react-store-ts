import React from 'react'
import { useDispatch } from 'react-redux'
import { cartActions } from '../../../../store/cart-slice'
import { CartListProps } from '../CartList'
import './CartItem.css'

const CartItem = ({ itemsData }: { itemsData: CartListProps['item'] }) => {
	const dispatch = useDispatch()
	const addItemHandler = () => {
		dispatch(
			cartActions.addItemToCart({
				id: itemsData.id,
				title: itemsData.title,
				image: itemsData.image,
				price: itemsData.price,
			})
		)
	}
	const removeItemHandler = () => {
		dispatch(cartActions.removeItemFromCart(itemsData.id))
	}
	return (
		<li className='cart-item'>
			<div className='cart-item__img'>
				<img src={itemsData.image} alt={itemsData.title} />
			</div>
			<div className='cart-item__text'>
				<p>{itemsData.title}</p>
			</div>
			<div className='cart-item__price'>
				<p>Price: </p>
				<span>${itemsData.totalPrice.toFixed(2)}</span>
			</div>
			<div className='cart-item__options'>
				<button className='cart-item__options--sub-button' onClick={removeItemHandler}>
					-
				</button>
				<p>{itemsData.quantity}</p>
				<button className='cart-item__options--add-button' onClick={addItemHandler}>
					+
				</button>
			</div>
		</li>
	)
}

export default CartItem
