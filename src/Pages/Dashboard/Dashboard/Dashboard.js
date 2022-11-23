import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../Contexts/AuthProvider/AuthProvider';
import Loading from '../../Shared/Loading/Loading';

const Dashboard = () => {
    const { user } = useContext(AuthContext);

    const url = `https://doctors-portal-server-alamin516.vercel.app/bookings?email=${user?.email}`;
    const { data: bookings = [], isLoading } = useQuery({
        queryKey: ['bookings', user?.email],
        queryFn: async () => {
            const res = await fetch(url, {
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            });
            const data = await res.json();
            return data
        }
    })


    if (isLoading) {
        return <Loading></Loading>
    }

    return (
        <div className='p-5'>
            <h2 className='text-3xl mb-5'>My Appointment</h2>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>Idx</th>
                            <th>Name</th>
                            <th>Treatment</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Payment</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            bookings.map((booking, idx) => <tr className="hover" key={booking._id}>
                                <th>{idx + 1}</th>
                                <td>{booking?.patient}</td>
                                <td>{booking.treatmentName}</td>
                                <td>{booking?.appointmentDate}</td>
                                <td>{booking.slot}</td>
                                <td>
                                    {
                                        booking.price && !booking.paid &&
                                        <>
                                        <span className='mr-3'>${booking.price}</span>
                                        <Link to={`/dashboard/payment/${booking._id}`}>
                                            <button className='btn bg-red-600 border-none btn-sm'>pay</button>
                                        </Link>
                                        </>
                                    }
                                    {
                                        booking.price && booking.paid && <span className='text-green-500'>Paid</span>
                                    }

                                </td>


                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Dashboard;