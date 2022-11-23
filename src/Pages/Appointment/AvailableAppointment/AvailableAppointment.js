import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import React, {useState } from 'react';
import Loading from '../../Shared/Loading/Loading';
import BookingModal from '../BookingModal/BookingModal';
import AppointmentOption from './AppointmentOption';

const AvailableAppointment = ({ selectedDate }) => {
    // const [appointmentOptions, setAppointmentOptions] = useState([]);
    const [treatment, setTreatment] = useState(null)
    const date = format(selectedDate, 'PP')

    // {query setp-4.1}
    // const {data: appointmentOptions = []} = useQuery({
    //     queryKey: ['appointment-options'],
    //     queryFn: () => fetch('https://doctors-portal-server-alamin516.vercel.app/appointment-options')
    //     .then(res => res.json())

    // })

    // {query setp-4.2}
    const {data: appointmentOptions = [], refetch, isLoading} = useQuery({
        queryKey: ['appointment-options', date],
        queryFn: async() => {
            const res = await fetch(`https://doctors-portal-server-alamin516.vercel.app/appointmentOptions?date=${date}`)
            const data = await res.json()
            return data
        }

    })

    if(isLoading){
        return <Loading></Loading>
    }

    // useEffect(() => {
    //     fetch('https://doctors-portal-server-alamin516.vercel.app/appointment-options')
    //         .then(res => res.json())
    //         .then(data => setAppointmentOptions(data))
    // }, [])

    return (
        <section className='my-16'>
            <h2 className='text-xl text-primary text-center'>Available Appointments on {format(selectedDate, 'PP')}</h2>

            <div className='grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-16'>
                {
                    appointmentOptions.map(appointmentOption => <AppointmentOption
                        key={appointmentOption._id}
                        appointmentOption={appointmentOption}
                        setTreatment={setTreatment}
                    >
                    </AppointmentOption>)
                }
            </div>
            {
                treatment && <BookingModal
                treatment={treatment}
                selectedDate={selectedDate}
                setTreatment={setTreatment}
                refetch={refetch}
                
                >
                </BookingModal>
            }
        </section>
    );
};

export default AvailableAppointment;