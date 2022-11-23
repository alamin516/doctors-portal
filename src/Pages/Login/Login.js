import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthProvider/AuthProvider';
import useToken from '../../hooks/useToken';

const Login = () => {
    const { signIn, SignInWithGoogle, forgetPassword } = useContext(AuthContext)
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [loginError, setLoginError] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const [createUserEmail, setCreateUserEmail] = useState('')
    const [token] = useToken(createUserEmail)

    const from = location.state?.from?.pathname || '/';

    if(token){
        navigate(from, { replace: true });
    }

    const handleLogin = data => {
        setLoginError('')
        signIn(data.email, data.password)
        .then(result => {
            const user = result.user;
            toast('SignIn Successfully');
            setCreateUserEmail(user.email)
        })
        .catch(error => {
            console.error(error.message)
            setLoginError(error.message)
        })
    }


    const handleSignInWithGoogle = () =>{
        SignInWithGoogle()
        .then((result)=>{
            const user = result.user;
            setCreateUserEmail(user.email)

            // saveUser(user.displayName, user.email)
        })
        .catch(error => console.error(error))
    }



    const saveUser = (name, email) => {
        const user = { name, email }

        fetch('https://doctors-portal-server-alamin516.vercel.app/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                setCreateUserEmail(email)
                console.log('User save', data)
            })
    }



    const handlePassword = () =>{
        const email = prompt('Enter your email');

        forgetPassword(email)
        .then(()=>{
            toast.success('Password reset email sent!')
        })
        .catch(error => console.error(error))
    }


    return (
        <div className='min-h-screen flex justify-center items-center p-6'>
            <div className='lg:w-4/12 p-6 shadow-lg rounded-xl'>
                <h2 className='text-center text-xl'>Login</h2>
                <form className='mt-8' onSubmit={handleSubmit(handleLogin)}>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" {...register("email", {
                            required: 'Email Address is required'

                        })} placeholder="email" className="input input-bordered" />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type="password" {...register("password")} placeholder="password" className="input input-bordered" />
                        <label className="label">
                            <Link onClick={handlePassword} className="label-text-alt link link-hover">Forgot password?</Link>
                        </label>
                    </div>
                    <div className="form-control mt-6">
                        {loginError && <p className="text-red-600">{loginError}</p>}
                    </div>
                    <div className="form-control mt-6">
                        <button type="submit" className="btn btn-accent">Login</button>
                    </div>
                </form>
                <div className='text-center'>
                    <p className='my-6'>New to Doctors Portal? <Link className='text-primary' to='/signup'>Create new account</Link></p>
                    <div className="divider text-xl font-bold">OR</div>
                </div>
                <div className="form-control mt-6">
                    <button onClick={handleSignInWithGoogle} className="btn bordered-accent text-accent hover:bg-white bg-white">CONTINUE WITH GOOGLE</button>
                </div>
            </div>
        </div >
    );
};

export default Login;