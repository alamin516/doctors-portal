import React from 'react';
import bg from '../../../assets/images/appointment.png'
import ButtonPrimary from '../../../components/ButtonPrimary/ButtonPrimary';

const Contact = () => {
    return (
        <section className='py-16' style={{
            background: `url(${bg})`
        }}>
            <div className='text-center'>
                <h3 className='text-xl text-primary font-bold mb-2'>OUR SERVICES</h3>
                <h2 className='text-4xl mb-16 text-white'>Services We Provide</h2>
            </div>
            <div className="card lg:w-5/12 mx-auto">
                <div className="card-body">
                    <div className="form-control mb-5">
                        <input type="email" placeholder="Email Address" className="input input-bordered" />
                    </div>
                    <div className="form-control mb-5">
                        <input type="text" placeholder="Subject" className="input input-bordered" />
                    </div>
                    <div className="form-control">
                        <textarea type="text" placeholder="Your Message" className="input input-bordered h-32 p-2" />
                    </div>
                    <div className="form-control mt-8">
                        <ButtonPrimary>Submit</ButtonPrimary>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;