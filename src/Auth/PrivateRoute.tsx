import { Route, Redirect, RouteProps } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from 'store'
import { useState } from 'react'
import Spinner from 'components/UI/Spinner/Spinner'
export interface PrivateRouteProps extends RouteProps {}

const PrivateRoute = (props: PrivateRouteProps) => {
	const isAuth = useSelector((state: RootState) => state.logAuth.isLogged)
	const [isAuthChecking, setIsAuthChecking] = useState(true)
	if (isAuthChecking) {
		return <Spinner />
	}
	if (!isAuth) {
		return <Redirect to='/' />
	}
	return <Route {...props} />
}

export default PrivateRoute
