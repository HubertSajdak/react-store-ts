import React from 'react'
import { RiEmotionSadFill } from 'react-icons/ri'
import './Error.css'
const Error = () => {
	return (
		<div className='error-message'>
			<RiEmotionSadFill className='error-message__icon' />
			<p>Something went wrong... Try to reload the page.</p>
			{/* <p>Please reload the page</p> */}
		</div>
	)
}

export default Error
