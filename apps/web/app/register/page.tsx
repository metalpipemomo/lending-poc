"use client"
import 'react-phone-number-input/style.css'
import PhoneInput, { parsePhoneNumber } from 'react-phone-number-input';
import { E164Number } from 'libphonenumber-js/core';
import { useState, ReactNode, HTMLInputTypeAttribute, FormEvent, forwardRef, useRef, useEffect } from 'react';
import HiddenPassIcon from '../../public/hidden_password.svg'
import RevealedPassIcon from '../../public/revealed_password.svg'
import Image from 'next/image';
import { z } from 'zod';
import useAxios from '../../lib/AxiosBase';
import { useRouter } from 'next/navigation';

const RegisterSchema = z.object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    email: z.string().email('Invalid email address'),
    password: z.string()
        .min(14, 'Password must be at least 14 characters')
        .regex(/[A-Za-z]/, 'Password must contain at least one letter')
        .regex(/[0-9]/, 'Password must contain at least one number')
        .regex(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character'),
    countryCode: z.string().length(2, 'Country code must be 2 characters'),
    phoneNumber: z.string().min(1, 'Phone number is required'),
    creditScore: z.number().min(100, 'Credit score must be at least 100').max(1500, 'Credit score must be at most 1500'),
    streetAddress: z.string().min(1, 'Street address is required'),
    province: z.string().min(1, 'Province is required'),
    postalCode: z.string().min(1, 'Postal code is required'),
    city: z.string().min(1, 'City is required'),
    country: z.string().min(1, 'Country is required')
});

type RegisterData = z.infer<typeof RegisterSchema>;

