import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const AddDoctor = () => {
    const { handleSubmit, register, formState: { errors } } = useForm()
    const navigate = useNavigate()
    const imgHostApiKey = process.env.REACT_APP_imgbb_api_key;

    const { data: specialties = []} = useQuery({
        queryKey: ['specialty'],
        queryFn: async () => {
            const res = await fetch(`https://doctors-portal-server-alamin516.vercel.app/appointmentSpecialty`);
            const data = await res.json();
            return data
        }
    })

    const handleAddDoctor = data => {
        const image = data.img[0];
        const formData = new FormData();
        formData.append('image', image)
        const url = `https://api.imgbb.com/1/upload?key=${imgHostApiKey}`;
        fetch(url, {
            method: 'POST',
            body: formData
        })
        .then(res => res.json())
        .then(imgData => {
            if(imgData.success){
                console.log(imgData.data.url);

                const doctor ={
                    name: data.name,
                    email: data.email,
                    specialty: data.specialty,
                    image: imgData.data.url

                }

                fetch(`https://doctors-portal-server-alamin516.vercel.app/doctors`, {
                    method: 'POST',
                    headers: {
                        'content-type' : 'application/json',
                        authorization: `bearer ${localStorage.getItem('accessToken')}`
                    },
                    body: JSON.stringify(doctor)
                })
                .then(res => res.json())
                .then(data =>{
                    if(data.acknowledged){
                        toast.success(`Doctor ${doctor.name} added successfully`);
                        navigate('/dashboard/managedoctors')
                    }
                })
            }
        })

    }

    return (
        <div className='w-1/2 p-5'>
            <h2 className='text-3xl mb-5'>Add A Doctor</h2>
            <form className='mt-8' onSubmit={handleSubmit(handleAddDoctor)}>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Name</span>
                    </label>
                    <input type="text" {...register("name", {
                        required: 'Name is required'

                    })} placeholder="name" className="input input-bordered" />
                    {errors.name && <p className='text-red-600'>{errors.name?.message}</p>}
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input type="email" {...register("email", {
                        required: 'Email Address is required'

                    })} placeholder="email" className="input input-bordered" />
                    {errors.email && <p className='text-red-600'>{errors.email?.message}</p>}
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Specialty</span>
                    </label>
                    <select {...register("specialty")} className="select select-bordered w-full ">
                        {
                            specialties.map(specialty => <option
                                key={specialty._id}
                                vlaue={specialty.name}
                            >{specialty.name}</option>)
                        }

                    </select>
                </div>
                <div className="form-control">
                    <label className="label"></label>
                    <input type="file" {...register("img", {
                        required: 'Image is required'

                    })} placeholder="Photo Upload" className="input input-bordered" />
                    {errors.img && <p className='text-red-600'>{errors.img?.message}</p>}
                </div>
                <div className="form-control mt-6">
                    <button type="submit" className="btn bg-red-600 text-white border-none">Add Doctor</button>
                </div>
            </form>
        </div>
    );
};

export default AddDoctor;