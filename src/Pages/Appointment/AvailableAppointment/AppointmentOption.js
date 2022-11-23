import React from 'react';

const AppointmentOption = ({ appointmentOption, setTreatment }) => {
    const { name, slots, price } = appointmentOption;
    return (
        <div className="card shadow-xl">
            <div className="card-body text-center">
                <h2 className="text-3xl text-center text-secondary">{name}</h2>
                <p>{slots.length > 0 ? slots[0] : 'Try another day'}</p>
                <p>{slots.length} {slots.length > 1 ? 'SPACES' : 'SPACE'} AVAILABLE</p>
                <p><small>Price: ${price}</small></p>
                <div className="card-actions justify-center">

                    {/* disable way 1 */}
                    <label htmlFor="booking-modal"
                        disabled={slots.length === 0}
                        className="btn btn-primary text-white"
                        onClick={() => setTreatment(appointmentOption)}
                    >Book Appointment</label>

                    {/* disable way 2 */}
                    {/* {
                        slots.length > 0 ? <label htmlFor="booking-modal"
                        className="btn btn-primary text-white"
                        onClick={() => setTreatment(appointmentOption)}
                    >Book Appointment</label> :
                    <label htmlFor="booking-modal" disabled
                        className="btn btn-primary text-white"
                        onClick={() => setTreatment(appointmentOption)}
                    >Book Appointment</label>
                    } */}
                </div>
            </div>
        </div>
    );
};

export default AppointmentOption;