export default function Register() {
    const [passwordToggled, setPasswordToggle] = useState(false);
    const [errors, setErrors] = useState<string[]>([]);
    const [phoneNumber, setPhoneNumber] = useState<E164Number | undefined>();

    const email = useRef<HTMLInputElement>(null);
    const password = useRef<HTMLInputElement>(null);
    const firstName = useRef<HTMLInputElement>(null);
    const lastName = useRef<HTMLInputElement>(null);
    const streetAddress = useRef<HTMLInputElement>(null);
    const postalCode = useRef<HTMLInputElement>(null);
    const country = useRef<HTMLInputElement>(null);
    const province = useRef<HTMLInputElement>(null);
    const city = useRef<HTMLInputElement>(null);
    const creditScore = useRef<HTMLInputElement>(null);

    const axios = useAxios();
    const router = useRouter();
    
    const ValidateField = (field: keyof RegisterData, value: any) => {
        const schema = z.object({ [field]: RegisterSchema.shape[field] });
        const result = schema.safeParse({ [field]: value });
    
        if (!result.success) {
            setErrors(prev => {
                // Remove any previous errors for this field
                const filteredErrors = prev.filter(error => !error.includes(field));
                // Add new errors
                return [...filteredErrors, ...result.error.errors.map(error => `${field}: ${error.message}`)];
            });
        } else {
            setErrors(prev => {
                // Remove any errors for this field
                return prev.filter(error => !error.includes(field));
            });
        }
    };
    const FormSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        e.stopPropagation();

        const parsedPhoneNumber = parsePhoneNumber(phoneNumber || '');
        const countryCode = parsedPhoneNumber?.country || '';
        const nationalPhoneNumber = parsedPhoneNumber?.nationalNumber || '';

        const formData: RegisterData = {
            firstName: firstName.current?.value || '',
            lastName: lastName.current?.value || '',
            email: email.current?.value || '',
            password: password.current?.value || '',
            countryCode: countryCode,
            phoneNumber: nationalPhoneNumber,
            creditScore: parseInt(creditScore.current?.value || '0'),
            streetAddress: streetAddress.current?.value || '',
            province: province.current?.value || '',
            postalCode: postalCode.current?.value || '',
            city: city.current?.value || '',
            country: country.current?.value || ''
        };

        const result = RegisterSchema.safeParse(formData);

        if (!result.success) {
            setErrors(result.error.errors.map(error => error.message));
        } else {
            setErrors([]);
            console.log("Form data is valid:", result.data);
            // handle successful form submission here
            axios?.post('/auth/signup', result.data)
                .then((response) => {
                    router.push('/');
                })
                .catch((error) => {
                    console.log(error);
                })
        }

    };

    return (
        <div className='flex flex-col items-center justify-center w-screen h-screen'>
            <form onSubmit={(e) => FormSubmit(e)} className='flex flex-col p-8 w-4/12 bg-white rounded-md shadow-md space-y-4 items-center justify-center'>
                <h1 className={'text-xl bold font-bold mb-4'}>Registration Form</h1>
                <FormRow>
                    <PhoneInput className='[&>input]:outline-none border rounded-sm px-2 py-1 shadow-md' placeholder={"Phone Number"} value={phoneNumber} onChange={setPhoneNumber} onBlur={() => ValidateField('phoneNumber', phoneNumber)}/>
                </FormRow>
                <FormRow>
                    <FormInput placeholder='Email' type="email" ref={email} onBlur={() => ValidateField('email', email.current?.value)}/>
                    <div className='flex flex-row'>
                        <button className='pr-2' onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setPasswordToggle(!passwordToggled);
                        }}>
                            <Image
                                src={passwordToggled ? RevealedPassIcon : HiddenPassIcon}
                                alt={passwordToggled ? 'Hide password' : 'Show password'}
                                height={20}
                                width={20}/>
                        </button>
                        <FormInput placeholder='Password' type={passwordToggled ? 'text' : 'password'} ref={password} onBlur={() => ValidateField('password', password.current?.value)}/>
                    </div>
                </FormRow>
                <FormRow>
                    <FormInput placeholder='First Name' type="text" ref={firstName} onBlur={() => ValidateField('firstName', firstName.current?.value)}/>
                    <FormInput placeholder='Last Name' type="text" ref={lastName} onBlur={() => ValidateField('lastName', lastName.current?.value)}/>
                </FormRow>
                <FormRow>
                    <FormInput placeholder='Street Address' type='text' ref={streetAddress} onBlur={() => ValidateField('streetAddress', streetAddress.current?.value)}/>
                    <FormInput placeholder='Postal Code' type='text' ref={postalCode} onBlur={() => ValidateField('postalCode', postalCode.current?.value)}/>
                </FormRow>
                <FormRow>
                    <FormInput placeholder='Country' type='text' ref={country} onBlur={() => ValidateField('country', country.current?.value)}/>
                    <FormInput placeholder='Province' type='text' ref={province} onBlur={() => ValidateField('province', province.current?.value)}/>
                </FormRow>
                <FormRow>
                    <FormInput placeholder='City' type='text' ref={city} onBlur={() => ValidateField('city', city.current?.value)}/>
                </FormRow>
                <FormRow>
                    <FormInput placeholder='Credit Score' type='number' ref={creditScore} onBlur={() => ValidateField('creditScore', parseInt(creditScore.current?.value || '0'))}/>
                </FormRow>
                <button className='w-fit px-4 py-2 text-sm font-semibold rounded-full shadow-sm border border-black bg-black text-white hover:bg-gray-300 hover:text-gray-800 hover:border-gray-800 focus:outline-none focus:ring-2' type={'submit'}>Register</button>
                {errors.length > 0 && (
                    <div className="flex flex-col bg-gray-100 w-full px-2 py-2 space-y-1">
                        {errors.map((error, index) => (
                            <p className='text-red-500' key={index}>*{error}</p>
                        ))}
                    </div>
                )}
            </form>
        </div>
    )
}

type FormRowProps = {
    children: ReactNode;
};

const FormRow = ({ children }: FormRowProps) =>  {
    return (
        <div className='flex lg:flex-row sm:flex-col w-full justify-between'>
            {children}
        </div>
    );
};

type FormInputProps = {
    placeholder: string,
    type: HTMLInputTypeAttribute,
    onBlur: () => void,
};

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(({ placeholder, type, onBlur }, ref) => {
    return (
        <input required ref={ref} className='border rounded-sm px-2 py-1 shadow-md' placeholder={placeholder} type={type} onBlur={onBlur} />
    );
});
