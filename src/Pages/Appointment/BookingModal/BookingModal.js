import { format } from 'date-fns';
import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../Contexts/AuthProvider/AuthProvider';

const BookingModal = ({ treatment, setTreatment, selectedDate, refetch }) => {
    const { user } = useContext(AuthContext)
    const { name: treatmentName, slots, price } = treatment;
    const date = format(selectedDate, 'PP')

    const handleBooking = event => {
        event.preventDefault();
        const form = event.target;
        const slot = form.slot.value;
        const name = form.name.value;
        const phone = form.phone.value;
        const email = form.email.value;

        const booking = {
            appointmentDate: date,
            treatmentName,
            patient: name,
            slot,
            phone,
            email,
            price
        }

        fetch('http://localhost:5000/bookings', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(booking)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged){
                    setTreatment(null)
                    toast.success(`Booking Successfully Done`)
                    refetch()

                }
                else{
                    setTreatment(null)
                    toast.error(data.message)
                }

            })



    }
    return (
        <>
            <input name="" type="checkbox" id="booking-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="booking-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-lg font-bold">{treatmentName}</h3>
                    <form onSubmit={handleBooking} className='grid gap-4 mt-12'>
                        <input type="text" value={date} disabled className="input input-bordered w-full" />
                        <select name='slot' className="select select-bordered w-full">

                            {
                                slots.map((slot, idx) => <option key={idx} value={slot}>{slot}</option>)
                            }
                        </select>
                        <input name="name" type="text" defaultValue={user?.displayName} readOnly={user?.displayName} placeholder="FULL NAME" className="input input-bordered w-full" />
                        <input name="phone" type="tel" placeholder="PHONE NUMBER" className="input input-bordered w-full" required />
                        <input name="email" defaultValue={user?.email} readOnly={user?.email} type="email" placeholder="EMAIL" className="input input-bordered w-full" required />
                        <input type="submit" className="btn btn-accent w-full" value="SUBMIT" />
                    </form>
                </div>
            </div>
        </>
    );
};

export default BookingModal;