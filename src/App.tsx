import React, { Suspense } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getClothes } from './store/fetchapi-slice'
import { Route, Switch, Redirect } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Navbar from './components/Navbar/Navbar'
import Welcome from './features/Welcome/views/Welcome'
import Footer from './components/Footer/Footer'
import FormModal from './components/FormModal/FormModal'
import Spinner from './UX/Spinner/Spinner'
import './App.css'
import 'react-toastify/dist/ReactToastify.css'
import { RootState } from './store'
import PrivateRoute from 'Auth/PrivateRoute'
import AuthWrapper from 'Auth/AuthWrapper'
import NotFoundPage from 'UX/NotFoundPage/NotFoundPage'
const About = React.lazy(() => import('./features/About/views/About'))
const ProductDetail = React.lazy(() => import('./features/Shop/components/Products/ProductDetail/views/ProductDetail'))
const Shop = React.lazy(() => import('./features/Shop/views/Shop'))
const Cart = React.lazy(() => import('./features/Cart/views/Cart'))
function App() {
	const dispatch = useDispatch()
	const isFormModalOpen = useSelector((state: RootState) => state.userAuth.formModalOpen)
	useEffect(() => {
		dispatch(getClothes())
	}, [dispatch])
	return (
		<AuthWrapper>
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
						<PrivateRoute path='/profile'>
							<div>asd</div>
						</PrivateRoute>
						<Route path='*'>
							<NotFoundPage />
						</Route>
					</Switch>
				</Suspense>
			</main>
			<footer>
				<Footer />
			</footer>
		</AuthWrapper>
	)
}

export default App
