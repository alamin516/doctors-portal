import { useQuery } from '@tanstack/react-query';
import React from 'react';
import toast from 'react-hot-toast';

const AllUsers = () => {

    const { data: users = [], refetch} = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await fetch(`https://doctors-portal-server-alamin516.vercel.app/users`);
            const data = await res.json();
            return data
        }
    })


    const handleUpdateRole = id =>{
        fetch(`https://doctors-portal-server-alamin516.vercel.app/users/admin/${id}` , {
            method: 'PUT',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
        .then(res => res.json())
        .then(data => {
            if(data.acknowledged){
                toast.success('Admin created successfully')
                refetch()
            }
        })
    }

    const handleUserDelete = user =>{

        fetch(`https://doctors-portal-server-alamin516.vercel.app/users/${user._id}` ,{
            method: 'DELETE',
        })
        .then(res => res.json())
        .then(data => {
            if(data.acknowledged){
                toast.success(`${user.name} deleted successfully`)
                refetch()
            }
        })
    }


    return (
        <div className='p-5'>
            <h2 className='text-3xl mb-5'>All Users : {users.length}</h2>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, i )=> <tr key={user._id}>
                            <th>{i + 1}</th>
                            <td>{user?.name}</td>
                            <td>{user?.email}</td>
                            <td>{
                                user?.role !== 'admin' && <button onClick={()=> handleUpdateRole(user._id)} className='btn btn-sm btn-primary text-white'>Make Admin</button>
                                }</td>
                            <td><button onClick={()=> handleUserDelete(user)} className='btn btn-sm bg-red-600 border-red-600 text-white'>Delete</button></td>
                        </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllUsers;