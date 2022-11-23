import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useLoaderData } from 'react-router-dom';
import CheckoutForm from './CheckoutForm';


const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);

const Payment = () => {
    const booking = useLoaderData();
    const { treatmentName, price, slot, appointmentDate } = booking;
    
    return (
        <div className='p-5'>
            <h2 className='text-3xl mb-5'>Payment for {treatmentName}</h2>
            <p className='text-xl'>Please pay <span className='font-bold'>${price}</span> for your appointment on {appointmentDate} at {slot}</p>

            <div className='w-96 my-6'>
                <Elements stripe={stripePromise}>
                    <CheckoutForm 
                    booking={booking}
                    />
                </Elements>
            </div>
        </div>
    );
};

export default Payment;