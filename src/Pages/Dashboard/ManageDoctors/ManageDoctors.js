import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import ConformationModal from '../../Shared/ConformationModal/ConformationModal';

const ManageDoctors = () => {
    const [deletingDoctor, setDeletingDoctor] = useState(null)
    const closeModal = () => {
        setDeletingDoctor(null)
    }

    const { data: doctors = [], refetch } = useQuery({
        queryKey: ['doctor'],
        queryFn: async () => {
            try {
                const res = await fetch(`https://doctors-portal-server-alamin516.vercel.app/doctors`, {
                    headers: {
                        authorization: `bearer ${localStorage.getItem('accessToken')}`
                    }
                });
                const data = await res.json();
                return data
            }
            catch {

            }
        }
    })

    const handleDoctorDelete = id => {
        fetch(`https://doctors-portal-server-alamin516.vercel.app/doctors/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    toast.success(`Doctor ${deletingDoctor.name} is deleted successfully`)
                    refetch()
                }
            })
    }


    return (
        <div className='p-5'>
            <h2 className='text-3xl mb-5'>All Doctors : {doctors.length}</h2>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>Idx</th>
                            <th>Avatar</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Specialty</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            doctors.map((doctor, i) => <tr key={doctor._id}>
                                <th>{i + 1}</th>
                                <th><div className="avatar">
                                    <div className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                        <img src={doctor?.image} alt="" />
                                    </div>
                                </div></th>
                                <td>{doctor?.name}</td>
                                <td>{doctor?.email}</td>
                                <td>{doctor?.specialty}</td>
                                <td>
                                    <label onClick={() => setDeletingDoctor(doctor)} htmlFor="conformation-modal" className="btn btn-sm bg-red-600 text-white border-none hover:btn-primary">Delete</label>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
            {
                deletingDoctor && <ConformationModal
                    title={deletingDoctor.name}
                    message={`If you delete ${deletingDoctor.name}. You connot undone. Your data will not back again.`}
                    handleDoctorDelete={handleDoctorDelete}
                    closeModal={closeModal}
                    modalData={deletingDoctor}
                    deleteBtnText = {`Delete`}

                ></ConformationModal>
            }
        </div>
    );
};

export default ManageDoctors;