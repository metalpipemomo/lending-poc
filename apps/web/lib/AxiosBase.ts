import { useEffect } from 'react';
import axios, { AxiosInstance } from 'axios';

let axiosInstance: AxiosInstance | null = null;
let requestInterceptorID: number | null = null;

// A simple hook for creating or fetching an Axios instance
export default function useAxios(): AxiosInstance | null {
    useEffect(() => {
        // Create Axios instance if not already created
        if (!axiosInstance) {
            axiosInstance = axios.create({
                baseURL: 'http://localhost:4040/api/',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            // Add request interceptor if token is available
            // Will change this method to cookies later on probably
            const token = localStorage.getItem('jwtToken');
            if (token) {
                requestInterceptorID = axiosInstance.interceptors.request.use(
                    (config) => {
                        // Modify headers to include token
                        const updatedConfig = { ...config };
                        updatedConfig.headers.Authorization = `Bearer ${token}`;
                        return updatedConfig;
                    },
                    (error) => {
                        return Promise.reject(error);
                    }
                );
            }

            // Clean-up function
            return () => {
                // Remove request interceptor
                if (axiosInstance && requestInterceptorID !== null) {
                    axiosInstance.interceptors.request.eject(
                        requestInterceptorID
                    );
                }
            };
        }
    }, []);

    return axiosInstance;
}
