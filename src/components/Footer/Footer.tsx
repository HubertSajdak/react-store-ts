import { AiFillTwitterSquare, AiFillFacebook, AiFillInstagram, AiFillLinkedin, AiFillPhone } from 'react-icons/ai'
import { FaSnapchatSquare, FaPinterestSquare } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'
import './Footer.css'

const Footer = () => {
	const currDate = new Date()

	return (
		<section className='footer section__wrapper'>
			<div className='footer__brand-info'>
				<div className='footer__brand-info--brand-name'>
					<h3>
						Clothing <span>Store</span>
					</h3>
				</div>
				<br />
				<div className='footer__brand-info--brand-address'>
					<p>414 Terrace Lake Rd </p>
					<p>Ronan, Montana(MT), 598864</p>
				</div>
			</div>
			<div className='footer__follow-us'>
				<h3>Follow Us:</h3>
				<br />
				<div className='footer__follow-us--icons'>
					<AiFillTwitterSquare />
					<AiFillFacebook />
					<AiFillInstagram />
					<AiFillLinkedin />
					<FaSnapchatSquare />
					<FaPinterestSquare />
				</div>
			</div>
			<div className='footer__contact'>
				<h3>Contact:</h3>
				<br />
				<p>
					<AiFillPhone /> 504-300-2966
				</p>
				<p>
					<MdEmail /> contact.clothing@store.com
				</p>
			</div>
			<div className='footer__copyright'>
				<p>© {currDate.getFullYear()} Clothing Store USA, Inc. All rights reserved.</p>
			</div>
		</section>
	)
}

export default Footer
