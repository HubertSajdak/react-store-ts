import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { sortingActions } from '../../../store/sorting-slice'
import { filteringActions } from '../../../store/filtering-slice'
import { viewActions } from '../../../store/view-slice'
import { FaThList, FaBoxes } from 'react-icons/fa'
import { BsSortUp } from 'react-icons/bs'
import { AiOutlineArrowDown } from 'react-icons/ai'
import './ShopNavigation.css'
import { RootState } from '../../../store'

const ShopNavigation = () => {
	const viewType = useSelector((state: RootState) => state.view.view)
	const [isOptionsMenuOpen, setIsOptionsMenuOpen] = useState<boolean>(true)
	const [filterCategory, setFilterCategory] = useState<string[]>([])
	const typeRef = useRef<HTMLSelectElement>(null)
	const dispatch = useDispatch()

	const sortHandler = (): void => {
		if (typeRef.current!.value === 'none') {
			dispatch(sortingActions.sortNone())
		}
		if (typeRef.current!.value === 'priceAsc') {
			dispatch(sortingActions.sortPriceAsc())
		}
		if (typeRef.current!.value === 'priceDes') {
			dispatch(sortingActions.sortPriceDes())
		}
		if (typeRef.current!.value === 'titleAsc') {
			dispatch(sortingActions.sortA_Z())
		}
		if (typeRef.current!.value === 'titleDes') {
			dispatch(sortingActions.sortZ_A())
		}
	}
	// { target: { checked: boolean; value: string } }
	const filterHandler = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
		// @ts-ignore
		if (e.target.checked === true) {
			// @ts-ignore

			setFilterCategory(filterCategory => [...filterCategory, e.target.value])
		} else {
			// @ts-ignore

			setFilterCategory(filterCategory.filter(item => item !== e.target.value))
		}
	}
	useEffect(() => {
		dispatch(filteringActions.newFilterValue(filterCategory))
	}, [dispatch, filterCategory])

	const optionsMenuHandler = () => {
		setIsOptionsMenuOpen(!isOptionsMenuOpen)
	}
	const viewItemsHandler = () => {
		dispatch(viewActions.toggleView())
	}

	return (
		<>
			<div className={!isOptionsMenuOpen ? 'shop-navigation' : 'shop-navigation menu__hidden'}>
				<div className='shop-navigation__wrapper'>
					<div className='shop-navigation__sort'>
						<label htmlFor='sort'>Sort</label>
						<select onChange={sortHandler} name='sort' id='sorting' defaultValue='none' ref={typeRef}>
							<option value='none'>-</option>
							<option value='priceAsc'>Lowest Price</option>
							<option value='priceDes'>Highest Price</option>
							<option value='titleAsc'>A-Z</option>
							<option value='titleDes'>Z-A</option>
						</select>
					</div>
					<hr />
					<div className='shop-navigation__category'>
						<p>Categories</p>
						<ul className='shop-navigation__category--box'>
							<li>
								<input type='checkbox' id='backpacks' value='backpack' onClick={filterHandler} />
								<label htmlFor='backpacks'>Backpacks</label>
							</li>
							<li>
								<input type='checkbox' id='jackets' value='jacket' onClick={filterHandler} />
								<label htmlFor='jackets'>Jackets</label>
							</li>
							<li>
								<input type='checkbox' id='t-shirts' value='shirt' onClick={filterHandler} />
								<label htmlFor='t-shirts'>T-Shirts</label>
							</li>
							<li>
								<input type='checkbox' id='sleeves' value='sleeve' onClick={filterHandler} />
								<label htmlFor='sleeves'>Sleeves</label>
							</li>
							<li>
								<input type='checkbox' id='casual' value='casual' onClick={filterHandler} />
								<label htmlFor='casual'>Casual</label>
							</li>
						</ul>
					</div>
					<hr />
					<div className='shop-navigation__view'>
						<div className='shop-navigation__view-container'>
							{!viewType ? (
								<FaThList className='shop-navigation__view--list' onClick={viewItemsHandler} />
							) : (
								<FaBoxes className='shop-navigation__view--box' onClick={viewItemsHandler} />
							)}
						</div>
					</div>
				</div>
			</div>
			<div className='shop-navigation__smallscreen-menu '>
				{!isOptionsMenuOpen ? (
					<AiOutlineArrowDown className='shop-navigation__smallscreen-menu--show-icon' onClick={optionsMenuHandler} />
				) : (
					<BsSortUp className='shop-navigation__smallscreen-menu--show-icon' onClick={optionsMenuHandler} />
				)}
			</div>
		</>
	)
}
export default ShopNavigation
