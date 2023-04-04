/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

const LoginForm = () => {
    const [isLogin, setLoginState] = useState(true);
    const { register, reset, handleSubmit, clearErrors, formState: { errors } } = useForm();

    const mailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    const login = (data) => {

    };

    const signUp = (data) => {

    };

    useEffect(()=> {
        clearErrors();
        reset();
    },[isLogin]);

    return (
        <div className='bg-white h-[90%] max-w-sm mx-auto rounded overflow-y-auto px-5 py-8'>

            {
                isLogin ?
                
                    <form onSubmit={handleSubmit(login)} className='flex flex-col gap-3'> {/* Login Form */}
                        <h1 className='text-3xl font-bold tracking-wider text-center underline underline-offset-8 mb-5'>Login form</h1>
                        <label htmlFor="email">
                            <span className='text-lg'>Email : *</span>
                            <input
                                {...register('email',{required:'Email is required',pattern:{
                                    value:mailPattern,
                                    message:'Email is not in valid form'
                                }})}
                                className='w-full border-2 rounded p-2'
                                id='email'
                                type="text" />
                            {errors.email && <span className='text-sm font-bold text-red-600'>{errors.email?.message}</span>}
                            {errors.email && errors.email.types && <span className='text-sm font-bold text-red-600'>{errors.email.types.pattern}</span>}
                        </label>
                        <label htmlFor="pass">
                            <span className='text-lg'>Password : *</span>
                            <input
                                {...register('pass',{required:'Password is required'})}
                                className='w-full border-2 rounded p-2'
                                id='pass'
                                type="text" />
                            {errors.pass && <span className='text-sm font-bold text-red-600'>{errors.pass?.message}</span>}
                        </label>
                        <button className='underline font-bold self-start' onClick={() => setLoginState(false)}>Create new account</button>
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
                                {...register('email',{required:'Email is required',pattern:{
                                    value:mailPattern,
                                    message:'Email is not in valid form'
                                }})}
                                className='w-full border-2 rounded p-2'
                                id='email'
                                type="text" />
                            {errors.email && <span className='text-sm font-bold text-red-600'>{errors.email?.message}</span>}
                        </label>
                        <label htmlFor="pass">
                            <span className='text-lg'>Password : *</span>
                            <input
                                {...register('pass',{required:'Password is required'})}
                                className='w-full border-2 rounded p-2'
                                id='pass'
                                type="text" />
                            {errors.pass && <span className='text-sm font-bold text-red-600'>{errors.pass?.message}</span>}
                        </label>
                        <label htmlFor="repeatPass">
                            <span className='text-lg'>Re-enter Password : *</span>
                            <input
                                {...register('repeatPass',{required:'Password is required'})}
                                className='w-full border-2 rounded p-2'
                                id='repeatPass'
                                type="text" />
                            {errors.repeatPass && <span className='text-sm font-bold text-red-600'>{errors.repeatPass?.message}</span>}
                        </label>
                        <button className='underline font-bold self-start' onClick={() => setLoginState(true)}>Already have an account</button>
                        <input
                            className='px-3 py-2 bg-gray-950 text-white font-bold tracking-widest rounded cursor-pointer active:scale-[0.98]'
                            type="submit"
                            value="Signup" />
                    </form>
            }
        </div>
    );
};

export default LoginForm;