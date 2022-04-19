import React, { useState, useRef, useEffect, FormEventHandler, FocusEventHandler, ChangeEventHandler } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userAuthActions } from '../../store/userAuth-slice'
import { registerAuth, loginAuth } from '../../store/userAuth-slice'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { AiOutlineClose } from 'react-icons/ai'
import './FormModal.css'
import { RootState } from '../../store'

interface FormModalProps {
	regErrorInfo: string
	logErrorInfo: string
}

const FormModal = () => {
	const dispatch = useDispatch()
	const regErrorInfo: FormModalProps['regErrorInfo'] = useSelector((state: RootState) => state.regAuth.errorMessage)
	// const isRegistered = useSelector((state: RootState) => state.regAuth.isRegistered)
	const logErrorInfo: FormModalProps['logErrorInfo'] = useSelector((state: RootState) => state.logAuth.errorMessage)
	const [isRegisterForm, setIsRegisterForm] = useState<boolean>(false)
	const formRef = useRef<HTMLFormElement>(null)
	// open/close modal handler while pressing the profile icon

	const modalFormHandler = () => {
		dispatch(userAuthActions.modalFormHandler())
	}

	// user can close the modal by presing anywhere outside the form

	useEffect(() => {
		let modalCloseHandler = (e: any) => {
			if (!formRef.current!.contains(e.target)) {
				dispatch(userAuthActions.modalFormHandler())
			}
		}
		document.addEventListener('mousedown', modalCloseHandler)
		return () => {
			document.removeEventListener('mousedown', modalCloseHandler)
		}
	}, [dispatch])

	// form validation using formik and yup validation scheme.
	const formik = useFormik({
		initialValues: {
			username: '',
			email: '',
			password: '',
		},
		validationSchema: Yup.object({
			username: Yup.lazy(() => {
				if (isRegisterForm) {
					return Yup.string()
						.min(3, 'Must be at least 3 characters long')
						.max(20, 'Must be 20 characters or less')
						.required('Please enter your username')
				}
				return Yup.mixed().notRequired()
			}),
			email: Yup.string().email('Invalid email address').required('Please enter your email'),
			password: Yup.string()
				.matches(
					/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
					'Must contain 8 characters, one uppercase, one lowercase, one number and one special case character'
				)
				.required('Please enter your password'),
		}),
		onSubmit: values => {
			if (isRegisterForm) {
				dispatch(registerAuth(values))

				//closing the modal after successful registration

				dispatch(userAuthActions.modalFormHandler())
			} else {
				dispatch(loginAuth(values))
			}
		},
	})
	return (
		<div className='form-modal'>
			<div className='form-modal__modal-bg'>
				<form className='form-modal__login-container' onSubmit={formik.handleSubmit} ref={formRef}>
					<AiOutlineClose className='form-modal__login-container--close-icon' onClick={modalFormHandler} />
					<h4>{isRegisterForm ? 'Register' : 'Login'}</h4>
					<div className='form-modal__login-container_username'>
						{isRegisterForm && (
							<input
								type='text'
								name='username'
								id='username'
								placeholder='Username'
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								value={formik.values.username}
								style={formik.touched.username && formik.errors.username && { backgroundColor: '#fe6d73' }}
							/>
						)}
						{formik.touched.username && formik.errors.username ? (
							<p className='form-modal__error-info'>{formik.errors.username}</p>
						) : null}
					</div>
					<div className='form-modal__login-container_email'>
						<input
							type='text'
							name='email'
							id='email'
							placeholder='Email'
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.email}
							style={formik.touched.email && formik.errors.email && { backgroundColor: '#fe6d73' }}
						/>
						{formik.touched.email && formik.errors.email ? (
							<p className='form-modal__error-info'>{formik.errors.email}</p>
						) : null}
					</div>
					<div className='form-modal__login-container_password'>
						<input
							type='password'
							name='password'
							id='password'
							placeholder='Password'
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.password}
							style={formik.touched.password && formik.errors.password && { backgroundColor: '#fe6d73' }}
						/>
						{formik.touched.password && formik.errors.password ? (
							<p className='form-modal__error-info'>{formik.errors.password}</p>
						) : null}
					</div>
					{regErrorInfo && isRegisterForm && <p className='form-modal__error-info'>{regErrorInfo}</p>}
					{logErrorInfo && !isRegisterForm && <p className='form-modal__error-info'>{logErrorInfo}</p>}
					{isRegisterForm ? (
						<button
							className={
								formik.isValid ? 'form-modal__form-button' : 'form-modal__form-button form-modal__disabled-button'
							}
							type='submit'
							value='register'>
							Register
						</button>
					) : (
						<button
							className={
								formik.isValid ? 'form-modal__form-button' : 'form-modal__form-button form-modal__disabled-button'
							}
							type='submit'
							value='login'>
							Login
						</button>
					)}
					{isRegisterForm ? (
						<p>
							Already have an account? <span onClick={() => setIsRegisterForm(!isRegisterForm)}>Login</span>
						</p>
					) : (
						<p>
							New to Clothing Store? <span onClick={() => setIsRegisterForm(!isRegisterForm)}>Register</span>
						</p>
					)}
				</form>
			</div>
		</div>
	)
}

export default FormModal
