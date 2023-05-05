/* eslint-disable react-hooks/exhaustive-deps */
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuthState, useCreateUserWithEmailAndPassword, useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import Loading from '@/components/Loading';
import axios from 'axios';
import { toast } from 'react-toastify';


const LoginForm = () => {
    const router = useRouter();
    const [user] = useAuthState(auth);
    // console.log(router.asPath);
    const [isLogin, setLoginState] = useState(true);
    const [
        createUserWithEmailAndPassword,
        signUser,
        signLoading,
        signError,
    ] = useCreateUserWithEmailAndPassword(auth);
    const [
        signInWithEmailAndPassword,
        logUser,
        logLoading,
        logError,
    ] = useSignInWithEmailAndPassword(auth);

    const { register, reset, handleSubmit, clearErrors, formState: { errors } } = useForm();

    const mailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;


    useEffect(() => {
        clearErrors();
        reset();
    }, [isLogin]);

    useEffect(() => {
        if (signUser || logUser || user) {
            router.push('/');
        }
    }, [signUser, logUser])

    if (signLoading || logLoading) {
        return <Loading />
    }

    const login = async (data) => {
        const result = await signInWithEmailAndPassword(data.email, data.pass);
        const { uid, email } = result?.user;
        if (result?.user?.uid) {
            clearErrors();
            reset();
            await axios.post(`http://localhost:3000/api/users`, { _id: uid, email });
            return;
        } else {
            clearErrors();
            reset();
            return;
        }
    };

    const signUp = async (data) => {
        if (data.pass !== data.repeatPass) {
            toast.error('Password not matched', { theme: 'colored' });
            return;
        }
        const result = await createUserWithEmailAndPassword(data.email, data.pass);
        const { uid, email } = result?.user;
        if (result?.user?.uid) {
            await axios.post(`http://localhost:3000/api/users`, { _id: uid, email });
            clearErrors();
            reset();
            return;
        } else {
            clearErrors();
            reset();
            return;
        }
    };

    return (
        <>
            <Head>
                <title>Login - Tech Blogs</title>
            </Head>

            <div className='bg-white h-[90%] max-w-sm mx-auto rounded overflow-y-auto px-5 py-8 mt-10'>

                {
                    isLogin ?

                        <form onSubmit={handleSubmit(login)} className='flex flex-col gap-3'> {/* Login Form */}
                            <h1 className='text-3xl font-bold tracking-wider text-center underline underline-offset-8 mb-5'>Login form</h1>
                            <label htmlFor="email">
                                <span className='text-lg'>Email : *</span>
                                <input
                                    {...register('email', {
                                        required: 'Email is required', pattern: {
                                            value: mailPattern,
                                            message: 'Email is not in valid form'
                                        }
                                    })}
                                    className='w-full border-2 rounded p-2'
                                    id='email'
                                    type="text" />
                                {errors.email && <span className='text-sm font-bold text-red-600'>{errors.email?.message}</span>}
                                {errors.email && errors.email.types && <span className='text-sm font-bold text-red-600'>{errors.email.types.pattern}</span>}
                            </label>
                            <label htmlFor="pass">
                                <span className='text-lg'>Password : *</span>
                                <input
                                    {...register('pass', { required: 'Password is required' })}
                                    className='w-full border-2 rounded p-2'
                                    id='pass'
                                    type="password" />
                                {errors.pass && <span className='text-sm font-bold text-red-600'>{errors.pass?.message}</span>}
                            </label>
                            <button className='underline font-bold self-start' onClick={() => setLoginState(false)}>Create new account</button>
                            {logError && <span className='text-sm font-bold text-red-600'>{logError?.name} : {logError?.code?.split('/')[1]}</span>}
                            <input
                                className='px-3 py-2 bg-gray-950 text-white font-bold tracking-widest rounded cursor-pointer active:scale-[0.98]'
                                type="submit"
                                value="Login" />
                        </form> :

                        <form onSubmit={handleSubmit(signUp)} className='flex flex-col gap-3'> {/* Signup Form */}
                            <h1 className='text-3xl font-bold tracking-wider text-center underline underline-offset-8 mb-5'>Signup form</h1>
                            <label htmlFor="email">
                                <span className='text-lg'>Email : *</span>
                                <input
                                    {...register('email', {
                                        required: 'Email is required', pattern: {
                                            value: mailPattern,
                                            message: 'Email is not in valid form'
                                        }
                                    })}
                                    className='w-full border-2 rounded p-2'
                                    id='email'
                                    type="text" />
                                {errors.email && <span className='text-sm font-bold text-red-600'>{errors.email?.message}</span>}
                            </label>
                            <label htmlFor="pass">
                                <span className='text-lg'>Password : *</span>
                                <input
                                    {...register('pass', { required: 'Password is required' })}
                                    className='w-full border-2 rounded p-2'
                                    id='pass'
                                    type="password" />
                                {errors.pass && <span className='text-sm font-bold text-red-600'>{errors.pass?.message}</span>}
                            </label>
                            <label htmlFor="repeatPass">
                                <span className='text-lg'>Re-enter Password : *</span>
                                <input
                                    {...register('repeatPass', { required: 'Password is required' })}
                                    className='w-full border-2 rounded p-2'
                                    id='repeatPass'
                                    type="password" />
                                {errors.repeatPass && <span className='text-sm font-bold text-red-600'>{errors.repeatPass?.message}</span>}
                            </label>
                            <button className='underline font-bold self-start' onClick={() => setLoginState(true)}>Already have an account</button>
                            {signError && <span className='text-sm font-bold text-red-600'>{signError?.name} : {signError?.code?.split('/')[1]}</span>}
                            <input
                                className='px-3 py-2 bg-gray-950 text-white font-bold tracking-widest rounded cursor-pointer active:scale-[0.98]'
                                type="submit"
                                value="Signup" />
                        </form>
                }
            </div>
        </>
    );
};

export default LoginForm;