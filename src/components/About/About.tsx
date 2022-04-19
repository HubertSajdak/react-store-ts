import aboutHeroImg from '../../assets/about-hero.jpg'
import './About.css'
const About = () => {
	return (
		<section className='about section__wrapper'>
			<div className='about__hero-img'>
				<img src={aboutHeroImg} alt='a woman wrapping her face with turtle-neck ' />
				<div className='about__hero-img--text'>
					<h1>
						Read <span>our</span> story
					</h1>
				</div>
			</div>
			<div className='about__company-info'>
				<h2>
					Who are <span>we</span>?
				</h2>
				<div className='about__company-info_text'>
					<h4>Clothing Store was established in 2011</h4>

					<p>
						Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptate nisi sunt nobis voluptates ea unde amet
						magnam. Nam, veniam quo ab eligendi iure recusandae possimus dolores fuga corrupti ea neque reiciendis
						magni, corporis nulla. Magnam, quasi blanditiis quis numquam tempore nisi ex maxime explicabo? Voluptatem ab
						eveniet non at dolore.
					</p>
					<p>
						Lorem ipsum dolor, sit amet consectetur adipisicing elit. Expedita amet exercitationem maxime optio
						molestias tempore, consectetur eos perspiciatis facere dolores iste sint neque itaque quo accusamus
						aspernatur ad excepturi odio aut animi libero quas. Corrupti.
					</p>
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi corporis expedita officiis ullam quos
						libero, ea dicta similique sed maxime facilis qui exercitationem accusantium eveniet minima consequatur. Rem
						dolorum adipisci provident illo velit eaque sit odit laboriosam praesentium, corrupti sunt.
					</p>
				</div>
			</div>
			<div className='about__production-info'></div>
		</section>
	)
}

export default About
