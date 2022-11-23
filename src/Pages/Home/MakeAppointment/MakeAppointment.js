import React from 'react';
import appointment from '../../../assets/images/appointment.png'
import doctor from '../../../assets/images/doctor-small.png';
import ButtonPrimary from '../../../components/ButtonPrimary/ButtonPrimary';


const MakeAppointment = () => {
    return (
        <section
            style={{
                background: `url(${appointment})`,
                backgroundPosition: 'center center',
                marginTop: '100px'
            }}
            className="hero">
            <div className="hero-content flex-col lg:flex-row">
                <img src={doctor} className="rounded-lg lg:w-1/2 -mt-32 hidden lg:block -mb-4" alt='' />
                <div>
                    <h2 className='text-xl font-bold text-primary mb-5'>Appointment</h2>
                    <h1 className="text-4xl text-white">Make an appointment Today</h1>
                    <p className="py-6 text-white">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsumis that it has a more-or-less normal distribution of letters,as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page</p>
                    <ButtonPrimary>Get Started</ButtonPrimary>
                </div>
            </div>
        </section>
    );
};

export default MakeAppointment;