import React, { Suspense } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getClothes } from './store/fetchapi-slice'
import { Route, Switch, Redirect } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Navbar from './components/Navbar/Navbar'
import Welcome from './components/Welcome/Welcome'
import Footer from './components/Footer/Footer'
import FormModal from './components/Auth/FormModal'
import Spinner from './components/UI/Spinner/Spinner'
import './App.css'
import { RootState } from './store'

const About = React.lazy(() => import('./components/About/About'))
const ProductDetail = React.lazy(() => import('./components/Shop/Products/ProductDetail/ProductDetail'))
const Shop = React.lazy(() => import('./components/Shop/Shop'))
const Cart = React.lazy(() => import('./components/Cart/Cart'))
function App() {
	const dispatch = useDispatch()
	const isFormModalOpen = useSelector((state: RootState) => state.userAuth.formModalOpen)
	useEffect(() => {
		dispatch(getClothes())
	}, [dispatch])
	return (
		<div>
			{isFormModalOpen && <FormModal />}

			<Navbar />
			<ToastContainer style={{ fontSize: '1.5rem' }} limit={3} autoClose={2000} />
			<main>
				<Suspense fallback={<Spinner />}>
					<Switch>
						<Route path='/' exact>
							<Redirect to='/welcome' />
						</Route>
						<Route path='/welcome'>
							<Welcome />
						</Route>
						<Route path='/store' exact>
							<Shop />
						</Route>
						<Route path='/store/:productId'>
							<ProductDetail />
						</Route>
						<Route path='/cart'>
							<Cart />
						</Route>
						<Route path='/about'>
							<About />
						</Route>
					</Switch>
				</Suspense>
			</main>
			<footer>
				<Footer />
			</footer>
		</div>
	)
}

export default App
