import React from 'react';
import chair from '../../../assets/images/chair.png';
import bg from '../../../assets/images/bg.png';
import ButtonPrimary from '../../../components/ButtonPrimary/ButtonPrimary';

const Banner = () => {
    return (
        <div className="hero min-h-screen" style={{backgroundImage: `url(${bg})`}}>
            <div className="hero-content flex-col lg:flex-row-reverse px-0 gap-20">
                <img src={chair} className=" rounded-lg shadow-2xl lg:w-6/12" alt='' />
                <div className='lg:w-6/12'>
                    <h1 className="text-5xl font-bold">Your New Smile Starts Here</h1>
                    <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    <ButtonPrimary>Get Started</ButtonPrimary>
                </div>
                
            </div>
            
        </div>
    );
};

export default Banner;