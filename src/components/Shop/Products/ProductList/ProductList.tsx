import React, { useState, useEffect } from 'react'
import ProductItem from './ProductItem/ProductItem'
import { useSelector } from 'react-redux'
import './ProductList.css'
import { RootState } from '../../../../store'
import { GetClothesProps } from '../../../../store/fetchapi-slice'

const ProductList = (): React.ReactElement => {
	const clothesData = useSelector((state: RootState) => state.fetchClothes.clothes)
	const sortType = useSelector((state: RootState) => state.sortingClothes.sortAs)
	const filterValue = useSelector((state: RootState) => state.filteringClothes.filterValue)
	const viewType = useSelector((state: RootState) => state.view.view)
	const [filteredData, setFilteredData] = useState<GetClothesProps[]>([])
	const [sortedData, setSortedData] = useState<GetClothesProps[]>([])
	
	useEffect(() => {
		let newClothesData = [...clothesData]
		if (filterValue.length === 0) {
			setFilteredData(newClothesData)
		} else {
			setFilteredData(
				newClothesData.filter((item: GetClothesProps) =>
					filterValue.some(val => item.title.toLowerCase().includes(val))
				)
			)
		}
	}, [clothesData, filterValue])

	useEffect(() => {
		let newClothesData = [...filteredData]
		const sortArray = (type: string) => {
			const types = {
				none: 'none',
				priceAsc: 'price',
				priceDes: 'price',
				titleAsc: 'title',
				titleDes: 'title',
			}

			const sortProperty = types[type as keyof typeof types]
			if (sortType === 'priceAsc') {
				return newClothesData.sort((a, b) => (a[sortProperty] > b[sortProperty] ? 1 : -1))
			} else if (sortType === 'priceDes') {
				return newClothesData.sort((a, b) => (a[sortProperty] < b[sortProperty] ? 1 : -1))
			} else if (sortType === 'titleAsc') {
				return newClothesData.sort((a, b) => (a[sortProperty].toUpperCase() > b[sortProperty].toUpperCase() ? 1 : -1))
			} else if (sortType === 'titleDes') {
				return newClothesData.sort((a, b) => (a[sortProperty].toUpperCase() < b[sortProperty].toUpperCase() ? 1 : -1))
			} else {
				return newClothesData
			}
		}
		setSortedData(newClothesData)
		sortArray(sortType)
	}, [sortType, filteredData])

	return (
		<div className={viewType ? 'product-list product-list__list-view' : 'product-list'}>
			{/* <h1>Clothes & Accessories</h1> */}
			{/* <hr /> */}
			{sortedData.map(item => {
				return <ProductItem key={item.id} clothesData={item} />
			})}
		</div>
	)
}

export default ProductList
