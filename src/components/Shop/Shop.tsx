import React from 'react'
import { useSelector } from 'react-redux'
import ShopNavigation from './ShopNavigation/ShopNavigation'
import ProductList from './Products/ProductList/ProductList'
import Spinner from '../UI/Spinner/Spinner'
import Error from '../UI/Error/Error'
import './Shop.css'
import { RootState } from '../../store'

interface ShopProps {
	loading: boolean
	error: boolean
}

const Shop = (): React.ReactElement => {
	const { loading: isLoading, error: isError }: ShopProps = useSelector((state: RootState) => state.fetchClothes)
	return (
		<section className='shop section__wrapper'>
			<ShopNavigation />
			{isLoading && !isError && <Spinner />}
			{!isLoading && !isError && <ProductList />}
			{!isLoading && isError && <Error />}
		</section>
	)
}

export default Shop
