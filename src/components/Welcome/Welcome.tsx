import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import hero from '../../assets/hero.jpg'
import welcomeFilm from '../../assets/welcome-film1.mp4'
import Slider from '../UI/Slider/Slider'
import Error from '../UI/Error/Error'
import Spinner from '../UI/Spinner/Spinner'
import 'react-lazy-load-image-component/src/effects/blur.css'
import '../Welcome/Welcome.css'
import { RootState } from '../../store'
import { ClothesSliceProps } from '../../store/fetchapi-slice'
const Welcome = () => {
	const {
		clothes,
		loading: isLoading,
		error: isError,
	}: ClothesSliceProps = useSelector((state: RootState) => state.fetchClothes)
	return (
		<section className='welcome section__wrapper'>
			<div className='welcome__hero-img'>
				<img src={hero} alt='woman looking at the camera' />
				<div className='welcome__text'>
					<h1 className='welcome__text_brand-name'>
						<span>Clothing</span> Store
					</h1>
					<p>
						<span>More than you can imagine. </span>Fashionable Designer brands and much more.
					</p>
					<Link to='/store'>
						<button className='welcome__button'>Explore</button>
					</Link>
				</div>
			</div>

			<div className='welcome__film'>
				<video src={welcomeFilm} autoPlay loop muted></video>
				<div className='welcome__film-text'>
					<h3>
						<span>Express</span> yourself with our newest collection
					</h3>
					<p>Our clothes are made of the highest quality eco materials</p>
					<Link to='about'>
						<button className='welcome__button'>Read More</button>
					</Link>
				</div>
			</div>
			{isLoading && <Spinner />}
			{!isLoading && !isError && (
				<div className='welcome__slider'>
					<Slider clothesData={clothes} />
				</div>
			)}
			{isError && !isLoading && <Error />}
		</section>
	)
}

export default Welcome
