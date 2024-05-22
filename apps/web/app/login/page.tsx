'use client';
import { useState } from 'react';
import Link from 'next/link';

import ClientOnly from '../components/ClientOnly';
import PhoneLogin from './phone-login';
import EmailLogin from './email-login';

export default function AuthPage() {
    const [loginByPhone, setLoginMethod] = useState(true);

    return (
        <ClientOnly>
            <div className='relative overflow-hidden '>
                {/* Adding a global bg instead in global.css, this approach will make other colors on components on top look off */}
                {/* <div className='absolute inset-0 z-0 w-full bg-black opacity-40'></div> */}
                <div className='max-w-[2520px] flex flex-col justify-center items-center min-h-screen'>
                    {loginByPhone ? <PhoneLogin /> : <EmailLogin />}
                    <div className='flex items-center justify-center my-2 z-30'>
                        <button onClick={() => { setLoginMethod(!loginByPhone) }}>{!loginByPhone ? 'Use phone number' : 'Use email'}</button>
                    </div>
                </div>
            </div>
        </ClientOnly>
    );
}
