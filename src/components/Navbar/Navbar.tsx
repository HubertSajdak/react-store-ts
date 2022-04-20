import { useState, useEffect, useRef, useCallback } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { userAuthActions, loginAuthActions } from '../../store/userAuth-slice'
import { AiOutlineBars, AiOutlineClose } from 'react-icons/ai'
import { BsCart2 } from 'react-icons/bs'
import { CgProfile } from 'react-icons/cg'
import './Navbar.css'
import { RootState } from '../../store'
const Navbar = () => {
	const dispatch = useDispatch()
	const counter: number = useSelector((state: RootState) => state.cart.totalQuantity)
	const isToken = localStorage.getItem('idToken')
	const isLoggedIn: boolean = useSelector((state: RootState) => state.logAuth.isLogged)
	const [isSideMenuOpen, setIsSideMenuOpen] = useState<boolean>(false)
	const [isProfileMenuOpen, setIsProfileMenuOpen] = useState<boolean>(false)
	const sideMenuRef = useRef<HTMLUListElement | null>(null)
	const profileMenuRef = useRef<HTMLUListElement | null>(null)
	const logoutTimerRef = useRef<number | undefined>(undefined)

	// when token is truthy user can open the profile dropdown menu by pressing the profile icon
	const profileMenuHandler = (): void => {
		if (isToken !== null) {
			setIsProfileMenuOpen(!isProfileMenuOpen)
		} else {
			setIsProfileMenuOpen(false)
		}
	}

	// when user press the logout in the profile dropdown menu, token is being removed from the locale storage

	const logoutHandler = useCallback((): void => {
		if (isToken !== null) {
			setIsProfileMenuOpen(false)
			dispatch(loginAuthActions.userLogout())
		}
	}, [dispatch, isToken])
	// handling the form modal

	const modalFormHandler = (): void => {
		dispatch(userAuthActions.modalFormHandler())
	}
	// hiding the modal after a successful login and redirecting to the store

	useEffect(() => {
		if (isLoggedIn) {
			dispatch(userAuthActions.modalFormHandler())
		}
	}, [isLoggedIn, dispatch])

	// setting the expiration time of a token
	useEffect(() => {
		const autoLogout = (): void => {
			if (document.visibilityState === 'hidden') {
				const timeOut = window.setTimeout(logoutHandler, 5000)
				logoutTimerRef.current = timeOut
			} else {
				window.clearTimeout(logoutTimerRef.current)
			}
		}
		document.addEventListener('visibilitychange', autoLogout)
		return () => {
			document.removeEventListener('visibilitychange', autoLogout)
		}
	}, [logoutHandler])

	// user can close the smallscreen side menu by pressing anywhere outside menu

	useEffect(() => {
		let sideMenuHandler = (e: MouseEvent): void => {
			if (!sideMenuRef.current!.contains(e.target as Node)) {
				setIsSideMenuOpen(false)
			}
			if (!profileMenuRef.current!.contains(e.target as Node)) {
				setIsProfileMenuOpen(false)
			}
		}
		document.addEventListener('mousedown', sideMenuHandler)

		return () => {
			document.removeEventListener('mousedown', sideMenuHandler)
		}
	}, [])

	return (
		<nav className='navbar'>
			<div className='navbar__wrapper'>
				<Link to='/welcome' className='navbar__brand-name'>
					<span>Clothing</span> Store
				</Link>
				<div className='navbar__smallscreen-menu'>
					<AiOutlineBars className='navbar__menu--open-icon' onClick={() => setIsSideMenuOpen(!isSideMenuOpen)} />
					<ul
						className='navbar__smallscreen-menu-links'
						ref={sideMenuRef}
						style={isSideMenuOpen ? { transform: 'translateX(0)' } : { transform: 'translateX(-110%)' }}>
						<AiOutlineClose className='navbar__menu--close-icon' onClick={() => setIsSideMenuOpen(!isSideMenuOpen)} />
						<li>
							<Link to='/welcome' onClick={() => setIsSideMenuOpen(false)}>
								Home
							</Link>
						</li>
						<li>
							<Link to='/store' onClick={() => setIsSideMenuOpen(false)}>
								Store
							</Link>
						</li>
						<li>
							<Link to='/about' onClick={() => setIsSideMenuOpen(false)}>
								About Us
							</Link>
						</li>
					</ul>
				</div>

				<ul className='navbar__links'>
					<li>
						<Link to='/welcome' onClick={() => setIsSideMenuOpen(false)}>
							Home
						</Link>
					</li>
					<li>
						<Link to='/store' onClick={() => setIsSideMenuOpen(false)}>
							Store
						</Link>
					</li>
					<li>
						<Link to='/about' onClick={() => setIsSideMenuOpen(false)}>
							About Us
						</Link>
					</li>
				</ul>

				<div className='navbar__customer-panel'>
					<NavLink to='/cart' className='navbar__customer-panel_cart'>
						<div className='navbar__customer-panel--cart-counter'>{counter}</div>
						<BsCart2 className='navbar__customer-panel--cart-icon' />
					</NavLink>
					<div className='navbar__customer-panel_profile'>
						<CgProfile
							className='navbar__customer-panel--profile-icon'
							onClick={isToken !== null ? profileMenuHandler : modalFormHandler}
						/>
						<ul
							className='navbar__customer-panel_profile--dropdown-menu'
							style={isProfileMenuOpen && isToken ? { display: 'flex' } : { display: 'none' }}
							ref={profileMenuRef}>
							<AiOutlineClose className='navbar__customer-panel--close-menu' onClick={profileMenuHandler} />

							<li>
								<Link to='/profile'>Profile</Link>
							</li>
							<li>
								<Link to='/welcome' onClick={logoutHandler}>
									Logout
								</Link>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</nav>
	)
}

export default Navbar
