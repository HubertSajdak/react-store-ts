import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { FaTruck } from 'react-icons/fa'
import { MdAssignmentReturn, MdSell } from 'react-icons/md'
import { cartActions } from '../../../../../Cart/cart-slice'
import '../ProductDetail.css'
import { RootState } from '../../../../../../store'

interface UseParamsProps {
	productId: string
}

const ProductDetail = () => {
	const params = useParams<UseParamsProps>()
	const clothesData = useSelector((state: RootState) => state.fetchClothes.clothes)
	const inspectedProduct = clothesData.find(product => product.id === params.productId)
	const dispatch = useDispatch()
	const addItemToCartHandler = () => {
		dispatch(
			cartActions.addItemToCart({
				id: `${inspectedProduct!.id}`,
				title: inspectedProduct!.title,
				price: inspectedProduct!.price,
				image: inspectedProduct!.image,
			})
		)
	}
	if (!inspectedProduct) {
		return <h1 style={{ fontSize: 70 }}>404</h1>
	}
	return (
		<section className='product-detail section__wrapper'>
			<div className='product-detail__img'>
				<img src={inspectedProduct.image} alt={inspectedProduct.description} />
			</div>
			<div className='product-detail__info'>
				<h4>{inspectedProduct.title}</h4>
				<p>Price: ${inspectedProduct.price}</p>
				<button onClick={addItemToCartHandler}>Add To Cart</button>
				<div className='product-detail__shipping-info'>
					<div className='product-detail__shipping-info--deilvery'>
						<FaTruck />
						<p>
							2-5 days <span>Free for orders over $100</span>
						</p>
					</div>
					<div className='product-detail__shipping-info--return'>
						<MdAssignmentReturn />
						<p>100-day right of return</p>
					</div>
					<div className='product-detail__shipping-info--resell'>
						<MdSell />
						<p>Resell your items</p>
					</div>
				</div>
			</div>
			<div className='product-detail__description'>
				<h5>Description</h5>
				<hr />
				<p>{inspectedProduct.description}</p>
			</div>
		</section>
	)
}

export default ProductDetail
