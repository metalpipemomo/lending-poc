'use client';
import React, { useState } from 'react';
import ClientOnly from '../components/ClientOnly';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import useAxios from '../../lib/AxiosBase';

export default function EmailLogin() {
    const router = useRouter();

    const formDefaultState = {
        defaultValues: {
            email: '',
            password: ''
        }
    };
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
        getValues
    } = useForm<FieldValues>({
        defaultValues: formDefaultState,
        mode: 'onBlur'
    });
    const [errorMsg, SetErrorMsg] = useState<any>(null);
    const [value, setValue] = useState<any>();
    const api = useAxios();
    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const { email, password } = getValues();
        api
            ?.post('/auth/login-email', { email, password })
            .then((e) => {
                // Successful login post -> Want to set localstorage userID here so it's accessible between components per session while JWT decoding issue is being worked out.
                localStorage.setItem('loggedInUserId', e.data.id);
                localStorage.setItem('jwtToken', e.data.token);
                router.push('/dashboard');
            })
            .catch((e) => {
                console.log(e);
            });
    };
    return (
        <ClientOnly>
                    <div className='bg-gray-50 px-10 py-7 rounded-lg max-w-md relative'>
                        <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
                            <h2 className='mt-1 text-2xl text-center text-slate-700'>
                                Enter your email address
                            </h2>
                        </div>
                        <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
                            <div className=' text-center text-sm tracking-tight text-gray-500'>
                                To log in, use a previously registered email
                                address
                            </div>
                        </div>

                        <div className='mt-6 sm:mx-auto sm:w-full sm:max-w-sm'>
                            <form
                                className='space-y-3'
                                onSubmit={handleSubmit(onSubmit)}>
                                <div>
                                    <div className='my-4'>
                                        <input
                                            {...register('email', {
                                                required:
                                                    'Email is required',
                                                pattern: {
                                                    value: /\S+@\S+\.\S+/,
                                                    message:
                                                        'Entered value does not match email format'
                                                }
                                            })}
                                            type='email'
                                            placeholder='Enter email address'
                                            className='block text-center w-full rounded-md border py-3 bg-white text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6 focus:outline-none focus:ring-transparent focus:border-transparent'
                                        />
                                        {errors.email && (
                                            <p className='text-red-500 text-sm'>{`${errors.email.message}`}</p>
                                        )}
                                    </div>
                                </div>
                                <div>
                                    <div className='my-4'>
                                        <input
                                            {...register('password', {
                                                required:
                                                    'Password is required',
                                                minLength: {
                                                    value: 8,
                                                    message:
                                                        'Password must be at least 8 characters'
                                                }
                                            })}
                                            type='password'
                                            placeholder='Password'
                                            className='block w-full text-center rounded-md border py-3 bg-white text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6 focus:outline-none focus:ring-transparent focus:border-transparent'
                                        />
                                        {errors.password && (
                                            <p className='text-red-500 text-sm'>{`${errors.password.message}`}</p>
                                        )}
                                    </div>
                                </div>

                                <div className='flex items-center justify-center mt-2'>
                                    <button
                                        type='submit'
                                        disabled={isSubmitting}
                                        className={`w-9/12 py-3 text-sm font-semibold rounded-full shadow-sm ${
                                            errors.email
                                                ? 'bg-gray-200 text-gray-400'
                                                : 'bg-black text-white hover:opacity-95 focus:outline-none focus:ring-2'
                                        } `}>
                                        Log in
                                    </button>
                                </div>
                                {errorMsg && (
                                    <div className=' flex items-center justify-center text-red-500 text-lg'>
                                        {errorMsg}
                                    </div>
                                )}
                                <div className=' flex items-center justify-center'>
                                    <label
                                        htmlFor='agree'
                                        className='text-sm text-gray-900'>
                                        Don't have an account?{' '}
                                        <Link
                                            href={'/register'}
                                            className='text-blue-600 hover:underline'>
                                            Register now
                                        </Link>
                                    </label>
                                </div>
                            </form>
                        </div>
                    </div>
        </ClientOnly>
    );
}
