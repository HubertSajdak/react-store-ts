import './Spinner.css'
const Spinner = () => {
	return (
		<div className='loading-spinner'>
			{/* <p className='loading'>Loading...</p> */}
			<div className='spinner'>
				<div className='dot'></div>
				<div className='dot'></div>
				<div className='dot'></div>
				<div className='dot'></div>
				<div className='dot'></div>
				<div className='dot'></div>
			</div>
		</div>
	)
}

export default Spinner
