import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { cartActions } from '../../store/cart-slice'
import { RootState } from '../../store'
import { Link } from 'react-router-dom'
import { FiShoppingBag } from 'react-icons/fi'
import { FaCcVisa, FaCcMastercard, FaCcPaypal, FaEthereum } from 'react-icons/fa'
import { SiBitcoincash, SiAmericanexpress } from 'react-icons/si'
import { BsCash } from 'react-icons/bs'
import CartList from './CartList/CartList'
import './Cart.css'

const Cart = () => {
	const dispatch = useDispatch()
	const cartItems = useSelector((state: RootState) => state.cart.items)
	const totalAmount = useSelector((state: RootState) => state.cart.totalAmount)
	const cartCounter = useSelector((state: RootState) => state.cart.totalQuantity)
	useEffect(() => {
		dispatch(cartActions.totalAmountCounter())
	}, [cartItems])

	return (
		<section className='cart section__wrapper'>
			<div className='cart__bg'>
				{cartCounter > 0 ? (
					<>
						<div className='cart__items'>
							<h1>Shopping Cart</h1>
							<hr />
							<CartList />
						</div>
						<div className='cart__summary'>
							<h3>Summary</h3>
							<hr />
							<div className='cart__summary-shipping'>
								<p>Shipping:</p>
								{totalAmount >= 100 ? <span>Free</span> : <span>$15</span>}
							</div>
							<div className='cart__summary-subtotal'>
								<p>Subtotal:</p>
								<span>${totalAmount.toFixed(2)}</span>
							</div>
							<Link to='/checkout' className='cart__summary-button'>
								proceed to checkout
							</Link>
							<hr />
							<div className='cart__summary-discount'>
								{/* <label htmlFor='discount'>Discount Code</label> */}
								<input type='text' id='discount' placeholder='Enter The Discount Code' />
								<button className=''>Apply</button>
							</div>
							<hr />
							<div className='cart__summary-payment'>
								<h3>We Accept</h3>
								<div className='cart__summary-payment--icons'>
									<FaCcVisa />
									<FaCcMastercard />
									<FaCcPaypal />
									<SiAmericanexpress />
									<SiBitcoincash />
									<FaEthereum />
									<BsCash />
								</div>
							</div>
						</div>
					</>
				) : (
					<div className='cart__container'>
						<div className='cart__container--bag'>
							<FiShoppingBag />
						</div>
						<p className='cart__container--text'>Get inspired and fill it with the latest trends.</p>
						<Link to='/store' className='cart__container--button'>
							continue shopping
						</Link>
					</div>
				)}
			</div>
		</section>
	)
}

export default Cart
