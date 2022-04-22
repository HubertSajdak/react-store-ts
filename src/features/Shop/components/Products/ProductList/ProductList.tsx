import { useState, useEffect } from 'react'
import ProductItem from './ProductItem/ProductItem'
import { useSelector } from 'react-redux'
import './ProductList.css'
import { RootState } from '../../../../../store'
import { ClothProps } from 'store/fetchapi-slice'
const ProductList = () => {
	const clothesData = useSelector((state: RootState) => state.fetchClothes.clothes)
	const sortType = useSelector((state: RootState) => state.sortingClothes.sortAs)
	const filterValue = useSelector((state: RootState) => state.filteringClothes.filterValue)
	const viewType = useSelector((state: RootState) => state.view.view)
	const [filteredData, setFilteredData] = useState<ClothProps[]>([])
	const [sortedData, setSortedData] = useState<ClothProps[]>([])

	useEffect(() => {
		let newClothesData = [...clothesData]
		if (filterValue.length === 0) {
			setFilteredData(newClothesData)
		} else {
			setFilteredData(newClothesData.filter(item => filterValue.some(val => item.title.toLowerCase().includes(val))))
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
				return newClothesData.sort((a, b) =>
					a[sortProperty as keyof ClothProps] > b[sortProperty as keyof ClothProps] ? 1 : -1
				)
			} else if (sortType === 'priceDes') {
				return newClothesData.sort((a, b) =>
					a[sortProperty as keyof ClothProps] < b[sortProperty as keyof ClothProps] ? 1 : -1
				)
			} else if (sortType === 'titleAsc') {
				return newClothesData.sort((a, b) =>
					// @ts-ignore
					a[sortProperty as keyof ClothProps].toUpperCase() > b[sortProperty as keyof ClothProps].toUpperCase() ? 1 : -1
				)
			} else if (sortType === 'titleDes') {
				return newClothesData.sort((a, b) =>
					// @ts-ignore
					a[sortProperty as keyof ClothProps].toUpperCase() < b[sortProperty as keyof ClothProps].toUpperCase() ? 1 : -1
				)
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
